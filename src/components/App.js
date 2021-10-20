import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../App.css';
import { AuthProvider } from '../context/AuthContext';
import Login from "./Login";
import Index from "./passwords/Index";
import SignUp from "./SignUp";

function App() {
 
  return (
      <div className="App w-full h-full">
        <Router>
        <AuthProvider>
          <Switch>
                  {/* <PrivateRoute exact path="/" component={Dashboard} />
                  <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
                  <Route exact path="/" component={SignUp} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/home" component={Index} />

                
                </Switch>
            {/* <SignUp/> */}
      </AuthProvider>
      </Router>
      </div>
  );
}

export default App;
