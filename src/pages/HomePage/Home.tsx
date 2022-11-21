import React from 'react'
import Footer from '../../components/footer/Footer'
import Magazine from '../../components/Magazine/Magazine'
import FilterSlider from '../../components/Slider/FilterSlider'
import SliderCom from '../../components/Slider/Slider'
import home from './Home.module.css'

const Home = () => {
  return (
    <>
        <div className={home.bannerSection}>
            <img src="./home1.webp" alt="banner" />
            <div className={home.content}>
                <h6>Attention set on expressive knits</h6>
                <p>The bigger, the bolder, the brighter, the better.</p>
                <button className={home.commonBtn}>Shop now</button>
            </div>
        </div>
        <div className={home.bannerSection}>
            <img src="./home2.webp" alt="banner" />
            <div className={home.content}>
                <h6>Jingle all the way</h6>
                <p>Spread a little festive cheer with the perfect holiday outfit.</p>
                <button className={home.commonBtn}>Shop now</button>
            </div>
        </div>
        <SliderCom/>
        <FilterSlider/>
        <div className={home.bannerSection}>
            <img src="./home3.webp" alt="banner" />
            <div className={home.content}>
                <h6>A magical holiday at home</h6>
                <p>All in on pink shades and playful decorations!</p>
                <button className={home.commonBtn}>Shop now</button>
            </div>
        </div>
        <Magazine/>
    </>
  )
}

export default Home