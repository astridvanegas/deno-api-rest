import db from '../../database/connection.ts';
import { MovieSchema } from '../../database/schemas.ts';

const movies = db.collection<MovieSchema>('movies');

export const find = (offset: number = 0, limit: number = 10, q?: string) => {
  return movies
    .find(
      q
        ? {
            $or: [
              { description: { $regex: new RegExp(q, 'i') } },
              { title: { $regex: new RegExp(q, 'i') } }
            ]
          }
        : {}
    )
    .skip(offset)
    .limit(limit);
};

export const save = (newMovie: MovieSchema) => movies.insertOne(newMovie);

export const findById = (_id: string) => movies.findOne({ _id: { $oid: _id } });

export const update = (_id: string, movie: MovieSchema) =>
  movies.updateOne({ _id: { $oid: _id } }, { $set: movie });

export const deleteOne = (_id: string) =>
  movies.deleteOne({ _id: { $oid: _id } });
