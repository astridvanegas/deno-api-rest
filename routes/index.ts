import { Router } from '../deps.ts';
import {
  getMovies,
  createMovie,
  getMovie,
  deleteMovie,
  updateMovie
} from '../controllers/movies/index.ts';

const router = new Router();

router.get('/', ({ response }) => {
  response.body = 'Welcomeee running with deno';
});

router.get('/movies', getMovies);
router.get('/movies/:id', getMovie);
router.post('/movies', createMovie);
router.delete('/movies/:id', deleteMovie);
router.patch('/movies/:id', updateMovie);
export default router;
