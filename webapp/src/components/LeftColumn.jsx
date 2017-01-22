import '../styles/column.scss'

import React, { Component } from 'react';
import { connect } from 'react-redux';

import ActiveOrderPanel from './panels/activeOrder/ActiveOrderPanel';
import PendingOrderPanel from './panels/pendingOrder/PendingOrderPanel';

export default class LeftColumn extends Component {
    render() {
        return (
            <div className="column-left">
                <ActiveOrderPanel/>
                <PendingOrderPanel/>
            </div>
        );
    }
}
