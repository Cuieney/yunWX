import { Middleware, IMiddleware } from '@midwayjs/core';
import { Context } from '@midwayjs/web';

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, any> {
  resolve() {
    return async (ctx: Context, next: any) => {
      const startTime = Date.now();
      const body = ctx.request.body;
      const result = await next();
      if (ctx.path !== '/hs') {
        ctx.logger.info(
          `耗时时间", rt = ${Date.now() - startTime}ms, body: ${JSON.stringify(
            body
          )}`
        );
      }
      return result;
    };
  }

  static getName(): string {
    return 'report';
  }
}
