import React, {createContext, useState} from 'react';
import {useContext} from 'react';
import {Login} from "./components/Login/Login";
import {Home} from "./components/Home/Home";
import './App.scss';
import {
    BrowserRouter,
    Routes, Route, Navigate
} from "react-router-dom";

import {Game} from "./components/Game/Game";

// export const UserContext = createContext({ value: {user: "0", setUser: (user: string) => {}} })
function App() {

    // const [user, setUser] = useState("0")
    // const value = {user, setUser}


    const PrivateWrapper = ({child}: { child: JSX.Element }) => {
        // const _user = useContext(UserContext).value.user;
        const cookie = document.cookie.split(";").map((x) => x.trim());
        const token = cookie.find((x) => x.startsWith("token="));

        return (token !== undefined) ? child : <Navigate to="/"/>;
    };


    // return <UserContext.Provider value={{value}}>
    return <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}>
                </Route>
                <Route path="home/" element={<PrivateWrapper child={<Home/>}/>}>
                </Route>
                <Route path="game/" element={<PrivateWrapper child={<Game/>}/>}>
                </Route>
                <Route path='*' element={<div>404</div>}/>
            </Routes>
        </BrowserRouter>
    // </UserContext.Provider>


}

export default App;
