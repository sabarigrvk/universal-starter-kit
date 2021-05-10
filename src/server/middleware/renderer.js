import React from "react";
import { join, resolve } from "path";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import serialize from "serialize-javascript";
import { paths } from "../../../config/paths";
import { ServerBootstrap } from "../components";

const statsFile = resolve(
  join(paths.CLIENT_BUILD_DIR, paths.PUBLIC_DIR),
  "stats.json"
);

const renderer = (req, res, next) => {
  try {
    let dataRequirements = res.locals.serverPromises;
    dataRequirements
      .then(() => {
        const initialProps = {
          routerContext: {},
          helmetContext: {},
          location: req.path,
          store: res.locals.store,
        };
        // https://loadable-components.com/docs/server-side-rendering/#chunkextractor-entrypoints
        const extractor = new ChunkExtractor({
          statsFile,
          entrypoints: ["bundle"],
        });
        const jsx = extractor.collectChunks(
          <ServerBootstrap {...initialProps} />
        );

        const scriptTags = extractor.getScriptTags();
        const linkTags = extractor.getLinkTags();
        const styleTags = extractor.getStyleTags();

        const state = serialize(res.locals.store.getState());
        const html = ServerBootstrap.toHtmlString({
          jsx,
          scriptTags,
          linkTags,
          styleTags,
          state,
        });
        return res.send(html);
      })
      .catch((error) => {
        console.log("error", error.message);
        res.status(500).json({ error: error.message, stack: error.stack });
      });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.send("Internal server error");
  }
};

export default renderer;
