import './App.css';
import React from 'react';
import RecipeList from './components/RecipeList';
import Topbar from './components/Topbar';
import {parse} from 'fast-xml-parser';
import CustomTable from './components/Table';

const mockedRecipes = [{ id: 1, name: 'Bula' }, { id: 2, name: 'Ciasto' }];
const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nazwa' },
  // { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  // { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  // { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

const fetchRecipes = async (q = '') => {
  const qParam = q ? `q=${q}` : '';
  let resp = await fetch(`${process.env.REACT_APP_API_HOST}/recipes?${qParam}`, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
  if(!resp) return [];
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
        <CustomTable rows={recipes} headCells={headCells} />
      </div>
    </div>
  );
}

export default App;
