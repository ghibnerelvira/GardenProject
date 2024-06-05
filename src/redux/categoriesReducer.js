
export const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const actionTypes = {
  FETCH_CATEGORIES_REQUEST: 'FETCH_CATEGORIES_REQUEST',
  FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILURE: 'FETCH_CATEGORIES_FAILURE',
  FETCH_PRODUCTS_BY_CATEGORY_REQUEST: 'FETCH_PRODUCTS_BY_CATEGORY_REQUEST',
  FETCH_PRODUCTS_BY_CATEGORY_SUCCESS: 'FETCH_PRODUCTS_BY_CATEGORY_SUCCESS',
  FETCH_PRODUCTS_BY_CATEGORY_FAILURE: 'FETCH_PRODUCTS_BY_CATEGORY_FAILURE',
};

export function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_REQUEST:
    case actionTypes.FETCH_PRODUCTS_BY_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_CATEGORIES_SUCCESS:
    case actionTypes.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case actionTypes.FETCH_CATEGORIES_FAILURE:
    case actionTypes.FETCH_PRODUCTS_BY_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default categoriesReducer;
