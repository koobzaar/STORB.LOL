'use client'
import { redirect } from 'next/navigation'

import { useRouter } from 'next/navigation';

import LeftMenu from '../components/LeftMenu/LeftMenu';
import Gifting from '../components/Gifting/Gifting';
import Card from '../components/Card/Card';
import Image from 'next/image';
import pykeImage from '../../public/images/pyke.png';
import './home.css';
import placeHolderUser from '../../public/images/user-placeholder.png'
import starIcon from '../../public/icons/star.svg'
import skinsPlaceholder from '../../public/images/naafiri.jpg'
import championsPlaceholder from '../../public/images/kindred.jpg'
import hextecPlaceholder from '../../public/images/kassadin-hextec.jpg'
import bundlesPlaceholder from '../../public/images/bundle.jpg'

import { useEffect, useState } from 'react';
import Store from '../middlewares/Store';

const user = {
    name: 'Zerrinha Piroca de Mel',
    rating: 5,
    date: '2 days ago',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices neque ornare aenean euismod elementum nisi. Euismod in pellentesque massa placerat. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Sit amet aliquam id diam maecenas. Sed felis eget velit aliquet sagittis id.'
}
const Loja = new Store();

export default function Home() {
    // TODO: Mexer na responsividade da home e fazer com que a opacidade do card da loja seja 1 quando o usuário clicar em qualquer item do menu ou dos cards da background
    // TODO: Fazer com que o card da loja seja renderizado de acordo com o item clicado - talvez enviando uma função que altera a prop da loja para cada item do menu retornar a categoria especifica
    // TODO: Header da loja. Deve retornar do prop da loja qual categoria a propria loja está retornando. O input de pesquisa deve ser uma função getter da classe da loja que filtra baseada no parametro
    // TODO: Pop-up de sucesso e confirmação de compra. Como fazer pop-up de um componente?
    // TODO: Redirecionar o usuário para ./login caso a home não detecte user:pass nos cookies. Criptografar a pass?
    // TODO: Uma logo
    // TODO: Animar o menu lateral
    // TODO: Fazer os icones do menu lateral e do login redirecionarem para algo. Qual o discord? :P
    // TODO: Scroll um pouco mais smooth para os itens da loja
    // TODO: Skeletons para os itens da loja?? Tem como??
    // TODO: Logout apaga os cookies
    // Itens do menu lateral que não tiverem ainda suporte (hextec, icon, ou qualquer outra coisa) retornarão qualquer catalog em caso de não resposta do back-end. No entanto, enviarão o tipo do item para o middleware - que deve ser recebido do back-end
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function getItems() {
            const items = await Loja.getCatalogByType('BUNDLES');
            setItems(items);
        }
        getItems();
    });

   
    
    return (
        <body>
            <div className='background-body'>
                <div className='pyke-background'>
                    <Image className='pyke-image' src={pykeImage} alt='Pyke image' />
                </div>
                <div className='home-body'>
                    <div className='home-user-rating-box'>
                        <div className='home-user-rating-container'>
                            <div className='home-user-title'>
                                <h1>Buyer&apos;s Feedback</h1>
                            </div>
                            <div className='home-user-rating-text'>
                                <p>{user.text}</p>
                            </div>
                            <div className='home-user-rating-identification'>
                                <div className='home-user-rating-identification-image'>
                                    <Image src={placeHolderUser} alt='User image' />
                                </div>
                                <div className='home-user-rating-identification-text'>
                                    <p className='home-user-rating-who'>{user.name}</p>
                                    <p className='home-user-rating-when'>{user.date}</p>
                                    <div className='home-user-rating-stars'>
                                        {[...Array(user.rating)].map((e, i) => <Image key={i} src={starIcon} width={10} alt='Star icon' />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='home-shortcuts-category'>
                        <div className='home-shortcuts-category-title'>
                            <h1>Top Categories</h1>
                        </div>
                        <div className='home-shortcuts-category-box'>
                            <div className='home-shortcuts-category-card home-shortcuts-category-skins'>
                                <div className='home-shortcuts-category-background-image-container'>
                                    <Image src={skinsPlaceholder} width={500} className='home-shortcuts-category-background-image' alt='Skins placeholder' />
                                    <h1>Skins</h1>
                                    <div className='home-shortcuts-category-background-image-gradient'>
                                    </div>
                                </div>
                            </div>
                            <div className='home-shortcuts-category-card home-shortcuts-category-champions'>
                                <div className='home-shortcuts-category-background-image-container'>
                                    <Image src={championsPlaceholder} width={500} className='home-shortcuts-category-background-image' alt='Champions placeholder' />
                                    <h1>Champions</h1>
                                    <div className='home-shortcuts-category-background-image-gradient'>
                                    </div>
                                </div>
                            </div>
                            <div className='home-shortcuts-category-row'>
                                <div className='home-shortcuts-category-card home-shortcuts-category-hextec'>
                                    <div className='home-shortcuts-category-background-image-container'>
                                        <Image src={hextecPlaceholder} width={300} className='home-shortcuts-category-background-image' alt='Hextec placeholder' />
                                        <h1>Hextec</h1>
                                        <div className='home-shortcuts-category-background-image-gradient'>
                                        </div>
                                    </div>
                                </div>
                                <div className='home-shortcuts-category-card home-shortcuts-category-bundles'>
                                    <div className='home-shortcuts-category-background-image-container'>
                                        <Image src={bundlesPlaceholder} width={300} className='home-shortcuts-category-background-image' alt='Bundles placeholder' />
                                        <h1>Bundles</h1>
                                        <div className='home-shortcuts-category-background-image-gradient'>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='store-body'>
                <div className='store-left-menu'>
                    <LeftMenu />
                </div>
                <div className='store-separator'></div>
                <div className='store-content'>
                    {/* <div className='store-content-header'>
                        <h1>Featured</h1>
                    </div>
                    <div className='store-content-items'>
                        
                            {items.map((item, index) => (
                                <div className='store-content-items-card'>
                                <Card key={index} id={item.id} name={item.name} imageURL={item.imageURL} price={item.price} tier={item.tier} showButton={true}/>
                                </div>
                            ))}
                       
                        
                    </div> */}
                </div>
            </div>
        </body>
    );
}