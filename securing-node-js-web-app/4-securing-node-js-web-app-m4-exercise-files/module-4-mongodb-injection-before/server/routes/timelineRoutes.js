"use strict";

// ====================
//   /api/timeline
// ====================

/* eslint-disable no-console */

import React                         from "react";
import {Router}                      from "express";
import {getTimelineItemModel}        from "../data_access/modelFactory";
import colors                        from "colors";

const timelineRouter = Router();

timelineRouter.route("/api/timeline(/:id/)?")
    .get(async function (req, res) {
        try {
            const {startDate, endDate} = req.query;
            const query = {$where: "this.hidden == false"};

            if (startDate && endDate) {
                query["$where"] = "this.start >= new Date('" + startDate + "') && " +
                        "this.end <= new Date('" + endDate + "') &&" +
                        "this.hidden == false;";
            }

            const TimelineItem = await getTimelineItemModel();
            const timelineItems = await TimelineItem.find(query);
            console.log(colors.yellow(`# of Timeline Items retrieved: ${timelineItems.length}`));
            return res.json({timelineItems: timelineItems});

        } catch (error) {
            console.log(colors.red("There was an error retrieving timeline items: " + error));
            res.status(500).send("There was an error retrieving timeline items.  Please try again later");
        }
    });

export default timelineRouter;

