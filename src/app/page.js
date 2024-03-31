import Image from "next/image";
import Card from '../components/Card/Card'
import RiotAPI from '../api/RiotAPI';
import Store from '../api/Store';
import LeftMenu from '../components/LeftMenu/LeftMenu';
import GiftingScreen from '../components/Gifting/Gifting';  
import Gifting from "../components/Gifting/Gifting";
// const  store = new Store('x', 'x', 'pt_BR');
// await store.authenticate();
// const x = await store.getStore();
// console.log(x)
export default function Home() {
  return (
    <body>
      <Gifting 
      name={'Bewithing Miss Fortune Prestige Edition'}
      imageURL={'https://cdnb.artstation.com/p/assets/images/images/029/676/297/large/west-studio-weststudio-lol-splash-01.jpg?1598307679'}
      tier={'PRESTIGE'}
      price={1820}
      currentRiotPoints={999999}
      />
    </body>
  );
}
