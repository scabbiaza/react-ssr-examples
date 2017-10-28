import {branch} from "baobab-react/higher-order"
import * as R from "ramda"
import React from "react"
import {frontloadConnect} from "react-frontload"

import Actions from "./actions"

class Skills extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  refresh(event) {
    event.preventDefault()
    this.setState({loading: true})
    return Actions.loadSkills()
      .then((data) => {
        this.setState({loading: false})
      })
      .catch(error => {
        console.log("Error: ", error)
        this.setState({loading: false})
      })
  }
  render() {
    let skills = this.props.skills
    let loading = this.state.loading
    return <div style={{padding: "30px 40px"}}>
      <h3>Skills</h3>
      <p><a href="#" onClick={(event) => this.refresh(event)}>Refresh (request to API with latency)</a></p>
      {loading
        ? <div>loading...</div>
        : skills && skills.length
          ? <SkillsList skills={skills}/>
          : <div>no skills</div>
      }
     </div>
  }
}
function SkillsList({skills}) {
  return R.map(skill => <div key={skill.id} onClick={() => {console.log(skill.id)}}>{skill.title}</div>, skills)
}

export default branch(
  {skills: ["skills"]},
  frontloadConnect((props) => Actions.loadSkills())(Skills)
)
