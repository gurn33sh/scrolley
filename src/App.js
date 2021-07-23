import './App.css';
import Home from './components/Home'
import { createMuiTheme } from '@material-ui/core/styles'
import Navigation from './components/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Image from './components/Image'

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation SubredditName="wallpapers" />
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route exact={true} path="/g/subreddits/:subreddit/:type/:id" component={Image} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
