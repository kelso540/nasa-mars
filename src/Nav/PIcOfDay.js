import React, {useContext, useEffect} from 'react'; 
import './PicOfDay.css'; 
import { UserContext } from '../Context/UserContext';

export default function PIcOfDay({info}) {

  const {setPage} = useContext(UserContext);

  useEffect(()=>{
    setPage("Image of the Day");
  })

  return (
    <div className='dayPicDiv'>
        <h1>NASA's Picture of the Day</h1>
        <h2>{info.title}</h2>
        <h4 style={{color: 'white'}}>{info.explanation}</h4>
        <a href={info.url} target='_blank' rel="noreferrer"><img src={info.url} alt='picOfDay' className='picOfDayImg' /></a>
    </div>
  )
}