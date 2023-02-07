import './App.css';
import Main from './Main/Main';
import Mars from './Mars/Mars';
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PIcOfDay from './Nav/PIcOfDay';

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
  // https://api.nasa.gov/planetary/apod?api_key=
  // /.netlify/functions/getPicDay

  useEffect(()=>{
    const getMarsPictures3DaysBack = () => {
      fetch(`/.netlify/functions/getDay4?date=${dateDayBack3}`)
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
        setDayBeforeThat(data.photos)
      })
      .catch(err => {
        console.log('caught it!',err);
      });
    }; 
    const getMarsPictures2DaysBack = () => {
      console.log('day back 2 ' + dateDayBack2); 
      fetch(`/.netlify/functions/getDay3?date=${dateDayBack2}`)
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
        setDayBefore(data.photos)
      })
      .catch(err => {
        console.log('caught it!',err);
      }); 
      getMarsPictures3DaysBack();
    };
    const getMarsPicturesYesterday = () => {
      fetch(`/.netlify/functions/getDay2?date=${dateDayBack1}`)
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
        setYesterday(data.photos)
      })
      .catch(err => {
        console.log('caught it!',err);
      }); 
      getMarsPictures2DaysBack();
    };
    const getMarsPicturesToday = () => {
      fetch(`/.netlify/functions/getMarsData?date=${dateA}`)
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
        setMarsInfo(data.photos)
      })
      .catch(err => {
        console.log('caught it!',err);
      });
      getMarsPicturesYesterday();
    };
    getMarsPicturesToday(); 
  }, [dateA, dateDayBack1, dateDayBack2, dateDayBack3]);

        const makeDay3 =()=>{
          let date = new Date(); 
          let year = '';
          let month = ''; 
          let day = ''; 
          date.setDate(date.getDate() - 3);
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
          setDateDayBack3(`${year}-${month}-${day}`); 
          console.log('day 3 ' + dateDayBack3);
          // getMarsPicturesToday();    
        };
        const makeDay2 =()=>{
          let date = new Date(); 
          let year = '';
          let month = ''; 
          let day = ''; 
          date.setDate(date.getDate() - 2);
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
          setDateDayBack2(`${year}-${month}-${day}`);
          console.log('day 2 ' + dateDayBack2); 
          makeDay3(); 
        };
        const makeDay1 =()=>{
          let date = new Date(); 
          let year = '';
          let month = ''; 
          let day = ''; 
          date.setDate(date.getDate() - 1);
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
          setDateDayBack1(`${year}-${month}-${day}`); 
          console.log('day 1 ' + dateDayBack1);
          makeDay2(); 
        };
        const makeToday =()=>{
          let date = new Date(); 
          let year = '';
          let month = ''; 
          let day = ''; 
          date.setDate(date.getDate());
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
          setDate(`${year}-${month}-${day}`); 
          makeDay1(); 
        };

      const getPictureOfDay = ()=>{
        fetch(`/.netlify/functions/getPicDay`)
        .then(response => {
          if(!response.ok) {
            const text = response.text();
            throw new Error(text);
           }
          else {
           return response.json();
         }    
        })
        .then((data) => {
          setInfo(data)
          setDate(data.date)
          console.log('getPictureOfDay ran')  
        })
        .catch(err => {
          console.log('caught it!',err)
        })
        makeToday(); 
      };
 

    useEffect(()=>{
      getPictureOfDay();
    }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Main />
        <Routes>
          <Route path='/' element={<PIcOfDay info={info} />} />
          <Route path='/mars' element={<Mars date={dateA} marsInfo={marsInfo} yesterday={yesterday} dayBefore={dayBefore} dayBeforeThat={dayBeforeThat} info={info} dateDayBack1={dateDayBack1} dateDayBack2={dateDayBack2} dateDayBack3={dateDayBack3} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
