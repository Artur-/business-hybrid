import { css, customElement, html, LitElement, property } from "lit-element";
import { globalCss } from "./global-styles";

@customElement("transaction-chart")
export class TransactionChart extends LitElement {
  @property({ type: Array })
  values?: number[];

  static get styles() {
    return [
      globalCss,
      css`
        :host {
          width: 100%;
          overflow: hidden;
        }
        vaadin-chart {
          height: 100%;
        }
      `
    ];
  }
  render() {
    return html`
      <vaadin-chart
        type="areaspline"
        title="2019"
        no-legend
        .categories=${[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]}
        ><vaadin-chart-series
          unit="Number of Processed Transactions"
          .values=${this.values}
        ></vaadin-chart-series>
      </vaadin-chart>
    `;
  }
}
