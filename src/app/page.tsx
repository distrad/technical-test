import { Suspense } from "react";
import GamesList from "@/components/gamesList";
import Filters from "@/components/Filters";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/Loading";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    search?: string;
    year?: string;
    genres?: string;
    platforms?: string;
    tags?: string;
    developers?: string;
    page?: string;
  };
}) {
  const search = searchParams.search || "";
  const year = searchParams.year || "";
  const genres = searchParams.genres || "";
  const platforms = searchParams.platforms || "";
  const tags = searchParams.tags || "";
  const developers = searchParams.developers || "";
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1;

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
