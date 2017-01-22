import '../styles/title.scss';

import React, { Component } from 'react';

export default class Title extends Component {
    render() {
        return (
            <div className="title">
                <div className="heading">Consamables</div>
                <div className="subheading">Order food with your friends</div>
            </div>
        );
    }
}
