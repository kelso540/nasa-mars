import { useEffect, useContext} from 'react';
import { UserContext } from '../Context/UserContext';
import './Contact.css'

function Contact() {

    const {setPage} = useContext(UserContext);

    useEffect(()=>{
        setPage('Contact')
      }, [setPage])

  return (
    <div>
        <h1>Contact</h1>
        <p>
            
        </p>
    </div>
  )
}

export default Contact