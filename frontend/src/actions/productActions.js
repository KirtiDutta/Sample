//contains all the actions of the product
import axios from 'axios'
import { PRODUCT_LIST_REQUEST ,
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL  } 
    from '../constants/productConstants'

//redux thunk allows us add a function within a function
// redux thunk is a middleware and we pass dispatch inside the redux thunk

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST})
        const {data} = await axios.get('/api/products')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message:
            error.message
        })
    }

}