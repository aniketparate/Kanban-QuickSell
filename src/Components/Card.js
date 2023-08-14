import React from 'react'
import './Card.css'
import Checkbox from './Checkbox'

function Card({ cardData, userData }) {
  return (
    <div className='card-container'>
      
      <div className='id' >{cardData.id} {userData?.[cardData?.userId]}</div>
      <div style={{height: '10px'}} />
      <div className='title'>{cardData.title}</div>
      <div style={{height: '10px'}} />
      <div style={{display: 'flex'}}>
      {cardData?.tag?.map((x)=>
        <div className = 'tags' key={x}>
          <div className='gola'></div>
          {x}
        </div>
      )}
      </div>
    </div>
  )
}

export default Card