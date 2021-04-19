import React from "react"
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Training from "./Training"
import Member from "./Member"
import Coach from "./Coach"
import Sport from "./Sport"

class App extends React.Component{

  render(){
    return (
      <div className="container">
        <Router>
          <Link className = "linkcss" to="/"> Trainings</Link>
          <Link className = "linkcss" to="/member"> Members</Link>
          <Link className = "linkcss" to="/coach"> Coaches</Link>
          <Link className = "linkcss" to="/sport"> Sports</Link>
          
      <Switch>
          <Route exact path="/"  >
            <Training />
          </Route>

          <Route path="/member"  >
            <Member />
          </Route>

          <Route path="/coach"  >
            <Coach />
          </Route>

          <Route path="/sport"  >
            <Sport />
          </Route>
      </Switch>

      </Router>
      </div>
  )
};
}

export default App;
