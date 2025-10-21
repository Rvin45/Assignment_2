export const flowSchema = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Flow map of Melbourne train movements by line",
  "width": 800,
  "height": 600,
  "projection": {"type": "mercator"},
  "data": {
    "url": "/js/data/6Feb2020_data.csv"  // your CSV file
  },
  "transform": [
    {
      "lookup": "Origin_Station",
      "from": {
        "data": {"url": "/js/data/6Feb2020_data.csv"},
        "key": "Station_Name",
        "fields": ["Station_Latitude", "Station_Longitude"]
      },
      "as": ["origin_lat", "origin_lon"]
    },
    {
      "lookup": "Destination_Station",
      "from": {
        "data": {"url": "/js/data/6Feb2020_data.csv"},
        "key": "Station_Name",
        "fields": ["Station_Latitude", "Station_Longitude"]
      },
      "as": ["dest_lat", "dest_lon"]
    }
  ],
  "layer": [
    {
      "mark": {"type": "rule", "strokeOpacity": 0.3},
      "encoding": {
        "longitude": {"field": "origin_lon", "type": "quantitative"},
        "latitude": {"field": "origin_lat", "type": "quantitative"},
        "longitude2": {"field": "dest_lon"},
        "latitude2": {"field": "dest_lat"},
        "color": {"field": "Line_Name", "type": "nominal", "legend": {"title": "Train Line"}},
        "size": {"field": "Passenger_Boardings", "type": "quantitative", "title": "Passenger Flow"}
      }
    }
  ]
};
vegaEmbed('#flow_vis', flowSchema);
