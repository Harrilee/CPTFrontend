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
import {Survey} from "./components/Surveys/Survey";
import {Writing123} from "./components/Writing123/Writing123";
import {CONTENT_WRITING_DAY1, CONTENT_WRITING_DAY2, CONTENT_WRITING_DAY3,CONTENT_WRITING_DAY6} from "./content";
import {Writing6} from "./components/Writing6/Writing6";



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
                <Route path="day0/" element={<PrivateWrapper child={<Survey url={'https://nyu.qualtrics.com/jfe/form/SV_b3oXwg0uErHbNqK'}/>}/>}>
                </Route>
                <Route path="day1/" element={<PrivateWrapper child={<Survey url={'https://nyu.qualtrics.com/jfe/form/SV_4Z9HRQoFIEaFKei'}/>}/>}>
                </Route>
                <Route path="writing1/" element={<PrivateWrapper child={<Writing123 day={1} content={CONTENT_WRITING_DAY1}/>}/>}>
                </Route>
                <Route path="writing2/" element={<PrivateWrapper child={<Writing123 day={2} content={CONTENT_WRITING_DAY2}/>}/>}>
                </Route>
                <Route path="writing3/" element={<PrivateWrapper child={<Writing123 day={3} content={CONTENT_WRITING_DAY3}/>}/>}>
                </Route>
                <Route path="writing6/" element={<PrivateWrapper child={<Writing6 day={6} content={CONTENT_WRITING_DAY6}/>}/>}>
                </Route>
                <Route path="day29/" element={<PrivateWrapper child={<Survey url={'https://nyu.qualtrics.com/jfe/form/SV_0fEtLt7hh5za4BM'}/>}/>}>
                </Route>
                <Route path="day45/" element={<PrivateWrapper child={<Survey url={'https://nyu.qualtrics.com/jfe/form/SV_9TQwYhtFVafdQma'}/>}/>}>
                </Route>
                <Route path="day105/" element={<PrivateWrapper child={<Survey url={'https://nyu.qualtrics.com/jfe/form/SV_4HJi8oX4onYNtPg'}/>}/>}>
                </Route>
                <Route path='*' element={<div>404</div>}/>
            </Routes>
        </BrowserRouter>
    // </UserContext.Provider>


}

export default App;
