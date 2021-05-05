import { join } from "path";
import express from "express";
import { logMessage } from "config/utils";
import { paths } from "config/paths";
import { createStore, errorHandler, renderer, matchRoutes } from "./middleware";
const { CLIENT_BUILD_DIR, PUBLIC_DIR } = paths;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(PUBLIC_DIR, express.static(join(CLIENT_BUILD_DIR, PUBLIC_DIR)));
app.use(createStore);
app.use(matchRoutes);
app.use(renderer);
app.use(errorHandler);

app.listen(PORT, () => {
  logMessage(`App listening on port ${PORT}`);
});

export default app;
