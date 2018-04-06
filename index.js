'use strict';

const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];


function renderShoppingList() {

  console.log('`renderShoppingList` ran');
}


function handleNewItemSubmit() {
  console.log('`handleNewItemSubmit` ran');
}


function handleItemCheckClicked() {

  console.log('`handleItemCheckClicked` ran');
}


function handleDeleteItemClicked() {

  console.log('`handleDeleteItemClicked` ran');
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();

}

$(handleShoppingList);