import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Images from '../Images/Images';
import './Mars.css'; 

export default function Mars({date, marsInfo, yesterday, dayBefore, dayBeforeThat, dateDayBack1, dateDayBack2, dateDayBack3}) {

  const [number, setNumber] = useState(0);
  const [display, setDisplay] = useState(false);
  const [arrowDisplay, setArrowDisplay] = useState(false);
  const [displayDate, setDisplayDate] = useState(date);
  const [dayDisplay, setDayDisplay] = useState('Today'); 
  const [day1, setDay1] = useState(true);
  const [day2, setDay2] = useState(false);
  const [day3, setDay3] = useState(false);
  const [day4, setDay4] = useState(false);
  const [daySearch, setDaySearch] = useState(false); 
  const [noImageToDisplay1, setNoImageToDisplay1] = useState(false); 
  const [noImageToDisplay2, setNoImageToDisplay2] = useState(false);
  const [noImageToDisplay3, setNoImageToDisplay3] = useState(false);
  const [noImageToDisplay4, setNoImageToDisplay4] = useState(false);
  const [noImageToDisplaySearch, setNoImageToDisplaySearch] = useState(false); 
  const [text, setText] = useState(''); 
  const [searchData, setSearchData] = useState([]); 

  const getScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight; 
    const clientHeight = document.documentElement.clientHeight; 
    const scrollTop = document.documentElement.scrollTop; 
    const scrollMinusClient = scrollHeight - clientHeight; 
    if (scrollTop > (scrollMinusClient - 50)){
      setNumber(number + 1);
      setDisplay(!display);    
    } 
  }

  const fullDate = new Date().toString().split(' '); 
  const dayNow = `${fullDate[0]} ${fullDate[1]} ${fullDate[2]}, ${fullDate[3]}`;

  const getMarsPicturesToday = () => {
    fetch(`/.netlify/functions/getMarsData?date=${text}`)
    .then(async response => {
      if(!response.ok) {
        const text = await response.text();
        throw new Error(text);
       }
      else {
       return response.json();
     }    
    })
    .then((data) => {
      setSearchData(data.photos) 
    })
    .catch(err => {
      console.log('caught it!',err);
      setDayDisplay('Not a valid date');
    });
  };

  useEffect(()=>{
    setNumber(1); 
    setText(''); 
      setDaySearch(true); 
      setDay1(false);
      setDay2(false);
      setDay3(false);
      setDay4(false);
      setDayDisplay(''); 
      setDisplayDate(text);
      if(searchData.length === 0){
        setNoImageToDisplaySearch(true); 
      } else {
        setNoImageToDisplaySearch(false);
      } 
  }, [searchData]); 

  const searchInfo = searchData.map((item, index)=>{
    if(index <= number){
      return <Images key={item.id} src={item.img_src} cam={item.camera.full_name} display={display}/>
    } else {
      return null
    }
  });

    const mappedInfo = marsInfo.map((item, index)=>{
      if(index <= number){
        return <Images key={item.id} src={item.img_src} cam={item.camera.full_name} display={display}/>
      } else {
        return null
      }
    }); 

    const yesterdayPics = yesterday.map((item, index)=>{
      if(index <= number){
        return <Images key={item.id} src={item.img_src} cam={item.camera.full_name} display={display}/>
      } else {
        return null
      }
    }); 

    const dayBeforePics = dayBefore.map((item, index)=>{
      if(index <= number){
        return <Images key={item.id} src={item.img_src} cam={item.camera.full_name} display={display}/>
      } else {
        return null
      }
    }); 

    const thirdDayPics = dayBeforeThat.map((item, index)=>{
      if(index <= number){
        return <Images key={item.id} src={item.img_src} cam={item.camera.full_name} display={display}/>
      } else {
        return null
      }
    }); 

  const setTodayData = () => {
    setNumber(0);
    setDay1(true);
    setDay2(false);
    setDay3(false);
    setDay4(false);
    setDaySearch(false);
    setDayDisplay('Today'); 
    setDisplayDate(date);
    if(mappedInfo.length === 0){
      setNoImageToDisplay1(true);
    } else {
      setNoImageToDisplay1(false);
    }
  }

  const setYesterdayData = () => {
    setNumber(0);
    setDay1(false);
    setDay2(true);
    setDay3(false);
    setDay4(false); 
    setDaySearch(false);
    setDayDisplay('Yesterday'); 
    setDisplayDate(dateDayBack1);
    if(yesterdayPics.length === 0){
      setNoImageToDisplay2(true); 
    } else {
      setNoImageToDisplay2(false);
    } 
  }

  const setDayBeforeData = () => {
    setNumber(0);
    setDay1(false);
    setDay2(false);
    setDay3(true);
    setDay4(false); 
    setDaySearch(false);
    setDayDisplay('2 Days Ago'); 
    setDisplayDate(dateDayBack2); 
    if(dayBeforePics.length === 0){
      setNoImageToDisplay3(true);
    } else {
      setNoImageToDisplay3(false);
    }
  }

  const setDayBeforeThatData = () => {
    setNumber(0);
    setDay1(false);
    setDay2(false);
    setDay3(false);
    setDay4(true);
    setDaySearch(false);
    setDayDisplay('3 Days Ago'); 
    setDisplayDate(dateDayBack3); 
    if(thirdDayPics.length === 0){
      setNoImageToDisplay4(true);
    } else {
      setNoImageToDisplay4(false);
    }
  }; 

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setArrowDisplay(true); 
      } else {
        setArrowDisplay(false);
      }
    })
  }, [arrowDisplay]);

  const scrollToTop = () =>{
    window.scrollTo(0, 0); 
}

