import { css, customElement, html, LitElement, property } from "lit-element";
import { globalCss } from "./global-styles";
import "./navi-item";
import "@vaadin/vaadin-icons";
import "@vaadin/vaadin-button";
import { router } from "./index";

export interface MenuItem {
  path?: string;
  icon?: string;
  text: string;
  children?: MenuItem[];
  expanded?: boolean;
  highlight?: boolean;
}

@customElement("navi-menu")
export class NaviMenu extends LitElement {
  @property({ type: Array })
  items: MenuItem[] = [
    {
      path: "",
      icon: "vaadin:home",
      text: "Home"
    },
    {
      path: "accounts",
      icon: "vaadin:institution",
      text: "Accounts"
    },
    {
      path: "payments",
      icon: "vaadin:credit-card",
      text: "Payments"
    },
    {
      path: "statistics",
      icon: "vaadin:chart",
      text: "Statistics"
    },
    {
      icon: "vaadin:users",
      text: "Personnel",
      expanded: true,
      children: [
        {
          path: "accountants",
          text: "Accountants"
        },
        {
          path: "managers",
          text: "Managers"
        }
      ]
    }
  ];
  static get styles() {
    return [
      globalCss,
      css`
        .navi-menu {
          margin-bottom: var(--lumo-space-s);
          margin-top: var(--lumo-space-s);
        }

        .navi-item {
          align-items: center;
          display: flex;
          font-size: var(--lumo-font-size-s);
          font-weight: 600;
          height: var(--lumo-size-l);
          transition: background-color var(--transition-duration-s);
        }

        /* Sub items */
        .navi-item[level] {
          font-size: var(--lumo-font-size-xs);
          font-weight: normal;
          height: var(--lumo-size-m);
        }

        .navi-item[level="1"] span {
          font-weight: 500;
          margin-left: var(--navi-item-indentation);
        }

        .navi-item[level="2"] span {
          font-weight: 400;
          margin-left: calc(var(--navi-item-indentation) + var(--lumo-space-m));
        }

        .navi-item[level="3"] span {
          font-weight: 300;
          margin-left: calc(
            var(--navi-item-indentation) + calc(var(--lumo-space-m) * 2)
          );
        }

        /* Hover */
        .navi-item:hover {
          background-color: var(--lumo-contrast-10pct);
        }

        .navi-item__link:hover {
          text-decoration: none;
        }

        /* Active */
        .navi-item:active {
          background-color: var(--lumo-contrast-20pct);
        }

        /* Link */
        .navi-item__link {
          align-items: center;
          display: flex;
          flex-grow: 1;
          height: 100%;
          overflow: hidden;
          padding-left: var(--lumo-space-m);
          padding-right: var(--lumo-space-m);
        }

        /* Highlight */
        .navi-item__link[highlight] {
          background-color: var(--lumo-primary-color-10pct);
        }

        .navi-item__link:not([highlight]) {
          color: var(--lumo-body-text-color);
        }

        .navi-item__link:not([highlight]) iron-icon {
          color: var(--lumo-tertiary-text-color);
        }

        /* Icon */
        .navi-item__link iron-icon {
          height: var(--lumo-icon-size-s);
          flex-shrink: 0;
          margin: 0 var(--lumo-space-l) 0 0;
          transition: margin var(--transition-duration-s);
          width: var(--lumo-icon-size-s);
        }

        /* Text */
        .navi-item__link span {
          cursor: inherit;
          overflow: hidden;
          text-overflow: ellipsis;
          user-select: none;
          -webkit-user-select: none;
          white-space: nowrap;
        }

        /* Expand & collapse */
        .navi-item vaadin-button {
          flex-shrink: 0;
          margin-left: auto;
          margin-right: var(--lumo-space-s);
        }
      `
    ];
  }

  render() {
    return html`
      <div class="navi-menu">
        ${this.items.map(
          item => html`
            <navi-item
              @click=${() => this.expand(item)}
              .item=${item}
            ></navi-item>
            ${item.children
              ? item.children.map(
                  child => html`
                    <navi-item
                      ?hidden=${!item.expanded}
                      level="1"
                      .item=${child}
                    ></navi-item>
                  `
                )
              : ``}
          `
        )}
      </div>
    `;
  }
  expand(item: MenuItem) {
    item.expanded = !item.expanded;
    this.requestUpdate("items");
  }
  connectedCallback() {
    super.connectedCallback();
    this.updateHighlight();
    window.addEventListener("vaadin-router-location-changed", () => {
      this.updateHighlight();
    });
  }
  updateHighlight() {
    const location = router.location;

    this.items.forEach(item => {
      this.setItemHighlight(item, location);
      if (item.children) {
        item.children.forEach(child => this.setItemHighlight(child, location));
      }
    });
    this.requestUpdate("items");
  }

  setItemHighlight(item: MenuItem, location: Router.Location) {
    let path = location.pathname;
    if (path.startsWith("/")) {
      path = path.substring(1);
    }

    item.highlight = item.path == path;
  }
}
