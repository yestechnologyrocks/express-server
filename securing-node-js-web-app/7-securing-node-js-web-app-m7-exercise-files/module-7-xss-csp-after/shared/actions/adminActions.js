"use strict";

import * as types                   from "../constants/actionTypes";
import usersApi                      from "../api-services/usersApi";
import {displayNotification}        from "../lib/utility";
import {routerActions}              from "react-router-redux";

function usersRequested() {
    return {
        type: types.USERS_REQUEST,
        isRequested: true
    }
}

function usersReceived(users, totalPages, page){
    return {
        type: types.USERS_RECEIVED,
        isRequested: false,
        users,
        totalPages,
        page
    }
}

function usersFailure(errorMessage){
    return {
        type: types.USERS_FAILURE,
        isRequested: false,
        errorMessage
    }
}

function removeUserRequested(){
    return {
        type: types.REMOVE_USER_REQUESTED,
        isRequested: true
    }
}

function removeUserCompleted(user) {
    return {
        type: types.REMOVE_USER_COMPLETED,
        isRequested: false,
        user
    }
}

function removeUserFailure(errorMessage){
    return {
        type: types.REMOVE_USER_FAILURE,
        isRequested: false,
        errorMessage
    }
}

export function getUsers(page) {
    return async function(dispatch) {
        dispatch(usersRequested());

        try{
            const data = await usersApi.getUsers(page);
            dispatch(routerActions.push(`/admin/users?page=${page}`));
            dispatch(usersReceived(data.users, data.totalPages, page));
        } catch(err){
            dispatch(usersFailure(err.statusText));
        }
    }
}

export function removeUser(user){
    return async function(dispatch) {
        dispatch(removeUserRequested());

        try {
            await usersApi.removeUser(user.email);
            dispatch(removeUserCompleted(user));
            const message = `The user ${user.email} has been successfully removed.`;
            displayNotification("success", null, message);
        } catch(err) {
            dispatch(removeUserFailure(err.statusText));
            const message = `There was a problem removing the user ${user.email}. Please try again later.`;
            displayNotification("error", null, message);
        }
    }
}
