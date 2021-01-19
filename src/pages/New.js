import { Button } from '@material-ui/core';
import { parse } from 'fast-xml-parser';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BasicTable from '../components/DetailTable';
import IngredientsTable from '../components/IngredientsTable';

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
    id: 'ingredient_type.name',
    numeric: false,
    disablePadding: false,
    label: 'Typ',
  },
  {
    id: 'amount_of',
    numeric: false,
    disablePadding: false,
    label: 'Ilość',
  },
  {
    id: 'measure_unit.name',
    numeric: false,
    disablePadding: false,
    label: 'Jednostka',
  },
];

const createRecipe = async (recipe) => {
  let resp = await fetch(`${process.env.REACT_APP_API_HOST}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
    },
    body: recipe,
  });
  if (!resp) return null;
  resp = await resp.json();
  const output = resp && resp.id ? resp.id : null;
  return output;
};

const validateFile = async (file) => {
  let resp = await fetch(`${process.env.REACT_APP_API_HOST}/recipes/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
    },
    body: file,
  });
  if (!resp) return null;
  resp = await resp.json();
  console.log(resp);
  return resp;
};

const New = () => {
  const [recipe, setRecipe] = React.useState(null);
  const [xmlFile, setXmlFile] = React.useState(null);
  const [error, setError] = React.useState(false);
  const fileInputRef = React.useRef();
  const history = useHistory();
  // React.useEffect(() => fetchRecipe(id).then((r) => setRecipe(r)), [id]);

  const onFileUploadAction = () => fileInputRef.current.click();
  const onFileUploadInputChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      setXmlFile(reader.result);
    };
    reader.readAsText(e.target.files[0]);
  };
  const onFileValidateClick = async () => {
    const resp = await validateFile(xmlFile);
    if (resp.errors && resp.errors.length) return setError(true);
    setError(false);
    resp.recipe && setRecipe(resp.recipe);
  };

  const onCreateClick = async () => {
    const resp = await createRecipe(xmlFile);
    resp && history.push(`/${resp}`);
  };

  return (
    <>
      <h2 className="tableTitle">Dodaj nowy przepis</h2>
      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={onFileUploadInputChange}
        accept="text/xml"
      />
      <div className="buttonsContainer">
        <Button variant="contained">
          <a
            href={`${process.env.REACT_APP_API_HOST}/xml_schemas/recipe.xsd`}
            target="_blank"
            rel="noreferrer"
          >
            Schemat XML
          </a>
        </Button>
        <Button variant="contained" onClick={onFileUploadAction}>
          Dodaj plik xml
        </Button>
        {xmlFile && (
          <Button
            variant="contained"
            color="primary"
            onClick={onFileValidateClick}
          >
            Sprawdź
          </Button>
        )}
        {xmlFile && recipe && (
          <Button
            variant="contained"
            color="primary"
            onClick={onCreateClick}
          >
            Zapisz
          </Button>
        )}
      </div>
      {error && <h2 className="tableTitle">Błąd: nieprawidłowy plik</h2>}
      {!error && recipe && (
        <>
          <BasicTable row={recipe} headCells={mainHeadCells} />
          <h4 className="tableTitle">Składniki</h4>
          <IngredientsTable
            rows={recipe.ingredients ? recipe.ingredients : []}
            headCells={ingredientsHeadCells}
          />
        </>
      )}
    </>
  );
};

export default New;
