import loadable from "@loadable/component";

const HomePage = loadable(() => import("components/pages/Home"));
const AboutPage = loadable(() => import("components/pages/About"));
const routes = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/about",
    exact: true,
    component: AboutPage,
  },
];

export default routes;
