<#
Prompts for SMTP credentials securely and writes them to .env.local (appends/overwrites existing lines).
Supported providers: Gmail (app password), Mailgun SMTP, any SMTP server.
Usage: .\scripts\add_smtp_credentials.ps1
#>

$envFile = Join-Path -Path (Get-Location) -ChildPath ".env.local"

Write-Host "This will securely add SMTP credentials to $envFile" -ForegroundColor Yellow

# Prompt securely for password
$smtpHost = Read-Host -Prompt "Enter SMTP_HOST (e.g. smtp.gmail.com)"
$smtpPort = Read-Host -Prompt "Enter SMTP_PORT (e.g. 587)"
$smtpUser = Read-Host -Prompt "Enter SMTP_USER (e.g. postmaster@yourdomain.com)"
$securePass = Read-Host -Prompt "Enter SMTP_PASS (will not be displayed)" -AsSecureString
$ptr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePass)
try { $smtpPass = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) } finally { [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
$smtpFrom = Read-Host -Prompt "Enter SMTP_FROM (the from address)"

if ([string]::IsNullOrWhiteSpace($smtpHost) -or [string]::IsNullOrWhiteSpace($smtpUser) -or [string]::IsNullOrWhiteSpace($smtpPass) -or [string]::IsNullOrWhiteSpace($smtpFrom)) {
    Write-Host "Missing values; aborting" -ForegroundColor Red
    exit 1
}

# Ensure .env.local exists
if (-not (Test-Path -Path $envFile)) { New-Item -Path $envFile -ItemType File -Force | Out-Null }

# Remove existing SMTP lines
(Get-Content -Path $envFile -ErrorAction SilentlyContinue) | Where-Object { $_ -notmatch '^SMTP_' } | Set-Content -Path $envFile

# Append new SMTP values
Add-Content -Path $envFile -Value "SMTP_HOST=$smtpHost"
Add-Content -Path $envFile -Value "SMTP_PORT=$smtpPort"
Add-Content -Path $envFile -Value "SMTP_USER=$smtpUser"
Add-Content -Path $envFile -Value "SMTP_PASS=$smtpPass"
Add-Content -Path $envFile -Value "SMTP_FROM=$smtpFrom"

Write-Host "Wrote SMTP credentials to $envFile" -ForegroundColor Green
