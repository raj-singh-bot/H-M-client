import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'
import SingleProduct from '../../components/Single product/SingleProduct';
import product from './product.module.css';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavDropdown } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import { setProducts } from '../../store/ProductSlice';


const ProductPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [productsData, setProductsData] = useState([])
    const [sortCheck, setSortCheck] = useState("Recommended");
    const dispatch = useDispatch()
    const products = useSelector((state:any) => state.product);
    // let category =searchParams.get('category')

    const fetchProducts = async() => {
        const { data } = await axios.get(`https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=in&lang=en&categories=${searchParams.get('category')}&currentpage=0&pagesize=30`,{
            headers: {
                'X-RapidAPI-Key': '631b0ccce6msh16e056e428644dcp1662f7jsn35b6e04f85f9'
            }
        });
        setProductsData(data.results)
        console.log(data.results)
        dispatch(setProducts(data.results))
    }

    useEffect(() => {
        // fetchProducts()
    },[])
   

    const handleSort = (e:any) => {
        setSortCheck(e.target.value)
    }
    console.log(sortCheck)
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
                          {radioSort.map((e) => {
                            return(
                                <li className={sortCheck == e ? `${product.activeBg}` : ''}>
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
                    {productsData?.map((item, i) => {
                        return(
                            <SingleProduct data={item} />
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