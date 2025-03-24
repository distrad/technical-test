import { Suspense } from "react";
import GamesList from "@/components/gamesList";
import Filters from "@/components/Filters";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/Loading";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    year?: string;
    genres?: string;
    platforms?: string;
    tags?: string;
    developers?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const search = params.search || "";
  const year = params.year || "";
  const genres = params.genres || "";
  const platforms = params.platforms || "";
  const tags = params.tags || "";
  const developers = params.developers || "";
  const page = params.page ? Number.parseInt(params.page) : 1;

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/">
        <h1 className="text-3xl font-bold mb-6">
          Video Game Metacritic Catalog
        </h1>
      </Link>

      <SearchBar initialSearch={search} />

      <div className="my-6">
        <Suspense
          fallback={
            <div className="h-16 bg-gray-100 animate-pulse rounded-lg"></div>
          }
        >
          <Filters
            selectedYear={year}
            selectedGenres={genres}
            selectedPlatforms={platforms}
            selectedTags={tags}
            selectedDevelopers={developers}
          />
        </Suspense>
      </div>

      <Suspense fallback={<Loading />}>
        <GamesList
          search={search}
          year={year}
          genres={genres}
          platforms={platforms}
          tags={tags}
          developers={developers}
          page={page}
        />
      </Suspense>
    </main>
  );
}
