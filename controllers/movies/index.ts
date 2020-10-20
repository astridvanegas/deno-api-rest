import { Response, Request, Body } from '../../deps.ts';
import { find, save, findById, update, deleteOne } from './repository.ts';
import { MovieSchema } from '../../database/schemas.ts';

export const getMovies = async ({ response }: { response: Response }) => {
  try {
    const movies: MovieSchema[] = await find();
    response.body = {
      message: 'List of movies',
      movies
    };
  } catch (error) {
    response.status = 500;
    response.body = { message: 'Something is wrong getting movies' };
  }
};

export const createMovie = async ({
  response,
  request
}: {
  response: Response;
  request: Request;
}) => {
  try {
    const body: Body = await request.body();
    if (!request.hasBody) throw new Error('BODY_MISSING');

    const newMovie: MovieSchema = await body.value;
    await save(newMovie);

    response.status = 200;
    response.body = { message: 'Movie created successfully' };
  } catch (error) {
    if (error.message === 'BODY_MISSING') {
      response.status = 400;
      response.body = 'Body is required';
    } else {
      response.status = 500;
      response.body = { message: 'Something is wrong creating movie' };
    }
  }
};

export const getMovie = async ({
  params,
  response
}: {
  params: { id: string };
  response: Response;
}) => {
  try {
    const movie = await findById(params.id);

    if (movie) {
      response.status = 200;
      response.body = { message: 'Movie Found', movie: movie };
    } else {
      response.status = 404;
      response.body = { message: 'Movie Not Found' };
    }
  } catch (error) {
    response.status = 500;
    response.body = { message: 'Something is wrong updating movie' };
  }
};

export const updateMovie = async ({
  params,
  request,
  response
}: {
  params: { id: string };
  request: Request;
  response: Response;
}) => {
  const movieFound = await findById(params.id);

  if (!movieFound) {
    response.status = 404;
    response.body = { message: 'Movie Not Found' };
  } else {
    const body: Body = await request.body();
    const movieUpdated = await body.value;
    await update(params.id, movieUpdated);
    response.status = 200;
    response.body = { message: 'Movie updated successfully' };
  }
};

export const deleteMovie = async ({
  params,
  response
}: {
  params: { id: string };
  response: Response;
}) => {
  await deleteOne(params.id);
  response.status = 200;
  response.body = { message: 'Movie removed' };
};
