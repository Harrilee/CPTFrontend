import {Navigate} from "react-router-dom";
import React from "react";

export const URL = 'http://linode.zifengallen.me:8888/';

export const getUserNameFromCookie = (): string => {
    const cookie = document.cookie.split(";").map((x) => x.trim());
    const token = cookie.find((x) => x.startsWith("token="));
    if (token === undefined) {
        return "0";
    }else{
        return parseJwt(token.slice(6)).username;
    }
}
export function parseJwt (token:string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const getTokenFromCookie = (): string => {
    const cookie = document.cookie.split(";").map((x) => x.trim());
    const token = cookie.find((x) => x.startsWith("token="));
    return token === undefined ? "0" : token.slice(6);
}
export const validateLogin = async (): Promise<boolean> => {

    const token = getTokenFromCookie();
    if (token === "0") {
        return false;
    }

    const res = await fetch(URL + "validate/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
    })
    const response = await res.json()
    console.log(response)
    if (response.status === "Success"){
        return true;
    }
    else {
        return false;
    }
}