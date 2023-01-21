import React from 'react';
import { useSpring, animated as s} from 'react-spring';
import './Images.css';

export default function Images({src, cam, display}) {


const opacityGain = useSpring({
  from: {opacity: 0},
  opacity: 1, 
  config: {mass: 1, tension: 25, friction: 20}
});

  return (
    <s.div className='imgDiv' style={{...opacityGain}}>
        <h2>{cam}</h2>
        <a href={src} target='_blank' rel="noreferrer"><img src={src} alt='roverImg' className='marsImg'/></a>
    </s.div>
  )
}
