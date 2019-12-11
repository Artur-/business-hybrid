import { css, customElement, html, LitElement } from "lit-element";

@customElement("home-view")
export class HomeView extends LitElement {
  static get styles() {
    return css``;
  }
  render() {
    return html`
      <div
        style="margin-left: auto; padding: var(--lumo-space-r-l); flex-direction: column; max-width: 840px; display: flex; margin-right: auto;"
      >
        <p>
          A responsive application template with some dummy data. Loosely based
          on the <b>responsive layout grid</b> guidelines set by
          <a
            href="https://material.io/design/layout/responsive-layout-grid.html"
            >Material Design</a
          >. Utilises the
          <a href="https://vaadin.com/themes/lumo">Lumo</a> theme.
        </p>
        <p>
          The starter gives you a productivity boost and a head start. You get
          an app shell with a typical hierarchical left-hand menu. The shell,
          the views and the components are all responsive and touch friendly,
          which makes them great for desktop and mobileuse. The views are built
          with Java, which enhances Java developers' productivity by allowing
          them todo all in one language.
        </p>
        <p>
          The app comes with multiple list views to edit master-detail data.
          Views can be divided horizontally or vertically to open up the
          details, and the details can also be split into multiple tabs for
          extra space. The details can also be opened fullscreen to maximize the
          use of space. Additionally there is an opt-in option for opening
          multiple application views in tabs within the app, for quick
          comparison or navigation between data. You enable this feature by
          setting <code>MainLayout.navigationTabs</code> to true.
        </p>
        <div class="spacing-r-s" style="display: flex; flex-wrap: wrap;">
          <a href="https://vaadin.com/docs/business-app/overview.html"
            ><vaadin-button tabindex="0" role="button"
              ><iron-icon icon="vaadin:external-link" slot="prefix"></iron-icon
              >Read the documentation</vaadin-button
            ></a
          ><a href="https://vaadin.com/start/latest/business-app"
            ><vaadin-button tabindex="0" role="button"
              ><iron-icon icon="vaadin:external-link" slot="prefix"></iron-icon
              >Start a new project with Business App</vaadin-button
            ></a
          >
        </div>
      </div>
    `;
  }
}
