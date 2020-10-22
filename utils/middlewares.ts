import { Context, helpers, validate, match } from '../deps.ts';

export const validator = async (ctx: Context, next: any) => {
  const params = helpers.getQuery(ctx, { mergeParams: true });

  const [passes, errors] = await validate(
    {
      id: params.id
    },
    {
      id: match(/^[0-9a-fA-F]{24}$/)
    }
  );
  if (!passes) {
    ctx.response.status = 400;
    ctx.response.body = { message: errors };
    return;
  }
  await next();
};

export const notFound = ({ response }: any) => {
  response.status = 404;
  response.body = { message: "Not Found" };
};