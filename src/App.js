import './App.css';
import Main from './Main/Main';
import Mars from './Mars/Mars';
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PIcOfDay from './Nav/PIcOfDay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from './Context/UserContext';

function App() {
  const [info, setInfo] = useState([]);
  const [dayBefore, setDayBefore] = useState([]);
  const [dayBeforeThat, setDayBeforeThat] = useState([]);   
  const [dateA, setDate] = useState(''); 
  const [dateDayBack1, setDateDayBack1] = useState(''); 
  const [dateDayBack2, setDateDayBack2] = useState('');
  const [dateDayBack3, setDateDayBack3] = useState('');
  const [marsInfo, setMarsInfo] = useState([]);
  const [yesterday, setYesterday] = useState([]); 
  const [call, setCall] = useState(false); 
  const [display, setDisplay] = useState(false); 
  const [page, setPage] = useState("Image of the Day"); 
  // https://api.nasa.gov/planetary/apod?api_key=
  // /.netlify/functions/getPicDay

    const getMarsPictures = (date, setState)=>{
      fetch(`/.netlify/functions/getMarsData?date=${date}`)
      .then(async response => {
        if(!response.ok) {
          const text = await response.text();
          throw new Error(text);
         }
        else {
         return response.json();
       }    
      })
      .then((response) => {
        setState(response.photos)
      })
      .catch(err => {
        console.log('caught it!',err);
      });
    }; 

        const makeDay = (num, returnDate)=>{
          let date = new Date(); 
          let year = '';
          let month = ''; 
          let day = ''; 
          date.setDate(date.getDate() - num);
          year = `${date.getFullYear()}`;
          if(Number(date.getMonth()) < 10){
            month = `0${(date.getMonth()) + 1}`; 
          } else {
            month = `${(date.getMonth()) + 1}`
          };
          if(Number(date.getDate()) < 10){
            day = `0${date.getDate()}`; 
          } else {
            day = `${date.getDate()}`
          };
          returnDate(`${year}-${month}-${day}`); 
        };

        useEffect(()=>{
          const getPictureOfDay = ()=>{
            setDisplay(false); 
            fetch(`/.netlify/functions/getPicDay`)
            .then(async response => {
              if(!response.ok) {
                const text = await response.text();
                throw new Error(text);
               }
              else {
               return response.json();
             }    
            })
            .then(async data => {
              setInfo(await data);
              setDate(data.date);
              makeDay(0, setDate);   
              makeDay(1, setDateDayBack1);
              makeDay(2, setDateDayBack2);
              makeDay(3, setDateDayBack3); 
              setCall(true);
              setDisplay(true);    
            })
            .catch(err => {
              console.log('caught it!',err)
            }) 
          };
          getPictureOfDay(); 
        }, []);

        useEffect(()=>{
          if (call){
            getMarsPictures(dateA, setMarsInfo); 
            getMarsPictures(dateDayBack1, setYesterday); 
            getMarsPictures(dateDayBack2, setDayBefore); 
            getMarsPictures(dateDayBack3, setDayBeforeThat); 
          } 
        }, [call]);

  return (
    <UserContext.Provider value={{page, setPage}}>
    <div className="App">
      <BrowserRouter>
        <Main />
        <Routes>                                              //fa-solid fa-spinner fa-spin-pulse
          <Route path='/' element={(display)?<PIcOfDay info={info} /> :<div><FontAwesomeIcon style={{color: 'white'}} icon={faSpinner} size='4x' className='fa-spin-pulse'/></div>} />
          <Route path='/mars' element={<Mars date={dateA} marsInfo={marsInfo} yesterday={yesterday} dayBefore={dayBefore} dayBeforeThat={dayBeforeThat} info={info} dateDayBack1={dateDayBack1} dateDayBack2={dateDayBack2} dateDayBack3={dateDayBack3} />} />
        </Routes>
      </BrowserRouter>
    </div>
    </UserContext.Provider>
  );
};

export default App;
