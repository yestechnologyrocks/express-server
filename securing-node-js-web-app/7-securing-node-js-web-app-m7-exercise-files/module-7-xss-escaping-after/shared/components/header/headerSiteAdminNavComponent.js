"use strict";

import React, {Component}       from "react";
import { Link, IndexLink }      from "react-router";

class HeaderSiteAdminNav extends Component {
    render() {
        return (
            <ul>
                <li className="header-nav_item">
                    <Link to="timeline" activeClassName="header-active-link">Timeline</Link>
                </li>
                <li className="header-nav_item">
                    <Link to="results" activeClassName="header-active-link">Voting Results</Link>
                </li>
                <li className="header-nav_item">
                    <Link to="about" activeClassName="header-active-link">About</Link>
                </li>
                <li className="header-nav_item">
                    <Link to="admin/users?page=1" activeClassName="header-active-link">Admin</Link>
                </li>

            </ul>
        )
    }
}

export default HeaderSiteAdminNav;