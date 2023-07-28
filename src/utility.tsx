import {Navigate} from "react-router-dom";
import React from "react";
import { parse } from 'path'


const usernameEncryptionSalt = 1237890 // same as in backend

// export const URL = 'http://127.0.0.1:8000/'
export const URL = 'https://api.nyuhealthstudy.com/';
export const timeOut = 600 // 28800 max
export const conversationGap = 3000 // 3000
export const shuffleArrayFlag = true
export const getUserNameFromCookie = (): string => {
    const cookie = document.cookie.split(';').map(x => x.trim())
    const token = cookie.find(x => x.startsWith('token='))
    if (token === undefined) {
        return '0'
    } else {
        return parseJwt(token.slice(6)).username
    }
}

export const encryptUsername = (username: string): string => {
    /* 
  Encryption algorithm:
    1. Convert username to int
    2. remove the first digit "1" (since all usernames start with 1)
    3. Add salt
    4. Convert back to string in base 36
  */
    const usernameInt = parseInt(username) - 10000000000
    return Number(usernameInt - usernameEncryptionSalt)
        .toString(36)
        .toUpperCase()
}

export const getEncryptedUsernameFromCookie = (): string => {
    return getUserNameFromCookie()
}

export function parseJwt(token: string) {
    if (token.length <= 1) {
        signOut()
    }

    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
    )

    return JSON.parse(jsonPayload)
}

export const getTokenFromCookie = (): string => {
    const cookie = document.cookie.split(';').map(x => x.trim())
    const token = cookie.find(x => x.startsWith('token='))
    return token === undefined ? '0' : token.slice(6)
}
export const validateLogin = async (): Promise<boolean> => {
    const token = getTokenFromCookie()
    if (token === '0') {
        return false
    }

    const res = await fetch(URL + 'api/validate/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    })
    const response = await res.json()
    if (response.status === 'Success') {
        return true
    } else {
        return false
    }
}

export const signOut = () => {
    // document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.location.href = '/'
}

export const cloudWatchLogger = (eventName: string, value: any) => {
    navigator.sendBeacon(
        URL + 'api/put_log_events/',
        JSON.stringify({
            eventName,
            value,
            url: window.location.href,
            userId: getEncryptedUsernameFromCookie(),
        })
    )
}