import React, { Component } from 'react';

import MenuItem from './MenuItem';

export default class MenuSection extends Component {
    render() {
        const { name, items, viewOnly } = this.props;

        return (
            <div className="menu-section">
                <div className="menu-section-name">{name}</div>
                {items.map(item =>
                    <MenuItem key={item.get('name')} {...item.toJS()} viewOnly={viewOnly}/>
                )}
            </div>
        );
    }
}
