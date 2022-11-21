import React, { useState } from 'react'
import {filterSliderData} from '../dummyData/filterSlider'
//@ts-ignore
import  Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider from './slider.module.css'


const FilterSlider = () => {
    const [currentCat, setCurrentCat ] = useState('Ladies');
    const [active, setActive] = useState('Ladies')

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows:true,
        slidesToShow: 4,
        slidesToScroll: 4
      };
      
    const category = ["Ladies","Men","Divided", "Kids", "Baby"];
    console.log(currentCat)

  return (
    <>
    <div className={slider.mainSlider}>
        <p className={slider.heading}>New Arrivals</p>
        <div>
            <ul className={slider.listItem}>
                {category.map((e) => {
                    return(
                        <li onClick={() => {setCurrentCat(e); setActive(e)}} className={active == e ? `${slider.active}` : ''} >{e}</li>
                    )
                })
                }
            </ul>
        </div>
    <Slider {...settings}>
        {        //@ts-ignore
        filterSliderData[currentCat].map((e: any) => {
            return(
                <div className={slider.filterSlider} >
                <img src={e.image} alt='img' style={{width: '100%'}}/>
                <p>{e.desc}</p>
                <span>{e.price}</span>
                </div>
            )
        })}
    </Slider>
    </div>
    </>
  )
}

export default FilterSlider