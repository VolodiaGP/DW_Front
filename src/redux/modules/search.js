const TOGGLE_SEARCH_FIELD_DISPLAY = 'redux-example/search/TOGGLE_SEARCH_FIELD_DISPLAY';

const initialState = {
  searchFieldEnabled: false,
  searchResults: [],
  searchQuery: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_SEARCH_FIELD_DISPLAY:
      return {
        ...state,
        searchFieldEnabled: !state.searchFieldEnabled
      };

    default:
      return state;
  }
}

export function toggleSearchFieldDisplay() {
  return {
    type: TOGGLE_SEARCH_FIELD_DISPLAY
  };
}
