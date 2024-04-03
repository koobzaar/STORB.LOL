'use client'
// External imports
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Image from 'next/image';

import Store from '../middlewares/Store';
import LeftMenu from '../components/LeftMenu/LeftMenu';
import Gifting from '../components/Gifting/Gifting';
import Card from '../components/Card/Card';
import pykeImage from '../../public/images/pyke.png';
import placeHolderUser from '../../public/images/user-placeholder.png';
import riotPointsIcon from '../../public/icons/rp.svg';
import starIcon from '../../public/icons/star.svg';
import skinsPlaceholder from '../../public/images/naafiri.jpg';
import championsPlaceholder from '../../public/images/kindred.jpg';
import hextecPlaceholder from '../../public/images/kassadin-hextec.jpg';
import bundlesPlaceholder from '../../public/images/bundle.jpg';

// Styles
import './home.css';

// Constants
const user = {
    name: 'Zerrinha Piroca de Mel',
    rating: 5,
    date: '2 days ago',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices neque ornare aenean euismod elementum nisi. Euismod in pellentesque massa placerat. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Sit amet aliquam id diam maecenas. Sed felis eget velit aliquet sagittis id.'
}

const Loja = new Store();

export default function Home() {
    
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [numColumns, setNumColumns] = useState(5);
    const [showGifting, setShowGifting] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [userRiotPoints, setUserRiotPoints] = useState(0);

    const [cookies, addCookies, removeCookies] = useCookies(['user', 'pass']);
    const router = useRouter();
   
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const columnWidth = 320;
            const newNumColumns = Math.floor(width / columnWidth);
            setNumColumns(newNumColumns);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); 

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const toggleGifting = (id, name, imageURL, price, tier) => {
        setSelectedItem({id, name, imageURL, price, tier});
        setShowGifting(!showGifting);
    }

    const Cell = ({ columnIndex, rowIndex, style }) => {
        const item = filteredItems[rowIndex * numColumns + columnIndex];
        return item ? (
            <div style={style} key={item.id} className='store-content-items-card'>
                <Card id={item.id} name={item.name} imageURL={item.imageURL} price={item.price} tier={item.tier} onButtonClick={toggleGifting} showButton={true} />
            </div>
        ) : null;
    };

    const numRows = Math.ceil(filteredItems.length / numColumns);

    const getItems = async (type) => {
        const items = await Loja.getCatalogByType(type);
        setItems(items);
    }
    const getAmountOfRP = async () => {
        const rp = await Loja.getRiotPoints();
        setUserRiotPoints(rp);
    }

    const logout = () => {
        removeCookies('user');
        removeCookies('pass');
        router.push('/login');
    }

    useEffect(() => {
        const fetchItems = async () => {
            if (!cookies.user || !cookies.pass) {
                router.push('/login');
            }
            await Loja.fetchCatalog();
            await Loja.fetchRiotPoints();
            await getItems('CHAMPION');
            await getAmountOfRP();
        };
    
        fetchItems();
    }, []);
    

    // TODO: Mexer na responsividade da home e fazer com que a opacidade do card da loja seja 1 quando o usuário clicar em qualquer item do menu ou dos cards da background
    // TODO: Pop-up de sucesso e confirmação de compra. Como fazer pop-up de um componente?
    // TODO: Uma logo
    // TODO: Fazer os icones do menu lateral e do login redirecionarem para algo. Qual o discord? :P
    const showCheckout = (item) => {
    }
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
                    <LeftMenu changeStore={getItems} availableCategories={Loja.getAvailablesCategories()} logoutFunction={logout}/>
                </div>
                <div className='separator'></div>
                <div className='store-content'>
                    <div className='store-content-header'>
                        <Image src={Loja.currentIcon} width={30} alt={Loja.currentCategory}/>
                        <h1>{Loja.currentCategory}</h1>
                        <div className='items-search-bar'>
                            <input type='text'  placeholder='Wanna search of anything in specific?' onChange={handleSearchChange} />
                        </div>
                        <div className='store-content-header-riot-points'>
                            <Image src={riotPointsIcon} width={20} alt='Riot Points icon'/>
                            <p>{userRiotPoints}</p>
                        </div>
                    </div>
                    <div className='store-content-items'>
                        <AutoSizer>
                            {({height, width}) => (
                                <Grid
                                    columnCount={numColumns}
                                    columnWidth={260} 
                                    height={height} 
                                    rowCount={numRows}
                                    rowHeight={410} 
                                    width={width} 
                                >
                                    {Cell}
                                </Grid>
                            )}
                        </AutoSizer>
                    </div>
                </div>
            </div>
                {showGifting && <Gifting 
                    id={selectedItem.id} 
                    name={selectedItem.name} 
                    imageURL={selectedItem.imageURL} 
                    price={selectedItem.price} 
                    tier={selectedItem.tier} 
                    currentRiotPoints={userRiotPoints}
                    username={cookies.user}
                    password={cookies.pass}
                hideGifting={toggleGifting}/>
                }
                
        </body>
    );
}