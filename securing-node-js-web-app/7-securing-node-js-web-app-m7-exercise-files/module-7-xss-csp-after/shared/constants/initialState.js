"use strict";
export const timelineState = {
    timelineItems: [],
    search: "",
    isRequested: false,
    filterCriteria: {
        startDate: "",
        endDate: "",
        stackOrientation: false
    }
};

export const registrationState = {
    isAuthenticated: false,
    isRequested: false,
    isRegistered: false,
    errors: {},
    registration: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }
};

export const loginState = {
    isAuthenticated: false,
    isRequested: false,
    errors: {},
    creds: {
        username: "",
        password: ""
    }
};

export const userState = {
    user:{},
    votes: [],
    editProfile: false
};

export const votingResultsState = {
    isRequested: false,
    votingResults: []
};

export const adminState = {
    users: [],
    totalPages: 0,
    page: 0
}
