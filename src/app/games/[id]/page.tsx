import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchGameDetails,
  fetchGameScreenshots,
  fetchGameTrailers,
} from "@/lib/api";
import { ArrowLeft, Calendar, Monitor, Star, Tag, Users } from "lucide-react";
import GameTrailers from "@/components/GameTrailers";
import GameScreenshots from "@/components/GameScreenshots";

export default async function GamePage({ params }: { params: { id: string } }) {
  const gameId = Number.parseInt(params.id);

  if (isNaN(gameId)) {
    notFound();
  }

  const game = await fetchGameDetails(gameId);

  if (!game) {
    notFound();
  }

  const [screenshots, trailers] = await Promise.all([
    fetchGameScreenshots(gameId),
    fetchGameTrailers(gameId),
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to games
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Game header with background image */}
        <div className="relative h-80 w-full">
          <Image
            src={
              game.background_image || "/placeholder.svg?height=400&width=800"
            }
            alt={game.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold">{game.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                {game.released && (
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span>{new Date(game.released).getFullYear()}</span>
                  </div>
                )}
                {game.metacritic && (
                  <div
                    className={`flex items-center px-2 py-1 rounded-md ${
                      game.metacritic >= 85
                        ? "bg-green-600"
                        : game.metacritic >= 70
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    }`}
                  >
                    <Star size={16} className="mr-1" />
                    <span>{game.metacritic}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Game details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: game.description }}
              />

              {trailers?.results?.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4">Trailers</h2>
                  <GameTrailers trailers={trailers.results} />
                </div>
              )}

              {screenshots?.results?.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4">Screenshots</h2>
                  <GameScreenshots screenshots={screenshots.results} />
                </div>
              )}
            </div>

            <div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Game Info</h2>

                {game.platforms?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Platforms
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {game.platforms.map(
                        ({
                          platform,
                        }: {
                          platform: { id: number; name: string };
                        }) => (
                          <span
                            key={platform.id}
                            className="inline-flex items-center bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm"
                          >
                            <Monitor size={14} className="mr-1" />
                            {platform.name}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {game.genres?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Genres
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {game.genres.map(
                        (genre: { id: number; name: string }) => (
                          <span
                            key={genre.id}
                            className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm"
                          >
                            {genre.name}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {game.developers?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Developers
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {game.developers.map(
                        (developer: { id: number; name: string }) => (
                          <span
                            key={developer.id}
                            className="inline-flex items-center bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm"
                          >
                            <Users size={14} className="mr-1" />
                            {developer.name}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {game.tags?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {game.tags
                        .slice(0, 10)
                        .map((tag: { id: number; name: string }) => (
                          <span
                            key={tag.id}
                            className="inline-flex items-center bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm"
                          >
                            <Tag size={14} className="mr-1" />
                            {tag.name}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                {game.website && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Website
                    </h3>
                    <a
                      href={game.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {game.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
