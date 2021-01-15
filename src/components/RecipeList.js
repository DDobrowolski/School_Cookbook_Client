import React from 'react';

const RecipeList = ({ className = '', recipes }) => {
  return (
    <div class={`list-group recipe-list ${className}`}>
      {recipes.map((r) => (
        <button type="button" class="list-group-item list-group-item-action">
          <span className='name'>{r.name}</span>
          <span>Wege: nie</span>
          <span>Wegan: nie</span>
        </button>
      ))}
    </div>
  );
};

export default RecipeList;