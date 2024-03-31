import React from 'react'
import Image from 'next/image'
import './Button.css'

export default function Button ({icon, text}) {
    return (
        <div className='button-component'>
        <button className='button-component-clickable' >
            <Image src={icon} className="button-component-icon" alt={"Button icon for "+text} width={10} height={10}/>
            <span className='button-component-text'>{text}</span>
        </button>
    </div>
    )
}
