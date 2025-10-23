Set-StrictMode -Version Latest

# Simple, robust helper to start the dev server, POST a test, and show provider logs.
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Resolve-Path (Join-Path $scriptDir '..')
$envPath = Join-Path $projectRoot '.env.local'
$logDir = Join-Path $projectRoot 'logs'
$logFile = Join-Path $logDir 'dev-server.log'

if (-not (Test-Path $logDir)) { New-Item -Path $logDir -ItemType Directory | Out-Null }

# Load .env.local variables into process environment (if present)
if (Test-Path $envPath) {
  Write-Output ".env.local found — loading into process environment."
  Get-Content $envPath | ForEach-Object {
    if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
    $pair = $_ -split '=', 2
    if ($pair.Length -eq 2) {
      $name = $pair[0].Trim()
      $value = $pair[1].Trim()
      if ($name) { [System.Environment]::SetEnvironmentVariable($name, $value, 'Process') }
    }
  }
} else { Write-Output ".env.local not found — using current environment." }

# Check for provider credentials
$hasSendGrid = -not [string]::IsNullOrEmpty([System.Environment]::GetEnvironmentVariable('SENDGRID_API_KEY', 'Process'))
$hasSmtp = -not [string]::IsNullOrEmpty([System.Environment]::GetEnvironmentVariable('SMTP_HOST', 'Process')) -and -not [string]::IsNullOrEmpty([System.Environment]::GetEnvironmentVariable('SMTP_USER', 'Process')) -and -not [string]::IsNullOrEmpty([System.Environment]::GetEnvironmentVariable('SMTP_PASS', 'Process'))
$hasReceiver = -not [string]::IsNullOrEmpty([System.Environment]::GetEnvironmentVariable('CONTACT_RECEIVER_EMAIL', 'Process'))

if (-not ($hasSendGrid -or $hasSmtp)) {
  Write-Error -Message 'No provider credentials found (SENDGRID_API_KEY or SMTP_*). Add them to .env.local and re-run.'
  exit 1
}
if (-not $hasReceiver) {
  Write-Error -Message 'CONTACT_RECEIVER_EMAIL missing. Add it to .env.local and re-run.'
  exit 1
}

# Stop running node processes to avoid conflicts
Get-Process -Name node -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue }

# Start dev server and log output
if (Test-Path $logFile) { Remove-Item $logFile -Force -ErrorAction SilentlyContinue }
Write-Output "Starting dev server — logging to $logFile"
$si = New-Object System.Diagnostics.ProcessStartInfo
$si.FileName = 'npm'
$si.Arguments = 'run dev'
$si.WorkingDirectory = $projectRoot.Path
$si.RedirectStandardOutput = $true
$si.RedirectStandardError = $true
$si.UseShellExecute = $false
$si.CreateNoWindow = $true

$proc = New-Object System.Diagnostics.Process
$proc.StartInfo = $si
$proc.Start() | Out-Null

# Stream stdout/stderr to the log file
$stdout = $proc.StandardOutput
$stderr = $proc.StandardError
Start-Job -ScriptBlock { param($s,$log) while (-not $s.EndOfStream) { Add-Content -Path $log -Value $s.ReadLine() } } -ArgumentList $stdout, $logFile | Out-Null
Start-Job -ScriptBlock { param($s,$log) while (-not $s.EndOfStream) { Add-Content -Path $log -Value $s.ReadLine() } } -ArgumentList $stderr, $logFile | Out-Null

# Wait for server readiness
Write-Output "Waiting up to 40s for server to become ready..."
$deadline = [DateTime]::Now.AddSeconds(40)
$ready = $false
while ((-not $ready) -and ([DateTime]::Now -lt $deadline)) {
  Start-Sleep -Milliseconds 500
  if (Test-Path $logFile) {
    $c = Get-Content $logFile -Raw -ErrorAction SilentlyContinue
    if ($c -match 'Local:\s+http://localhost:3000' -or $c -match 'Ready in') { $ready = $true }
  }
}
if (-not $ready) { Write-Error "Dev server not ready; check $logFile"; exit 1 }
Write-Output "Server ready — sending test POST."

# Send test POST
try {
  $payload = @{ name='Auto Real Test'; email='you@example.com'; message='Automated real-send test'; subject='Auto real'; hp='' } | ConvertTo-Json
  $resp = Invoke-RestMethod -Method Post -Uri 'http://localhost:3000/api/contact' -ContentType 'application/json' -Body $payload -ErrorAction Stop
  Write-Output "API response: $($resp | ConvertTo-Json -Depth 5)"
} catch { Write-Error "POST failed: $_" }

Start-Sleep -Seconds 2

Write-Output "---- Last 300 log lines ----"
if (Test-Path $logFile) { Get-Content $logFile -Tail 300 | ForEach-Object { Write-Output $_ } }

Write-Output "---- Filtered provider lines ----"
if (Test-Path $logFile) { Get-Content $logFile -Tail 300 | Where-Object { $_ -match 'messageId|Message sent|sendgrid|SMTP|smtp|nodemailer|ERROR|error|Failed|MSGID' } | ForEach-Object { Write-Output $_ } }

Write-Output "Done. To stop the dev server: Get-Process -Name node | Stop-Process -Force"
