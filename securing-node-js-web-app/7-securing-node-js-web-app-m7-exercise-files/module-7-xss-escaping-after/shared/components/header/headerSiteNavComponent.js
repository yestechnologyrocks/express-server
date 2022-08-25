"use strict";

import React, {Component}       from "react";
import {Link, IndexLink}        from "react-router";
import MenuItem                 from "./menuItemComponent";
import requiresAuth             from "../common/requiresAuthComponent";

class HeaderSiteNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {user} = this.props;
        const func = () => <MenuItem Component={Link} to="admin/users?page=1" className="header-nav_item" activeClassName="header-active-link" >Admin</MenuItem>
        const Component = requiresAuth(func, { role: "admin", user: user});
        return (
            <ul>
                <MenuItem Component={IndexLink}  className="header-brand" activeClassName="header-active-link" to="timeline" >HH</MenuItem>
                <MenuItem Component={Link} to="timeline" className="header-nav_item" activeClassName="header-active-link" >Timeline</MenuItem>
                <MenuItem Component={Link} to="results" className="header-nav_item" activeClassName="header-active-link" >Voting Results</MenuItem>
                <MenuItem Component={Link} to="about" className="header-nav_item" activeClassName="header-active-link" >About</MenuItem>
                <Component />
            </ul>
        )
    }
}



export default HeaderSiteNav;