import Image from "next/image";
import Card from '../components/Card/Card'
import RiotAPI from '../api/RiotAPI';
import Store from '../api/Store';
import LeftMenu from '../components/LeftMenu/LeftMenu';
// const  store = new Store('x', 'x', 'pt_BR');
// await store.authenticate();
// const x = await store.getStore();
// console.log(x)
export default function Home() {
  return (
    <body>
      <LeftMenu />
    </body>
  );
}
