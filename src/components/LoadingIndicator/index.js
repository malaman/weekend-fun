import React, {PropTypes} from 'react';
import './style.scss';

class LoadingIndicator extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired
    };

    render() {
        const {isLoading} = this.props;
        return (
            <div
                className='loading-container'
                style={{visibility: isLoading ? 'visible' : 'hidden'}}
            >
                <div className={'bar'}></div>
                <div className={'bar'}></div>
            </div>
        );
    }
}

export default LoadingIndicator;
