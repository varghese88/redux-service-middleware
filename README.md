# Redux-Service-Middleware

Redux Service Middleware enables simple to integrate webservice call easily through [Redux](http://redux.js.org). 

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
- baseConfig - define the basic web service configuartion
- serviceConfig - collection of object in which each object define redux action as key and the web service details as value

> Additional features 
 - Third party dependency injection
 - validate the action before dispatch 
 - async dispatch( similar to thunk)
 - promise payload
 - dependency injection on validate, process and payload 

Middleware usage

Defining the middleware
```js
const store = createStore(
    reducer,applyMiddleware(dataService({config, dependencies})));
})
```
Define the redux action
```js
example 1

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
    complete({ dispatch, resposne, error }){
        console.log(response)
    }
    payload:{
        userId:45666
    }
})

example 2
Dependency Injection on process, validate and payload

const getPostData = () =>({
    type:'POST_DATA',
    validate({dispatch, accept, reject, uuid }){
        if(check){
            accept();
        } else {
            reject();
        }
    },
    process({dispatch, uuid }){
        dispatch({ type:"TEST_DATA", payload:{uuid}})
    },
    payload({ uuid }){
         return {uuid};
    }
})
```
- Internaly this middleware uses axios as httpclient
- Currently it supports **REST** GET and POST method
- Pass parms - **GET**/ body - **POST** or **PUT** in payload as object


Given a single action with an async payload, the middleware transforms the action to a separate a pending action and a separate fulfilled/rejected action, representing the states of the async action.

Varghese John:
- [GitHub](https://github.com/varghese88)

## License

[Code licensed with the MIT License (MIT)](/LICENSE). 
