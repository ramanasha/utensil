import React, { Component } from 'react';
import { connect } from 'react-redux';

import CenterColumn from './CenterColumn';
import MenuPanel from '../panels/menu/MenuPanel';

export default class Menu extends Component {
    render() {
        const { params } = this.props;

        return (
            <CenterColumn>
                <MenuPanel id={parseInt(params.id)} viewOnly={true}/>
            </CenterColumn>
        );
    }
}
