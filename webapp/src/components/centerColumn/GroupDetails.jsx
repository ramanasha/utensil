import React, { Component } from 'react';
import { connect } from 'react-redux';

import CenterColumn from './CenterColumn';
import OrganizedOrderPanel from '../panels/organizedOrder/OrganizedOrderPanel';

export default class GroupDetails extends Component {
    render() {
        const { params } = this.props;

        return (
            <CenterColumn>
                <OrganizedOrderPanel id={parseInt(params.id)}/>
            </CenterColumn>
        );
    }
}
