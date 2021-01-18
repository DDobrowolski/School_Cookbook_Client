import { parse } from 'fast-xml-parser';
import React from 'react';
import CustomTable from '../components/Table';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nazwa' },
  // { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  // { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  // { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

const fetchRecipes = async (q = '') => {
  const qParam = q ? `q=${q}` : '';
  let resp = await fetch(
    `${process.env.REACT_APP_API_HOST}/recipes?${qParam}`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
  if (!resp) return [];
  resp = await resp.text();
  let parsed;
  try {
    parsed = resp ? parse(resp) : null;
  } catch (e) {
    console.error(e);
  }
  const output =
    parsed && parsed.recipes && parsed.recipes.recipe
      ? parsed.recipes.recipe
      : [];
  return output;
};

const Home = () => {
  const [recipes, setRecipes] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  React.useEffect(() => fetchRecipes(searchQuery).then((r) => setRecipes(r)), [
    searchQuery,
  ]);

  return <CustomTable rows={recipes} headCells={headCells} />;
};

export default Home;