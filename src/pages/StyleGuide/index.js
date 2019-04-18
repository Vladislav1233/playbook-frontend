import React, { Component } from 'react';
import cn from '../../helpers/bem.js'
// Note: components
import Button from '../../components/ui-kit/Button/Button';
import Input from '../../components/ui-kit/Input/Input';
import Radio from '../../components/ui-kit/Radio';
import Checkbox from '../../components/ui-kit/Checkbox/Checkbox';

// Note: styles
import '../../style/bem-blocks/b-guide/index.scss';

// bem class
const rootCls = cn('new-react-block');

class StyleGuide extends Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className="container">
				<div className="b-guide">
					<h1>Style guide: </h1>

					<section className="b-guide__section">
						<div className={ rootCls() }>
							class = <b>{ rootCls() }</b>
							<br />
							class mod = <b>{ rootCls({ 'mod': true }) }</b>

							<div className={ rootCls('element') }>
								class = <b>{ rootCls('element') }</b>

								<div className={ rootCls('element', { mod: true }) }>
									class = <b>{ rootCls('element', { mod: true }) }</b>
								</div>
							</div>
						</div>
					</section>

					<section className="b-guide__section">
						<h2 className="b-guide__heading"> Headings: </h2>
						<h1> Example h1 </h1>
						<h2> Example h2 </h2>
						<h3> Example h3 </h3>
						<h4> Example h4 </h4>
						<h5> Example h5 </h5>
						<h6> Example h6 </h6>
					</section>

					<section className="b-guide__section" style={ { fontSize: '20px' } }>
						<h2 className="b-guide__heading"> Typography: </h2>
						<p style={ { fontFamily: 'montserratlight' } }> 300 Example p Example p Example p Example p  </p>
						<p style={ { fontFamily: 'montserratregular' } }> 400 Example p Example p Example p Example p  </p>
						<p style={ { fontFamily: 'montserratmedium' } }> 500 Example p Example p Example p Example p  </p>
						<p style={ { fontFamily: 'montserratbold' } }> 700 Example p Example p Example p Example p  </p>
					</section>

					<section className="b-guide__section">
						<h2 className="b-guide__heading"> Buttons: </h2>
						<Button name="Кнопка" modif="b-button--hollow" />
					</section>

					<section className="b-guide__section">
						<h2 className="b-guide__heading"> Inputs: </h2>
						<Input
							placeholder="Ваше имя"
							typeInput="text"
							idInput="first_n123edqame"
						/>
					</section>

					<section className="b-guide__section">
						<h2 className="b-guide__heading"> Radio: </h2>
						<fieldset className="b-booking-form__fieldset">
							<Radio
								key='playground_other'
								name='playground'
								id='1'
								text='Другое'
								value='playground_other'
								onChange={ e => { console.log(e) } }
							/>

							<Radio
								key={ `1` }
								name="playground"
								text='Другое'
								id={ `1` }
								checked={ true }
								onChange={ e => { console.log(e) } }
							/>
						</fieldset>
					</section>

					<section className="b-guide__section">
						<h2 className="b-guide__heading"> Checkbox: </h2>
						<Checkbox
							name='name'
							id='court-1'
							value={ 4 }
							checked={ true }
							onChange={ e => { console.log(e) } }
							modif='b-checkbox--add-schedule'
						>
							<span>name 1</span>
						</Checkbox>
						<Checkbox
							name="name2"
							id='court-2'
							value={ 4 }
							onChange={ e => { console.log(e) } }
							modif='b-checkbox--add-schedule'
						>
							<span>name2</span>
						</Checkbox>
					</section>
				</div>
			</div>
		)
	}
}

export default StyleGuide;