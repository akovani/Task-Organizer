import preprodConfig from './preprod-config';
import prodConfig from './prod-config';

// function that returns config based on environment variable
const getConfig = () => {
    if (process.env.REACT_APP_ENV === 'preprod') {
        return preprodConfig;
    } else {
        return prodConfig;
    }
};

export default getConfig;
