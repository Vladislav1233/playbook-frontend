import React from 'react';
import Responsive from 'react-responsive';

// like css
export const Mobile = props => <Responsive { ...props } minWidth={ 0 } />;
export const Tablet = props => <Responsive { ...props } minWidth={ 768 } />;
export const DesktopMin = props => <Responsive { ...props } minWidth={ 1024 } />;
export const Desktop = props => <Responsive { ...props } minWidth={ 1280 } />;
export const DesktopBig = props => <Responsive { ...props } minWidth={ 1440 } />;
export const DesktopFullHD = props => <Responsive { ...props } minWidth={ 1680 } />;

// invert media
export const NotMobile = props => <Responsive { ...props } maxWidth={ 0 } />;
export const NotTablet = props => <Responsive { ...props } maxWidth={ 767 } />;
export const NotDesktopMin = props => <Responsive { ...props } maxWidth={ 1023 } />;
export const NotDesktop = props => <Responsive { ...props } maxWidth={ 1279 } />;
export const NotDesktopBig = props => <Responsive { ...props } maxWidth={ 1439 } />;
export const NotDesktopFullHD = props => <Responsive { ...props } maxWidth={ 1679 } />;

// example
// const Desktop = props => <Responsive { ...props } minWidth={ 992 } />;
// const Tablet = props => <Responsive { ...props } minWidth={ 768 } maxWidth={ 991 } />;
// const Mobile = props => <Responsive { ...props } maxWidth={ 767 } />;
// const Default = props => <Responsive { ...props } minWidth={ 768 } />;
