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
    return $sb.ToString()
}

$text = Read-DocxAllText "s:\3D Objects\LibertyScience\docfiles\LibertyScienceCoaching_6Day_Habit_Building_Plan.docx"
$text | Out-File -FilePath "s:\3D Objects\LibertyScience\docfiles\habit_plan_text.txt" -Encoding utf8
Write-Host "Extracted Habit Plan Text. Length: $($text.Length)"
Write-Host $text
