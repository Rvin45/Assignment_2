export const year_switch_spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Switch between a line chart for all years and a bar chart for a selected year.",
  "width": 800,
  "height": 500,
  "data": { "url": "./js/data/combined_passenger_summary_2018_2025.csv"},

  // -----------------------------
  // 1️⃣  Dropdown parameter
  // -----------------------------
  "params": [
    {
      "name": "selected_year",
      "value": "All Years",     // default
      "bind": {
        "input": "select",
        "options": ["All Years", "FY18-19", "FY19-20", "FY20-21", "FY21-22", "FY22-23", "FY23-24", "FY24-25"],
        "name": "Select Year: "
      }
    }
  ],

  // -----------------------------
  // 2️⃣  Two layered charts
  // -----------------------------
  "layer": [
    // 3️⃣ Legend layer (always visible)
{
  "mark": {"type": "point", "opacity": 0},   // invisible points
  "encoding": {
    "color": {
      "field": "Time_Category",
      "type": "nominal",
      "title": "Time",
      "scale": {
        "domain": [
          "Morning Peak","Evening Peak","Late Evening",
          "Weekday","School Holidays",
        "Sunday","Annual"
        ],
        "range": [
          "#152c6b","#ffbe00","#279fd5",
          "#be1014","#028430","#f178af","#95979a","#b0b0b0"
        ]
      },
      "legend": {
        "orient": "right",
        "titleFontSize": 14,
        "labelFontSize": 12
      }
    }
  }
},
// Annotation layer (only visible in line chart mode)
{
  "transform": [
    {"filter": "selected_year == 'All Years'"}
  ],
  "mark": {
    "type": "rule",    
    "strokeDash": [4,4],
    "opacity":0.7,
    "color": "gray",
    "size": 2
  },
  "encoding": {
    "x": {"datum": "FY20-21"}   // the year when the dip happened
  }
},
{
  "transform": [
    {"filter": "selected_year == 'All Years'"}
  ],
  "mark": {
    "type": "text",
    "align": "left",
    "dx": 5,
    "dy": -10,
    "color": "black",
    "fontSize": 16,
  },
  "encoding": {
    "x": {"datum": "FY20-21"},
    "y": {"datum": 500000},       // adjust based on your data scale
    "text": {"value": "Drop due to COVID-19"}
  }
},



    // Line chart (only when "All Years" selected)
    {
      "transform": [
        { "filter": "selected_year == 'All Years'" }
      ],
      "mark": { "type": "line", "point": { "filled": true, "size": 60 } },
      "encoding": {
        "x": {
          "field": "Fin_year",
          "type": "ordinal",
          "title": "Financial Year",
          "axis": { "labelAngle": 0 }
        },
        "y": {
          "field": "Passenger_Count",
          "type": "quantitative",
          "title": "Passenger Count"
        },
        "color": {
          "field": "Time_Category",
          "type": "nominal",
          "title": "",
          "scale": {
            "domain": [
              "Morning Peak","Evening Peak","Late Evening",
              "Weekday","Weekday",
              "Sunday","Annual"
            ],
            "range": [
              "#152c6b","#ffbe00","#279fd5",
              "#be1014","#028430","#f178af","#95979a","#b0b0b0"
            ]
          }
        },
        "tooltip": [
          {"field": "Fin_year", "title": "Financial Year"},
          {"field": "Time_Category", "title": "Category"},
          {"field": "Passenger_Count", "title": "Passengers", "format": ","}
        ]
      }
    },

    // Bar chart (only when a specific year selected)
    {
      "transform": [
        { "filter": "selected_year != 'All Years'" },
        { "filter": "datum.Fin_year == selected_year" }
      ],
      "mark": { "type": "bar", "tooltip": true },
      "encoding": {
        "x": {
          "field": "Time_Category",
          "type": "nominal",
          "title": "Passenger Type",
          "sort": [
            "Morning Peak","Evening Peak","Late Evening",
            "Weekday","School Holidays",
            "Saturday","Sunday","Annual"
          ]
        },
        "y": {
          "field": "Passenger_Count",
          "type": "quantitative",
          "title": "Passenger Count"
        },
        "color": {
          "field": "Time_Category",
          "type": "nominal",
          "legend": null,
          "scale": {
            "domain": [
              "Morning Peak","Evening Peak","Late Evening",
              "Weekday","School Holidays",
              "Sunday","Annual"
            ],
            "range": [
              "#152c6b","#ffbe00","#279fd5",
              "#be1014","#028430","#f178af","#95979a","#b0b0b0"
            ]
          }
        },
        "tooltip": [
          {"field": "Fin_year", "title": "Financial Year"},
          {"field": "Time_Category", "title": "Category"},
          {"field": "Passenger_Count", "title": "Passengers", "format": ","}
        ]
      }
    }
  ],

  // -----------------------------
  // 3️⃣  Config
  // -----------------------------
  "config": {
    "axis": { "labelFontSize": 12, "titleFontSize": 14 },
  }
};
