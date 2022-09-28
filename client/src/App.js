import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import ActivityCreate from './Components/ActivityCreate';
import Detail from './Components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/activities" component={ActivityCreate}/>
        <Route path="/home/:id" component={Detail} />
      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
