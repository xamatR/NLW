import './styles/main.css';
import { GameBanner } from './assets/components/gameBanner';
import Logo from './assets/logo.svg';
import { CreateAdBanner } from './assets/components/CreateAdBanner';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from './assets/components/CreateAdModal';
import axios from 'axios';



interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(Response => setGames(Response.data))
  }, []);


  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={Logo} alt='Logo' />
      <h1 className='text-6xl text-white font-black my-20'>Seu <span className='text-transparent bg-gradient bg-clip-text'>duo</span> está aqui</h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => (
          <GameBanner key={game.id} title={game.title} bannerUrl={game.bannerUrl} adsCount={game._count.ads} />
        ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>

  )
}

export default App
