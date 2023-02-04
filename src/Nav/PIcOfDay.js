import React from 'react'; 
import './PicOfDay.css'; 

export default function PIcOfDay({info}) {
  return (
    <div className='dayPicDiv'>
        <h1>NASA's Picture of the Day</h1>
        <h2>{info.title}</h2>
        <h4 style={{color: 'white'}}>{info.explanation}</h4>
        <a href={info.url} target='_blank' rel="noreferrer"><img src={info.url} alt='picOfDay' className='picOfDayImg' /></a>
    </div>
  )
}