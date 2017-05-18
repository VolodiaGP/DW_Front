const LOAD = 'redux-example/map/LOAD';
const LOAD_REGIONS_SUCCESS = 'redux-example/map/LOAD_REGIONS_SUCCESS';
const LOAD_OBJECTS_SUCCESS = 'redux-example/map/LOAD_OBJECTS_SUCCESS';
const LOAD_CATEGOIRES_SUCCESS = 'redux-example/map/LOAD_CATEGOIRES_SUCCESS';
const LOAD_CONTRACT_TYPES_SUCCESS = 'redux-example/map/LOAD_CONTRACT_TYPES_SUCCESS';
const LOAD_HOLDERS_SUCCESS = 'redux-example/map/LOAD_HOLDERS_SUCCESS';
const LOAD_OWNERSHIP_FORMS_SUCCESS = 'redux-example/map/LOAD_OWNERSHIP_FORMS_SUCCESS';
const LOAD_PEOPLE_CATEGORIES_SUCCESS = 'redux-example/map/LOAD_PEOPLE_CATEGORIES_SUCCESS';
const LOAD_PEOPLES_SUCCESS = 'redux-example/map/LOAD_PEOPLES_SUCCESS';
const LOAD_FAIL = 'redux-example/map/LOAD_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  regions: [],
  objects: [],
  categories: [],
  contractTypes: [],
  holders: [],
  ownershipForms: [],
  peopleCategories: [],
  peoples: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_REGIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        regions: action.result
      };
    case LOAD_OBJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        objects: action.result
      };
    case LOAD_CATEGOIRES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        categories: action.result
      };
    case LOAD_CONTRACT_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        contractTypes: action.result
      };
    case LOAD_HOLDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        holders: action.result
      };
    case LOAD_OWNERSHIP_FORMS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        ownershipForms: action.result
      };
    case LOAD_PEOPLE_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        peopleCategories: action.result
      };
    case LOAD_PEOPLES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        peoples: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        data: null
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function loadRegions() {
  return {
    types: [LOAD, LOAD_REGIONS_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('http://127.0.0.1:8000/api/regions/')
  };
}

export function loadObjects() {
  return {
    types: [LOAD, LOAD_OBJECTS_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('http://127.0.0.1:8000/api/objects/')
  };
}

export function loadCategories() {
  return {
    types: [LOAD, LOAD_CATEGOIRES_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('http://127.0.0.1:8000/api/category/')
  };
}

export function loadContractTypes() {
  return {
    types: [LOAD, LOAD_CONTRACT_TYPES_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('http://127.0.0.1:8000/api/contract_type/')
  };
}

export function loadHolders() {
  return {
    types: [LOAD, LOAD_HOLDERS_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('http://127.0.0.1:8000/api/holders/')
  };
}

export function loadOwnershipForms() {
  return {
    types: [LOAD, LOAD_OWNERSHIP_FORMS_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('http://127.0.0.1:8000/api/ownership_forms/')
  };
}

export function loadPeopleCategories() {
  return {
    types: [LOAD, LOAD_PEOPLE_CATEGORIES_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('http://127.0.0.1:8000/api/people_categories/')
  };
}

export function loadPeoples() {
  return {
    types: [LOAD, LOAD_PEOPLES_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('http://127.0.0.1:8000/api/peoples/')
  };
}
