'use strict';

const STORE = {
  items: [
    {name: 'apple', checked: false,},
    {name: 'bread', checked: false},
    {name: 'milk ', checked: true},
    {name: 'cheese', checked: false}
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
  console.log('----------------------------------'); //here just to break up console logs for readability
  let items = shoppingList
    .map((item, index) => 
      ({
        item,
        html: generateItemElement(item, index)
      }));
  console.log(items);
  items = items.filter(({item}) => 
    !STORE.filter.checked || !item.checked);
//  !STORE.filter.checked || (STORE.filter.checked && !item.checked)

  // console.log(items);
  items= items.filter(({item}) => 
    item.name.indexOf(STORE.filter.searchTerm)>-1);
  
  return items.map(({html})=> html).join('');  
}

function renderShoppingList(items) {
  // items = items || STORE.items;

  const shoppingListItemsString = generateShoppingItemsString(STORE.items);
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
    console.log('`handleDeleteItemClicked` ran');
    renderShoppingList();
  });  
}

function handleCheckedCheckbox() {
  $('#js-checkbox-form').on('change', event => {  
    STORE.filter.checked = !STORE.filter.checked;
    getCheckedData();   
  });
}
function getCheckedData() {
  let filteredItems = [...STORE.items];
  if (STORE.filter.checked === true) {
    filteredItems = filteredItems.filter(item => !item.checked);    
  } 
  renderShoppingList(filteredItems); 
}

function handleItemSearchSubmit() {
  $('#js-search-form').on('submit', event => {
    event.preventDefault();    
    const newSearch = $('.js-search-input').val();
    // console.log(`${STORE.filter.searchTerm} is the search term before entering one!` );
    STORE.filter.searchTerm = newSearch;    
    // console.log(`${STORE.filter.searchTerm} AFTER entering text` );    
    console.log(newSearch);
    


    $('.js-search-input').val('');
    renderShoppingList();
    // getSearchedData();    
  });
}
// function getSearchedData() {
//   let filteredItems = [...STORE.items];
//   if (STORE.filter.searchTerm !== '') {
//     filteredItems = filteredItems.filter(item => item.name.indexOf(STORE.filter.searchTerm)>-1);
//   }
//   renderShoppingList(filteredItems);
// }

function INDEX2(){
  console.log('This is the Index2 JS file running......');
}


function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleCheckedCheckbox();
  handleItemSearchSubmit();
  INDEX2();
  console.log('----------------------------------');
   
}

$(handleShoppingList);