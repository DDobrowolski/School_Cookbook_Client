import React from 'react';

const Topbar = ({ className, onSearch,searchValue }) => {
  const onSearchChange = (e) => onSearch(e.target.value);

  return (
    <nav className="navbar navbar-light bg-light">
      <a href='/' className="navbar-brand">Cookbook</a>
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Szukaj"
          aria-label="Search"
          onChange={onSearchChange}
          value={searchValue}
        />
        <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">
          Szukaj
        </button>
      </form>
    </nav>
  );
};

export default Topbar;