import { Game } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link href={`/games/${game.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
        <div className="relative h-48 w-full">
          <Image
            src={
              game.background_image || "/placeholder.svg?height=200&width=300"
            }
            alt={game.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {game.metacritic && (
            <div
              className={`absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-sm
                ${
                  game.metacritic >= 85
                    ? "bg-green-600"
                    : game.metacritic >= 70
                    ? "bg-yellow-500"
                    : "bg-red-600"
                }`}
            >
              {game.metacritic}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 truncate">{game.name}</h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {game.platforms?.slice(0, 3).map((platform) => (
              <span
                key={platform.platform.id}
                className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
              >
                {platform.platform.name}
              </span>
            ))}
            {game.platforms && game.platforms.length > 3 && (
              <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                +{game.platforms.length - 3}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {new Date(game.released).getFullYear()}
          </p>
        </div>
      </div>
    </Link>
  );
}
