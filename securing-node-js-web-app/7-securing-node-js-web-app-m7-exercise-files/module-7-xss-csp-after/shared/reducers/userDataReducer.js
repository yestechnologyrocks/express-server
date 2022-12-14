"use strict";

import * as types               from "../constants/actionTypes";
import {userState}              from "../constants/initialState";

export default function userDataReducer(state = userState, action) {
    switch (action.type) {
        case types.EDIT_USER_PROFILE:
            return Object.assign({}, state, {
                editProfile: action.editProfile
            });
        case types.USERDATA_UPDATED:
            return Object.assign({}, state, {
                user: action.user,
            });
        case types.USER_PROFILE_UPDATE_SUCCESSFUL:
            return Object.assign({}, state, {
                editProfile: false
            });
        case types.USER_PROFILE_UPDATE_REQUESTED:
            return Object.assign({}, state, {
                isRequested: true
            });
        case types.USER_PROFILE_UPDATE_FAILURE:
            return Object.assign({}, state, {
                isRequested: false,
                errorMessage: action.errorMessage
            });
        case types.EVENT_VOTE_SENT:
            return Object.assign({}, state, {
                isRequested: true
            });
        case types.EVENT_VOTE_CASTED:
            return Object.assign({}, state, {
                isRequested: false,
                votes: [...state.votes, action.vote],
            });
        case types.EVENT_VOTE_FAILURE:
            return Object.assign({}, state, {
                isRequested: false,
                errorMessage: action.errorMessage
            });
        default:
            return state;
    }
}