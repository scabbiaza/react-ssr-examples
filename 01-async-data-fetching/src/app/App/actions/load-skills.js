import Axios from "axios"
import path from "path"

import {IS_SERVER} from "../../constants"

let fs = require("fs") // TODO: why dynamic import doesn't work? i had to add ` fs: "empty" to webpack config


// null -> Promise
export default () => {
  if (IS_SERVER) {
    return new Promise(function (resolve, reject) {
      let filename = path.join(__dirname, "../../../data/skills.json") // TODO
      let data = fs.readFileSync(filename, {encoding: "utf8"})
      return resolve(JSON.parse(data).data)
    })
  } else {
    let url = "/api/skills"
    return Axios.get(url)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log("Error in loadData: ", error.response)
      })
  }
}
