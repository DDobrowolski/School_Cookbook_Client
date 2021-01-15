import './App.css';
import RecipeList from './components/RecipeList';
import Topbar from './components/Topbar';

const recipes = [{ name: 'Bula' }, { name: 'Ciasto' }];

function App() {
  return (
    <div className="App">
      <Topbar />
      <div className="container">
        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
}

export default App;
