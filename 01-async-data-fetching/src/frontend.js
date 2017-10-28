import React from "react"
import ReactDOM from "react-dom"
import App from "./app/App"

ReactDOM.hydrate( // https://reactjs.org/docs/react-dom.html#hydrate
  <App />,
  document.querySelector("#root")
)
