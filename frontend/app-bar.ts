import { LitElement, customElement, html, css } from "lit-element";
import { CSSModule } from "./css-utils";

@customElement("app-bar")
export class AppBar extends LitElement {
  static get styles() {
    return [
      CSSModule("lumo-color"),
      css`
        .app-bar {
          background-color: var(--lumo-base-color);
          box-shadow: var(--lumo-box-shadow-s);
          flex-direction: column;
          position: relative;
          z-index: 1;
        }

        /* Container */
        .app-bar__container {
          padding-left: var(--lumo-space-r-l);
          padding-right: var(--lumo-space-r-l);
          transition: padding var(--transition-duration-m);
        }

        /* Navi icon */
        .app-bar__navi-icon,
        .app-bar__context-icon {
          margin-bottom: calc(
            (var(--app-bar-height) - var(--lumo-icon-size-m)) / 2
          );
          margin-right: var(--lumo-space-l);
          margin-top: calc(
            (var(--app-bar-height) - var(--lumo-icon-size-m)) / 2
          );
        }

        /* Title */
        .app-bar__title {
          flex-grow: 1;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .app-bar__title:not(:empty) {
          margin-bottom: calc(
            (
                var(--app-bar-height) -
                  (var(--lumo-font-size-l) * var(--lumo-line-height-xs))
              ) / 2
          );
          margin-top: calc(
            (
                var(--app-bar-height) -
                  (var(--lumo-font-size-l) * var(--lumo-line-height-xs))
              ) / 2
          );
        }

        /* Action items */
        .app-bar__action-items > *:not(:last-child) {
          margin-right: var(--lumo-space-s);
        }

        /* Search */
        .app-bar vaadin-text-field {
          padding-bottom: 0;
          padding-top: 0;
        }

        /* Avatar */
        .app-bar__avatar {
          border-radius: 100%;
          flex-shrink: 0;
          height: var(--lumo-size-s);
          margin-left: var(--lumo-space-m);
          width: var(--lumo-size-s);
        }

        /* Tabs */
        .app-bar__tab-container {
          padding-left: var(--lumo-space-r-l);
          padding-right: var(--lumo-space-r-l);
        }

        .app-bar__tabs {
          box-shadow: none;
        }

        .app-bar__tab vaadin-button {
          margin-bottom: 0;
          margin-left: var(--lumo-space-s);
          margin-top: 0;
        }

        .app-bar__add-tab {
          flex-shrink: 0;
        }

        /* Hide the menu button on 'wide' viewports */
        @media (min-width: 1024px) {
          .app-bar__navi-icon {
            display: none;
          }
        }
      `
    ];
  }
  render() {
    return html`
      <div class="app-bar" theme="dark" style="display: flex;">
        <div
          class="app-bar__container"
          style="display: flex; align-items: center;"
        >
          <vaadin-button
            class="app-bar__navi-icon"
            theme="tertiary-inline icon"
            aria-label="Menu"
            tabindex="0"
            role="button"
            style="line-height: 1;"
            ><iron-icon
              icon="vaadin:menu"
              slot="prefix"
            ></iron-icon></vaadin-button
          ><vaadin-button
            hidden="true"
            tabindex="0"
            role="button"
          ></vaadin-button>
          <h4 class="app-bar__title">Home</h4>
          <vaadin-text-field hidden="true" tabindex="0"></vaadin-text-field>
          <div hidden="true"></div>
          <img
            class="app-bar__avatar"
            src="images/avatar.png"
            alt="User menu"
          />
        </div>
        <div
          class="app-bar__tab-container"
          style="display: flex; align-items: center;"
        >
          <vaadin-tabs
            hidden="true"
            selected="0"
            orientation="horizontal"
            role="tablist"
          ></vaadin-tabs
          ><vaadin-button
            hidden="true"
            tabindex="0"
            role="button"
          ></vaadin-button>
        </div>
      </div>
    `;
  }
}
