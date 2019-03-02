import React, { Component } from 'react';

// Note: components
import Button from '../../components/ui-kit/Button/Button';

// Note: styles
import '../../style/bem-blocks/b-guide/index.scss';

class StyleGuide extends Component {
  render() {
    return (
      <div className="container">
        <div className="b-guide">
          <h1>Style guide: </h1>

          <section className="b-guide__section">
            <h2 className="b-guide__heading"> Headings: </h2>
            <h1> Example h1 </h1>
            <h2> Example h2 </h2>
            <h3> Example h3 </h3>
            <h4> Example h4 </h4>
            <h5> Example h5 </h5>
            <h6> Example h6 </h6>
          </section>

          <section className="b-guide__section">
            <h2 className="b-guide__heading"> Typography: </h2>
            <p> Example p Example p </p>
          </section>

          <section className="b-guide__section">
            <h2 className="b-guide__heading"> Buttons: </h2>
            <Button name="Кнопка" modif="b-button--hollow"/>
          </section>
        </div>
      </div>
    )
  }
}

export default StyleGuide;