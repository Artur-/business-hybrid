import { Flow } from "@vaadin/flow-frontend/Flow";
import { Router } from "@vaadin/router";
import "./global-component-styles";
import { registerGlobalStyles } from "./global-styles";
import "./main-layout";

registerGlobalStyles();
const { serverSideRoutes } = new Flow({
  imports: () => import("../target/frontend/generated-flow-imports")
});

// Router configuration which defines "" and "statistics" as client side routes. Entering any of these will load the corresponding TS file lazily.
// For all other routes, routing is delegated to the server to classes annotated with @Route
// Both server and client side routes use the client side `<main-layout>` component as parent layout
const clientSideRoutes: Router.RouteWithAction[] = [
  {
    path: "",
    action: async (_context, _commands) => {
      await import("./home-view");
      return _commands.component("home-view");
    }
  },
  {
    path: "statistics",
    action: async (_context, _commands) => {
      await import("./statistics-view");
      return _commands.component("statistics-view");
    }
  }
];

const routes = [
  {
    path: "",
    component: "main-layout",
    children: [...clientSideRoutes, ...serverSideRoutes]
  }
];

export const router = new Router(document.body);
router.setRoutes(routes);
