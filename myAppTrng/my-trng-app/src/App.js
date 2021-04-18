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
          <Link className = "linkcss" exact to="/"> Training</Link>
          <Link className = "linkcss" exact to="/member"> Member</Link>
          <Link className = "linkcss" exact to="/coach"> Coach</Link>
          <Link className = "linkcss" exact to="/sport"> Sport</Link>
       
      <Switch>
          <Route exact path="/"  >
            <Training />
          </Route>

          <Route exact path="/member"  >
            <Member />
          </Route>

          <Route exact path="/coach"  >
            <Coach />
          </Route>

          <Route exact path="/sport"  >
            <Sport />
          </Route>
      </Switch>

      </Router>
      </div>
  )
};
}

export default App;
