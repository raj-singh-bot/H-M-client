import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'
import SingleProduct from '../../components/Single product/SingleProduct';
import product from './product.module.css';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavDropdown } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import { fetchProducts, getStatus, getProducts } from '../../store/ProductSlice';
import { AppDispatch } from '../../store/store';


const ProductPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // const [productsData, setProductsData] = useState([])
    const [sortCheck, setSortCheck] = useState("Recommended");
    const dispatch = useDispatch<AppDispatch>()
    const status = useSelector(getStatus);
    const products = useSelector(getProducts);

    
    useEffect(() => {
        let code = searchParams.get('slug');
        if(code !== null && status === 'idle'){
            console.log(code, 'slug')
            dispatch(fetchProducts(code))
        }
    },[status])

    console.log(products)

    const handleSort = (e:any) => {
        setSortCheck(e.target.value)
    }
    // console.log(sortCheck)
const radioSort = ["Recommended", "Newest", "Lowest Price", "Highest Price"];
  return (
    <div style={{padding: '0 32px'}}>
        <Navbar expand="lg" bg='white' sticky="top">
            <div style={{width: '20%'}}>
                <img  src='download.svg' alt='logo' style={{width: '30px', height: '24px'}}/>
            </div>
            <div style={{width: '80%'}}>
                <Nav>
                    <NavDropdown title="SORT BY" id="basic-nav-dropdown">
                        <ul className={product.sortList}>
                          {radioSort.map((e, index) => {
                            return(
                                <li className={sortCheck == e ? `${product.activeBg}` : ''} key={index}>
                                    <input type='radio' name='sort' value={e} style={{marginRight: '10px'}} 
                                    checked={sortCheck == e}
                                    onChange={handleSort}/>{e}
                                </li>
                            )
                          })}
                        </ul>
                    </NavDropdown>
                </Nav>
            </div>
        </Navbar>
        <div style={{display: 'flex'}}>
            <div className={product.sidebar}>
                aaa
            </div>
            <div className={product.mainProduct}>
                
                <div className={product.productList}>
                    {products.products?.map((item:any, i:any) => {
                        return(
                            <SingleProduct data={item} key={i}/>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductPage