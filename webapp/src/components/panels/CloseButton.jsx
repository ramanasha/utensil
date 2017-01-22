import React, { Component } from 'react';
import { Link } from 'react-router';

export default class CloseButton extends Component {
    render() {
        return (
            <Link to="/" className="close-button">×</Link>
        );
    }
}
