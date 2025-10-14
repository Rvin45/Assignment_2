import { map_spec } from "./map_spec.js";
import { lc_spec } from "./linechart_spec.js";
import { year_switch_spec } from "./changing_bar_line.js";
import { heatmapSchema } from "./heatmap.js";
import { isotypeSchema } from "./isotype.js";
vegaEmbed('#map_vis', map_spec).catch(console.error);
vegaEmbed('#blc_vis', year_switch_spec).catch(console.error);

vegaEmbed('#hm_vis', heatmapSchema).catch(console.error)

vegaEmbed('#isotype_vis',isotypeSchema).catch(console.error)