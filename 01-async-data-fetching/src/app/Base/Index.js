import React from "react"
import store from "../App/store"
import App from "../App"


function Base(props) {
  let storeDump = JSON.stringify(store.get())
  return <html lang="en" prefix="og: http://ogp.me/ns#">
    <head>
      <meta charSet="utf-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>React SSR</title>
    </head>
    <body>
        <div id="root">
          <App />
        </div>
        <script dangerouslySetInnerHTML={{__html: `window.store = '${storeDump}'`}}>
        </script>
        <script src="/bundle.js"></script>
    </body>
  </html>
}

export default Base
