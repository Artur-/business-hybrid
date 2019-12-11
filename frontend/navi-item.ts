import { customElement, html, LitElement, property } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import "./navi-item";
import { MenuItem } from "./navi-menu";

@customElement("navi-item")
export class NaviItem extends LitElement {
  @property()
  _item: MenuItem = { text: "" };
  @property({ type: Number })
  level?: number;
  @property({ type: Boolean })
  expanded: boolean = false;

  set item(item) {
    this._item = item;
    this.requestUpdate("item"); // This is needed to update the expand/collapse icon
  }
  get item() {
    return this._item;
  }
  createRenderRoot() {
    // Render without shadow root
    return this;
  }
  render() {
    return html`
      <div class="navi-item" level="${ifDefined(this.level)}">
        <a class="navi-item__link" href="${ifDefined(this.item.path)}">
          ${this.item.icon
            ? html`
                <iron-icon icon="${this.item.icon}"></iron-icon>
              `
            : ``}
          <span>${this.item.text}</span></a
        >
        <vaadin-button
          ?hidden="${this.item.path !== undefined}"
          theme="small icon tertiary"
          aria-label="${this.item.expanded ? "Collapse" : "Expand"} ${this.item
            .text}"
          tabindex="0"
          role="button"
          ><iron-icon
            icon="${this.item.expanded
              ? "vaadin:caret-down"
              : "vaadin:caret-up"}"
            slot="prefix"
          ></iron-icon
        ></vaadin-button>
      </div>
    `;
  }
}
