import Baobab from "baobab"
import {IS_SERVER} from "../constants"

export default new Baobab(!IS_SERVER ? JSON.parse(window.store) : {})
