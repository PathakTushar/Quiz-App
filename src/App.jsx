import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";

const App = () => {
  return <div>
    <Switch>
      <Route path='/' exact>
        <Login />
      </Route>
      <Route path='/quiz' exact>
        <Quiz />
      </Route>
    </Switch>
  </div>
}

export default App;
