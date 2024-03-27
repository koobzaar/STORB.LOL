import Image from "next/image";
import Card from '../components/Card/Card'
import RiotAPI from '../api/RiotAPI';

// const  RiotClient = new RiotAPI('x', 'x', 'pt_BR');
// await RiotClient.authenticate();

export default function Home() {
  return (
    <body>
      <Card/>
    </body>
  );
}
