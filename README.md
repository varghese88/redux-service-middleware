# Redux-Service-Middleware

Redux Promise Middleware enables simple to integrate webservice call easily through [Redux](http://redux.js.org). 

First we need to define the service configuration

Here is the sample

```js
const config = {
    baseConfig:{
        baseURL: 'https://example.com',
        headers:{'content-type':'application/json'},
        timeout: 10000,
    },
    serviceConfig:{
        POST_DATA:{
            method:'GET',
            url:'/posts'
        }
    }
}
```
baseConfig - define the basic web service configuartion
serviceConfig - collection of object in which each object define redux action as key and the web service details as value

Additional features - Third party dependency injection, validate the action before dispatch, async dispatch( similar to thunk)

Middleware usage

Defining the middleware
```js
const store = createStore(
    reducer,applyMiddleware(dataService({config, dependencies})));
})
```
Define the redux action
```js
const getPostData = () =>({
    type:'POST_DATA',
    validate({dispatch, accept, reject }){
        if(check){
            accept();
        } else {
            reject();
        }
    },
    process({dispatch}){
        dispatch({ type:"TEST_DATA"})
    },
    payload:{}
})
```


Given a single action with an async payload, the middleware transforms the action to a separate a pending action and a separate fulfilled/rejected action, representing the states of the async action.

Varghese John:
- [GitHub](https://github.com/varghese88)

## License

[Code licensed with the MIT License (MIT)](/LICENSE). 
