import "@vaadin/vaadin-lumo-styles";
import '@vaadin/vaadin-lumo-styles/badge';

import { unsafeCSS, css } from "lit-element";

let globalStyles = "";
globalStyles += require("./styles/styles.css").default;
globalStyles += require("./styles/lumo/typography.css").default;
globalStyles += require("./styles/lumo/border-radius.css").default;
globalStyles += require("./styles/lumo/icon-size.css").default;
globalStyles += require("./styles/lumo/margin.css").default;
globalStyles += require("./styles/lumo/padding.css").default;
globalStyles += require("./styles/lumo/shadow.css").default;
globalStyles += require("./styles/lumo/spacing.css").default;
globalStyles += require("./styles/misc/box-shadow-borders.css").default;

const globalCss = css`
  ${unsafeCSS(globalStyles)}
`;

const registerGlobalStyles = () => {
  const cs = document.createElement("custom-style");
  const s = document.createElement("style");
  s.setAttribute("include", "lumo-badge");
  s.innerHTML = globalStyles;
  cs.appendChild(s);
  document.head.appendChild(cs);
};

export { globalCss, registerGlobalStyles };
