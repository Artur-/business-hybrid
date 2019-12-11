import { Flow } from "@vaadin/flow-frontend/Flow";
import { Router } from "@vaadin/router";
import "./global-component-styles";
import { registerGlobalStyles } from "./global-styles";
import "./main-layout";

registerGlobalStyles();
const { serverSideRoutes } = new Flow({
  imports: () => import("../target/frontend/generated-flow-imports")
});

const clientView: Router.RouteWithAction = {
  path: "statistics",
  action: async (_context, _commands) => {
    await import("./statistics-view");
    return _commands.component("statistics-view");
  }
};

const routes = [
  {
    path: "",
    component: "main-layout",
    children: [clientView, ...serverSideRoutes]
  }
  // fallback to server-side Flow routes if no client-side routes match
];

const router = new Router(document.body);
router.setRoutes(routes);
