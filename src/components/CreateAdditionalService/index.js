import React, { Component, Fragment } from 'react';
import { Field } from 'react-final-form';

// Note: components
import Checkbox from '../ui-kit/Checkbox/Checkbox';
import Input from '../ui-kit/Input/Input';

class CreateAdditionalService extends Component {

    render() {
        const { listAdditionalService } = this.props;

        return(
            <div className="b-create-additional-service">

                {listAdditionalService.map((item) => {
                    return <AdditionalServiceField name={item.id} item={item} key={item.id} /> 
                })}
            </div>
        )
    }
}

// Note: example - https://codesandbox.io/s/8z5jm6x80
const AdditionalServiceField = ({ name, item }) => {
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

        <div className="b-create-additional-service__cost-wrapper">
            <Field 
                name={`${name}.cost`}
                render={({ input }) => {
                    return <Input
                        { ...input }
                        nameInput={input.name}
                        theme={{ blackColor: true }}
                        typeInput="number"
                    /> 
                }}
            /> 
        </div>

        {item.showFieldForAvailability 
            && <div className="b-create-additional-service__availability">
                <Field 
                    name={`${name}.availability`}
                    render={({ input }) => {
                        return <Input 
                            { ...input }
                            nameInput={input.name}
                            theme={{ blackColor: true }}
                        />
                    }}
                />
            </div>
        }
    </Fragment>
}

export default CreateAdditionalService;