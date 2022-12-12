import React, { useEffect, useState } from 'react'
import style from './productDetail.module.css'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct, getProductDetail, getStatus } from '../../store/ProductSlice';
import { AppDispatch } from '../../store/store';


const ProductDetail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector(getStatus);
    const products = useSelector(getProductDetail);

    console.log(products)
    useEffect(() => {
        let code = searchParams.get('code');
        if(code !== null && status === 'idle'){
            console.log(code, 'slug')
            dispatch(fetchSingleProduct(code))
        }
    },[status])
    
    
  return (
        <div className={style.mainSec}>
            <div className={style.productOverview}>
                {
                    products.productImages?.map((i:any) => {
                        return (
                            <img  src={i.img} alt={i._id} key={i._id}/>
                        )
                    })
                }
            </div>
            <div className={style.productDesc}>
                <h6 className={style.heading}>{products.name}</h6>
                <p className={style.price}> {`Rs.${products.price}`}</p>
            </div>
        </div>
  )
}

export default ProductDetail