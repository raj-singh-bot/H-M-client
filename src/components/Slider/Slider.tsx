import React from 'react'
//@ts-ignore
import  Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {sliderData} from '../dummyData/categorySlider'
import slider from './slider.module.css'
import {Link } from 'react-router-dom'

const SliderCom = () => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        arrows:true,
        slidesToShow: 8,
        slidesToScroll: 8
      };
  return (
    <div className={slider.mainSlider}>
        <p className={slider.heading}>Categories you might like</p>
    <Slider {...settings}>
        {sliderData.map((e) => {
            return(
                <Link to={`products?category=${e.tagCodes}`} className={slider.sliderLink}>
                <div className={slider.singleSlider}>
                    <img src={e.image} alt='img' style={{width: '100px', borderRadius: '50%'}}/>
                    <p>{e.category}</p>
                    <span>{e.type}</span>
                </div>
                </Link>
            )
        })}
    </Slider>
    </div>
  )
}

export default SliderCom