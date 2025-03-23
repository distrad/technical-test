import { fetchGames } from "@/lib/api";
import GameCard from "@/components/gameCard";
import Pagination from "@/components/Pagination";
import { Game } from "@/lib/types";

export default async function GamesList({
  search,
  year,
  genres,
  platforms,
  tags,
  developers,
  page = 1,
}: {
  search: string;
  year: string;
  genres: string;
  platforms: string;
  tags: string;
  developers: string;
  page: number;
}) {
  const { results: games, count } = await fetchGames({
    search,
    year,
    genres,
    platforms,
    tags,
    developers,
    page,
    ordering: "-metacritic", // Sort by metacritic score (highest first)
  });

  if (!games || games.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium">No games found</h3>
        <p className="text-gray-500 mt-2">
          Try adjusting your filters or search term
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(count / 20); // RAWG API returns 20 games per page

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game: Game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
