import React, { useEffect, useState } from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// import { getAllCategory } from '../../actions';

/**
* @author
* @function MenuHeader
**/

const MenuHeader = (props:any) => {
    const [data, setData] = useState([]);
    // const fetchCategory = async () => {
       
    //    return data
    // }
    useEffect(() => {
        axios.get('http://localhost:8000/category/getcategory',{
        // headers: {
        //     '': '631b0ccce6msh16e056e428644dcp1662f7jsn35b6e04f85f9'
        // }
       })
       .then((res) => setData(res.data.categoryList))
    //    setData(data)
    },[])

  const renderCategories = (categories:any) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.slug}>
          {
            category.parentId ? <a
              href={`/products?slug=${category.slug}`}>
              {category.name}
            </a> :
            <span>{category.name}</span>
          }
          {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
        </li>
      );
    }
    return myCategories;
  }
  return (
    <div className="menuHeader">
      <ul>
        {data.length > 0 ? renderCategories(data) : null}
      </ul>
    </div>
  )

}

export default MenuHeader