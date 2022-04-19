import './App.css';
import AppRoutes from './components/Routes/AppRoutes';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar/>
    <AppRoutes/>
    </div>
  );
}

export default App;
