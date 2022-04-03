import { PRODUCT_LIST_REQUEST ,
     PRODUCT_LIST_SUCCESS, 
     PRODUCT_LIST_FAIL  } 
     from '../constants/productConstants'
export const productListReducer = (state = { products: [] }, action ) => {
    switch (action.type)
    {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            // payload is the info that is being requested or transfered in te form of packets.. it can not be accessed independently
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL :
            return { loading: false, error: action.payload }
        default:
            return state
    }
}