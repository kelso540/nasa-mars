import React, { useContext, useState } from 'react';
import './Main.css';
import '../Nav/Nav.css';
import earth from '../Pictures/earth.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../Context/UserContext';

export default function Main() { 

  const {page} = useContext(UserContext);

  const [display, setDisplay] = useState(true);
  
  const setMenu = () => {
    setDisplay(!display); 
  }

  return (
    <div className='mainDiv'>
      <div className='navDiv'>
        <Link to='/'>
          <div className='navHead'>
            <img src={earth} alt='earth' className='earth'/>
            <strong className='mainLink'>Our Universe</strong>
          </div>
        </Link>
        <div className='navLinks'>
          <Link to='/'><strong className='navLink A'>Image of the Day</strong></Link>
          <Link to='/mars'><strong className='navLink A'>Mars</strong></Link>
          <strong className='navLink A'>Contact</strong>
          <strong className='navLink'>About</strong>
        </div>
      </div>

      <div className='mobileNav'>
        <div className='navHead'>
          <img src={earth} alt='earth' className='earth'/>
          <strong className='mainLink'>Our Universe</strong>
        </div>
        <div className='threeLinesDiv'>
          <FontAwesomeIcon style={{color: 'white'}} icon={faBars} size='2x' onClick={setMenu} />
        </div>
      </div>
      <div className={(display)?'navLinksMobile':'navLinksMobileShow'}>
        <Link to='/' onClick={setMenu}><strong className='navLink A'>Image of the Day</strong></Link>
        <Link to='/mars' onClick={setMenu}><strong className='navLink A'>Mars</strong></Link>
        <strong className='navLink A'>Contact</strong>
        <strong className='navLink A'>About</strong>
      </div>

      <div className="mainHead">
        <h1>Our Universe - {page}</h1>
        <h3>A place to find NASA's picture of the day and Mars rover images!</h3>
      </div>
    </div>
  )
}
