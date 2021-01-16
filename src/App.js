import './App.css';
import React from 'react';
import RecipeList from './components/RecipeList';
import Topbar from './components/Topbar';
import {parse} from 'fast-xml-parser';

const mockedRecipes = [{ id: 1, name: 'Bula' }, { id: 2, name: 'Ciasto' }];

const fetchRecipes = async (q = '') => {
  const qParam = q ? `q=${q}` : '';
  let resp = await fetch(`${process.env.REACT_APP_API_HOST}/recipes?${qParam}`, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
  resp = await resp.text();
  const parsed = resp ? parse(resp) : null;
  const output = parsed && parsed.recipes && parsed.recipes.recipe ? parsed.recipes.recipe : [];
  return output;
};

function App() {
  const [recipes, setRecipes] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  React.useEffect(() => fetchRecipes(searchQuery).then(r => setRecipes(r)), [searchQuery]);



  return (
    <div className="App">
      <Topbar onSearch={setSearchQuery} searchValue={searchQuery} />
      <div className="container">
        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
}

export default App;
