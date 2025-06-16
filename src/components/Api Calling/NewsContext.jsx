import React, { createContext, useEffect, useContext, useReducer } from "react";
import ApiReducer from './ApiReducer'



const API = 'https://hn.algolia.com/api/v1/search?'



const AppContext = createContext();


const initialState = {
  isLoading : true,
  query : "",
  nbPages : 0,
  page: 0,
  hits : []
}


const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ApiReducer, initialState)

    const fetchData = async (url) => {

      dispatch({type:"SET_LOADING"})

      try {
        const response = await fetch(url);
      const data = await response.json();
      // console.log(data.hits)

      dispatch({
        type: "GET_DATA",
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
          page: data.page
        }
      })
      } catch (error) {
        console.log(error)
      }

    }

    // To remove post
    const removePost = (postId)=>{
      dispatch({
        type: "REMOVE_POST",
        payload: postId
      })
    }

    // For Search query
    const searchPost = (searchquery)=>{
      dispatch({type:"SEARCH_QUERY",
        query:searchquery
      })
    }



    useEffect(()=>{
      fetchData(`${API}query=${state.query}&page=${state.page} `);
      
    },[state.query])
    
  return (
    <AppContext.Provider value = {{...state, removePost,searchPost}}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => useContext(AppContext);

export { AppProvider, useGlobalContext, AppContext }; 