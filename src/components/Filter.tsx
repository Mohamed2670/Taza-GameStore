interface genreDropdown {
  selectedGenre: string;
  selectedPlat: string;
  allGenres: string[];
  allPlatform: string[];
  handleGenreChange: (genre: string, plat: string) => void;
}

export default function Filter({
  selectedGenre,
  selectedPlat,
  allGenres,
  allPlatform,
  handleGenreChange,
}: genreDropdown) {
  return (
    <div>
      <h3>
        Catigory:
        <select
          value={selectedGenre}
          onChange={(e) => handleGenreChange(e.target.value, selectedPlat)}
          className="ml-4 mb-4 p-2 rounded border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500"
        >
          {allGenres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </h3>
      <h3>
        PlatForm:
        <select
          value={selectedPlat}
          onChange={(e) => handleGenreChange(selectedGenre, e.target.value)}
          className="ml-4 p-2 rounded border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500"
        >
          {allPlatform.map((plat, index) => (
            <option key={index} value={plat}>
              {plat}
            </option>
          ))}
        </select>
      </h3>
    </div>
  );
}
