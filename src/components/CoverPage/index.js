// react, redux
import React from 'react';
import cn from 'classnames';

// style
import '../../style/bem-blocks/b-cover-page/index.scss';

class CoverPage extends React.PureComponent {
	render() {
		const className = cn(
			'b-cover-page',
			this.props.className,
			{
				leaving: this.props.leaving
			}
		)

		return (
			<div
				className={className}
				onClick={this.props.onClick}
			>
			</div>
		)
	}
}

export default CoverPage;
