import React, { Component } from 'react';
import { connect } from 'react-redux';

import CenterColumn from './CenterColumn';
import MyOrderPanel from '../panels/myOrder/MyOrderPanel';

export default class OrderDetails extends Component {
    render() {
        const { params } = this.props;

        return (
            <CenterColumn>
                <MyOrderPanel id={parseInt(params.id)}/>
            </CenterColumn>
        );
    }
}
