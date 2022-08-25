"use strict";

// ====================
//   /api/timeline
// ====================

/* eslint-disable no-console */

import React                         from "react";
import {Router}                      from "express";
import {getTimelineItemModel}        from "../data_access/modelFactory";
import colors                        from "colors";
import {timelineRangeSchema}         from "../validation/validationSchemas";

const timelineRouter = Router();

timelineRouter.route("/api/timeline(/:id/)?")
    .get(async function (req, res) {
        try {
            const {startDate, endDate} = req.query;
            const query = {hidden: false};
            if (startDate && endDate) {
                req.checkQuery(timelineRangeSchema);
                const errors = req.validationErrors();

                if(errors) {
                    return res.status(500).json(errors);
                }

                query["start"] = {$gte: startDate};
                query["end"] = {$lte: endDate};
            }

            const TimelineItem = await getTimelineItemModel();
            const timelineItems = await TimelineItem.find(query).exec();

            res.json({timelineItems: timelineItems});
        } catch (error) {
            console.log(colors.red("There was an error retrieving timeline items: " + error));
            res.status(500).send("There was an error retrieving timeline items.  Please try again later");
        }
    });

export default timelineRouter;

