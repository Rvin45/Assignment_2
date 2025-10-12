import { map_spec } from "./map_spec.js";
import { lc_spec } from "./linechart_spec.js";

import { year_switch_spec } from "./changing_bar_line.js";
vegaEmbed('#map_vis', map_spec).catch(console.error);
vegaEmbed('#blc_vis', year_switch_spec).catch(console.error);