const handler = (e)=>{
  setText(e.target.value); 
}

  document.addEventListener('scroll', getScroll); 

  return (
    <div>
      <div> 
        <h1>Mars Curiosity Images</h1>
        <h2>Today is {dayNow}</h2>
        <h4>Rover photos from {dayDisplay} {displayDate}</h4>
        <p className='paragraph1'>Type in a date or choose a day below...</p>
        <input type='text' onChange={handler} placeholder='YYYY-MM-DD' id='inputValue'/>
        <button className='searchBtn' onClick={getMarsPicturesToday}>Search</button>
        <p className='smallInformer'><strong>(include 0 before single digits ex. 2023-01-05)</strong></p>
        <button className='btn' onClick={setDayBeforeThatData}>3 Days Ago</button>
        <button className='btn1' onClick={setDayBeforeData}>2 Days Ago</button> 
        <button className='btn' onClick={setYesterdayData}>Yesterday</button> 
        <button className='btn1' onClick={setTodayData}>Today</button>
      </div>
      <div className={(daySearch)?'day':'displayNone'}>
        <h2 className={(noImageToDisplaySearch)?'display':'displayNone'}>No Pictures From That Day</h2>
        {searchInfo}
      </div>
      <div className={(day1)?'day':'displayNone'}>
        <h2 className={(noImageToDisplay1)?'display':'displayNone'}>No Pictures From Today</h2>
        {mappedInfo}
      </div>
      <div className={(day2)?'day':'displayNone'}>
        <h2 className={(noImageToDisplay2)?'display':'displayNone'}>No Pictures From Yesterday</h2>
        {yesterdayPics}
      </div>
      <div className={(day3)?'day':'displayNone'}>
        <h2 className={(noImageToDisplay3)?'display':'displayNone'}>No Pictures From 2 Days Ago</h2>
        {dayBeforePics}
      </div>
      <div className={(day4)?'day':'displayNone'}>
        <h2 className={(noImageToDisplay4)?'display':'displayNone'}>No Pictures From 3 Days Ago</h2>
        {thirdDayPics}
      </div>
      <div className={(arrowDisplay)?'arrow':'noArrow'} onClick={scrollToTop}>
        <FontAwesomeIcon icon={faArrowCircleUp} size='3x' className='arrowActual'/>
      </div>
    </div>
  )
}
