import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import reduxLogger from 'redux-logger'

import rootRedusers from './modules'

const configureStore = (reducers = {}, preLoadedState = {}, middLewares = []) => createStore(
    combineReducers({
        ...rootRedusers,
        ...reducers
    }),
    preLoadedState,
    compose(
        applyMiddleware(
            ...middLewares,
            thunk,
            reduxLogger
        ),
        /* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */
    )
);

export default configureStore