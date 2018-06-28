import axios from 'axios';
export const dataService = 
    ({ dependencies, config}) => 
        ({dispatch, getState}) => 
            next =>
                 action => {

    const { type, payload={}, process, validate} = action;
    const { baseConfig, serviceConfig } = config || {};
    const url = serviceConfig && serviceConfig[type] ? serviceConfig[type]['url'] : '';
    const method = serviceConfig && serviceConfig[type] ? serviceConfig[type]['method'] : '';

    const extractPromiseData = promise => {
        next({ type:`${type}_PENDING`});
        promise.then( response => response.data)
            .then( response => {
                next({ type:`${type}_FULLFILED`, payload:response});
            })
            .catch( error => {
                next({
                    type:`${type}_ERROR`,
                    payload:error
                })
            });
    }
    
    const postApiGenerator = () => {
        return axios.post(url, {
            ...baseConfig,
            method,
            data:payload
        });
    };
    
    const getApiGenerator = () => {
        return axios.get(url, {
            ...baseConfig,
            method,
            params:payload
        })
    };
    const accept = () => {
        switch(method){
            case 'POST':
                extractPromiseData(postApiGenerator());
                break;
            case 'GET':
                extractPromiseData(getApiGenerator());
                break;
            default:
        }
        if(process){
            process({...dependencies, dispatch, getState})
        } else {
            next(action);
        }
    }
    const reject = () =>{};

    if(validate) {
        return validate({...dependencies, dispatch, getState, accept, reject})
    } else {
        return accept()
    }
};
