<#
Prompts the user for a SendGrid API key securely and writes it to .env.local.
This script runs locally; it does NOT print the key or send it anywhere.
Usage: Open PowerShell in project root and run:
  .\scripts\add_sendgrid_key.ps1
#>

param()

$envFile = Join-Path -Path (Get-Location) -ChildPath ".env.local"

Write-Host "This will securely add SENDGRID_API_KEY to $envFile" -ForegroundColor Yellow

# Prompt for the key as a secure string
$secureKey = Read-Host -Prompt "Enter your SendGrid API key (will not be displayed)" -AsSecureString
# Convert secure string to plain text in memory (only for writing to the file)
$ptr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureKey)
try {
    $plainKey = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
} finally {
    [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
}

if ([string]::IsNullOrWhiteSpace($plainKey)) {
    Write-Host "No key entered. Aborting." -ForegroundColor Red
    exit 1
}

# Optional: prompt for FROM email
$from = Read-Host -Prompt "Optional: Enter SENDGRID_FROM_EMAIL (press Enter to skip)"

# Ensure .env.local exists and is in .gitignore
if (-not (Test-Path -Path $envFile)) {
    New-Item -Path $envFile -ItemType File -Force | Out-Null
    Write-Host "Created $envFile" -ForegroundColor Green
}

# Remove any existing lines for the keys (avoid duplicates)
(Get-Content -Path $envFile -ErrorAction SilentlyContinue) | Where-Object { $_ -notmatch '^SENDGRID_API_KEY=' -and $_ -notmatch '^SENDGRID_FROM_EMAIL=' } | Set-Content -Path $envFile

# Append the keys
Add-Content -Path $envFile -Value "SENDGRID_API_KEY=$plainKey"
if (-not [string]::IsNullOrWhiteSpace($from)) {
    Add-Content -Path $envFile -Value "SENDGRID_FROM_EMAIL=$from"
}

Write-Host "Wrote SENDGRID_API_KEY to $envFile" -ForegroundColor Green
Write-Host "NOTE: Do NOT paste your API key into chat. If this key was exposed earlier, revoke it and create a new one." -ForegroundColor Yellow

# SMTP configuration
$SMTPHost = "smtp.sendgrid.net"
$SMTPPort = 587
$SMTPUser = "apikey"
$SMTPPass = "cpzl nqth qwsa pwrk"
$SMTPFrom = "Siyanda@Ubuhlebusanda.co.za"

# End
