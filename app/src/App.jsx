import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { store, persistor } from "../src/store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

/*----- Views -----*/
import Login from "./views/login/Login";
import NewUser from "./views/newUser/NewUser";
import Home from "./views/home/Home";
import ResetPassword from "./views/resetPassword/ResetPassword";
import RegisterEvent from "./views/registerEvent/RegisterEvent";
import EventDetail from "./views/event-detail/EventDetail";
import EditEvent from "./views/edit-event/EditEvent";

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor} />
			<Router>
				<Route exact path="/" component={Home} />
				<Route path="/events/:parameter" component={Home} />
				<Route exact path="/newUser" component={NewUser} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/resetPassword" component={ResetPassword} />
				<Route exact path="/registerEvent" component={RegisterEvent} />
				<Route exact path="/eventDetail/:id" component={EventDetail} />
				<Route exact path="/editEvent/:id" component={EditEvent} />
			</Router>
		</Provider>
	);
}

export default App;
