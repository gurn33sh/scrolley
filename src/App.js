import './App.css';
import Home from './components/Home'
import Test, {Test2} from './components/testComponent'

function Testing(props) {
  let isTest = props.isTest
  if(isTest) {
    return <Test />
  }
  return <Test2 />
}

function App() {
  return (
    <div className="App">
    <h1>This is a Totally new app</h1>
    <Home />  
    <Testing isTest={true} />
    </div>
  );
}

export default App;
