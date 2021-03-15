import React, { useEffect, useState } from 'react'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './styles/styles.css';
import Header from './components/Header';
import Allies from './Pages/Allies'
import Ally from './Pages/Ally'
import Game from './Pages/Game'
import Games from './Pages/Games'
import Home from './Pages/Home'
import Shows from './Pages/Shows'
import { AllyContext } from './context/AllyContext'
import allyDataService from './api/allyDataService'
import Footer from './components/Footer';

const App = () => {
  const [allies, setAllies] = useState(null);
  const [loadingAllies, setLoadingAllies] = useState(true);

  useEffect(() => {
    const getAllies = async () => {
      try {
        const res = await allyDataService.getAll();
        const allies = res.data.map((ally) => {
          let count = 0;
          ally.nominated_games.forEach((game) => {
            if (game.inducted) {
              count++;
            }
          });
          return {...ally, inductionCount: count}
        })
        setAllies(allies);
        setLoadingAllies(false);
      } catch (error) {
          console.log(error)
      }
    }
    getAllies();
  }, []);

  return (
    <Router>
      <AllyContext.Provider value={{allies, setAllies, loadingAllies}} >
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/games" component={Games} />
        <Route path="/game/:id" component={Game} />
        <Route path="/allies" component={Allies} />
        <Route path="/ally/:id" component={Ally} />
        <Route path="/shows" component={Shows} />
      </Switch>
      <Footer />
      </AllyContext.Provider>
    </Router>
  )
}

export default App;
