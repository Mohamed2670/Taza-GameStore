interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  genre: string;
  platform: string;
  game_url: string;
}
interface GameItemProps {
  game: Game;
}

export default function GameCard({ game }:GameItemProps) {
  return (
    <div
      key={game.id}
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 p-3"
    >
      <a href={game.game_url} target="_blank">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-32 object-cover rounded-t-lg"
        />
      </a>
      <h2 className="text-lg font-bold mt-2">{game.title}</h2>
      <p className="text-gray-600">{game.short_description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded">
          {game.genre}
        </span>
        <span className="text-sm bg-green-500 text-white px-2 py-1 rounded">
          {game.platform}
        </span>
      </div>
    </div>
  );
};

