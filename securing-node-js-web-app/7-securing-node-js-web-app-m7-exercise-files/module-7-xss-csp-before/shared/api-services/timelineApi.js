"use strict";

import * as axios               from "axios";
import appSettings              from "../constants/applicationSettings";

const client = axios.create({baseURL: appSettings.serverPath});

export default {
    getAllTimeLineItems: function (startDate, endDate, searchTerms) {
        return client.get("/api/timeline",{
            params: {
                startDate: startDate,
                endDate: endDate,
                search: searchTerms
            }
        })

            .then(function (res) {
                return res.data;
            })
            .catch(function (err) {
                return {};
            });
    },
    filterTimelineItemsByDates: function (startDate, endDate) {
        return client.get("/api/timeline", {
            params: {
                startDate: startDate,
                endDate: endDate
            }
        })
            .then(function (res) {
                return res.data;
            })
            .catch(function (err) {
                return {};
            });
    },
    filterTimelineItemsBySearchCriteria: function (searchTerms) {
        return client.get("/api/timeline", {
            params: {
                search: searchTerms
            },
        })
            .then(function (res) {
                return res.data;
            })
            .catch(function (err) {
                return {};
            });
    }

};
