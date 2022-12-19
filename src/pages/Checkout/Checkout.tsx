import React, { useEffect, useState } from 'react'
import  Container  from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addOrder, fetchAddress } from '../../store/UserSlice';
import style from './checkout.module.css'
import {GrFormEdit} from 'react-icons/gr'
import AddressForm from './AddressForm';
import { useToast } from '@chakra-ui/react'
import { Navigate, useNavigate } from 'react-router-dom';
import { getCartItem } from '../../store/CartSlice';

const Address = ({adr, setSelectedAddress, setEnableAddressEditForm, enableAddressEditForm}:any) => {
    const [active, setActive] = useState<any>()
    // console.log(adr)
    return(
        <div className={style.addressContainer}>
            <div>
                <input name="address" onClick={() => {setActive(adr); setSelectedAddress(adr)}} type='radio'/> 
            </div>
            <div className='flexRow sb'>
                <div style={{width: '100%'}}>
                    <div className={style.addressinfo}>
                        <div className={style.addressDetails}>
                            <span className="addressName">{adr.name}</span>
                            <span className={style.addressType}>{adr.addressType}</span>
                            <span className="addressMobileNumber">{adr.mobileNumber}</span>
                        </div>
                        <div className={style.fullAddress}>
                            {adr.address},{adr.locality} <br /> {`${adr.state} - ${adr.pinCode}`}
                        </div>
                        {active == adr ? <button onClick={() => {setSelectedAddress(adr); setEnableAddressEditForm(!enableAddressEditForm)}} style={{position: 'absolute', right: '20px', top: '20px'}}><GrFormEdit fontSize={20}/></button> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Checkout = () => {
  const auth = useSelector((state:any) => state.auth);
  const user = useSelector((state:any) => state.user)
  const cart = useSelector((state:any) => state.cart)
  const [selectedAddress, setSelectedAddress] = useState<any>(null)
  const dispatch = useDispatch<AppDispatch>()
  const [enableAddressEditForm, setEnableAddressEditForm] = useState<any>(false)
  const toast = useToast()
  const [confirmOrder, setConfirmOrder] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    auth.authenticate && dispatch(fetchAddress());
    auth.authenticate && dispatch(getCartItem())
  }, [auth.authenticate]);

//   console.log(selectedAddress)

  const handleSubmitForm = () => {
    // let address {

    // }   
    setEnableAddressEditForm(!enableAddressEditForm)
  }

  const handleConfirmOrder = () => {
    if(!selectedAddress){
        toast({
            description: "Please select address",
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top'
          })
    }
    const totalAmount = Object.keys(cart.cartItems).reduce((totalPrice:any, key:any) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
    },0)

    const items = Object.keys(cart.cartItems).map((key) => ({
        productId: key,
        payablePrice: cart.cartItems[key].price,
        purchasedQty: cart.cartItems[key].qty,
    }));

    const payload = {
        addressId: selectedAddress._id,
        totalAmount,
        items,
        paymentStatus: "pending",
        paymentType: "cod",
    }
    // console.log(payload)
    dispatch(addOrder(payload))
    setConfirmOrder(true)
  }

  useEffect(() => {
    if (confirmOrder && user.placedOrderId) {
      navigate(`/order_details/${user.placedOrderId}`);
    }
  }, [user.placedOrderId]);

    let totalItem= Object.keys(cart.cartItems).reduce(function (qty:any, key:any) {
    return qty + cart.cartItems[key].qty;
    }, 0)

    let totalPrice= Object.keys(cart.cartItems).reduce((totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
    }, 0)

    let deliveryPrice = totalPrice>1000? 0: 100;

  return (
    <Container fluid="lg">
        <div style={{display: 'flex'}}>
            <div className={style.checkOutLeft}>
                <div className={style.boxContainer} >
                    {auth.authenticate == true 
                    ?   <div>
                        <h5 style={{marginBottom: '20px'}}>MY INFORMATION</h5>
                        <p>Email: {auth.user.email}</p>
                    </div> : 'Please Sign in to checkout'}
                </div>
                <div className={style.boxContainer}>
                        <h5 style={{marginBottom: '20px'}}>SHIPPING DETAILS</h5>
                        <div className={style.address}>
                            {user.address.map((adr:any) => {
                                return <Address
                                            adr={adr} 
                                            key={adr._id}
                                            setSelectedAddress={setSelectedAddress}
                                            setEnableAddressEditForm={setEnableAddressEditForm}
                                            enableAddressEditForm={enableAddressEditForm}
                                        />
                            })
                            }
                            <button onClick={() => {setSelectedAddress(null); setEnableAddressEditForm(!enableAddressEditForm)}} className={style.cmnbtn}>Add Address</button>
                        </div>
                        <div style={{display: enableAddressEditForm ? 'block' :'none'}}>
                            {
                                enableAddressEditForm?
                                <AddressForm 
                                setEnableAddressEditForm={setEnableAddressEditForm}
                                enableAddressEditForm={enableAddressEditForm}
                                initialData={selectedAddress}
                                />
                                : ''
                            }
                            
                        </div>
                </div>
                <div className={style.boxContainer}>
                    <h5 style={{marginBottom: '20px'}}>Payment Options</h5>
                    <input type="radio" name="paymentOption" value="cod" />
                    <label htmlFor='paymentOption'>Cash on delivery</label>
                    <div style={{marginTop: '20px'}}>
                        <button onClick={handleConfirmOrder} className={style.cmnbtn}>Place Order</button>
                    </div>
                </div>
            </div>
            <div className={style.checkOutRight}>
            <div>
                <div style={{fontSize: '13px', borderBottom: '1px solid #222', padding: '20px 0'}}>
                <p style={{display: 'flex', justifyContent: 'space-between' }}> <span>Total item</span>{totalItem}</p>
                <p style={{display: 'flex', justifyContent: 'space-between' }}> <span>Order value</span>Rs.{totalPrice}</p>
                <p style={{display: 'flex', justifyContent: 'space-between' }}><span>Delivery</span><span>{totalPrice>1000? 'Free': deliveryPrice}</span></p>
                </div>
                <p style={{display: 'flex', justifyContent: 'space-between', paddingTop: '8px', paddingBottom: '20px' }}><p>Total</p><p>{totalPrice + deliveryPrice}</p></p>
          </div>
            </div>
        </div>
        
    </Container>
  )
}

export default Checkout

