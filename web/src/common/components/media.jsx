import React from 'react';
import Responsive from 'react-responsive';
import _ from 'lodash';

import breakpoints from 'common/styles/_media.scss';

const {
  phoneMax,
  tabletMin,
  tabletMax,
  desktopMin,
} = _.mapValues(breakpoints, val => parseInt(val, 10));

export const Desktop = props => <Responsive {...props} minWidth={desktopMin} />;

export const Tablet = props => <Responsive {...props} minWidth={tabletMin} maxWidth={tabletMax} />;

export const Phone = props => <Responsive {...props} maxWidth={phoneMax} />;

export const Mobile = props => <Responsive {...props} maxWidth={tabletMax} />;

export const Default = props => <Responsive {...props} minWidth={tabletMin} />;
