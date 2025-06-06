const ApiReducer = (state, action) => {
    switch (action.type) {
      case "SET_LOADING":
        return { ...state, isLoading: true };
  
      case "GET_DATA":
        return {
          ...state,
          isLoading: false,
          hits: action.payload.hits,
          nbPages: action.payload.nbPages
        };
  
      case "REMOVE_POST": // 🔥 FIX: correct spelling + case
        return {
          ...state,
          hits: state.hits.filter((curElem) => curElem.objectID !== action.payload)
        };

      case "SEARCH_QUERY":
        return{
          ...state,
          query: action.query,
        }
  
      default:
        return state;
    }
  };
  
  export default ApiReducer;
  