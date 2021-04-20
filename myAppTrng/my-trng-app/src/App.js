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
  state = {
    clicked : 0
  }
  render(){
    return (
      <div className="container">
        <Router>
          <Link onClick={() => this.setState({clicked: 0})} className ={this.state.clicked === 0 ? "linkcss1" : "linkcss"} to="/"> Trainings</Link>
          <Link onClick={() => this.setState({clicked: 1})} className ={this.state.clicked === 1 ? "linkcss1" : "linkcss"} to="/member"> Members</Link>
          <Link onClick={() => this.setState({clicked: 2})} className ={this.state.clicked === 2 ? "linkcss1" : "linkcss"} to="/coach"> Coaches</Link>
          <Link onClick={() => this.setState({clicked: 3})} className ={this.state.clicked === 3 ? "linkcss1" : "linkcss"} to="/sport"> Sports</Link>
          
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
