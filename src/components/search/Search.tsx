import { useState } from "react";
import { Outlet } from "react-router-dom";

const SearchBar = ({
  initialQuery = "",
  onSearch,
}: {
  initialQuery: string;
  onSearch?: (query: string) => void;
}) => {
  const [query, setQuery] = useState(initialQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    //Callback onSearch if set
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="card">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="What do you want to watch?"
          style={{
            height: "39px",
            width: "300px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            height: "39px",
            margin: "0 5px",
            padding: "10px",
            borderRadius: "4px",
            border: "0",
            backgroundColor: "#F65261",
            color: "#FFF",
          }}
        >
          Search
        </button>
      </div>
      {<Outlet />}
    </>
  );
};

export default SearchBar;
