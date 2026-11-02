# Samaritan // Gallery

Seven interactive data displays in a dark, Samaritan-inspired style (after the AI in *Person of Interest*). Each one is a single self-contained HTML file that runs entirely in the browser. The live displays fetch public feeds directly.

| # | Display | What it shows |
|---|---|---|
| 01 | [US Atlas](slides/us-atlas.html) | 50 data layers on one Albers map of the US, including county election maps, infrastructure, history, oddities and live hazards |
| 02 | [Conflict Monitor](slides/world-conflicts.html) | Active wars with an auto tour and sourced dossiers (as of 2 Nov 2026) |
| 03 | [CPS Board President](slides/chicago-board-president.html) | Chicago's first elected school board president race: money, endorsements, positions, timeline |
| 04 | [Sky Watch](slides/sky-watch.html) | Live day/night map with 14 cosmology observatories and whether each can observe now |
| 05 | [Orbit Watch](slides/orbit-watch.html) | Live ISS track, terminator, GOES/SDO imagery, aurora forecast |
| 06 | [US Weather](slides/us-weather.html) | Live wind particles and weather layers from Open-Meteo |
| 07 | [NYC Tour](slides/nyc-tour.html) | Guided Manhattan tour with 2020 census boxes |

The displays are designed for a 1920×1050 landscape screen. Press F11 for full screen.

`build.py` regenerates `slides/` and `index.html` from the local gallery, inlining the Samaritan kit. It needs the local tools directory, so it only runs in the original environment.

Map tiles © Esri. Built with [Leaflet](https://leafletjs.com). Live data comes from USGS, NWS, NIFC, NOAA SWPC, NASA EONET, NASA SDO, NOAA GOES, wheretheiss.at and Open-Meteo.
