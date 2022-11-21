import React, { FC } from 'react'
import style from '../Navbar/navbar.module.css'

interface Sprops{
    data: []
}
interface sub{
    CatName: string,
}

const SuperSubCategory:FC<Sprops> = (props: Sprops) => {
  return (
    <div className={style.superSubHeader}>
        {props.data?.map((e:sub) => {
            return(
                <p style={{fontSize: '12px', padding: '4px 0'}}>{e.CatName}</p>
            )
        })

        }
    </div>
  )
}

export default SuperSubCategory;