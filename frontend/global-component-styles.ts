import {
  registerStyles,
  css
  //@ts-ignore
} from "@vaadin/vaadin-themable-mixin/register-styles.js";
import { unsafeCSS } from "lit-element";

registerStyles(
  "vaadin-chart",
  css`
    ${unsafeCSS(require("./styles/components/charts.css").default)}
  `,
  { include: ["vaadin-chart-default-theme"] }
);
registerStyles(
  "vaadin-button",
  css`
    ${unsafeCSS(
      require("./styles/components/floating-action-button.css").default
    )}
  `
);
registerStyles(
  "vaadin-grid",
  css`
    ${unsafeCSS(require("./styles/components/grid.css").default)}
  `
);
registerStyles(
  "lumo-badge",
  css`
    ${unsafeCSS(require("./styles/styles.css").default)}
  `
);
