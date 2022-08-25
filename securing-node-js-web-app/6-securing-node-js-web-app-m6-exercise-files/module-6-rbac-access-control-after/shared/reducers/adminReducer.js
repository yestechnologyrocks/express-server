"use strict";

import * as types               from "../constants/actionTypes";
import {adminState}             from "../constants/initialState";

export default function adminReducer(state = adminState, action) {
    switch (action.type) {
        case types.USERS_REQUEST:
            return Object.assign({}, state, {
                isRequested: true
            });
        case types.USERS_RECEIVED:
            return Object.assign({}, state, {
                isRequested: false,
                users: action.users,
                totalPages: action.totalPages,
                page: action.page
            });
        case types.USERS_FAILURE:
            return Object.assign({}, state, {
                isRequested: false,
                errorMessage: action.errorMessage
            });
        case types.REMOVE_USER_REQUESTED:
            return Object.assign({}, state, {
                isRequested: true
            });
        case types.REMOVE_USER_COMPLETED:
            return Object.assign({}, state, {
                isRequested: false,
                users: state.users.filter(user => user.email !== action.user.email)
            });
        case types.REMOVE_USER_FAILURE:
           return Object.assign({}, state, {
               isRequested: false,
               errorMessage: action.errorMessage
           });
        default:
            return state;
    }
}