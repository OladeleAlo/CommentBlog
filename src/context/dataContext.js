import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/posts";
import { format } from "date-fns";

import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  const Navigate = useNavigate();

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );
  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  
  

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        setPosts,
        posts,
        
        
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
