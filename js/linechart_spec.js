export const lc_spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "Interactive line chart showing annual passenger counts by time category.",
    "width": 800,
    "height": 500,
    "data": {"url": "./js/data/combined_passenger_summary_2018_2025.csv"},
    
    "transform": [
    {"calculate": "replace(datum.Fin_year, 'FY', '')", "as": "YearLabel"}
    ],

    "mark": {
    "type": "line",
    "point": {"filled": true, "size": 80}
    },

    "encoding": {
    "x": {
        "field": "YearLabel",
        "type": "ordinal",
        "title": "Financial Year",
        "axis": {"labelAngle": 0}
    },
    "y": {
        "field": "Passenger_Count",
        "type": "quantitative",
        "title": "Passenger Count"
    },
    "color": {
        "field": "Time_Category",
        "type": "nominal",
        "title": "Passenger Type"
    },
    "tooltip": [
        {"field": "Fin_year", "title": "Financial Year"},
        {"field": "Time_Category", "title": "Category"},
        {"field": "Passenger_Count", "title": "Passengers", "format": ","}
    ]
    },

    "params": [
    {
        "name": "hover",
        "select": {"type": "point", "on": "mouseover", "clear": "mouseout"},
        "bind": "legend"
    }
    ],

    "encodingHover": {
    "opacity": {"condition": {"param": "hover", "value": 1}, "value": 0.2}
    },

    "config": {
    "legend": {
        "orient": "right",
        "titleFontSize": 14,
        "labelFontSize": 12,
    },
    "axis": {"labelFontSize": 12, "titleFontSize": 14}
    }
};
