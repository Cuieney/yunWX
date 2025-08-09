import { IMiddleware } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
export declare class ReportMiddleware implements IMiddleware<Context, any> {
    resolve(): (ctx: Context, next: any) => Promise<any>;
    static getName(): string;
}
