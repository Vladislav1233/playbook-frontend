import React, { Component, Fragment } from 'react';
import { Field } from 'react-final-form';

// Note: components
import Checkbox from '../ui-kit/Checkbox/Checkbox';
import Input from '../ui-kit/Input/Input';

// Note: helpers
import { required } from '../../helpers/validate';
import { isEmptyObject } from '../../helpers/isEmptyObject';

// Note: styles
import '../../style/bem-blocks/b-create-additional-service/index.scss'

class CreateAdditionalService extends Component {

    render() {
        const { listAdditionalService, init } = this.props;

        return(
            <div className="b-create-additional-service">

                {listAdditionalService.map((item) => {
                    return <AdditionalServiceField name={item.id} item={item} key={item.id} init={init}/>
                })}
            </div>
        )
    }
}

const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (value === is ? children : null)}
    </Field>
);

// Note: example - https://codesandbox.io/s/8z5jm6x80
const AdditionalServiceField = ({ name, item, init }) => {
    return <Fragment>
        <div className="b-create-additional-service__check">
            <Field
                name={`${name}.service`}
                type="checkbox"
                render={({ input }) => {
                    return <Checkbox
                        { ...input }
                        id={`service_${item.id}`}
                    >
                        <span>{item.name}</span>
                    </Checkbox>
                }}
            />
        </div>

        <Condition when={`${name}.service`} is={true}>
            <div className="b-create-additional-service__info">
                <div className="b-create-additional-service__field-wrapper">
                    <Field
                        name={`${name}.cost`}
                        validate={required()}
                        initialValue={!isEmptyObject(init) && init[item.id] ? init[item.id].cost : ''}
                        render={({ input, meta }) => {
                            return <Input
                                { ...input }
                                labelText='Стоимость часа (₽)'
                                nameInput={input.name}
                                theme={{ blackColor: true }}
                                typeInput="number"
                                error={meta.error && meta.touched && meta.error}
                            />
                        }}
                    />
                </div>

                {item.showFieldForAvailability
                    && <div className="b-create-additional-service__field-wrapper">
                        <Field
                            name={`${name}.availability`}
                            initialValue={!isEmptyObject(init) && init[item.id] ? init[item.id].availability : ''}
                            type='number'
                            render={({ input }) => {
                                return <Input
                                    { ...input }
                                    labelText='В наличии (шт.)'
                                    typeInput="number"
                                    nameInput={input.name}
                                    theme={{ blackColor: true }}
                                />
                            }}
                        />
                    </div>
                }

                <Field 
                    name={`${name}.uuid`}
                    initialValue={!isEmptyObject(init) && init[item.id] ? init[item.id].uuid : ''}
                    component='input'
                    type='text'
                    style={ { display: 'none' } }
                />
            </div>
        </Condition>
    </Fragment>
}

export default CreateAdditionalService;