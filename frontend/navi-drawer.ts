import {
  LitElement,
  customElement,
  html,
  css,
  query,
  property
} from "lit-element";
//@ts-ignore
import { addSwipeAway } from "./swipe-away";
import "./brand-expression";

@customElement("navi-drawer")
export class NaviDrawer extends LitElement {
  @query(".navi-drawer__content")
  mainContent: any;
  @query(".navi-drawer__scrim")
  scrim: any;
  @property({ type: Boolean })
  open: boolean = false;
  @property()
  railButtonText: string = "Collapse";
  @property()
  railButtonIcon: string = "vaadin:chevron-left-small";
  @property()
  railButtonAriaLabel: string = "Collapse menu";
  railMode: boolean = false;

  static get styles() {
    return css`
      .navi-drawer {
        z-index: 2;
        height: 100%;
      }

      .navi-drawer[open] + * {
        pointer-events: none;
      }

      /* Scrim */
      .navi-drawer__scrim {
        animation: var(--transition-duration-m) lumo-overlay-backdrop-enter both;
        background-color: var(--lumo-shade-20pct);
        bottom: 0;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        width: 100%;
        will-change: opacity;
      }

      /* Content */
      .navi-drawer__content {
        background-color: var(--lumo-base-color);
        box-shadow: var(--lumo-box-shadow-s);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
        transition: margin var(--transition-duration-m);
        width: var(--navi-drawer-width);
        z-index: 2;
      }

      /* Search */
      .navi-drawer vaadin-text-field {
        box-shadow: inset 0 -1px var(--lumo-contrast-10pct);
        box-sizing: border-box;
        padding: var(--lumo-space-m);
        width: 100%;
      }

      /* Scrollable area */
      .navi-drawer__scroll-area {
        box-shadow: inset 0 -1px var(--lumo-contrast-10pct);
        flex: 1;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }

      /* Footer button */
      .navi-drawer__footer {
        border-radius: 0;
        margin-bottom: 0;
        margin-top: auto;
        min-width: 0;
      }

      /* Rail navigation */
      .navi-drawer[rail]:not([open]) .navi-drawer__content {
        left: 0;
        overflow: hidden;
        position: absolute;
        top: 0;
        transition: width var(--transition-duration-s);
        width: var(--navi-drawer-rail-width);
      }

      .navi-drawer[rail]:not([open]):hover .navi-drawer__content {
        width: var(--navi-drawer-width);
      }

      /* Push the content in rail mode. */
      .navi-drawer[rail]:not([open]) + .root__column {
        padding-left: var(--navi-drawer-rail-width);
      }

      @media (max-width: 1023px) {
        /* Show scrim when drawer is open */
        .navi-drawer[open] .navi-drawer__scrim {
          opacity: 1;
          pointer-events: all;
        }

        /* Don't push the content in rail mode on narrow viewports. */
        .navi-drawer[rail]:not([open]) + .root__column {
          padding-left: 0;
        }

        /* Fixed positioning on narrow viewports. */
        .navi-drawer__content {
          bottom: 0;
          position: absolute;
          top: 0;
        }

        /* Push the drawer out of view */
        .navi-drawer:not([open]) .navi-drawer__content {
          margin-left: calc(var(--navi-drawer-width) * -1.2);
        }

        /* Hide the footer */
        .navi-drawer__footer {
          display: none;
        }
      }

      @media (min-width: 1024px) {
        .navi-drawer[rail]:not([open]):not(:hover) .account-switcher__avatar,
        .navi-drawer[rail]:not([open]):not(:hover) .navi-item__link iron-icon {
          margin-left: auto;
          margin-right: auto;
        }

        .navi-drawer[rail]:not([open]):not(:hover) .account-switcher__title,
        .navi-drawer[rail]:not([open]):not(:hover) .account-switcher__email,
        .navi-drawer[rail]:not([open]):not(:hover) .brand-expression__title,
        .navi-drawer[rail]:not([open]):not(:hover) .navi-item[level],
        .navi-drawer[rail]:not([open]):not(:hover) .navi-item__link span,
        .navi-drawer[rail]:not([open]):not(:hover) .navi-item vaadin-button {
          display: none;
        }

        .navi-drawer[rail]:not([open]):not(:hover)
          .navi-drawer__footer
          iron-icon {
          margin-left: 0.25em;
          margin-right: -0.25em;
          width: var(--navi-drawer-rail-width);
        }
      }
    `;
  }
  render() {
    return html`
      <div class="navi-drawer" ?open="${this.open}">
        <div class="navi-drawer__scrim" @click="${() => this._close()}"></div>
        <div class="navi-drawer__content">
          <brand-expression text="Client-Side-Views"></brand-expression>
          <div class="navi-drawer__scroll-area">
            <slot></slot>
          </div>
          <vaadin-button
            id="railButton"
            class="navi-drawer__footer"
            theme="small"
            aria-label="${this.railButtonAriaLabel}"
            @click="${() => this._toggleRailMode()}"
            ><iron-icon slot="prefix" icon="${this.railButtonIcon}"></iron-icon
            >${this.railButtonText}</vaadin-button
          >
        </div>
      </div>
    `;
  }

  firstUpdated(_changedProperties: Map<string | number | symbol, unknown>) {
    super.firstUpdated(_changedProperties);
    addSwipeAway(
      this.mainContent,
      () => {
        this._close();
      },
      this.scrim
    );
  }

  toggle() {
    if (this.open) {
      this._close();
    } else {
      this._open();
    }
  }

  _open() {
    this.open = true;
  }

  _close() {
    this.open = false;
    this._applyIOS122Workaround();
  }

  _applyIOS122Workaround() {
    // iOS 12.2 sometimes fails to animate the menu away.
    // It should be gone after 240ms
    // This will make sure it disappears even when the browser fails.
    var originalStyle = getComputedStyle(this.mainContent).transitionProperty;
    setTimeout(() => {
      this.mainContent.style.transitionProperty = "padding";
      requestAnimationFrame(() => {
        this.mainContent.style.transitionProperty = originalStyle;
      });
    }, 250);
  }

  _toggleRailMode() {
    if (this.railMode) {
      this.railMode = false;
      this.railButtonIcon = "vaadin:chevron-left-small";
      this.railButtonText = "Collapse";
      this.railButtonAriaLabel = "Collapse menu";
    } else {
      this.railMode = true;
      this.railButtonIcon = "vaadin:chevron-right-small";
      this.railButtonText = "Expand";
      this.railButtonAriaLabel = "Expand menu";
      var originalStyle = getComputedStyle(this).pointerEvents;
      this.style.pointerEvents = "none";

      setTimeout(() => {
        this.style.pointerEvents = originalStyle;
      }, 170);
    }
  }
}
