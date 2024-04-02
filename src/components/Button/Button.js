'use client'
import React from 'react'
import Image from 'next/image'
import './Button.css'

export default function Button ({icon, text, iconsize = 10, onButtonClick}) {
    return (
        <div className='button-component'>
            <button className='button-component-clickable' onClick={onButtonClick} >
                <Image src={icon} className="button-component-icon" alt={"Button icon for "+text} width={iconsize} height={iconsize}/>
                <span className='button-component-text'>{text}</span>
            </button>
        </div>
    )
}
