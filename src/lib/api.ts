const API_URL = "https://api.rawg.io/api";
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

const buildApiUrl = (
  endpoint: string,
  params: Record<string, string | number | boolean> = {}
) => {
  const url = new URL(`${API_URL}/${endpoint}`);
  url.searchParams.append("key", API_KEY || "");

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
};

// Fetch games with optional search query
export async function fetchGames(params: {
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
  platforms?: string;
  genres?: string;
  tags?: string;
  developers?: string;
  year?: string;
}) {
  const url = buildApiUrl("games", {
    //Optional search query
    search: params.search || "",
    page: params.page || 1,
    page_size: params.page_size || 20,
    ordering: params.ordering || "-metacritic",
    platforms: params.platforms || "",
    genres: params.genres || "",
    tags: params.tags || "",
    developers: params.developers || "",
    dates: params.year ? `${params.year}-01-01,${params.year}-12-31` : "", // Filter by year
  });

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching games:", error);
    return { results: [], count: 0 };
  }
}

// Fetch game details by ID
export async function fetchGameDetails(id: number) {
  const url = buildApiUrl(`games/${id}`);
  try {
    const response = await fetch(url, { next: { revalidate: 86400 } }); // Cache for 24 hours
    if (!response.ok) {
      throw new Error(`Failed to fetch game details: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
}

// Fetch game screenshots by ID
export async function fetchGameScreenshots(id: number) {
  const url = buildApiUrl(`games/${id}/screenshots`);
  try {
    const response = await fetch(url, { next: { revalidate: 86400 } }); // Cache for 24 hours
    if (!response.ok) {
      throw new Error(`Failed to fetch game screenshots: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching game screenshots:", error);
    return { results: [] };
  }
}

// Fetch game trailers by ID
export async function fetchGameTrailers(id: number) {
  const url = buildApiUrl(`games/${id}/movies`);
  try {
    const response = await fetch(url, { next: { revalidate: 86400 } }); // Cache for 24 hours
    if (!response.ok) {
      throw new Error(`Failed to fetch game trailers: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching game trailers:", error);
    return { results: [] };
  }
}

// fetch genres
export async function fetchGenres() {
  const url = buildApiUrl(`genres`);
  try {
    const response = await fetch(url, { next: { revalidate: 604800 } }); // cache for 7 days
    if (!response.ok) {
      throw new Error(`Failed to fetch genres: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching genres:", error);
    return { results: [] };
  }
}

// fetch platforms
export async function fetchPlatforms() {
  const url = buildApiUrl(`platforms`);
  try {
    const response = await fetch(url, { next: { revalidate: 604800 } }); // cache for 7 days
    if (!response.ok) {
      throw new Error(`Failed to fetch platforms: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching platforms:", error);
    return { results: [] };
  }
}

// fetch tags
export async function fetchTags() {
  const url = buildApiUrl(`tags`);
  try {
    const response = await fetch(url, { next: { revalidate: 604800 } }); // cache for 7 days
    if (!response.ok) {
      throw new Error(`Failed to fetch tags: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tags:", error);
    return { results: [] };
  }
}

// fetch developers
export async function fetchDevelopers() {
  const url = buildApiUrl(`developers`);
  try {
    const response = await fetch(url, { next: { revalidate: 604800 } }); // cache for 7 days
    if (!response.ok) {
      throw new Error(`Failed to fetch developers: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching developers:", error);
    return { results: [] };
  }
}
