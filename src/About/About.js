import { useEffect, useContext} from 'react';
import { UserContext } from '../Context/UserContext';
import './About.css'

function About() {

    const {setPage} = useContext(UserContext);

    useEffect(()=>{
        setPage('About')
      }, [setPage])

  return (
    <div className='aboutDiv'>
        <h1>About</h1>
        <p>
            Thanks for visiting! All data for this website provided by <a href='https://api.nasa.gov/'>NASA open APIs</a>.
            This website showcases NASAs picture of the day and has all the most up to date pictures sent back from the 
            Curiosity rover on Mars surface as you read this! Use the link up top to the Mars page and search a day or 
            click on today or one of the past three days to see the rovers pictures captured that day.  
        </p>
        <p>
            All fonts provided by <a href='https://fonts.google.com/'>Google Fonts</a> and Icons provided by  
            <a href='https://fontawesome.com/'> Font Awesome</a> and <a href='https://icons8.com/'>Icons8</a>.
        </p>
    </div>
  )
}

export default About