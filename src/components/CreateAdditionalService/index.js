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

                {listAdditionalService.map((item, index) => {
                    return <Fragment key={index}>
                        <div className="b-create-additional-service__check">
                            <Field 
                                name={`service_${item.id}`}
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
                                name={`cost_${item.id}`}
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
                                    name={`availability_${item.id}`}
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
                })}
            </div>
        )
    }
}

export default CreateAdditionalService;