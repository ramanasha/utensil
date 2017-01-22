import React, { Component } from 'react';

export default class PanelHeader extends Component {
    render() {
        return (
            <div className="panel-header">{this.props.name}</div>
        );
    }
}
