import { css, customElement, html, LitElement, property } from "lit-element";
import { globalCss } from "./global-styles";
import "@vaadin/vaadin-charts";

@customElement("payment-chart")
export class PaymentChart extends LitElement {
  @property()
  title: string = "";
  @property({ type: Number })
  value?: number;

  static get styles() {
    return [
      globalCss,
      css`
        :host {
          padding-top: var(--lumo-space-m);
          flex-direction: column;
          display: flex;
          padding-bottom: var(--lumo-space-s);
          align-items: center;
          flex-basis: 25%;
        }

        vaadin-chart {
          width: 100%;
          height: 100%;
        }
        .container {
          display: flex;
          width: 120px;
          justify-content: center;
          align-items: center;
          position: relative;
          height: 120px;
        }
        .labelContainer {
          display: flex;
          align-items: baseline;
          position: absolute;
        }
        .pct {
          color: var(--lumo-body-text-color);
          font-size: var(--lumo-font-size-s);
        }
      `
    ];
  }
  render() {
    return html`
      <label>${this.title}</label>
      <div class="container">
        <vaadin-chart
          type="solidgauge"
          class="${this.title.toLowerCase()}"
          empty-text=" "
          .additionalOptions=${{
            yAxis: { labels: false },
            pane: {
              background: { innerRadius: "100%", radius: "110%", shape: "arc" },
              startAngle: 0,
              endAngle: 360
            }
          }}
        >
          <vaadin-chart-series
            value-max="100"
            value-min="0"
            title="The series title"
            .values=${[this.value]}
            .additionalOptions=${{
              innerRadius: "100%",
              radius: "110%",
              dataLabels: {
                enabled: false
              }
            }}
          >
          </vaadin-chart-series>
        </vaadin-chart>
        <div class="spacing-r-xs labelContainer">
          <label class="h2">${this.value}</label>
          <label class="pct">%</label>
        </div>
      </div>
    `;
  }
}
