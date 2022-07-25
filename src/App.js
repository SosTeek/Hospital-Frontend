// import logo from './logo.svg';
// import './App.css';
import './assets/styles/index.css'
import Router from './routes';

import TopNav from './components/NavBar/TopNav';
// import SideNav from './components/NavBar/SideNav';

function App() {
  return (
    <div>
      {/* <h1>Hello</h1> */}
      < TopNav />

      <Router />
    </div>
  );
}

export default App;
