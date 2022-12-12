import React, { FC } from 'react'
//@ts-ignore
import SuperSubCategory from './SuperSubCategory';
import style from '../Navbar/navbar.module.css';

interface Iprops{
    data: any
}

interface Category{
    name: string,
    CategoriesArray: []
}

const Subcategory:FC<Iprops> = (props:Iprops) => {
    // const [categories, setCategories] = useState(props.data);
    console.log(props.data)
  return (
    <div className={style.subCategoryHeader}>
        <div className={style.singleList}>
        {props.data?.map((single: Category, index:number) => {
            return(
                <div style={{paddingRight: '15px'}} key={index}>
                <p style={{fontSize: '13px', fontWeight: '600'}}>{single.name}</p>
                <SuperSubCategory data={single.CategoriesArray}/>
                </div>
            )
        })
        }
        </div>
    </div>
  )
}

export default Subcategory