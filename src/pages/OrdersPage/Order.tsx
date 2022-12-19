import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SingleOrder from '../../components/SingleOrder/SingleOrder';
import { AppDispatch } from '../../store/store';
import { getOrders } from '../../store/UserSlice';
import style from '../../components/SingleOrder/singleOrder.module.css'

const Order = () => {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state:any) => state.user);

    useEffect(() => {
        dispatch(getOrders());
      }, []);
      console.log(user.orders)
  return (
    <Container fluid="lg">
        <h1 className={style.heading} >My Orders</h1>
        {user?.orders?.map((order:any) => {
            return order.items.map((item:any) => (
                <SingleOrder item={item} order={order} key={item.productId._id}/>
            ))
        })
        }
    </Container>
  )
}

export default Order