import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer } from './reducers/productReducers'

//this function contains all the reducers
//productList is the reducer
const reducer = combineReducers({
    productList: productListReducer,
})

const initialState = {}

//thunk is the middleware used here
const middleware = [thunk]

//this function is to store states , etc
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store