import { BrowserRouter as Router, Switch } from "react-router-dom";
import '../App.css';
import { AuthProvider } from '../contexts/AuthContext';
import Login from "./Login";
import Index from "./passwords/Index";
import AuthRoute from "./routes/AuthRoutes";
import GuestRoute from "./routes/GuestRoutes";
import SignUp from "./SignUp";

function App() {
 
  return (
      <div className="App w-full h-full">
        <Router>
        <AuthProvider>
          <Switch>
                  {/* <PrivateRoute exact path="/" component={Dashboard} />
                  <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
                  <GuestRoute exact path="/" component={SignUp} />
                  <GuestRoute exact path="/login" component={Login} />
                  <AuthRoute exact path="/home" component={Index} />

                
                </Switch>
            {/* <SignUp/> */}
      </AuthProvider>
      </Router>
      </div>
  );
}

export default App;
