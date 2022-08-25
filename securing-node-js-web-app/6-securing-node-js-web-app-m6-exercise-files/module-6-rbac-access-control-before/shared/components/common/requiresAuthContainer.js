"use strict";

import React, {Component}               from "react";
import {browserHistory}                 from "react-router";
import {connect}                        from "react-redux";

export default function requiresAuth(ChildComponent, {role, redirectTo}) {
    class AuthenticationComponent extends Component {
        constructor(props) {
            super(props);

            this.checkAndRedirect = this.checkAndRedirect.bind(this);
            this.isAuthorized = this.isAuthorized.bind(this);
        }

        componentDidMount() {
            this.checkAndRedirect();
        }

        componentDidUpdate() {
            this.checkAndRedirect();
        }

        checkAndRedirect() {
            if (!this.isAuthorized()) {
                browserHistory.push(redirectTo);
            }
        }


        isAuthorized() {
            const {user} = this.props;
            return user && user.roles && user.roles.filter(r => r === role);
        }

        render() {
            const results = this.isAuthorized();
            return !!results && <ChildComponent {...this.props} />
        }
    }

    const mapStateToProps = (state) => {
        const {userDataState} = state;
        return {user: userDataState.user}
    };


    return connect(mapStateToProps)(AuthenticationComponent);
}