import React, { Component } from 'react';
import { connect } from 'react-redux';

import CenterColumn from './CenterColumn';
import LoginPanel from '../panels/login/LoginPanel';

export default class Login extends Component {
    render() {
        return (
            <CenterColumn>
                <LoginPanel/>
            </CenterColumn>
        );
    }
}
