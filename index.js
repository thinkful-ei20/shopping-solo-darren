'use strict';

const STORE = {
  items: [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  ],
  filter : {
    checked: false,
    searchTerm: '',
  },
};

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
}

function renderShoppingList() {

//.filter(item => !item.checked && item.name.indexOf(STORE.filter.searchTerm)

  console.log('`renderShoppingList` ran');
  console.log(STORE.filter.checked);
  let filteredItems = [...STORE.items];
  if (STORE.filter.checked === true) {
    filteredItems = filteredItems.filter(item => !item.checked);    
  }

  // if (STORE.filter.searchTerm !== '') {
  //   filteredItems = filteredItems.filter(item => item.name.toLowerCase().indexOf('o')>-1);
  // }

  console.log(filteredItems);

 
  const shoppingListItemsString = generateShoppingItemsString(filteredItems);
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    STORE.items.splice(itemIndex, 1);
    console.log(itemIndex);
    renderShoppingList();
  });
  console.log('`handleDeleteItemClicked` ran');
}



function handleCheckedCheckbox() {
  $('#js-checkbox-form').on('change', event => {
    
    // let isChecked = $(event.target).val() === 'false' ? true : false;
    STORE.filter.checked = STORE.filter.checked ? false : true;
 
    // $(event.target).val(isChecked) ;

    // STORE.filter.checked = isChecked;
    // console.log(isChecked);

    renderShoppingList();   
  });
}

function handleItemSearchSubmit() {
  $('#js-search-form').on('submit', event => {
    event.preventDefault();
    // STORE.filter.searchTerm = STORE.filter.searchTerm
    const newSearch = $('.js-search-input').val();


    $('.js-search-input').val('');
    renderShoppingList();
  });

}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleCheckedCheckbox();
  handleItemSearchSubmit();
}

$(handleShoppingList);