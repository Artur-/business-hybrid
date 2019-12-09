import { Flow } from "@vaadin/flow-frontend/Flow";
import { Router } from "@vaadin/router";
import "./global-component-styles";
import { registerGlobalStyles } from "./global-styles";
import "./main-layout";

registerGlobalStyles();
const { serverSideRoutes } = new Flow({
  imports: () => import("../target/frontend/generated-flow-imports")
});

const routes = [
  {
    path: "",
    component: "main-layout",
    children: [...serverSideRoutes]
  }
  // fallback to server-side Flow routes if no client-side routes match
];

const router = new Router(document.body);
router.setRoutes(routes);
