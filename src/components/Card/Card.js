import React from 'react';
import './Card.css';

import  RiotAPI from '../../api/RiotAPI';

const  RiotClient = new RiotAPI('username', 'password').authenticate();


const DDragonAPIConsumer = new DDragon();
console.log(await DDragonAPIConsumer.getStore());


export default function Card({ id, nome, imagemURL, preco, tier }) {
    return (
        <div className="card">
            
            <div className="card-content">
                
                
            </div>
        </div>
    );
}