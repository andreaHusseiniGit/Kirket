import React from 'react';

const Card = (props) => {
    {/* <img alt = 'players' src = {`https://robohash.org/${props.name}?100x100`} className='w-50' /> */}
    
    return ( 
                 <div 
                    onClick = {() => {props.onClick(props.id)}} 
                    className={`bg-white br3 grow tc ba pointer myCard ${props.active&&'active'}`}>
                    {/* <img alt = 'players' src={AllRounder}/> */}
                    <img alt = 'players' 
                    src = {`${props.role === 'BATSMAN' ? '/images/batsman.png' : props.role === 'BOWLER'? '/images/bowler.png' : props.role === 'ALLROUNDER' ? '/images/all-rounder.png' :'/images/pointer.png'}`} 
                    className='card-icon'/>
                    <h2 className = 'mt2 mb0 pb2 card-name'>{props.name}</h2>
                    {/* <p className='mb20 mt0'> 
                        <span className = 'mr2'>
                            <FontAwesomeIcon icon = {props.team === 'Batsman' ? 'quidditch': props.team === 'Bowler'? 'baseball-ball': 'key' }/> 
                        </span>
                        {props.team}
                    </p> */}
                </div>
    
    // <div className = {`bg-white dib br3 pa3 ma2 grow tc ba pr0 pl0 mw4 pointer myCard ${props.active&&'active'}`} 

    )
          
}


export default Card;


