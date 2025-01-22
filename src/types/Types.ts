   export type Coordinates = {
    latitude: number;
    longitude: number;
  };

export interface Journey {
  id: string;
  name: string;
  location: string;
  description?: string;
  imageUri: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  date?: string;
}

