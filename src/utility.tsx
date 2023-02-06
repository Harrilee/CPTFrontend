import {Navigate} from "react-router-dom";
import React from "react";

export const URL = 'http://127.0.0.1:8000/';

export const getUserNameFromCookie = (): string => {
    const cookie = document.cookie.split(";").map((x) => x.trim());
    const username = cookie.find((x) => x.startsWith("username="));
    if (username === undefined) {
        return "0";
    }
    return username.slice(9);
}

export const validateLogin = async (): Promise<boolean> => {

    const cookie = document.cookie.split(";").map((x) => x.trim());
    const token = cookie.find((x) => x.startsWith("token="));
    const username = getUserNameFromCookie();
    if (token === undefined || username === undefined || username === "0") {
        return false;
    }



    let res = await fetch(URL + "validate/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token.slice(6)
        },


    })
    const response = await res.json()
    console.log(response)
    if (response.status === "Success") {
        return true;
    }
    else {
        return false;
    }




}