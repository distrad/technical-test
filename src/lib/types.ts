// Definition of types used in the application
// Game type
export interface Game {
  id: number;
  name: string;
  slug: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number;
  platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  }[];
  genres: {
    id: number;
    name: string;
    slug: string;
  }[];
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
  developers: {
    id: number;
    name: string;
    slug: string;
  }[];
  publishers: {
    id: number;
    name: string;
    slug: string;
  }[];
  description: string;
  description_raw: string;
  website: string;
}
// Screenshot type
export interface Screenshot {
  id: number;
  image: string;
  width: number;
  height: number;
}
// Trailer type
export interface Trailer {
  id: number;
  name: string;
  preview: string;
  data: {
    480: string;
    max: string;
  };
}
