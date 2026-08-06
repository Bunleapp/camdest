$sitemap = Invoke-WebRequest -Uri "http://localhost:3000/sitemap.xml" -UseBasicParsing
Write-Output "--- SITEMAP (first 500 chars) ---"
Write-Output $sitemap.Content.Substring(0,500)
Write-Output ""

$robots = Invoke-WebRequest -Uri "http://localhost:3000/robots.txt" -UseBasicParsing
Write-Output "--- ROBOTS ---"
Write-Output $robots.Content
Write-Output ""

$homePage = Invoke-WebRequest -Uri "http://localhost:3000/" -UseBasicParsing
Write-Output "--- CANONICAL on / ---"
Select-String -InputObject $homePage.Content -Pattern 'rel="canonical"[^>]*'
