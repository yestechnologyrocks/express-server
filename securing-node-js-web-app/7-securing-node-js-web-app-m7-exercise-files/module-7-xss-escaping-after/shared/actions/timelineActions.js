"use strict";
import * as types               from "../constants/actionTypes";
import timelineApi              from "../api-services/timelineApi";

function timelineItemsRequested() {
    return {
        type: types.TIMELINEITEMS_REQUEST,
        isRequested: true
    }
}

function timelineItemsReceived(data) {
    return {
        type: types.TIMELINEITEMS_RECEIVED,
        isRequested: false,
        timelineItems: data.timelineItems || [],
        search: data.search
    }
}

function timelineItemsRequestFailure(errorMessage) {
    return {
        type: types.TIMELINEITEMS_FAILURE,
        isRequested: false,
        errorMessage
    }
}

function filterCriteriaUpdate(filterCriteria){
    return {
        type: types.FILTERCRITERIA_UPDATE,
        filterCriteria
    }
}

export function getTimelineItems() {
    return async function (dispatch) {
        dispatch(timelineItemsRequested());
        try {
            const data = await timelineApi.getAllTimeLineItems();
            dispatch(timelineItemsReceived(data));

        } catch (error) {
            dispatch(timelineItemsRequestFailure(error));
        }
    }
}

export function filterTimelineItemsByDates(startDate, endDate) {
    return async function(dispatch) {
        dispatch(timelineItemsRequested());
        try {
            const data = await timelineApi.filterTimelineItemsByDates(startDate, endDate);
            dispatch(timelineItemsReceived(data));
        } catch (error) {
            dispatch(timelineItemsRequestFailure(error));
        }
    }
}

export function filterTimelineItemsBySearchCriteria(searchTerms){
    return async function(dispatch){
        dispatch(timelineItemsRequested());

        try{
            const data = await timelineApi.filterTimelineItemsBySearchCriteria(searchTerms);
            dispatch(timelineItemsReceived(data));
        } catch (error) {
            dispatch(timelineItemsRequestFailure(error));
        }
    }
}

export function updateFilterCriteria(filterCriteria) {
    return dispatch => {
        dispatch(filterCriteriaUpdate(filterCriteria));
    }
}