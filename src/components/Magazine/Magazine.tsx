import React from 'react'
import magazine from './magazine.module.css'

const Magazine = () => {
    const magData = [
        {
            image: 'mag.webp',
            desc: 'H&M Move teams up with Zlatan Ibrahimović'
        },
        {
            image: 'mag2.webp',
            desc: 'Imagine that: Kids’ Innovation Story'
        },
        {
            image: 'mag3.webp',
            desc: 'Take a seat at Brasserie Hennes'
        }
    ]
  return (
    <div style={{backgroundColor: '#f4eddd', marginBottom: '20px'}}>
    <div className={magazine.mainSec}>
        <div style={{marginBottom: '64px'}}>
            <h6>MAGAZINE</h6>
            <p>A WORLD OF INSPIRATION</p>
            <a href='#'>READ H&M MAGAZINE</a>
        </div>
        <div className={magazine.magList}>
            {magData.map((e, i) => {
                return(
                    <div className={magazine.content} key={i}>
                        <img src={e.image} alt='magazine' style={{width: '100%', display: 'block'}}/>
                        <div className={magazine.subContent}>
                            <div>
                                <span>INSIDE H&M</span>
                                <p>{e.desc}</p>
                            </div>
                            <a href='#'>Read The Story</a>
                        </div>
                    </div>
                )
            })
            }
        </div>
    </div>
    </div>
  )
}

export default Magazine