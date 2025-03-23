/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  fetchGenres,
  fetchPlatforms,
  fetchTags,
  fetchDevelopers,
} from "@/lib/api";
import { X } from "lucide-react";

export default function Filters({
  selectedYear = "",
  selectedGenres = "",
  selectedPlatforms = "",
  selectedTags = "",
  selectedDevelopers = "",
}: {
  selectedYear: string;
  selectedGenres: string;
  selectedPlatforms: string;
  selectedTags: string;
  selectedDevelopers: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [genres, setGenres] = useState<any[]>([]);
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [developers, setDevelopers] = useState<any[]>([]);
  const [years, setYears] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFilters = async () => {
      setIsLoading(true);
      try {
        const [genresData, platformsData, tagsData, developersData] =
          await Promise.all([
            fetchGenres(),
            fetchPlatforms(),
            fetchTags(),
            fetchDevelopers(),
          ]);

        setGenres(genresData.results);
        setPlatforms(platformsData.results);
        setTags(tagsData.results);
        setDevelopers(developersData.results);

        // Generate years from 2023 down to 1980
        const currentYear = new Date().getFullYear();
        setYears(
          Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i)
        );
      } catch (error) {
        console.error("Error loading filters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFilters();
  }, []);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  };

  const handleFilterChange = (filterType: string, value: string) => {
    router.push(`${pathname}?${createQueryString(filterType, value)}`);
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters =
    selectedYear ||
    selectedGenres ||
    selectedPlatforms ||
    selectedTags ||
    selectedDevelopers;

  if (isLoading) {
    return <div className="h-16 bg-gray-100 animate-pulse rounded-lg"></div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center text-sm text-red-500 hover:text-red-700"
          >
            <X size={16} className="mr-1" />
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-nowrap gap-4 overflow-x-auto pb-2">
        {/* Year Filter */}
        <div className="min-w-[150px]">
          <label className="block text-sm font-medium mb-1">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => handleFilterChange("year", e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Genres Filter */}
        <div className="min-w-[150px]">
          <label className="block text-sm font-medium mb-1">Genre</label>
          <select
            value={selectedGenres}
            onChange={(e) => handleFilterChange("genres", e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Platforms Filter */}
        <div className="min-w-[150px]">
          <label className="block text-sm font-medium mb-1">Platform</label>
          <select
            value={selectedPlatforms}
            onChange={(e) => handleFilterChange("platforms", e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          >
            <option value="">All Platforms</option>
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags Filter */}
        <div className="min-w-[150px]">
          <label className="block text-sm font-medium mb-1">Tag</label>
          <select
            value={selectedTags}
            onChange={(e) => handleFilterChange("tags", e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          >
            <option value="">All Tags</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        {/* Developers Filter */}
        <div className="min-w-[150px]">
          <label className="block text-sm font-medium mb-1">Developer</label>
          <select
            value={selectedDevelopers}
            onChange={(e) => handleFilterChange("developers", e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          >
            <option value="">All Developers</option>
            {developers.map((developer) => (
              <option key={developer.id} value={developer.id}>
                {developer.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
