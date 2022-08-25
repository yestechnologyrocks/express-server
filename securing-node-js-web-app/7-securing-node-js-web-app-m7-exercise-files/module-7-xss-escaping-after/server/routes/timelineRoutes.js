"use strict";

// ====================
//   /api/timeline
// ====================

/* eslint-disable no-console */

import React                         from "react";
import {Router}                      from "express";
import {getTimelineItemModel}        from "../data_access/modelFactory";
import {timelineRangeSchema}         from "../validation/validationSchemas";
import xssFilters                    from "xss-filters";
const timelineRouter = Router();

timelineRouter.route("/api/timeline")
    .get(async function (req, res) {
        try {
            const {startDate, endDate, search} = req.query;

            const encoded = xssFilters.inHTMLData(search);

            const query = { hidden: false };
            if (startDate && endDate) {
                req.checkQuery(timelineRangeSchema);
                const errors = req.validationErrors();

                if(errors) {
                    return res.status(500).json(errors);
                }

                query["start"] = {$gte: startDate};
                query["end"] = {$lte: endDate};
            }

            if (search) {
                query["name"] = {$regex: `${encoded}`, $options: "i"};
            }

            const TimelineItem = await getTimelineItemModel();
            const timelineItems = await TimelineItem.find(query).exec();

            res.json({
                timelineItems: timelineItems,
                search: encoded
            });
        } catch (error) {
            res.status(500).send("There was an error retrieving timeline items.  Please try again later");
        }
    });

timelineRouter.route("/api/timeline");

export default timelineRouter;

