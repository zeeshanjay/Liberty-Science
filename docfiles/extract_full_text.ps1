Add-Type -AssemblyName System.IO.Compression.FileSystem

function Read-DocxAllText($path) {
    $zip = [System.IO.Compression.ZipFile]::OpenRead($path)
    $entry = $zip.GetEntry('word/document.xml')
    $stream = $entry.Open()
    $reader = New-Object System.IO.StreamReader($stream)
    $xml = $reader.ReadToEnd()
    $reader.Close()
    $stream.Close()
    $zip.Dispose()
    
    $matches = [System.Text.RegularExpressions.Regex]::Matches($xml, '<w:t[^>]*>(.*?)</w:t>')
    $sb = New-Object System.Text.StringBuilder
    foreach ($m in $matches) {
        [void]$sb.Append($m.Groups[1].Value)
        [void]$sb.Append(" ")
    }
    $fullText = $sb.ToString()
    Write-Output $fullText
}

$text = Read-DocxAllText "s:\3D Objects\LibertyScience\docfiles\Metabolic_Switching_Benefits_Education.docx"
$text | Out-File -FilePath "s:\3D Objects\LibertyScience\docfiles\metabolic_switching_full.txt" -Encoding utf8
Write-Host "Extracted text. Length: $($text.Length)"
