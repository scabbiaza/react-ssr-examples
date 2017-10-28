import express from "express"
import React from "react"
import {frontloadServerRender} from "react-frontload"
import ReactDOMServer from "react-dom/server"

import Actions from "./app/App/actions"
import Base from "./app/Base"


let router = express.Router()

// APP
router.get("/", function (req, res) {
  return frontloadServerRender(() => (ReactDOMServer.renderToString(React.createElement(Base))))
    .then(html => {
      res.send(html)
    })
})

// API
router.get("/api/skills", function (req, res) {
  setTimeout(() => {
    return Actions.loadSkills().then((data) => {
      res.setHeader("Content-Type", "application/json")
      res.send(data)
    })
  }, 3000);
})

export default router
