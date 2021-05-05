import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter as Router } from "react-router-dom";
import App from "components/App";

function ServerBootstrap({
  routerContext = {},
  helmetContext = {},
  location = req.path,
  store,
}) {
  return (
    <Provider store={store}>
      <Router location={location} context={routerContext}>
        <App />
      </Router>
    </Provider>
  );
}

function toHtmlString({ jsx, scriptTags, linkTags, styleTags, state = "{}" }) {
  const content = renderToString(jsx);
  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${linkTags}
        ${styleTags}
        <script>
          window.__PRELOADED_STATE__ = ${state}
        </script>
      </head>
      <body>
        <div id="app">${content}</div>
        ${scriptTags}
      </body>
    </html>
  `;
}

ServerBootstrap.toHtmlString = toHtmlString;

export default ServerBootstrap;
