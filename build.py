"""Copy the chosen gallery pages into slides/ as standalone files (Samaritan kit inlined) and write index.html.
Run: /home/node/.conda/envs/simple/bin/python -I build.py   (needs ~/.claude/tools/web.py and kit/)"""
import os, sys, json, html
TOOLS = os.path.expanduser("~/.claude/tools"); sys.path.insert(0, TOOLS)
import web  # samkit() inlines kit/sam.css + kit/sam.js + the roll() effect
HERE = os.path.dirname(os.path.abspath(__file__))
SLIDES = [  # (gallery file, output name, title, tag, blurb, keys)
 ("us-atlas.html", "us-atlas.html", "US Atlas", "50 LAYERS · 40+ DATASETS",
  "One Albers map of the United States with 50 data layers: 3,143-county election maps, air routes, power plants, tornado tracks, meteorites, nuclear tests, Walmart and post-office spread over time, and live earthquakes, weather alerts, wildfires and aurora.",
  "Auto tour · click a chip to jump · scroll the chip strip"),
 ("world-conflicts.html", "world-conflicts.html", "Conflict Monitor", "11 ACTIVE THEATRES",
  "Active wars on a dark map. The tour flies to each theatre and opens a dossier with status, parties, a key figure and sourced notes. Facts as of 2 Nov 2026.",
  "Space pause · O overview · click a theatre"),
 ("chicago-board-president.html", "chicago-board-president.html", "CPS Board President", "RACE MONITOR · NOV 2026",
  "Chicago's first elected school board president race: money, donor mix, an outside-money flow chart, endorsements, positions, scrutiny, timeline and the budget at stake. Compiled from about 60 searches of published reporting.",
  "Space pause · ←/→ step panels"),
 ("sky-watch.html", "sky-watch.html", "Sky Watch", "14 OBSERVATORIES · LIVE",
  "A live world map of night and twilight, with the Sun's position computed in the browser. It marks 14 cosmology observatories, shows each one as dark, moonlit, twilight, daylight or always on, and rotates a focus card every 7 s.",
  "N next observatory"),
 ("orbit-watch.html", "orbit-watch.html", "Orbit Watch", "LIVE FEEDS",
  "Live ISS position and ground track, the day/night terminator, GOES-East full disk, SDO solar imagery and the NOAA aurora forecast, all fetched live by your browser.",
  "Click a feed to enlarge"),
 ("us-weather.html", "us-weather.html", "US Weather", "LIVE · OPEN-METEO",
  "Live surface wind particles across the continental US with temperature, cloud and precipitation layers, a hover readout, extremes and cities.",
  "Hover for readout · layer buttons"),
 ("nyc-tour.html", "nyc-tour.html", "NYC Tour", "GEO // AERIAL SURVEY",
  "A guided tour of Manhattan in hard Samaritan steps, from the Statue of Liberty up to the Met, with borough data boxes from the 2020 census.",
  "Space pause · N next · click map to stop"),
]
for src, dst, *_ in SLIDES:
    page = web.samkit(open(os.path.join(TOOLS, "gallery", src)).read())
    open(os.path.join(HERE, "slides", dst), "w").write(page)
    print(f"slides/{dst:32s} {len(page)//1000:6d} KB")
cards = "\n".join(f"""<a class=card href="slides/{d}" style="--i:{i}"><div class=pv><iframe data-src="slides/{d}" tabindex=-1 loading=lazy title="{html.escape(t)}"></iframe><span class=ld>LOADING FEED…</span></div>
<div class=meta><div class=n>{i+1:02d}</div><div><div class=t>{html.escape(t)}</div><div class=g>{html.escape(g)}</div></div></div>
<p>{html.escape(b)}</p><div class=k>{html.escape(k)}</div></a>""" for i, (s, d, t, g, b, k) in enumerate(SLIDES))
open(os.path.join(HERE, "index.html"), "w").write(open(os.path.join(HERE, "index.tpl.html")).read().replace("__CARDS__", cards).replace("__N__", str(len(SLIDES))))
print("index.html written")
