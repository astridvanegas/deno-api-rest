import app from './main.ts';
import {
  superoak,
} from './deps.ts';

Deno.test('GET/movies it should return some JSON with status code 200', async () => {
  const request = await superoak(app);
  await request.get('/movies')
    .expect(200)
    .expect('Content-Type', /json/);
});

Deno.test(`POST/movies without BODY, should return a 'Body is required' message`, async () => {
  const request = await superoak(app);

  await request.post('/movies')
    .expect(400)
    .expect('Body is required');
});

Deno.test(`POST/movies with BODY, should return a successfully message`, async () => {
  const request = await superoak(app);

  await request.post('/movies')
    .send({ description: 'Movie Test' })
    .expect(200)
    .expect(`{"message":"Movie created successfully"}`)
});

Deno.test(`PATCH/movies/:id should return 'Not Found'`, async () => {
  const request = await superoak(app);

  await request.patch('/movies/999999999999999999999999')
    .expect(404)
    .expect(`{"message":"Movie Not Found"}`)
});

Deno.test(`Delete/movies/:id should return 'Movie removed'`, async () => {
  const request = await superoak(app);

  const a = await request.delete('/movies/999999999999999999999999')
    .expect(200)
    .expect(`{"message":"Movie removed"}`)
});