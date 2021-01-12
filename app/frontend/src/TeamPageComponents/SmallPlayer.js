import React from 'react';
// import './index.css';

const SmallPlayer = (props) => {
    return(
        <div className='smallplayer tc'>
            <div className='b tc dib mr2'> {props.name} </div>
            <div className='normal tc dib ml2'> {props.role.toLowerCase()} </div>
        </div>
    )
}



export default SmallPlayer;