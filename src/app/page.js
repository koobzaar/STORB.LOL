import Image from "next/image";
import Card from '../components/Card/Card'
import RiotAPI from '../api/RiotAPI';
import Store from '../api/Store';

// const  store = new Store('x', 'x', 'pt_BR');
// await store.authenticate();
// const x = await store.getStore();
// console.log(x)
export default function Home() {
  return (
    <body>
      <Card
      name={'Bewithing Miss Fortune Prestige Edition'}
      imageURL={'https://cdnb.artstation.com/p/assets/images/images/029/676/297/large/west-studio-weststudio-lol-splash-01.jpg?1598307679'}
      tier={'PRESTIGE'}
      price={'1820RP'}
      
      />
       <Card
      name={'Bewithing Miss Fortune Prestige Edition'}
      imageURL={'https://dotesports.com/wp-content/uploads/2024/02/PROJECT_Naafiri.jpg'}
      tier={'PRESTIGE'}
      price={'1820RP'}
      
      />
      
      
    </body>
  );
}
