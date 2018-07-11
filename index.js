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
    const isPayloadFn = payload && typeof payload === 'function';
    const content =  isPayloadFn? payload({...dependencies}): payload;
    const isPayloadPromise = content && (typeof content === 'object' || typeof content === 'function') && typeof content.then === 'function';

    const promiseSuccess = response => {
        next({ type:`${type}_FULFILLED`, payload:response});
    };

    const promiseFailure = error => {
        next({
            type:`${type}_REJECTED`,
            payload:error
        })
    };
    const extractPromiseData = promise => {
        next({ type:`${type}_PENDING`});
        promise.then( response => response.data).then(promiseSuccess).catch(promiseFailure);
    };

    const postApiGenerator = () => {
        return axios.post(url, {
            ...baseConfig,
            method,
            data:content
        });
    };

    const getApiGenerator = () => {
        return axios.get(url, {
            ...baseConfig,
            method,
            params:content
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
        isPayloadPromise && content.then(promiseSuccess).catch(promiseFailure);
        if(process){
            process({...dependencies, dispatch, getState})
        } else {
            next(action);
        }
    };
    const reject = () =>{};

    if(validate) {
        return validate({...dependencies, dispatch, getState, accept, reject})
    } else {
        return accept()
    }
};
