import { parse } from 'fast-xml-parser';
import React from 'react';
import { useParams } from 'react-router-dom';
import CustomTable from '../components/Table';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nazwa' },
  // { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  // { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  // { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

const fetchRecipe = async (id) => {
  let resp = await fetch(`${process.env.REACT_APP_API_HOST}/recipes/${id}`, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
  if (!resp) return [];
  resp = await resp.text();
  let parsed;
  try {
    parsed = resp ? parse(resp) : null;
  } catch (e) {
    console.error(e);
  }
  const output = parsed && parsed.recipe ? parsed.recipe : null;
  return output;
};

const Detail = () => {
  const [recipe, setRecipe] = React.useState([]);
  const { id } = useParams();
  React.useEffect(() => fetchRecipe(id).then((r) => setRecipe(r)), [id]);

  return <CustomTable rows={[recipe]} headCells={headCells} />;
};

export default Detail;
