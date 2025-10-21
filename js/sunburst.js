export const sbSchema ={
  "$schema": "https://vega.github.io/schema/vega/v6.json",
  "description": "Income Sunburst (All Green Shades, Hollow Center, Working Legend and Caption).",
  "width": 500,
  "height": 500,
  "padding": {"top": 10, "left": 10, "right": 10, "bottom": 100},
  "autosize": "none",

  "data": [
    {
      "name": "tree",
      "values": [
        {"id": "Income", "parent": null},
        {"id": "Income.Government Funding", "parent": "Income"},
        {"id": "Income.Government Funding.Output Appropriations", "parent": "Income.Government Funding", "size": 5506520},
        {"id": "Income.Government Funding.Special Appropriations", "parent": "Income.Government Funding", "size": 621819},
        {"id": "Income.Grants", "parent": "Income"},
        {"id": "Income.Grants.General Purpose Grants", "parent": "Income.Grants", "size": 206396},
        {"id": "Income.Grants.Specific Purpose Grants - Projects & Infrastructure", "parent": "Income.Grants", "size": 138276},
        {"id": "Income.Commercial Income", "parent": "Income"},
        {"id": "Income.Commercial Income.Sale of Goods and Services", "parent": "Income.Commercial Income", "size": 122223},
        {"id": "Income.Commercial Income.Supply of Transport Services", "parent": "Income.Commercial Income", "size": 118947},
        {"id": "Income.Commercial Income.Service Concession Revenue", "parent": "Income.Commercial Income", "size": 216632},
        {"id": "Income.Commercial Income.Regulatory Fees, Fines & Licences", "parent": "Income.Commercial Income", "size": 627143}
      ],
      "transform": [
        {"type": "stratify", "key": "id", "parentKey": "parent"},
        {
          "type": "partition",
          "field": "size",
          "size": [{"signal": "2 * PI"}, {"signal": "width / 2"}],
          "as": ["a0", "r0", "a1", "r1", "depth", "value"]
        },
        {
          "type": "formula",
          "as": "group",
          "expr": "indexof(datum.id,'Government Funding')>=0?'Government Funding':indexof(datum.id,'Grants')>=0?'Grants':'Commercial Income'"
        },
        {
          "type": "formula",
          "as": "name",
          "expr": "replace(datum.id,'Income.','')"
        },
        {
          "type": "formula",
          "as": "pct",
          "expr": "datum.size ? round(datum.size/7760976*1000)/10 : ''"
        }
      ]
    },
    {
      "name": "legend_data",
      "values": [
        {"category": "Government Funding"},
        {"category": "Grants"},
        {"category": "Commercial Income"}
      ]
    }
  ],

  "scales": [
    {
      "name": "color",
      "type": "ordinal",
      "domain": ["Government Funding", "Grants", "Commercial Income"],
      "range": ["#00441b", "#1b7837", "#a6dba0"]
    }
  ],
  "legends": [
  {
    "fill": "color",
    "title": "Major Income Categories",
    "orient": "bottom",
    "direction": "horizontal",
    "labelFontSize": 12,
    "titleFontSize": 13,
    "symbolSize": 200,
    "symbolType": "circle",
    "padding": 10,
    "dy": -20
  }
],

  "marks": [
    {
      "type": "arc",
      "from": {"data": "tree"},
      "encode": {
        "enter": {
          "x": {"signal": "width/2"},
          "y": {"signal": "height/2"},
          "fill": {"scale": "color", "field": "group"},
          "tooltip": {
            "signal": "datum.name + (datum.size ? ': $' + format(datum.size, ',') + 'k (' + datum.pct + '%)' : '')"
          }
        },
        "update": {
          "startAngle": {"field": "a0"},
          "endAngle": {"field": "a1"},
          "innerRadius": {"signal": "datum.depth == 0 ? 0 : datum.r0"},
          "outerRadius": {"field": "r1"},
          "stroke": {"value": "white"},
          "strokeWidth": {"value": 0.7}
        },
        "hover": {
          "stroke": {"value": "#004d26"},
          "strokeWidth": {"value": 2}
        }
      }
    },
    {
      "type": "text",
      "encode": {
        "enter": {
          "x": {"signal": "width/2"},
          "y": {"signal": "height/2"},
          "align": {"value": "center"},
          "baseline": {"value": "middle"},
          "text": {"value": "INCOME 2022 $7.76B"},
          "fontSize": {"value": 15},
          "fontWeight": {"value": "bold"},
          "fill": {"value": "black"}
        }
      }
    },
        {
      "type": "text",
      "encode": {
        "enter": {
          "x": {"signal": "width/1.5"},
          "y": {"signal": "height/1.5 + 20"},
          "align": {"value": "center"},
          "baseline": {"value": "middle"},
          "text": {"value": "Government Funding: $6.1B"},
          "fontSize": {"value": 13},
          "fontWeight": {"value": "bold"},
          "fill": {"value": "white"}
        }
      }
    },

            {
      "type": "text",
      "encode": {
        "enter": {
          "x": {"signal": "width/3.1 + 20"},
          "y": {"signal": "height/3.6"},
          "align": {"value": "center"},
          "baseline": {"value": "middle"},
          "text": {"value": "Commercial: $1.1B"},
          "fontSize": {"value": 12},
          "fontWeight": {"value": "bold"},
          "fill": {"value": "black"}
        }
      }
    },
                {
      "type": "text",
      "encode": {
        "enter": {
          "x": {"signal": "width/5"},
          "y": {"signal": "height/3"},
          "align": {"value": "center"},
          "baseline": {"value": "middle"},
          "text": {"value": "Grant: $0.3B"},
          "fontSize": {"value": 13},
          "fontWeight": {"value": "bold"},
          "fill": {"value": "white"}
        }
      }
    },
    {
      "type": "text",
      "from": {"data": "tree"},
      "encode": {
        "enter": {
          "x": {"signal": "width/2"},
          "y": {"signal": "height/2"},
          "radius": {"signal": "(datum.r0 + datum.r1)/2"},
          "theta": {"signal": "(datum.a0 + datum.a1)/2"},
          "text": {"signal": "datum.pct ? datum.pct + '%' : ''"},
          "fill": {"value": "#ffffff"},
          "fontSize": {"value": 11},
          "align": {"value": "center"},
          "baseline": {"value": "middle"}
        }
      }
    },
  ]
}
