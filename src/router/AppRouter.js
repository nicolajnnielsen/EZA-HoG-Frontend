import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Allies from '../Pages/Allies'
import Ally from '../Pages/Ally'
import Game from '../Pages/Game'
import Games from '../Pages/Games'
import Home from '../Pages/Home'
import Shows from '../Pages/Shows'

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/games" component={Games} />
                <Route path="/game/:id" component={Game} />
                <Route path="/allies" component={Allies} />
                <Route path="/ally/:id" component={Ally} />
                <Route path="/shows" component={Shows} />
            </Switch>
        </Router>
    )
}

export default AppRouter;
