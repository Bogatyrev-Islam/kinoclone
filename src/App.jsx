import Comments from "./components/Comments/Comments";


import { useState, useEffect } from "react";
import Search from "./components/Search/Search";
import MediaCatalog from "./components/MediaCatalog";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <>
      <p>{searchQuery}</p>
      <Search onSearch={setSearchQuery} />
      <p>{total}</p>
      <MediaCatalog name={debouncedQuery} total={setTotal} />

      <Comments/>
    </>
  );
}

export default App;
