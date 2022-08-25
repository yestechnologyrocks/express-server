"use strict";

import React, {PropTypes, Component}       from "react";
import {Link}                              from "react-router";
import _                                   from "underscore"

class HeaderUserProfile extends Component {
    constructor(props) {
        super(props);

        this.getIdentity = this.getIdentity.bind(this);
    }

    getIdentity(user) {
        let identity;
        if (!_.isEmpty(user)) {
            identity = user.displayName ? `${user.displayName}` :
                (user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` :
                    user.firstName ? `${user.firstName}` :
                        user.lastName ? `${user.lastName}` :
                            user.username ? `${user.username}` :
                                undefined
        }
        return identity;
    }

    render() {
        const {user, logout} = this.props;
        const identity = this.getIdentity(user);
        return (
            <ul>
                <li className="flex-row flex-align-center">
                    <span className="profile-identity">Welcome </span>
                    <Link to={`user/profile/${user.id}`}>{identity}</Link>
                </li>
                <li><a href="#" onClick={logout}>
                    <i className="fa fa-sign-out"></i>
                    logout
                </a>
                </li>
            </ul>
        )
    }
}

HeaderUserProfile.propTypes = {
    user: PropTypes.object.isRequired
};

export default HeaderUserProfile;
