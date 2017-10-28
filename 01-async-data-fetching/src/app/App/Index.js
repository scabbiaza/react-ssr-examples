import {root} from "baobab-react/higher-order"
import React from "react"
import {Frontload} from "react-frontload"

import store from "./store"
import Skills from "../Skills"

let App = function(props) {
  return <Frontload><div>
    <Skills/>
  </div></Frontload>
}

export default root(store, App)
