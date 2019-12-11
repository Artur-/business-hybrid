import { css, customElement, html, LitElement, property } from "lit-element";
import { globalCss } from "./global-styles";
import "@vaadin/vaadin-board";
import "@vaadin/vaadin-tabs";
import "./payment-chart";
import "./transaction-chart";
import { ifDefined } from "lit-html/directives/if-defined";
import * as StatisticsEndpoint from "./generated/StatisticsEndpoint";

@customElement("statistics-view")
export class StatisticsView extends LitElement {
  @property({ type: Number })
  pending?: number;
  @property({ type: Number })
  submitted?: number;
  @property({ type: Number })
  confirmed?: number;
  @property({ type: Number })
  failed?: number;
  @property({ type: Array })
  transactionValues?: number[];

  static get styles() {
    return [
      globalCss,
      css`
        /* Payments */
        vaadin-board-row.small payment-chart:not(:last-child) {
          box-shadow: inset 0 -1px var(--lumo-contrast-10pct);
        }

        vaadin-board-row.medium payment-chart:first-child {
          box-shadow: inset 0 -1px var(--lumo-contrast-10pct),
            inset -1px 0 var(--lumo-contrast-10pct);
        }
        vaadin-board-row.medium payment-chart:nth-child(2) {
          box-shadow: inset 0 -1px var(--lumo-contrast-10pct);
        }
        vaadin-board-row.medium payment-chart:nth-child(3) {
          box-shadow: inset -1px 0 var(--lumo-contrast-10pct);
        }

        vaadin-board-row.large payment-chart:not(:last-child) {
          box-shadow: inset -1px 0 var(--lumo-contrast-10pct);
        }

        /* Reports & Logs */
        vaadin-board-row.small .statistics__reports {
          padding-right: var(--lumo-space-r-l);
        }

        vaadin-board-row.small .statistics__logs {
          padding-left: var(--lumo-space-r-l);
        }

        vaadin-board-row:not(.small) .statistics__reports {
          padding-right: calc(var(--lumo-space-l) / 2);
        }

        vaadin-board-row:not(.small) .statistics__logs {
          padding-left: calc(var(--lumo-space-l) / 2);
        }

        .contentRow {
          background-color: var(--lumo-base-color);
          border-radius: var(--lumo-border-radius-s);
          box-shadow: var(--lumo-box-shadow-xs);
        }

        .headerRow {
          margin-left: var(--lumo-space-r-l);
          display: flex;
          align-items: center;
          margin-bottom: var(--lumo-space-l);
          margin-right: var(--lumo-space-r-l);
        }

        .transactionChartContainer {
          background-color: var(--lumo-base-color);
          border-radius: var(--lumo-border-radius-s);
          padding: var(--lumo-space-m);
          box-shadow: var(--lumo-box-shadow-xs);
          display: flex;
          box-sizing: border-box;
          height: 400px;
        }
      `
    ];
  }
  render() {
    return html`
      <div style="flex-direction: column; display: flex; align-items: center;">
        <div
          style="max-width: 1024px; display: block; padding-left: var(--lumo-space-r-l); width: 100%; margin-top: var(--lumo-space-l); box-sizing: border-box; padding-right: var(--lumo-space-r-l);"
        >
          <div class="headerRow spacing-r-l">
            <iron-icon
              class="size-m"
              icon="vaadin:credit-card"
              style="color: var(--lumo-tertiary-text-color);"
            ></iron-icon
            ><label class="h3">Payments</label>
          </div>
          <vaadin-board-row class="large contentRow">
            <payment-chart
              title="Pending"
              value="${ifDefined(this.pending)}"
            ></payment-chart>
            <payment-chart
              title="Submitted"
              value="${ifDefined(this.submitted)}"
            ></payment-chart>
            <payment-chart
              title="Confirmed"
              value="${ifDefined(this.confirmed)}"
            ></payment-chart>
            <payment-chart
              title="Failed"
              value="${ifDefined(this.failed)}"
            ></payment-chart>
          </vaadin-board-row>
        </div>
        <div
          style="max-width: 1024px; display: block; padding-left: var(--lumo-space-r-l); width: 100%; margin-top: var(--lumo-space-xl); box-sizing: border-box; padding-right: var(--lumo-space-r-l);"
        >
          <div class="headerRow spacing-r-l">
            <iron-icon
              class="size-m"
              icon="vaadin:money-exchange"
              style="color: var(--lumo-tertiary-text-color);"
            ></iron-icon
            ><label class="h3">Transactions</label>
          </div>
          <div class="transactionChartContainer">
            <transaction-chart
              .values=${this.transactionValues}
            ></transaction-chart>
          </div>
        </div>
        <vaadin-board-row
          class="margin-t-xl large"
          style="max-width: 1024px; width: 100%;"
          ><div
            class="statistics__reports"
            style="flex-direction: column; display: flex; padding-left: var(--lumo-space-r-l); padding-bottom: var(--lumo-space-xl); flex-basis: 50%;"
          >
            <div class="headerRow spacing-r-l">
              <iron-icon
                class="size-m"
                icon="vaadin:records"
                style="color: var(--lumo-tertiary-text-color);"
              ></iron-icon
              ><label class="h3">Reports</label>
            </div>
            <div class="contentRow">
              <vaadin-tabs selected="0"
                ><vaadin-tab selected="">All</vaadin-tab
                ><vaadin-tab>Archive</vaadin-tab
                ><vaadin-tab>Workflows</vaadin-tab
                ><vaadin-tab>Support</vaadin-tab></vaadin-tabs
              >
              <div class="padding-v-s">
                <div
                  class="list-item spacing-r-l"
                  with-prefix=""
                  with-suffix=""
                  style="padding: var(--lumo-space-wide-r-l); display: flex; align-items: center;"
                >
                  <div class="list-item__prefix">
                    <iron-icon
                      class="size-m"
                      icon="vaadin:chart"
                      style="color: var(--lumo-tertiary-text-color);"
                    ></iron-icon>
                  </div>
                  <div
                    class="list-item__content"
                    style="flex-direction: column; display: flex;"
                  >
                    <label>Weekly Report</label
                    ><label
                      style="color: var(--lumo-secondary-text-color); font-size: var(--lumo-font-size-s);"
                      >Generated Oct 5, 2018</label
                    >
                  </div>
                  <div class="list-item__suffix">
                    <vaadin-button theme="small icon" tabindex="0" role="button"
                      ><iron-icon icon="vaadin:info" slot="prefix"></iron-icon
                    ></vaadin-button>
                  </div>
                </div>
                <div
                  class="list-item spacing-r-l"
                  with-prefix=""
                  with-suffix=""
                  style="padding: var(--lumo-space-wide-r-l); display: flex; align-items: center;"
                >
                  <div class="list-item__prefix">
                    <iron-icon
                      class="size-m"
                      icon="vaadin:sitemap"
                      style="color: var(--lumo-tertiary-text-color);"
                    ></iron-icon>
                  </div>
                  <div
                    class="list-item__content"
                    style="flex-direction: column; display: flex;"
                  >
                    <label>Payment Workflows</label
                    ><label
                      style="color: var(--lumo-secondary-text-color); font-size: var(--lumo-font-size-s);"
                      >Last modified Oct 24, 2018</label
                    >
                  </div>
                  <div class="list-item__suffix">
                    <vaadin-button theme="small icon" tabindex="0" role="button"
                      ><iron-icon icon="vaadin:info" slot="prefix"></iron-icon
                    ></vaadin-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="statistics__logs"
            style="flex-direction: column; display: flex; padding-bottom: var(--lumo-space-xl); padding-right: var(--lumo-space-r-l); flex-basis: 50%;"
          >
            <div class="headerRow spacing-r-l">
              <iron-icon
                class="size-m"
                icon="vaadin:edit"
                style="color: var(--lumo-tertiary-text-color);"
              ></iron-icon
              ><label class="h3">Logs</label>
            </div>
            <div class="contentRow">
              <vaadin-tabs
                selected="0"
                orientation="horizontal"
                role="tablist"
                aria-orientation="horizontal"
                ><vaadin-tab
                  selected=""
                  aria-selected="true"
                  role="tab"
                  orientation="horizontal"
                  tabindex="0"
                  >All</vaadin-tab
                ><vaadin-tab
                  aria-selected="false"
                  role="tab"
                  orientation="horizontal"
                  tabindex="-1"
                  >Transfer</vaadin-tab
                ><vaadin-tab
                  aria-selected="false"
                  role="tab"
                  orientation="horizontal"
                  tabindex="-1"
                  >Security</vaadin-tab
                ><vaadin-tab
                  aria-selected="false"
                  role="tab"
                  orientation="horizontal"
                  tabindex="-1"
                  >Change</vaadin-tab
                ></vaadin-tabs
              >
              <div class="padding-v-s">
                <div
                  class="list-item spacing-r-l"
                  with-prefix=""
                  with-suffix=""
                  style="padding: var(--lumo-space-wide-r-l); display: flex; align-items: center;"
                >
                  <div class="list-item__prefix">
                    <iron-icon
                      class="size-m"
                      icon="vaadin:exchange"
                      style="color: var(--lumo-tertiary-text-color);"
                    ></iron-icon>
                  </div>
                  <div
                    class="list-item__content"
                    style="flex-direction: column; display: flex;"
                  >
                    <label>Transfers (October)</label
                    ><label
                      style="color: var(--lumo-secondary-text-color); font-size: var(--lumo-font-size-s);"
                      >Generated Oct 31, 2018</label
                    >
                  </div>
                  <div class="list-item__suffix">
                    <vaadin-button theme="small icon" tabindex="0" role="button"
                      ><iron-icon icon="vaadin:info" slot="prefix"></iron-icon
                    ></vaadin-button>
                  </div>
                </div>
                <div
                  class="list-item spacing-r-l"
                  with-prefix=""
                  with-suffix=""
                  style="padding: var(--lumo-space-wide-r-l); display: flex; align-items: center;"
                >
                  <div class="list-item__prefix">
                    <iron-icon
                      class="size-m"
                      icon="vaadin:shield"
                      style="color: var(--lumo-tertiary-text-color);"
                    ></iron-icon>
                  </div>
                  <div
                    class="list-item__content"
                    style="flex-direction: column; display: flex;"
                  >
                    <label>Security Log</label
                    ><label
                      style="color: var(--lumo-secondary-text-color); font-size: var(--lumo-font-size-s);"
                      >Updated 16:31 CET</label
                    >
                  </div>
                  <div class="list-item__suffix">
                    <vaadin-button theme="small icon" tabindex="0" role="button"
                      ><iron-icon icon="vaadin:info" slot="prefix"></iron-icon
                    ></vaadin-button>
                  </div>
                </div>
              </div>
            </div></div
        ></vaadin-board-row>
      </div>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();

    this.transactionValues = await StatisticsEndpoint.getTransactionData(2019);
    const statusData = await StatisticsEndpoint.getPaymentData();
    this.pending = statusData[0];
    this.submitted = statusData[1];
    this.confirmed = statusData[2];
    this.failed = statusData[3];
  }
}
