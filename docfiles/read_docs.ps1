Add-Type -AssemblyName System.IO.Compression.FileSystem

function Read-DocxText($path) {
    Write-Host "========================================"
    Write-Host "FILE: $path"
    Write-Host "========================================"
    $zip = [System.IO.Compression.ZipFile]::OpenRead($path)
    $entry = $zip.GetEntry('word/document.xml')
    $stream = $entry.Open()
    $reader = New-Object System.IO.StreamReader($stream)
    $xml = $reader.ReadToEnd()
    $reader.Close()
    $stream.Close()
    $zip.Dispose()
    
    # Simple regex to extract <w:t> tags
    $matches = [System.Text.RegularExpressions.Regex]::Matches($xml, '<w:t[^>]*>(.*?)</w:t>')
    $sb = New-Object System.Text.StringBuilder
    foreach ($m in $matches) {
        [void]$sb.Append($m.Groups[1].Value)
        [void]$sb.Append(" ")
    }
    $fullText = $sb.ToString()
    Write-Host "Length: $($fullText.Length) chars"
    Write-Host $fullText.Substring(0, [Math]::Min(3000, $fullText.Length))
    Write-Host "`n"
}

Read-DocxText "s:\3D Objects\LibertyScience\docfiles\Metabolic_Switching_Benefits_Education.docx"
Read-DocxText "s:\3D Objects\LibertyScience\docfiles\MetabolicNP.docx"
