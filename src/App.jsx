import React from 'react';
import { Router, Route } from "react-router-dom";
import history from "./history";
import UserProvider from "./contexts/UserProvider";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MenuBar from "./components/menus/MenuBar";
// // import Footer from "./components/footer/Footer";

 const App = () => {
    return (       
        <Router history={history}>
            <UserProvider>               
                <Route path="/Profile" component={Profile}/>  
                <Route path="/" component={MenuBar}/>  
            </UserProvider>
            <Route path="/" exact component={Home}/>  
        </Router>  

    )     
        
};
export default App
