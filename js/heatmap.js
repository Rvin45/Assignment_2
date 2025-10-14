export const heatmapSchema = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Heatmap of Melbourne Metro train frequency by hour and line.",
  "width": 600,
  "height": 400,
  "data": { "url": "./js/data/6Feb2020_data.csv" },
  "transform": [
    {
      "calculate": "hours(toDate('1970-01-01T' + datum.Departure_Time_Scheduled))",
      "as": "Hour"
    },
    {
      "aggregate": [
        { "op": "count", "field": "Passenger_Boardings", "as": "Train_Count" }
      ],
      "groupby": ["Line_Name", "Hour"]
    }
  ],
  "mark": "rect",
  "encoding": {
    "x": { "field": "Hour", "type": "ordinal", "title": "Hour of Day", "axis": { "labelAngle": 0 } },
    "y": { "field": "Line_Name", "type": "nominal", "title": "Train Line", "sort": "-x" },
    "color": {
      "field": "Train_Count",
      "type": "quantitative",
      "title": "Number of Trains",
      "scale": { "scheme": "viridis" }
    },
    "tooltip": [
      { "field": "Line_Name", "type": "nominal", "title": "Line" },
      { "field": "Hour", "type": "ordinal", "title": "Hour" },
      { "field": "Train_Count", "type": "quantitative", "title": "Train Count" }
    ]
  },
  "config": { "view": { "stroke": "transparent" }, "axis": { "grid": false } }
};
