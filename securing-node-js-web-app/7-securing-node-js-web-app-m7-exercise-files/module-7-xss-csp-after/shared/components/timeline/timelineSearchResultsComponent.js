"use strict";

import React, {Component, PropTypes}            from "react";

class TimelineSearchResultsComponent extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const {searchTerms, events} = this.props;
        return (
            <div>
                <div className="timeline-event_banner">
                    <div className="timeline-event_details-title">
                        <h2 id="search-title"><span>Search Results for:</span> <span dangerouslySetInnerHTML={{__html: `${searchTerms}`}}></span> </h2>
                    </div>
                </div>
                <div className="search-results">
                    {
                        events.map((e, i) => {
                                return (<a key={i} href={`timeline/${e._id}`}>
                                    <div className="search-results_details">
                                        <h2>{e.name}</h2>
                                    </div>
                                </a>)
                            }
                        )
                    }
                </div>
            </div>
        )
    }
}

TimelineSearchResultsComponent.propTypes = {
    searchTerms: PropTypes.string,
    events: PropTypes.array
};

export default TimelineSearchResultsComponent;