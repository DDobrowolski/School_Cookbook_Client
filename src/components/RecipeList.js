import React from 'react';

const RecipeList = ({ className = '', recipes }) => {
  return (
    <div className={`list-group recipe-list ${className}`}>
      {recipes.map((r) => (
        <button type="button" className="list-group-item list-group-item-action" key={r.id}>
          <span className='name'>{r.name}</span>
          <span>Wege: nie</span>
          <span>Wegan: nie</span>
        </button>
      ))}
    </div>
  );
};

export default RecipeList;