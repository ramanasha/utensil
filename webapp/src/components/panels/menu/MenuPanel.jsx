import '../../../styles/panels/menu-panel.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import PanelHeader from '../PanelHeader';
import MenuSection from './MenuSection';
import CloseButton from '../CloseButton';
import { getRestaurantName, getMenu } from '../../../selectors';

class MenuPanel extends Component {
    render() {
        const { id, name, menu, viewOnly } = this.props;

        return (
            <div className="menu-panel">
                <div className="menu-header">
                    <CloseButton/>
                    <div className="menu-name">{`${name} Menu`}</div>
                </div>
                <div className="scrollable">
                    {menu.map(section =>
                        <MenuSection
                            viewOnly={viewOnly}
                            key={section.get('menuSectionId')}
                            name={section.get('name')}
                            items={section.get('items')}
                        />
                    )}
                </div>
                <MenuToolbar id={id} viewOnly={viewOnly}/>
            </div>
        );
    }
}

class MenuToolbar extends Component {
    render() {
        const { id, viewOnly } = this.props;
        return (
            <div className="toolbar">
                {viewOnly ?
                    <Link className="button">Start Order</Link>
                    : <Link className="button">Start without items</Link>}
                <Link to={`/start/${id}/outing`} className="button">
                    Start Outing
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    name: getRestaurantName(state, ownProps.id),
    menu: getMenu(state, ownProps.id)
});

export default connect(
    mapStateToProps
)(MenuPanel)
