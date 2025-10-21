export const binMapSchema = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Distance to Nearest Train Station — Greater Melbourne",
    "subtitle": "Each square = 1 km² grid cell | Colour shows distance range (km)",
    "fontSize": 16,
    "subtitleFontSize": 12,
    "anchor": "middle"
  },
  "width": 800,
  "height": 700,
  "data": {
    "url": "/js/data/melbourne_grid_distance.geojson",
    "format": {"type": "json", "property": "features"}
  },
  "projection": {"type": "mercator"},
  "layer": [
    {
      "mark": {"type": "geoshape", "stroke": "#ffffff", "strokeWidth": 0.15},
      "transform": [
        {
          /* Create discrete distance categories */
          "calculate": `
            datum.properties.dist_km <= 1 ? "0–1 km" :
            datum.properties.dist_km <= 2 ? "1–2 km" :
            datum.properties.dist_km <= 3 ? "2–3 km" :
            datum.properties.dist_km <= 4 ? "3–4 km" :
            datum.properties.dist_km <= 5 ? "4–5 km" :
            datum.properties.dist_km <= 6 ? "5–6 km" :
            datum.properties.dist_km <= 7 ? "6–7 km" :
            datum.properties.dist_km <= 8 ? "7–8 km" :
            datum.properties.dist_km <= 9 ? "8–9 km" :
            datum.properties.dist_km <= 10 ? "9–10 km" :
            "> 10 km"
          `,
          "as": "distance_bin"
        }
      ],
      "encoding": {
        "color": {
          "field": "distance_bin",
          "type": "nominal",
          "title": "Distance Range (km)",
          "scale": {
            "domain": [
              "0–1 km","1–2 km","2–3 km","3–4 km","4–5 km",
              "5–6 km","6–7 km","7–8 km","8–9 km","9–10 km","> 10 km"
            ],
"range": [
  "#fff5eb",
  "#fee6ce",
  "#fdd0a2",
  "#fdae6b",
  "#fd8d3c",
  "#f16913",
  "#d94801",
  "#a63603",
  "#7f2704",
  "#661c02",
  "#4b0000"   /* colour for >10 km — deep red */
]
          },
          "legend": {
            "orient": "right",
            "titleFontSize": 12,
            "labelFontSize": 10
          }
        },
        "tooltip": [
          {
            "field": "properties.dist_km",
            "type": "quantitative",
            "title": "Nearest Station (km)",
            "format": ".2f"
          }
        ]
      }
    },
    {
      "data": {"url": "js/data/annual_metropolitan_train_station_entries_fy_2024_2025.csv", "format": {"type": "csv"}},
      "mark": {"type": "circle", "color": "black", "size": 15, "opacity": 0.7},
      "encoding": {
        "longitude": {"field": "Stop_long", "type": "quantitative"},
        "latitude": {"field": "Stop_lat", "type": "quantitative"},
        "tooltip": [
          {"field": "Stop_name", "title": "Station"},
          {"field": "Pax_annual", "title": "Annual Passengers"}
        ]
      }
    }
  ],
  "config": {
    "view": {"stroke": "transparent"},
    "title": {"font": "sans-serif", "anchor": "start"}
  }
}
