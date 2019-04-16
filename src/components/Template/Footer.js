// react, redux
import React, { Component } from 'react';
import { withRouter } from "react-router";
import cn from 'classnames';
// import { Link } from 'react-router-dom';

// helpers
// import { Tablet } from '../../helpers/mediaQuery';

// style
import '../../style/bem-blocks/b-footer/index.scss';
import '../../style/bem-blocks/b-logotype/index.scss';

class Footer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuthorization: {
				is: false,
				roleUser: null
			}
		}
	}

	render() {
		const { location } = this.props;
		const onRegistrationPages = (location.pathname === '/registration') || (location.pathname === '/authorization');
		const onMainPage = (location.pathname === '/');

		const rootClassFooter = cn(
			'b-footer',
			{
				'b-footer--login': onRegistrationPages,
				'b-footer--main': onMainPage,
			}
		)

		return (
			<footer className={ rootClassFooter }>
				<div className="container">
					<div className="b-footer__wrapper">
						<small className="b-footer__copyright">© playbook 2018-2019 • все права защищены</small>
						<a className="b-footer__social-link" href="https://vk.com/playbooksu" title="PlayBook вконтакте" target="_blank">
							<i className="fab fa-vk"></i>
						</a>
					</div>
				</div>
			</footer>
		);
	}
}

export default withRouter(Footer);
