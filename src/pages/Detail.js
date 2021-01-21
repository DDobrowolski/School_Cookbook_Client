import { Button } from '@material-ui/core';
import { parse } from 'fast-xml-parser';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BasicTable from '../components/DetailTable';
import IngredientsTable from '../components/IngredientsTable';
import { replaceDashWithUnderscore } from '../helpers/objectParser';

const mainHeadCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nazwa' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Opis' },
  {
    id: 'preparation_method',
    numeric: false,
    disablePadding: false,
    label: 'Sposób przyrządzenia',
  },
  // { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  // { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  // { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

const ingredientsHeadCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nazwa' },
  {
    id: 'ingredient-type.name',
    numeric: false,
    disablePadding: false,
    label: 'Typ',
  },
  {
    id: 'amount-of',
    numeric: false,
    disablePadding: false,
    label: 'Ilość',
  },
  {
    id: 'measure-unit.name',
    numeric: false,
    disablePadding: false,
    label: 'Jednostka',
  },
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
  const recipe =
    parsed && parsed.recipe ? replaceDashWithUnderscore(parsed.recipe) : null;
  return recipe;
};

const Detail = () => {
  const [recipe, setRecipe] = React.useState(null);
  const { id } = useParams();
  const history = useHistory();
  React.useEffect(() => fetchRecipe(id).then((r) => setRecipe(r)), [id]);

  return recipe ? (
    <>
      <h2 className="tableTitle">{recipe.name}</h2>
      <Button variant="contained" className="buttonPrint" onClick={() => {}}>
        <a href={`/${id}/print`} target='_blank' rel='noreferrer' >Wersja do druku</a>
      </Button>
      <BasicTable row={recipe} headCells={mainHeadCells} colors />
      <h4 className="tableTitle">Składniki</h4>
      <IngredientsTable
        rows={
          recipe.ingredients && recipe.ingredients.ingredient
            ? recipe.ingredients.ingredient
            : []
        }
        headCells={ingredientsHeadCells}
        colors
      />
    </>
  ) : (
    <p>Nie znaleziono przepisu.</p>
  );
};

export default Detail;
