import Actions from "../App/actions"
import store from "../App/store"

// null -> Promise
let loadSkills = () => {
  return Actions.loadSkills()
    .then((data) => {
      store.set("skills", data)
    })
    .catch(error => {
      console.log("Error: ", error)
    })
}

export default {
  loadSkills
}

