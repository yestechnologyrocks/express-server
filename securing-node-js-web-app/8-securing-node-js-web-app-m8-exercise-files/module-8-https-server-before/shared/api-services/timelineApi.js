"use strict";

import * as axios               from "axios";
import appSettings              from "../constants/applicationSettings";
const client = axios.create({baseURL: appSettings.serverPath});

export default {
    getAllTimeLineItems: function () {
        return client.get("/api/timeline")
            .then(function (res) {
                return res.data["timelineItems"] || [];
            })
            .catch(function (err) {
                return [];
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
                return res.data["timelineItems"] || [];
            })
            .catch(function (err) {
                return [];
            });
    }


};
