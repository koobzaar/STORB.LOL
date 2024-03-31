import React from 'react'
import './Gifting.css'
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import Button from '../Button/Button';
import giftIcon from '../../../public/icons/gift.svg';
import RPIcon from '../../../public/icons/rp.svg';
import Image from 'next/image'; 
import closeIcon from '../../../public/icons/close.svg';
Gifting.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    tier: PropTypes.oneOf(["ULTIMATE", "MYTHIC", "PRESTIGE", "LEGENDARY", "EPIC", "COMMON"]).isRequired,
    currentRiotPoints: PropTypes.bool
};

export default function Gifting ({id, name, imageURL, price, tier, currentRiotPoints}) {
    return (
      <div className='gifting-card'>
        <div className='gifting-card-parameters'>
            <div className='gifting-card-header'>
                <h1>Almost there...</h1>
            </div>
            <div className='gifting-card-user'>
                <div className='gifting-card-user-info'>
                    <label>
                        Who you want to gift to?
                    </label>
                    <input className='gifting-send-message-input' placeholder='Summoner name'/>
                    
                </div>
                <div className='gifting-card-user-info'>
                    <label>
                        Wanna send any message?
                    </label>
                    <div className='gifting-send-message'>
                    <textarea className='gifting-send-message-input' placeholder='Message'/>
                    </div>
                </div>
            </div>
        </div>
        <div className='gifting-card-item-card'>
            <div className='gifting-card-item-header'>
                <p>Checkout details</p>
                <button className='gifting-card-close-button'>
                    <Image  src={closeIcon} alt='Gift icon' width={10} height={10}/>
                </button>
            </div>
            <div className='gifting-card-item'>
                <div className='card-container'>
                    <Card c id={id} name={name} imageURL={imageURL} price={price} tier={tier} showButton={false}/>
                </div>
                <div className='gifting-card-balance'>
                    <label>
                        Current:
                    </label>
                    <div className='gifting-card-balance-content'>
                        <Image src={RPIcon} alt='Riot Points icon' width={8} height={8}/>    
                        <p>
                            {currentRiotPoints}
                        </p>
                    </div>
                    <label>
                        Gift total:
                    </label>
                    <div className='gifting-card-balance-content'>
                        <Image src={RPIcon} alt='Riot Points icon' width={8} height={8}/>
                        <p>
                            {price}
                        </p>
                    </div>
                    <label>
                        Balance:
                    </label>
                    <div className='gifting-card-balance-content'>
                        <Image src={RPIcon} alt='Riot Points icon' width={8} height={8}/>
                        <p>
                            {currentRiotPoints - price}
                        </p>
                    </div>
                </div>
            </div>
            <div className='gift-card-user-decision'>
                
                <span className='gift-card-maybe-letter'>
                    Maybe later...
                </span>
                <div className='gift-card-button-container'>
                <Button icon={giftIcon} text='Send gift'/>  
                </div>
            </div>
        </div>
        
      </div>
    )
}
