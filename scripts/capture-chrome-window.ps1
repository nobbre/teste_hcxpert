# Script PowerShell para Captura de Janela do Chrome
# Captura screenshot da janela ativa do navegador

param(
    [string]$OutputPath = "cypress/evidencias/chrome-window.png",
    [string]$WindowTitle = "Chrome"
)

# Adiciona assemblies necessários
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

Write-Host "🔍 Procurando janela do navegador..." -ForegroundColor Cyan

# Função para capturar janela específica
function Capture-Window {
    param(
        [string]$Title,
        [string]$Output
    )
    
    try {
        # Obtém a janela do Chrome/Edge
        $process = Get-Process | Where-Object { $_.MainWindowTitle -like "*$Title*" } | Select-Object -First 1
        
        if ($null -eq $process) {
            Write-Host "⚠️  Janela não encontrada com título: $Title" -ForegroundColor Yellow
            return $false
        }
        
        Write-Host "✓ Janela encontrada: $($process.MainWindowTitle)" -ForegroundColor Green
        
        # Importa funções Win32
        $signature = @"
        [DllImport("user32.dll")]
        public static extern bool SetForegroundWindow(IntPtr hWnd);
        
        [DllImport("user32.dll")]
        public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
        
        [StructLayout(LayoutKind.Sequential)]
        public struct RECT {
            public int Left;
            public int Top;
            public int Right;
            public int Bottom;
        }
"@
        
        $type = Add-Type -MemberDefinition $signature -Name WinAPI -Namespace Win32 -PassThru
        
        # Coloca janela em foco
        [void]$type::SetForegroundWindow($process.MainWindowHandle)
        Start-Sleep -Milliseconds 500
        
        # Obtém dimensões da janela
        $rect = New-Object Win32.WinAPI+RECT
        [void]$type::GetWindowRect($process.MainWindowHandle, [ref]$rect)
        
        $width = $rect.Right - $rect.Left
        $height = $rect.Bottom - $rect.Top
        
        Write-Host "📐 Dimensões: ${width}x${height}" -ForegroundColor Cyan
        
        # Captura screenshot
        $bitmap = New-Object System.Drawing.Bitmap $width, $height
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        $graphics.CopyFromScreen($rect.Left, $rect.Top, 0, 0, $bitmap.Size)
        
        # Garante que o diretório existe
        $directory = Split-Path -Parent $Output
        if (!(Test-Path $directory)) {
            New-Item -ItemType Directory -Path $directory -Force | Out-Null
        }
        
        # Salva imagem
        $bitmap.Save($Output, [System.Drawing.Imaging.ImageFormat]::Png)
        
        $graphics.Dispose()
        $bitmap.Dispose()
        
        Write-Host "✓ Screenshot salvo: $Output" -ForegroundColor Green
        return $true
        
    } catch {
        Write-Host "❌ Erro ao capturar screenshot: $_" -ForegroundColor Red
        return $false
    }
}

# Executa captura
$success = Capture-Window -Title $WindowTitle -Output $OutputPath

if ($success) {
    Write-Host "`n✅ Captura concluída com sucesso!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "`n❌ Falha na captura" -ForegroundColor Red
    exit 1
}
