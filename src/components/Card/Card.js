import React from 'react';
import './Card.css';
import Image from "next/image";
import solidWave from '../../../public/images/card/wave.svg'
import translucidWave from '../../../public/images/card/wave-translucid.svg'
import giftIcon from '../../../public/icons/gift.svg'
import riotPoints from '../../../public/icons/rp.svg'
import circle from '../../../public/icons/circle.svg'
import { getFillColor, capitalizeFirstLetter } from './utils';


/**
 * RComponente do card dos itens da loja. Retorna o elemento HTML com a imagem, nome, tier, preço e botão de enviar presente.
 *
 * @param {string} props.id - Identificador do item.
 * @param {string} props.name - Nome do item
 * @param {string} props.imageURL - URL da imagem do item
 * @param {number} props.price - Preço do item em Riot Points
 * @param {string: "ULTIMATE", "MYTHIC", "PRESTIGE", "LEGENDARY", "EPIC", "COMMON"} props.tier - Tier do item. Se não houver tier - Hextec e etc - espera-se receber o valor "COMMMON".
 */
export default function Card({ id, name, imageURL, price, tier }) {
    return (
        <div className="card" id={id}>
            <div className='image-placeholder'>
                
                <div className='image-container'>
                
                    <Image priority  className='item-image' src={imageURL} alt='item' width={1254} height={739}/>
                    <div className='wave-container'>
                        <Image priority className='translucid-wave' src={translucidWave} alt='wave' width={1000} height={100}/>
                        <Image priority className='solid-wave' src={solidWave} alt='wave' width={1000} height={100}/>
                    </div>
                </div>
            </div>
            <div className="card-content">
                <div className='item-info'>
                    <div className='item-name'>
                        <h1>Content name</h1>
                        <p>{name}</p>
                    </div>
                    <div className='item-tier'>
                        <h1>Tier</h1>
                        <p>
                            <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg">
                                <circle r="2" cx="5" cy="7" fill={getFillColor(tier)}/>
                            </svg>
                            {capitalizeFirstLetter(tier)}
                        </p>
                    </div>
                </div>
                <div className='item-price-and-send'>
                    <div className='item-price'>
                        <h1>Riot Points</h1>
                        <p>
                            <Image src={riotPoints} className="rp-icon" alt='rp' width={10} height={10}/>
                            {price}
                        </p>
                    </div>
                    <div className='item-gift-button'>
                        <button className='send-gift-button'>
                            <Image src={giftIcon} className="gift-icon" alt='gift' width={10} height={10}/>
                            Send gift
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}