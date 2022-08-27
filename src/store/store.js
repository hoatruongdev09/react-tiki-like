import { createStore, compose, applyMiddleware } from 'redux'
import { rootReducer } from './rootReducer'

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
};

const middlewares = [loggerMiddleware]
const enhancedMiddlewares = compose(applyMiddleware(...middlewares))

export const store = createStore(rootReducer, undefined, enhancedMiddlewares)

