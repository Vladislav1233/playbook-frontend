// react, redux
import React from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from '../../store/actions/toggleMenu';
import { toggleCabinet } from '../../store/actions/toggleCabinet';

// style
import '../../style/bem-blocks/b-cover-page/index.scss';

function CoverPage(props) {
    console.log('render CoverPage');
    return (
        <div className={`b-cover-page  ${props.toggleMenu ? "active" : ''}`} 
            onClick={(e) => {
                props.onToggleMenu(e);
                props.onToggleCabinet(e, 'close');
            }}
        ></div>
    )
}

const mapStateToProps = (state) => {
    return {
        toggleMenu: state.toggleMenu.toggleMenu
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        onToggleMenu: (e) => {
            e.preventDefault();
            dispatch(toggleMenu())
        }, 
        onToggleCabinet: (e, status) => {
            e.preventDefault();
            dispatch(toggleCabinet(status));
        }
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(CoverPage);
