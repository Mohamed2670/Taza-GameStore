import axios from "axios";
import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import Filter from "./Filter";

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  genre: string;
  platform: string;
  game_url: string;
}
const allPlatform = ["All", "PC (Windows)", "Web Browser"];
const allGenres = [
  "All",
  "MMORPG",
  "Shooter",
  "Strategy",
  "MOBA",
  "Racing",
  "Sports",
  "Social",
  "Sandbox",
  "Open-world",
  "Survival",
  "PvP",
  "PvE",
  "Pixel",
  "Voxel",
  "Zombie",
  "Turn-based",
  "First-person",
  "Third-person",
  "Top-down",
  "Tank",
  "Space",
  "Sailing",
  "Side-scroller",
  "Superhero",
  "Permadeath",
  "Card",
  "Battle-royale",
  "MMO",
  "MMOFPS",
  "MMOTPS",
  "3D",
  "2D",
  "Anime",
  "Fantasy",
  "Sci-fi",
  "Fighting",
  "Action-RPG",
  "Action",
  "Military",
  "Martial-arts",
  "Flight",
  "Low-spec",
  "Tower-defense",
  "Horror",
  "MMORTS",
];

export default function GameList() {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedPlat, setselectedPlat] = useState("All");
  const [elementsCount, setElementsCount] = useState(20);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await axios.get('/api/games');
        const data: Game[] = response.data;
        setAllGames(data);
        setGames(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  function handleGenreChange(genre: string, plat: string) {
    setSelectedGenre(genre);
    setselectedPlat(plat);

    let filteredGames = allGames;
    if (genre != "All") {
      filteredGames = filteredGames.filter((game) => game.genre === genre);
    }

    if (plat != "All") {
      filteredGames = filteredGames.filter((game) => game.platform === plat);
    }
    setGames(filteredGames);
    console.log(genre, plat, games.length);
    setElementsCount(20);
  }

  function handleMore() {
    setElementsCount(elementsCount + 20);
  }
  if (loading) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="p-4 bg-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">
        Free To Play Games
      </h1>
      <div className="mb-4 flex">
        <Filter
          selectedGenre={selectedGenre}
          selectedPlat={selectedPlat}
          allGenres={allGenres}
          allPlatform={allPlatform}
          handleGenreChange={handleGenreChange}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 hover:">
        {games.slice(0, elementsCount).map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      {elementsCount < games.length ? (
        <div>
          <button
            onClick={handleMore}
            className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 mt-5 "
          >
            See More
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
