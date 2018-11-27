import React, { Component } from 'react';

// Note: components
import ProfileTab from './ProfileTab';
import ProfileTabContent from './ProfileTabContent';

// Note: style
import '../../style/bem-blocks/b-profile-tabs/index.scss';

class ProfileTabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: props.children[0].props.label
        }
    }


    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const { children } = this.props;
        const { activeTab } =this.state;

        return(
            <div className="b-profile-tabs">
                <ul className="b-profile-tabs__list">
                    {children.map(child => {
                        const { label, src } = child.props;

                        return (
                            <ProfileTab 
                                key={label}
                                label={label}
                                onClick={this.onClickTabItem}
                                src={src}
                            />
                        )
                    })}                    
                </ul>

                <ProfileTabContent>
                    {children.map(child => {
                        if (child.props.label !== activeTab) return null;
                        return child.props.children;
                    })}
                </ProfileTabContent>
            </div>
        )
    }
}

export default ProfileTabs;
