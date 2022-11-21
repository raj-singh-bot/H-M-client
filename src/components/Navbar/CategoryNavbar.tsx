import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Subcategory from '../Category/Subcategory';
import style from './navbar.module.css' 
import {SearchIcon } from '@chakra-ui/icons'

interface subCategory{
    CatName: string,
}

interface Category{
    CatName: string,
    CategoriesArray: Array<subCategory>,
}

const CategoryNavbar = () => {
    const [data, setData] = useState([]);
    // const fetchCategory = async () => {
       
    //    return data
    // }
    useEffect(() => {
        axios.get('https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?country=in',{
        headers: {
            'X-RapidAPI-Key': '631b0ccce6msh16e056e428644dcp1662f7jsn35b6e04f85f9'
        }
       })
       .then((res) => setData(res.data))
    //    setData(data)
    },[])
    console.log(data)
  return (
    <div className={style.categoryheader}>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '56%'}}>
        {data?.map((category: Category, index:number) => {
            return(
                <div className={style.singleCategory} key={index}>
                    <div >
                        <p className={style.categoryHeader} >{category.CatName}</p>
                    </div>
                    <div>
                        <Subcategory data={category.CategoriesArray} />
                        {/* <div>
                        {category.CategoriesArray.map((single) => {
                            return(
                            <p>{single.CatName}</p>
                        )})
                        }   
                        </div> */}
                    </div>
                </div>
                )
        })}
        </div>
        <div style={{marginLeft: '100px', position: 'relative'}}>
            <input type="text" placeholder='Search products'/>
            <button style={{position: 'absolute', left: '0',background: 'none', border: 'none', padding: '0', bottom: '4px', cursor: 'pointer'}}>
                <SearchIcon/>
            </button>
        </div>
    </div>
  )
}

export default CategoryNavbar