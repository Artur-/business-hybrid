import { LitElement, customElement, css, html } from "lit-element";
import "./navi-drawer";
import "./app-bar";

@customElement("main-layout")
export class MainLayout extends LitElement {
  static get styles() {
    return css`
      .root {
        background-color: var(--lumo-contrast-5pct);
      }

      .app-header-outer,
      .app-footer-outer {
        z-index: 3;
      }
      ::slotted(*) {
        width: 100%;
        overflow-y: auto;
      }
    `;
  }

  render() {
    return html`
      <div
        class="root"
        style="flex-direction: column; display: flex; width: 100%; height: 100%;"
      >
        <div
          class="root__row"
          style="overflow: hidden; display: flex; flex-grow: 1;"
        >
          <navi-drawer></navi-drawer>

          <div
            class="root__column"
            style="flex-direction: column; overflow: hidden; display: flex; flex-grow: 1;"
          >
            <div class="app-header-inner">
              <app-bar></app-bar>
            </div>
            <div
              class="root__view-container"
              style="overflow: hidden; display: flex; flex-grow: 1;"
            >
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
