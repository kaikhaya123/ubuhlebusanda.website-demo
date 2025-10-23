# Run this script to test the SMTP connection and send a test email

# Test SMTP connection and send email
$ErrorActionPreference = 'Continue'
$VerbosePreference = 'Continue'

Write-Host "Testing SMTP connection to Gmail..."

# Load environment variables from .env.local
$envContent = Get-Content .env.local
foreach ($line in $envContent) {
    if ($line.Trim() -and !$line.StartsWith('#')) {
        $key, $value = $line.Split('=', 2)
        if ($key -and $value) {
            [System.Environment]::SetEnvironmentVariable($key.Trim(), $value.Trim(), [System.EnvironmentVariableTarget]::Process)
        }
    }
}

# Verify environment variables
$requiredVars = @(
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'CONTACT_RECEIVER_EMAIL'
)

$missingVars = @()
foreach ($var in $requiredVars) {
    if (-not [System.Environment]::GetEnvironmentVariable($var)) {
        $missingVars += $var
    }
}

if ($missingVars.Count -gt 0) {
    Write-Error "Missing required environment variables: $($missingVars -join ', ')"
    exit 1
}

Write-Host "Environment variables verified"
Write-Host "SMTP Host: $env:SMTP_HOST"
Write-Host "SMTP Port: $env:SMTP_PORT"
Write-Host "SMTP User: $env:SMTP_USER"
Write-Host "Receiver: $env:CONTACT_RECEIVER_EMAIL"

# Test telnet connection to SMTP server
try {
    $tcpClient = New-Object System.Net.Sockets.TcpClient
    $tcpClient.Connect($env:SMTP_HOST, $env:SMTP_PORT)
    Write-Host "TCP connection successful"
    $tcpClient.Close()
} catch {
    Write-Error "Failed to connect to SMTP server: $_"
    exit 1
}

Write-Host "Connection test complete"