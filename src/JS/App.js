import '../CSS/App.css';
import '../CSS/theme.css';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Filepath from './components/filepath';
// import './css/index.css';
// import './css/cards.css';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Filepath />
    </div>
  );
}

export default App;

