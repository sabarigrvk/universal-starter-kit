import React from "react";

function Html({ children, css, scripts, state = "{}" }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {css}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {scripts}
      </body>
    </html>
  );
}

export default Html;
