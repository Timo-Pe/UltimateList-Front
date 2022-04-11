export const GET_ITEMS_FROM_API = 'GET_ITEMS_FROM_API';
export const SHOW_ITEMS = 'SHOW_ITEMS';
export const CHANGE_INPUT_SEARCH_VALUE = 'CHANGE_INPUT_SEARCH_VALUE';

export const getItemsFromApi = () => ({
  type: GET_ITEMS_FROM_API,
});

export const showItems = (items) => ({
  type: SHOW_ITEMS,
  items: items,
});

export const changeInputSearchValue = (newValue) => ({
  type: CHANGE_INPUT_SEARCH_VALUE,
  value: newValue,
});
