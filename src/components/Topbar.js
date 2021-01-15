import React from 'react';

const Topbar = ({ className }) => {
  return (
    <nav class="navbar navbar-light bg-light">
      <a href='/' class="navbar-brand">Cookbook</a>
      <form class="form-inline">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </nav>
  );
};

export default Topbar;