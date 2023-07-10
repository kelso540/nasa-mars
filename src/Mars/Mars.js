import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useContext } from 'react';
import Images from '../Images/Images';
import './Mars.css'; 
import { UserContext } from '../Context/UserContext';

export default function Mars({date, marsInfo, yesterday, dayBefore, dayBeforeThat, dateDayBack1, dateDayBack2, dateDayBack3}) {

  const {setPage} = useContext(UserContext);

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
  const [text, setText] = useState(undefined); 
  const [searchData, setSearchData] = useState([]);    
  const [mappedInfo, setMappedInfo] = useState([]); 
  const [yesterdayPics, setYesterdayPics] = useState([]);
  const [dayBeforePics, setDayBeforePics] = useState([]);
  const [thirdDayPics, setThirdDayPics] = useState([]); 

  const [searchInfo, setSearchInfo] = useState([]); 

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

  // console.log([marsInfo, yesterday, dayBefore, dayBeforeThat, date, dateDayBack1, dateDayBack2, dateDayBack3])

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
      console.log(data)
      setSearchData(data.photos) 
    })
    .catch(err => {
      console.log('caught it!',err)
      setDayDisplay('Not a valid date')
      setDaySearch(true)
      setDay1(false)
      setDay2(false)
      setDay3(false)
      setDay4(false)
    });
  };

  useEffect(()=>{
    setNumber(1);
    setDay1(false);
    setDay2(false);
    setDay3(false);
    setNoImageToDisplaySearch(false);
    setDayDisplay(''); 
    setDisplayDate(text); 
    if(searchData.length <= 0){
      setNoImageToDisplaySearch(true);
      setDaySearch(true);  
    } else {
      setNoImageToDisplaySearch(false);
      setDaySearch(true); 
    } 
  }, [searchData, text]);                           

  useEffect(()=>{
    const searchInfo = searchData?.map((item, index)=>{
      if(index <= number){
        return <Images key={item.id} src={item.img_src} cam={item.camera.full_name} display={display}/>
      } else {
        return null
      }
    });
    setSearchInfo(searchInfo); 
  }, [display, number, searchData]); 

  useEffect(()=>{
    const mappedInfo = marsInfo?.map((item, index)=>{
      if(index <= number){
        return <Images key={item.id} src={item.img_src} cam={item.camera.full_name} display={display}/>
      } else {
        return null
      }
    });
    setMappedInfo(mappedInfo);
  }, [display, marsInfo, number]);
  
  useEffect(()=>{
    const yesterdayPics = yesterday?.map((item, index)=>{
      if(index <= number){
        return <Images key={item.id} src={item.img_src} cam={item.camera.full_name} display={display}/>
      } else {
        return null
      }
    }); 
    setYesterdayPics(yesterdayPics); 
  }, [display, yesterday, number]); 

  useEffect(()=>{
    const dayBeforePics = dayBefore?.map((item, index)=>{
      if(index <= number){
        return <Images key={item.id} src={item.img_src} cam={item.camera.full_name} display={display}/>
      } else {
        return null
      }
    }); 
    setDayBeforePics(dayBeforePics); 
  }, [display, number, dayBefore]); 

  useEffect(()=>{
    const thirdDayPics = dayBeforeThat?.map((item, index)=>{
      if(index <= number){
        return <Images key={item.id} src={item.img_src} cam={item.camera.full_name} display={display}/>
      } else {
        return null
      }
    }); 
    setThirdDayPics(thirdDayPics); 
  }, [display, number, dayBeforeThat])

  const sendData = (one, two, three, four, day, date, setImg, info) => {
    setNumber(0);
    setDay1(one); 
    setDay2(two);
    setDay3(three);
    setDay4(four);
    setDaySearch(false);
    setDayDisplay(day); 
    setDisplayDate(date);
    if(info.length === 0){
      setImg(true);
    } else {
      setImg(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setArrowDisplay(true); 
      } else {
        setArrowDisplay(false);
        setNumber(1);
      }
    })
  }, [arrowDisplay]);

  const scrollToTop = () =>{
    window.scrollTo(0, 0);
    setTimeout(()=>{
      setNumber(0);
    }, 1200); 
  }; 

  const handler = (e)=>{
    setText(e.target.value); 
  }

useEffect(()=>{
  setPage('Mars Rover Images')
}, [setPage])

  document.addEventListener('scroll', getScroll); 

  return (
    <div>
      <div className='main'> 
        <h1>Mars Curiosity Images</h1>
        <h2>Today is {dayNow}</h2>
        <h4>Rover photos from {dayDisplay} {displayDate}</h4>
        <p className='paragraph1'>Type in a date or choose a day below...</p>
        <div className='searchBar'>
          <input type='text' onChange={handler} placeholder='YYYY-MM-DD' id='inputValue'/>
          <div className='searchBtn' onClick={getMarsPicturesToday}>&#x1F50E;&#xFE0E;</div>
        </div>
        <p className='smallInformer'><strong>(YYYY-MM-DD include 0 before single digits ex. 2023-01-05)</strong></p>
        <div className='flexBtn'>
          <div className='btn btn1' onClick={()=>sendData(false, false, false, true,'3 Days Ago', dateDayBack3, setNoImageToDisplay4, thirdDayPics)}></div>
          <div className='btn btn2' onClick={()=>sendData(false, false, true, false,'2 Days Ago', dateDayBack2, setNoImageToDisplay3, dayBeforePics)}></div> 
          <div className='btn btn3' onClick={()=>sendData(false, true, false, false,'Yesterday', dateDayBack1, setNoImageToDisplay2, yesterdayPics)}></div> 
          <div className='btn btn4' onClick={()=>sendData(true, false, false, false,'Today', date, setNoImageToDisplay1, mappedInfo)}></div>
        </div>
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
