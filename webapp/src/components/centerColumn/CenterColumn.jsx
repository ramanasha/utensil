import '../../styles/column.scss'

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Title from '../Title';

export default class CenterColumn extends Component {
    render() {
        return (
            <div className="column-center">
                <Title/>
                {this.props.children}
            </div>
        );
    }
}
