import { Context } from '@midwayjs/web';
import { ILogger } from '@midwayjs/logger';
export declare class APIController {
    ctx: Context;
    logger: ILogger;
    openid(): Promise<{
        success: boolean;
        message: string;
        data: string | string[];
    }>;
    getAllUser(): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getAllMessage(): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    receiveMessage(message: any): Promise<{
        ToUserName: any;
        FromUserName: any;
        CreateTime: any;
        MsgType: string;
        ArticleCount: number;
        Articles: {
            Title: string;
            Description: string;
            PicUrl: string;
            Url: string;
        }[];
        Content?: undefined;
        success?: undefined;
        message?: undefined;
        data?: undefined;
    } | {
        ToUserName: any;
        FromUserName: any;
        CreateTime: any;
        MsgType: string;
        Content: string;
        ArticleCount?: undefined;
        Articles?: undefined;
        success?: undefined;
        message?: undefined;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any;
        ToUserName?: undefined;
        FromUserName?: undefined;
        CreateTime?: undefined;
        MsgType?: undefined;
        ArticleCount?: undefined;
        Articles?: undefined;
        Content?: undefined;
    }>;
}
