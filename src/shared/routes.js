import loadable from "@loadable/component";

const HomePage = loadable(() =>
  import(/* webpackChunkName: "home" */ "components/pages/Home")
);
const AboutPage = loadable(() =>
  import(/* webpackChunkName: "about" */ "components/pages/About")
);
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
