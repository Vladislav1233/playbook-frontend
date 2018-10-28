// react, redux
import React from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from '../../store/actions/toggleMenu';

// style
import '../../style/bem-blocks/b-cover-page/index.scss';

function CoverPage(props) {
    return (
        <div className={`b-cover-page  ${props.toggleMenu ? "active" : ''}`} onClick={(e) => props.onToggleMenu(e)}></div>
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
        }
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(CoverPage);
