"use strict";

import React, {PropTypes}           from "react";
import DatePicker       from "react-datepicker";
import moment           from "moment";

const TimelineInteractionsComponent = ({filterCriteria, onStartDateChange, onEndDateChange, onStackOrientationChange, onSearchCriteriaChange, submitSearch, search}) => {

    return (
        <div className="timeline-info-bar_filter-criteria">
            <div className="search-criteria">
                <input
                    type="text"
                    name="searchTerms"
                    onChange={onSearchCriteriaChange}
                    value={search}
                    placeholder="Search"
                />
                <button onClick={submitSearch} className="btn btn-primary" tabIndex="6">Search</button>
            </div>
            <div className="filter-criteria">
                <label htmlFor="stackedOrientation">Stack Events?</label>
                <input
                    type="checkbox"
                    name="stackedOrientation"
                    checked={filterCriteria.stackOrientation}
                    onChange={onStackOrientationChange}
                />

                <label htmlFor="startDate">From</label>
                <DatePicker
                    selected={moment(filterCriteria.startDate)}
                    onChange={onStartDateChange}
                    name="startDate"
                />

                <label htmlFor="endDate">To</label>
                <DatePicker
                    selected={moment(filterCriteria.endDate)}
                    onChange={onEndDateChange}
                    name="endDate"
                />
            </div>
        </div>
    )
};

TimelineInteractionsComponent.propTypes = {
    filterCriteria: PropTypes.object.isRequired,
    onStartDateChange: PropTypes.func.isRequired,
    onEndDateChange: PropTypes.func.isRequired,
    onStackOrientationChange: PropTypes.func.isRequired,
    onSearchCriteriaChange: PropTypes.func.isRequired,
    submitSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired
};

export default TimelineInteractionsComponent;