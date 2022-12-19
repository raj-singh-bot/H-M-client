import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import style from './singleOrder.module.css'

const SingleOrder = ({item, order}:any) => {
  return (
    <div >
        <Link to={`/order_details/${order._id}`}>
            <div style={{display: 'flex'}}>
                <div className={style.orderImgContainer}>
                    <img src={item.productId.productImages[0].img}  alt='img'/>
                </div>
                <div className={style.orderRow} >
                    <div className={style.orderName} >{item.productId.name}</div>
                    <div className={style.orderPrice}>
                        {item.payablePrice}
                    </div>
                    <div>{order.paymentStatus}</div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default SingleOrder