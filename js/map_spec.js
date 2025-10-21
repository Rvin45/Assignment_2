export const map_spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 900,
  "height": 500,

  "params": [
    {
      "name": "zoom_level",
      "value": 47000,
      "bind": {
        "input": "range",
        "min": 40000,
        "max": 150000,
        "step": 1,
        "name": "Zoom: "
      }
    },
    {
      "name": "map_center",
      "value": "central",
      "bind": {
        "input": "select",
        "options": [
          "central",
          "south_east",
          "east",
          "north_east",
          "west",
          "north_west"
        ],
        "labels": [
          "Central Melbourne",
          "South East",
          "East",
          "North East",
          "West",
          "North West"
        ],
        "name": "Region: "
      }
    }
  ],

  "projection": {
    "type": "mercator",
    "center": {
      "expr": "map_center == 'south_east' ? [145.1, -37.95] : " +
              "map_center == 'east' ? [145.2, -37.85] : " +
              "map_center == 'north_east' ? [145.15, -37.7] : " +
              "map_center == 'west' ? [144.8, -37.8] : " +
              "map_center == 'north_west' ? [144.85, -37.7] : " +
              "[144.9631, -37.8136]"
    },
    "scale": {"expr": "zoom_level"}
  },

  "layer": [
    // ---- Victoria localities background ----
    {
      "data": {
        "url": "./js/data/clipped_map.json",
        "format": {"type": "topojson", "feature": "vic_localities"}
      },
      "mark": {"type": "geoshape", "fill": "lightgray", "stroke": "white"}
    },

    // ---- Metro train lines ----
    {
      "data": {
        "url": "./js/data/metro_train_line.json",
        "format": {"type": "topojson", "feature": "metro_train_lines_wrangled"}
      },
      "transform": [
        {
          "calculate": "datum.properties.SHORT_NAME == 'Replacement Bus' ? split(datum.properties.LONG_NAME, ' ')[0] : datum.properties.SHORT_NAME",
          "as": "Line"
        },
        {
          "calculate":
          "datum.Line == 'Frankston' || datum.Line == 'Williamstown' || datum.Line == 'Werribee' || datum.Line == 'Stony Point' ? 'Frankston|Williamstown|Werribee|Stony Point' :" +
          "datum.Line == 'Craigieburn' || datum.Line == 'Sunbury' || datum.Line == 'Upfield' ? 'Craigieburn|Sunbury|Upfield' :" +
          "datum.Line == 'Cranbourne' || datum.Line == 'Pakenham' ? 'Cranbourne|Pakenham' :" +
          "datum.Line == 'Hurstbridge' || datum.Line == 'Mernda' ? 'Hurstbridge|Mernda' :" +
          "datum.Line == 'Belgrave' || datum.Line == 'Lilydale' || datum.Line == 'Glen' || datum.Line == 'Alamein' ? 'Belgrave|Lilydale|Glen Waverley|Alamein' :" +
          "datum.Line == 'Sandringham' ? 'Sandringham' :" +
          "datum.Line == 'Flemington Racecourse' ? 'Flemington Racecourse' : 'Other'",
          "as": "ColorGroupKey"
        }
      ],
      "mark": {"type": "geoshape", "strokeWidth": 2, "fill": null},
      "encoding": {
        "stroke": {
          "field": "ColorGroupKey",
          "type": "nominal",
          "scale": {
            "domain": [
              "Belgrave|Lilydale|Glen Waverley|Alamein",
              "Craigieburn|Sunbury|Upfield",
              "Cranbourne|Pakenham",
              "Hurstbridge|Mernda",
              "Frankston|Williamstown|Werribee|Stony Point",
              "Sandringham",
              "Flemington Racecourse"
            ],
            "range": [
              "#152c6b",
              "#ffbe00",
              "#279fd5",
              "#be1014",
              "#028430",
              "#f178af",
              "#95979a"
            ]
          },
          "legend": {
            "title": "Train Lines",
            "orient": "right",
            "titleFontSize": 14,
            "labelFontSize": 12,
            "direction": "vertical",
            "labelLimit": 500,
            "labelExpr": "split(datum.label, '|')"
          }
        },
        "tooltip": [
          {"field": "Line", "type": "nominal", "title": "Train Line:"}
        ]
      }
    },

    // ---- Station passenger bubbles ----
    {
      "data": {"url": "./js/data/annual_metropolitan_train_station_entries_fy_2024_2025.csv"},
      "transform": [
        {"filter": "datum.Stop_long >= 144.67 && datum.Stop_long <= 145.35"},
        {"filter": "datum.Stop_lat >= -38.16 && datum.Stop_lat <= -37.54"}
      ],
      "mark": {"type": "circle", "opacity": 0.7, "fill": "#8f1a95"},
      "encoding": {
        "longitude": {"field": "Stop_long", "type": "quantitative"},
        "latitude": {"field": "Stop_lat", "type": "quantitative"},
        "size": {
          "field": "Pax_annual",
          "type": "quantitative",
          "scale": {"range": [30, 300]},
          "legend": {
            "title": "Annual Passengers (Millions)",
            "format": ".2s"
          }
        },
        "color": {"value": "steelblue"}, // ✅ unchanged color
        "tooltip": [
          {"title": "STATION INFORMATION", "value": ""},
          {"field": "Stop_name", "type": "nominal", "title": "Station"},
          {
            "field": "Pax_annual",
            "type": "quantitative",
            "title": "Annual Entries",
            "format": ".2s"
          }
        ]
      }
    }
  ]
};
