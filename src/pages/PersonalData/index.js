import React, { Component } from 'react';

// Note: components
// import Button from '../../components/ui-kit/Button/Button';

// Note: styles
import '../../style/bem-blocks/b-personal-data/index.scss';

class PersonalData extends Component {
  render() {
    return (
      <div className="container">
        <div className="text-container">
          <article className="b-personal-data">
            <h1>Пользовательское соглашение на обработку персональных данных.</h1>

            <ol>
              <li>
                <h2>Пользовательское соглашение</h2>

                <ol>
                  <li>
                    <p>Настоящее Пользовательское соглашение (именуемое в дальнейшем «Пользовательское Соглашение») регулирует отношения между владельцами системы PlayBook (именуемом в дальнейшем «PlayBook»), являющимися правообладателями сайта, расположенного в сети Интернет по адресу https://playbook.su/ , и физическим или юридическим лицом (именуемым в дальнейшем «Пользователь») в области предоставления и обработки персональных данных Пользователя.</p>
                  </li>
                </ol>
              </li>

              <li>
                <h2>Общие положения</h2>

                <ol>
                  <li>
                    <p>Пользовательское Соглашение вступает в силу с момента подтверждения Пользователем на сайте https://playbook.su/</p>
                  </li>
                  <li>
                    <p>«PlayBook» сохраняет за собой право изменять настоящее Пользовательское Соглашение в любое время без какого-либо специального уведомления. Если Пользователь продолжает пользоваться услугами «PlayBook» после публикации изменений в Пользовательском Соглашении, считается, что Пользователь тем самым принимает изменения условий Пользовательского соглашения.</p>
                  </li>
                  <li>
                    <p>Пользователем может быть любое дееспособное физическое лицо.</p>
                  </li>
                  <li>
                    <p>Пользователь имеет право отправить письмо к «PlayBook» по предоставленному далее адресу электронной почты manage.playbook@gmail.com с вопросом касаемым персональных данных Пользователя согласно закону "О персональных данных" от 27.07.2006 N 152-ФЗ.</p>
                  </li>
                </ol>
              </li>

              <li>
                <h2>Персональные данные</h2>

                <ol>
                  <li>
                    <p>Принятие Пользовательского соглашения осуществляется путем проставления Пользователем соответствующей отметки и является согласием пользователя на обработку персональных данных.</p>
                  </li>
                  <li>
                    <p>Пользователь несет ответственность за предоставление персональных данных иного лица.</p>
                  </li>
                  <li>
                    <p>Пользователь соглашается с тем, что «PlayBook» имеет право на хранение и обработку, в том числе и автоматизированную, любой информации, относящейся к персональным данным Пользователя в соответствии с Федеральным законом от 27.07.2006 N 152-ФЗ «О персональных данных», включая сбор, систематизацию, накопление, хранение, уточнение, использование, распространение (в том числе передачу), обезличивание, блокирование, уничтожение персональных данных, предоставленных Пользователем.</p>
                  </li>
                  <li>
                    <p>Пользователь согласен, что «PlayBook» использует персональные данные с целью выполнения договоренностей между «PlayBook» и Пользователем.</p>
                  </li>
                  <li>
                    <p>Пользователь согласен, что «PlayBook» может передавать данные другим Пользователям, которые также дали согласие на обработку своих персональных данных и ведут деятельность с «PlayBook» в предоставлении услуг, которым интересуется субъект персональных данных.</p>
                  </li>
                  <li>
                    <p>Пользователь согласен, что другие Пользователи смогут видеть в интерфейсе системы PlayBook  минимальные необходимые персональные данные субъекта для осуществления взаимодействия между Пользователями, которые интересуют их. Исключается обработка персональных данных Пользователя ради маркетинговой деятельности и любой другой, не касающейся деятельности «PlayBook».</p>
                  </li>
                  <li>
                    <p>Пользователь согласен получать уведомления по предоставленным им самим каналам связи о новых событиях и мероприятиях проводимых «PlayBook» и о событиях, касающихся Пользователя относительно деятельности «PlayBook».</p>
                  </li>
                </ol>
              </li>
            </ol>
          </article>
        </div>
      </div>
    )
  }
}

export default PersonalData;
