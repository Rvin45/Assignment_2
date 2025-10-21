export const sbOutcome = {
  "$schema": "https://vega.github.io/schema/vega/v6.json",
  "description": "Expenses Sunburst (All Red Shades, Hollow Center, Working Legend and Caption).",
  "width": 500,
  "height": 500,
  "padding": {"top": 10, "left": 10, "right": 10, "bottom": 100},

  "autosize": "none",

  "data": [
    {
      "name": "tree",
      "values": [
        {"id": "Expenses", "parent": null},
        {"id": "Expenses.Operating", "parent": "Expenses"},
        {"id": "Expenses.Operating.Payments to Suppliers and Employees", "parent": "Expenses.Operating", "size": 3347607},
        {"id": "Expenses.Operating.Payments of Grants and Transfers", "parent": "Expenses.Operating", "size": 1201860},
        {"id": "Expenses.Operating.Public Transport Service Providers", "parent": "Expenses.Operating", "size": 3369548},
        {"id": "Expenses.Operating.Interest and Financing Costs", "parent": "Expenses.Operating", "size": 170495},
        {"id": "Expenses.Investing", "parent": "Expenses"},
        {"id": "Expenses.Investing.Property, Plant and Equipment", "parent": "Expenses.Investing", "size": 9352370},
        {"id": "Expenses.Investing.Intangible Assets", "parent": "Expenses.Investing", "size": 49131},
        {"id": "Expenses.Financing", "parent": "Expenses"},
        {"id": "Expenses.Financing.Capital Contribution to Portfolio Entities", "parent": "Expenses.Financing", "size": 413394},
        {"id": "Expenses.Financing.Repayment of Borrowings", "parent": "Expenses.Financing", "size": 1657565}
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
          "expr": "indexof(datum.id,'Operating')>=0?'Operating':indexof(datum.id,'Investing')>=0?'Investing':'Financing'"
        },
        {
          "type": "formula",
          "as": "name",
          "expr": "replace(datum.id,'Expenses.','')"
        },
        {
          "type": "formula",
          "as": "pct",
          "expr": "datum.size ? round(datum.size/20425500*1000)/10 : ''"
        }
      ]
    },
    {
      "name": "legend_data",
      "values": [
        {"category": "Operating"},
        {"category": "Investing"},
        {"category": "Financing"}
      ]
    }
  ],

  "scales": [
    {
      "name": "color",
      "type": "ordinal",
      "domain": ["Operating", "Investing", "Financing"],
      "range": ["#67000d", "#cb181d", "#fcbba1"]
    }
  ],

  "legends": [
    {
      "fill": "color",
      "title": "Major Expense Categories",
      "orient": "bottom",
      "direction": "horizontal",
      "labelFontSize": 12,
      "titleFontSize": 13,
      "symbolSize": 200,
      "symbolType": "circle",
      "padding": 10
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
          "stroke": {"value": "#7a000d"},
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
          "text": {"value": "SPENDING 2022 $20.43B"},
          "fontSize": {"value": 13},
          "fontWeight": {"value": "bold"},
          "fill": {"value": "black"}
        }
      }
    },

        {
      "type": "text",
      "encode": {
        "enter": {
          "x": {"signal": "width/1.2-30"},
          "y": {"signal": "height/2.5"},
          "align": {"value": "center"},
          "baseline": {"value": "middle"},
          "text": {"value": "Operations:$8B"},
          "fontSize": {"value": 14},
          "fontWeight": {"value": "bold"},
          "fill": {"value": "white"}
        }
      }
    },

{
      "type": "text",
      "encode": {
        "enter": {
          "x": {"signal": "width/2.5"},
          "y": {"signal": "height/4.2"},
          "align": {"value": "center"},
          "baseline": {"value": "middle"},
          "text": {"value": "Financing:$2.6B"},
          "fontSize": {"value": 13},
          "fontWeight": {"value": "bold"},
          "fill": {"value": "black"}
        }
      }
    },


            {
      "type": "text",
      "encode": {
        "enter": {
          "x": {"signal": "width/4"},
          "y": {"signal": "height/1.6"},
          "align": {"value": "center"},
          "baseline": {"value": "middle"},
          "text": {"value": "Investing:$9.4B"},
          "fontSize": {"value": 14},
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
    ,
{
  "type": "group",
  "encode": {
    "enter": {
      "x": {"signal": "width/2"},
      "y": {"signal": "height - 20"}
    }
  }
}

  ]
}
