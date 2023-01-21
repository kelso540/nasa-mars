import React from 'react'

export default function PIcOfDay({info}) {
  return (
    <div className='dayPicDiv'>
        <h2>NASA's Picture of the Day</h2>
        <h2>{info.title}</h2>
        <h4 style={{color: 'white'}}>{info.explanation}</h4>
        <a href={info.url} target='_blank' rel="noreferrer"><img src={info.url} alt='picOfDay' className='picOfDayImg' /></a>
    </div>
  )
}

//comment git 
