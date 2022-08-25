"use strict";

import React, {Component}            from "react";
import {connect}                           from "react-redux";

export default function requiresAuth(ChildComponent, {role, user}) {
    class AuthenticationComponent extends Component {
        constructor(props) {
            super(props);

            this.isAuthorized = this.isAuthorized.bind(this);
            this.updateAuthorizationState = this.updateAuthorizationState.bind(this);
            this.state = {
                authorized: false
            }
        }

        componentWillMount() {
            this.updateAuthorizationState();
        }

        componentDidMount() {
            this.updateAuthorizationState();
        }

        updateAuthorizationState() {
            let {authorized} = this.state;
            authorized = this.isAuthorized();
            this.setState({authorized});
        }

        isAuthorized() {
            return !!(user && user.roles && user.roles.length && user.roles.find(r => r === role));
        }

        render() {
            const {authorized} = this.state;
            return authorized && <ChildComponent {...this.props} />
        }
    }

    return AuthenticationComponent;
}