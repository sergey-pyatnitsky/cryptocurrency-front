import React, { Component } from 'react';
import Redirect, { Route } from 'react-router-dom'
import { ACCESS_TOKEN } from '../service/CommonService';
import { useNavigate } from 'react-router-dom';
import MainPage from '../page/MainPage';
import LoginPage from '../page/LoginPage';

interface RouteComponentProps {
    history: History;
    location: Location;
}

class OAuth2RedirectHandler extends Component<RouteComponentProps> {
    route = useNavigate();

    getUrlParameter(name: string) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            this.route("/");
            return <Route path="/" element={<MainPage />} />;
            // return <Redirect to={{
            //     pathname: "/profile",
            //     state: { from: this.props.location }
            // }} />;
        } else {
            // return <Route path="/login" element={<LoginPage />} />;
        }
    }
}

export default OAuth2RedirectHandler;