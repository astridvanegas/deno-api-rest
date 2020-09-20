// Schema interface
export interface MovieSchema {
  _id: { $oid: string };
  description: string;
  clasification: string;
  title: string;
  director: string;
  genre: string;
  actors: string[];
}
