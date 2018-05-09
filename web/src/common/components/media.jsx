import React from 'react';
import Responsive from 'react-responsive';

import breakpoints from 'common/styles/_media.scss';

const {
  mobileMax,
  tabletMin,
  tabletMax,
  desktopMin
} = _.mapValues(breakpoints, val => parseInt(val));

export const Desktop = props => <Responsive {...props} minWidth={desktopMin} />;

export const Tablet = props => <Responsive {...props} minWidth={tabletMin} maxWidth={tabletMax} />;

export const Phone = props => <Responsive {...props} maxWidth={mobileMax} />;

export const Mobile = props => <Responsive {...props} maxWidth={tabletMax} />;

export const Default = props => <Responsive {...props} minWidth={tabletMin} />;
