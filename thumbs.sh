#!/bin/sh
# Render thumbs/*.jpg from slides/*.html in headless Chromium. Map tiles and live feeds need internet, so a container
# without it gets the overlays only. LEAFLET_DIR = a local Leaflet dist/ (unpkg may be unreachable).
set -e; cd "$(dirname "$0")"; T=$(mktemp -d); mkdir -p thumbs
for f in slides/*.html; do b=$(basename "$f" .html)
  if [ -n "$LEAFLET_DIR" ]; then sed "s#https://unpkg.com/leaflet@1.9.4/dist/#file://$LEAFLET_DIR/#g" "$f" > "$T/$b.html"; else cp "$f" "$T/$b.html"; fi
  node ~/.claude/tools/shot.mjs "file://$T/$b.html" "$T/$b.png" --wait=${WAIT:-9000} --size=1920x1050 >/dev/null 2>&1
  /home/node/.conda/envs/simple/bin/python -I -c "from PIL import Image;Image.open('$T/$b.png').convert('RGB').resize((960,525),Image.LANCZOS).save('thumbs/$b.jpg',quality=82)"
  echo "thumbs/$b.jpg"; done; rm -rf "$T"
