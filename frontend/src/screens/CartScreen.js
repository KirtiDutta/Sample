import React, { useEffect } from 'react'
import { Link,  useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({}) => {
  const Navigate = useNavigate()
  const {id} = useParams() //useParams can't be used in useEffect
  const {qty} = useParams()
  const productId = id
  //const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)  //used to fetch items in redux and useDispatch is used to execute
  const { cartItems } = cart

  useEffect(() => {
    console.log(`cartPage ${id} :${qty}`)
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  
  const checkoutHandler = () => {
    Navigate("/login?redirect=shipping")
    // if logged in then it would be redirected to shipping else directed to login page
  }
  return (
    <Row>
     <Col md={8}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? ( //error if cart is empty
        <Message> 
          Your Cart is empty <Link to='/'>Go Back</Link>
        </Message>
      ) : (
        <ListGroup variant="flush">
          {cartItems.map(item => (
            <ListGroup.Item key={item.product}>
              <Row>
                <Col md={2}> 
                  <Image src={item.image} alt={item.name} fluid rounded />  
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>Rs{item.price}</Col>
                <Col md={2}>
                <Form.Control
                  as= 'select'
                  value = {item.qty}
                  onChange ={(e) => dispatch(addToCart(item.product,
                    Number(e.target.value)))}
                  >
                   { [...Array(item.countInStock).keys()].map(x => (
                      <option key ={x + 1} value ={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col> 
                {/* md (medium devices) screen ke hisab se column ko adjust krta h */}
                <Col md={2}> 
                  <Button type='button' variant='light' onClick= {() =>
                    removeFromCartHandler(item.product)
                  }>
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup> //flush is used to remove extra space
      )
    }
     </Col>
     <Col md={4}>
                  <Card> 
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <h2>
                          {/* to calculate total no. of items added in cart  
                  items ki total qty ko add krne ke liye we are using reduce function*/}
                          Subtotal({ cartItems.reduce((acc, item) => acc + item.qty, 0)})
                          items
                        </h2>
                        Rs 
                        {/* to add total price no. of items added in cart  */}
                        {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price ,0)
                        .toFixed(2)
                        // toFixed is to display price upto 2 decimal places
                        }
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {/* proceed to checkout button */}
                        <Button type="button" className='btn-block' disabled={cartItems.length
                        ===0} onClick={checkoutHandler}>
                          Proceed to Checkout
                        </Button>

                      </ListGroup.Item>
                    </ListGroup>

                  </Card>
                </Col>
    </Row>
)}

export default CartScreen