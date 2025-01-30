# Create the workshop images directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "public/images/workshop"

# Define the image mappings
$imageMap = @{
    "Epilog Legend 36EXT Full Front View.jpg" = "epilog-legend-36ext-front.jpg"
    "Epilog Legend 36EXT Upper View.jpg" = "epilog-legend-36ext-upper.jpg"
    "Gummiband Ball 1.jpg" = "elastic-ball-1.jpg"
    "Gummiband Ball 2.jpg" = "elastic-ball-2.jpg"
    "Gummiband Ball 3.jpg" = "elastic-ball-3.jpg"
    "3 Part knot Würfel, einzelteile.jpg" = "cube-puzzle-parts.jpg"
    "3 Part knot Würfel, zussamengesetzt.jpg" = "cube-puzzle-assembled.jpg"
    "craftbot flow idex closeup.jpg" = "craftbot-flow-idex.jpg"
    "formlabs wash and cure closeup.jpg" = "formlabs-wash-cure.jpg"
    "Anycubic wash and cure closeup.jpg" = "anycubic-wash-cure.jpg"
    "Formlabs 3 closeup.jpg" = "formlabs-3.jpg"
    "CNC closeup.jpg" = "cnc-machine.jpg"
}

# Copy and rename each image
foreach ($source in $imageMap.Keys) {
    $sourcePath = "public/Images/Projekte+Maschinen/$source"
    $destPath = "public/images/workshop/$($imageMap[$source])"
    
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath $destPath -Force
        Write-Host "Copied $source to $($imageMap[$source])"
    } else {
        Write-Host "Source file not found: $source"
    }
} 