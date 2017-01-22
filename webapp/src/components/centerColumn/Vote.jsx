import React, { Component } from 'react';

import CenterColumn from './CenterColumn';
import VotingPanel from '../panels/voting/VotingPanel';

export default class Vote extends Component {
    render() {
        const { params } = this.props;

        return (
            <CenterColumn>
                <VotingPanel id={parseInt(params.id)}/>
            </CenterColumn>
        );
    }
}
