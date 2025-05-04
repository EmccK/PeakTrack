export interface Mountain {
  id: number;
  name: string;
  region: string;
  elevation: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  difficulty: string;
  description: string;
  routes: Route[];
  images: string[];
  bestSeason: string;
  safetyTips: string;
}

export interface Route {
  name: string;
  difficulty: string;
  duration: string;
  description: string;
}