"use strict";

import * as axios               from "axios";
import appSettings              from "../constants/applicationSettings";
const client = axios.create({baseURL: appSettings.serverPath});

export default {
    getUsers: function (page) {

        return client.get("/api/admin/users", {
            params: {
                page: page
            }
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (err) {
                throw err;
            });
    },
    removeUser: function (email) {
        return client.delete("/api/admin/user", {
            data: {
                email: email
            }
        })
            .then(function (response) {
                return response.statusText;
            })
            .catch(function (err) {
                throw err;
            })

    }
}
