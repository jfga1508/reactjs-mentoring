import { useState } from "react";
import "./App.css";
import Counter from "./components/counter/Counter";
import GenreSelector from "./components/genreSelector/GenreSelector";
import SearchBar from "./components/search/Search";

function App() {
  const genres = ["All", "Documentary", "Comedy", "Horror", "Crime"];
  const [currentGenre, setCurrentGenre] = useState<string>(genres[0]);

  return (
    <>
      <Counter initial={0} />
      <SearchBar
        initialQuery=""
        onSearch={(query) => console.log("Callback query: ", query)}
      />
      <GenreSelector
        genres={genres}
        selectedGenre={currentGenre}
        onSelect={(genre) => {
          setCurrentGenre(genre);
          console.log("Callback genre: ", genre);
        }}
      />
    </>
  );
}

export default App;
