# Samaritan // Gallery

Nine interactive data displays in a dark, Samaritan-inspired style (after the AI in *Person of Interest*). Each one is a single self-contained HTML file that runs entirely in the browser. The live displays fetch public feeds directly.

| # | Display | What it shows |
|---|---|---|
| 01 | [US Atlas](slides/us-atlas.html) | 50 data layers on one Albers map of the US |
| 02 | [Conflict Monitor](slides/world-conflicts.html) | Active wars, auto tour, sourced dossiers (2 Nov 2026) |
| 03 | [CPS Board President](slides/chicago-board-president.html) | Chicago's first elected school board president race |
| 04 | [Chicago 1871](slides/chicago-1871.html) | Reconstruction of the Great Chicago Fire spreading |
| 05 | [Sky Watch](slides/sky-watch.html) | Live day/night map with 14 cosmology observatories |
| 06 | [Orbit Watch](slides/orbit-watch.html) | Live ISS track, GOES/SDO imagery, aurora forecast |
| 07 | [US Weather](slides/us-weather.html) | Live wind particles and weather layers |
| 08 | [Lensing Playground](slides/lensing-playground.html) | Interactive gravitational lens over a galaxy field |
| 09 | [NYC Tour](slides/nyc-tour.html) | Guided Manhattan tour |

The displays are designed for a 1920×1050 landscape screen. Press F11 for full screen.

The front page is a Samaritan feed wall: ↑/↓, the wheel or a swipe steps through it, Enter or a click opens a feed, and Esc on a display returns to the wall. `thumbs.sh` renders the previews. `build.py` regenerates `slides/` and `index.html` from the local gallery, inlining the Samaritan kit. It needs the local tools directory, so it only runs in the original environment.

Map tiles © Esri. Built with [Leaflet](https://leafletjs.com). Live data comes from USGS, NWS, NIFC, NOAA SWPC, NASA EONET, NASA SDO, NOAA GOES, wheretheiss.at and Open-Meteo.
