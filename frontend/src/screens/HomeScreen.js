import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  //useDispatch is used to dispatch actions
  const dispatch = useDispatch()
  //useSelctor is used to extract data from the global state i.e store
  const productList = useSelector(state => state.productList) 
  const { loading, error, products } = productList
useEffect(() => {
  dispatch(listProducts())
}, [dispatch] )  
return (
    <>
    <h1>Latest Products</h1>
    {
      loading ? (
        <Loader />
      ) : error ? (
        <Message varient='danger'>{error}</Message> //danger means red color message
      ) : (
        <Row>
        {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
        ))}
    </Row>
      )
    }
    </>
  )
}

export default HomeScreen