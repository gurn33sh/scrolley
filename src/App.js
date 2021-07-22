import './App.css';
import Home from './components/Home'
import Navigation from './components/Navbar'

function App() {
  return (
    <div className="App">
    {/* <h1>This is a Totally new app</h1> */}
    <Navigation SubredditName="wallpapers" />
    <Home />
    </div>
  );
}

export default App;
