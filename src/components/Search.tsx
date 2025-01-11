import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  genre: string;
  platform: string;
  game_url: string;
}
export default function Search() {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await axios.get('/api/games');
        const data: Game[] = response.data;
        setAllGames(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement> ) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
    const filtered = allGames.filter((game) =>
      game.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredGames(filtered);
  };
  return (
    <div className="flex flex-col items-center w-full">
      <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-8/12 relative">
        <input
          type="search"
          placeholder="Type the game that you dream"
          value={searchInput}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
        />
        {loading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : (
          searchInput.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-2 shadow-lg z-10">
              {filteredGames.map((game) => (
                <a href={game.game_url} target="_blank">
                  <li
                    key={game.id}
                    className="flex items-center p-2 hover:bg-gray-100"
                  >
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-12 h-12 object-cover rounded-lg mr-4"
                    />
                    <span>{game.title}</span>
                  </li>
                </a>
              ))}
            </ul>
          )
        )}
      </form>
    </div>
  );
}
