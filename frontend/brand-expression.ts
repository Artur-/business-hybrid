import { LitElement, customElement, html, property, css } from "lit-element";

@customElement("brand-expression")
export class BrandExpression extends LitElement {
  @property()
  text: string = "";

  static get styles() {
    return css`
      .brand-expression {
        align-items: center;
        box-shadow: inset 0 -1px var(--lumo-contrast-10pct);
        box-sizing: border-box;
        display: flex;
        /* Application header height with tabs */
        height: calc(var(--app-bar-height) + var(--lumo-size-l));
        justify-content: center;
        padding: var(--lumo-space-m);
      }

      .brand-expression__logo {
        max-height: 100%;
        max-width: 100%;
      }

      .brand-expression__title {
        margin-left: var(--lumo-space-s);
      }
    `;
  }
  render() {
    return html`
      <div class="brand-expression">
        <img
          class="brand-expression__logo"
          src="images/logos/18.png"
          alt="${this.text} logo"
        />
        <label class="h3 brand-expression__title">${this.text}</label>
      </div>
    `;
  }
}
