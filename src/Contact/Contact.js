import { useEffect, useContext} from 'react';
import { UserContext } from '../Context/UserContext'; 
import { useForm, ValidationError } from '@formspree/react';
import './Contact.css'

function Contact() {

    const {setPage} = useContext(UserContext);

    useEffect(()=>{
        setPage('Contact')
    }, [setPage])

    const [state, handleSubmit] = useForm("meqbwjng");
    if (state.succeeded) {
        return <p className='thank-you'>Thank You!</p>;
    }

  return (
    <form onSubmit={handleSubmit}>
    <label htmlFor="email">
      Email Address
    </label>
    <input
      id="email"
      type="email" 
      name="email"
      placeholder='example@email.com'
    />
    <ValidationError 
      prefix="Email" 
      field="email"
      errors={state.errors}
    />
    <label htmlFor="message">
      Message
    </label>
    <textarea
      id="message"
      name="message"
      placeholder='Type message here...'
    />
    <ValidationError 
      prefix="Message" 
      field="message"
      errors={state.errors}
    />
    <button type="submit" disabled={state.submitting}>
      Submit
    </button>
  </form>
  )
}

export default Contact