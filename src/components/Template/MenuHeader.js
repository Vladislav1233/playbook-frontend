// react, redux
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { toggleMenu, closeMenu } from '../../store/actions/toggleMenu';
import { toggleCabinet } from '../../store/actions/toggleCabinet';
import { Link } from 'react-router-dom';
import { configPathRouter } from '../../App/configPathRouter';
import cn from 'classnames';

// Style
import '../../style/bem-blocks/b-menu/index.scss';
import '../../style/bem-blocks/b-hamburger/index.scss';

class MenuHeader extends Component {

    componentDidUpdate(prevProps) {
        if(this.props.location.pathname !== prevProps.location.pathname
            && prevProps.toggleMenu !== false) {

            this.props.onCloseMenu();
        }
    }

    render() {
        const hamburgerStyle = cn('b-hamburger', {
            'open': this.props.toggleMenu
        });

        return (
            <Fragment>
                <a href="" className={hamburgerStyle}
                    onClick={e => {
                        this.props.onToggleMenu(e);
                        this.props.onToggleCabinet(e, 'close');
                    }}
                > 1 </a>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ toggleMenu, identificate }) => {
    return {
       toggleMenu: toggleMenu.toggleMenu,
       isAuthorization: identificate.authorization,
       userRole: identificate.userRole
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleMenu: (e) => {
            e.preventDefault();
            dispatch(toggleMenu());
        },
        onCloseMenu: (e) => {
            if(e) {
                e.preventDefault();
            }
            dispatch(closeMenu());
        },
        onToggleCabinet: (e, status) => {
            e.preventDefault();
            dispatch(toggleCabinet(status));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuHeader);
