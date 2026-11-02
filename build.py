"""Copy the chosen gallery pages into slides/ as standalone files (Samaritan kit inlined) and write index.html
(a Samaritan feed wall). Thumbnails in thumbs/ come from thumbs.sh (headless Chromium).
Run: /home/node/.conda/envs/simple/bin/python -I build.py   (needs ~/.claude/tools/web.py and kit/)"""
import os, sys, json
TOOLS = os.path.expanduser("~/.claude/tools"); sys.path.insert(0, TOOLS)
import web  # samkit() inlines kit/sam.css + kit/sam.js + the roll() effect
HERE = os.path.dirname(os.path.abspath(__file__))
SLIDES = [  # (gallery file, output name, title, tag)
 ("us-atlas.html", "us-atlas.html", "US Atlas", "50 LAYERS"),
 ("world-conflicts.html", "world-conflicts.html", "Conflict Monitor", "11 THEATRES"),
 ("chicago-board-president.html", "chicago-board-president.html", "CPS Board President", "RACE MONITOR"),
 ("chicago-1871.html", "chicago-1871.html", "Chicago 1871", "INCIDENT RECONSTRUCTION"),
 ("sky-watch.html", "sky-watch.html", "Sky Watch", "14 OBSERVATORIES"),
 ("orbit-watch.html", "orbit-watch.html", "Orbit Watch", "LIVE FEEDS"),
 ("us-weather.html", "us-weather.html", "US Weather", "LIVE WIND"),
 ("lensing-playground.html", "lensing-playground.html", "Lensing Playground", "GRAVITATIONAL LENS"),
 ("nyc-tour.html", "nyc-tour.html", "NYC Tour", "AERIAL SURVEY"),
]
keep = set()
for src, dst, *_ in SLIDES:
    page = web.samkit(open(os.path.join(TOOLS, "gallery", src)).read())
    page += "<script>addEventListener('keydown',e=>{if(e.key==='Escape')location.href='../'})</script>"  # Esc: back to the wall
    open(os.path.join(HERE, "slides", dst), "w").write(page); keep.add(dst)
    print(f"slides/{dst:32s} {len(page)//1000:6d} KB")
for f in os.listdir(os.path.join(HERE, "slides")):
    if f not in keep: os.remove(os.path.join(HERE, "slides", f)); print("removed slides/" + f)
items = [{"src": "slides/" + d, "thumb": "thumbs/" + d[:-5] + ".jpg", "title": t, "tag": g} for s, d, t, g in SLIDES]
open(os.path.join(HERE, "index.html"), "w").write(open(os.path.join(HERE, "index.tpl.html")).read().replace("__ITEMS__", json.dumps(items)))
print("index.html written")
import mobile; [mobile.inject(os.path.join(HERE, "slides", d)) for d in keep]; print("phone layer added (mobile/)")
