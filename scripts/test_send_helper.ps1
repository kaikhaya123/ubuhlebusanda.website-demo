# Helper: restart dev server and run a contact POST test
# Usage: place your .env.local in the project root, then run from PowerShell:
#    ./scripts/test_send_helper.ps1

Set-StrictMode -Version Latest

Write-Output "Checking for .env.local..."
if (-Not (Test-Path -Path "$PSScriptRoot\..\.env.local")) {
  Write-Error ".env.local not found. Copy .env.example to .env.local and edit with your credentials before running this script."
  exit 1
}

# Stop any node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object { $_.Id -ne $PID } | ForEach-Object { 
  Write-Output "Stopping node process $_.Id"
  Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
}

# Start dev server in a new process
Write-Output "Starting dev server..."
Start-Process -FilePath "npm" -ArgumentList "run","dev" -NoNewWindow

# Wait a few seconds for the server to boot
Start-Sleep -Seconds 6

# Run test POST
Write-Output "Running test POST to /api/contact"
try {
  $body = @{ name='Helper Test'; email='you@example.com'; message='Automated helper test'; subject='Helper' ; hp='' } | ConvertTo-Json
  $res = Invoke-RestMethod -Method Post -Uri 'http://localhost:3000/api/contact' -ContentType 'application/json' -Body $body -Verbose
  Write-Output "Response:"
  $res | ConvertTo-Json -Depth 5
} catch {
  Write-Error "Test POST failed: $_"
}

Write-Output "If the response is { ok: true } and you still don't receive email, ensure SENDGRID_API_KEY or SMTP_* values are set in .env.local and that you restarted the server."