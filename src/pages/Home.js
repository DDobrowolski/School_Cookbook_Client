import { TextField } from '@material-ui/core';
import { parse } from 'fast-xml-parser';
import { debounce } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import CustomTable from '../components/OverviewTable';
import { replaceDashWithUnderscore } from '../helpers/objectParser';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nazwa' },
  { id: 'created_at', numeric: false, disablePadding: true, label: 'Dodano' },
  { id: 'description', numeric: false, disablePadding: true, label: 'Opis' },
];

const fetchRecipes = async (
  q = '',
  page = 1,
  pageLen = 5,
  sort_type = 'asc',
  sort_by = 'name'
) => {
  const qParam = q ? `&q=${q}` : '';
  const params = `page=${page}&page_len=${pageLen}&sort_type=${sort_type}&sort_by=${sort_by}${qParam}`;
  let resp = await fetch(
    `${process.env.REACT_APP_API_HOST}/recipes?${params}`,
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
  let recipes, count;
  if (parsed && parsed.objects && parsed.objects.recipes) {
    recipes = Array.isArray(parsed.objects.recipes.recipe)
      ? parsed.objects.recipes.recipe
      : [parsed.objects.recipes.recipe];
    recipes = recipes.map((r) => replaceDashWithUnderscore(r));
    count = parsed.objects.count;
  }

  const output =
    recipes && count
      ? {
          recipes,
          count,
        }
      : null;

  return output;
};

const removeRecipe = async (ids) => {
  const resp = await fetch(`${process.env.REACT_APP_API_HOST}/recipes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids }),
  });
  return resp.json();
};

const Home = () => {
  const [recipes, setRecipes] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [pageLen, setPageLen] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('created_at');
  const [refresh, setRefresh] = React.useState(0);

  const history = useHistory();

  const handleSearch = debounce(setSearchQuery, 250);

  const tableActions = [
    {
      label: 'Szczegóły',
      id: 'details',
      onClick: (id) => history.push(`/${id}`),
    },
  ];

  const onRemoveClick = (ids) =>
    confirm('Jesteś pewien?') ? removeRecipe(ids) : null;

  const handleRefresh = () => setRefresh((p) => (p === 0 ? 1 : 0));

  React.useEffect(
    () =>
      fetchRecipes(searchQuery, page, pageLen, order, orderBy).then((r) => {
        setRecipes(r ? r.recipes : []);
        setCount(r ? r.count : 0);
      }),
    [searchQuery, page, pageLen, order, orderBy, refresh]
  );

  return (
    <>
      <form noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Szukaj"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>
      <CustomTable
        rows={recipes}
        headCells={headCells}
        tableActions={tableActions}
        pageLen={pageLen}
        setPageLen={setPageLen}
        page={page - 1}
        setPage={setPage}
        count={count}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        onRemoveClick={onRemoveClick}
        handleRefresh={handleRefresh}
      />
    </>
  );
};

export default Home;
