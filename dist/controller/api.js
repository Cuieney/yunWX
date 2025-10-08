"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIController = void 0;
const core_1 = require("@midwayjs/core");
// import { MessageService } from '../servicedsad/message.service';
// import { UserService } from '../servicedsad/user.service';
const const_1 = require("../common/const");
const index_1 = require("../utils/index");
const axios = require('axios');
let APIController = class APIController {
    async openid() {
        const appid = this.ctx.request.headers['x-wx-from-appid'] || '';
        return { success: true, message: 'OK', data: appid };
    }
    async getAllUser() {
        // const all = await this.user.findAll();
        return { success: true, message: 'OK', data: null };
    }
    async getAllMessage() {
        // const all = await this.message.findAll();
        const all = null;
        return { success: true, message: 'OK', data: all };
    }
    async receiveMessage(message) {
        const { Event, ToUserName, FromUserName, MsgType, Content, CreateTime } = message;
        this.logger.info('receiveMessage', JSON.stringify(message));
        let url = const_1.WebUrl;
        try {
            const response = await axios.post('https://wt5iw4.laf.run/gongzhonghaologin', {
                openid: FromUserName,
                Event,
                ToUserName,
                FromUserName,
                MsgType,
                Content,
                CreateTime,
            });
            this.logger.info('POST Response:', response.data);
            url = response.data.url || const_1.WebUrl;
        }
        catch (error) {
            this.logger.info('Error with POST request:', error);
        }
        // try {
        //   await this.message.saveMessage(message);
        // } catch (e) {
        //   console.log('user receiveMessage error', e.message);
        // }
        if (MsgType === 'text') {
            let inviteIdList = [];
            try {
                inviteIdList = (0, index_1.extractAIStrings)(Content);
            }
            catch (error) {
                this.logger.info('extractAIStrings error:', error.message);
            }
            if (inviteIdList && inviteIdList.length > 0) {
                const inviteId = inviteIdList[0];
                this.logger.info('extractAIStrings success:', inviteId);
                try {
                    const response = await axios.post('https://wt5iw4.laf.run/addInviteUser', {
                        openid: FromUserName,
                        inviteId
                    });
                    this.logger.info('POST invite Response:', response.data);
                    if (response.data.code === 200) {
                        this.logger.info('invite responseMessage', JSON.stringify({
                            ToUserName: FromUserName,
                            FromUserName: ToUserName,
                            CreateTime: CreateTime,
                            MsgType: 'news',
                            ArticleCount: 1,
                            Articles: [
                                {
                                    Title: '助力邀请成功｜点击开始卜卦',
                                    Description: `${response.data.message}`,
                                    PicUrl: 'https://wt5iw4-iching.oss.laf.run/WechatIMG279.jpeg',
                                    Url: `${url}?openId=${FromUserName}`,
                                },
                            ],
                        }));
                        return {
                            ToUserName: FromUserName,
                            FromUserName: ToUserName,
                            CreateTime: CreateTime,
                            MsgType: 'news',
                            ArticleCount: 1,
                            Articles: [
                                {
                                    Title: '助力邀请成功｜点击开始卜卦',
                                    Description: `${response.data.message}`,
                                    PicUrl: 'https://wt5iw4-iching.oss.laf.run/WechatIMG279.jpeg',
                                    Url: `${url}?openId=${FromUserName}`,
                                },
                            ],
                        };
                    }
                    else {
                        this.logger.info('invite responseMessage', JSON.stringify({
                            ToUserName: FromUserName,
                            FromUserName: ToUserName,
                            CreateTime: CreateTime,
                            MsgType: 'text',
                            Content: `${response.data.message}`,
                        }));
                        return {
                            ToUserName: FromUserName,
                            FromUserName: ToUserName,
                            CreateTime: CreateTime,
                            MsgType: 'text',
                            Content: `${response.data.message}`,
                        };
                    }
                }
                catch (error) {
                    try {
                        await (0, index_1.email)(`云托管公众号：${FromUserName}-${inviteId}绑定数据异常：${error.message}`);
                    }
                    catch (error) {
                        this.logger.error('mail error', error.message);
                    }
                    this.logger.info('Error invite with POST request:', error.message);
                    return {
                        ToUserName: FromUserName,
                        FromUserName: ToUserName,
                        CreateTime: CreateTime,
                        MsgType: 'text',
                        Content: `出现未知错误，给您带来了不便，感谢您的使用，管理员收到通知后将很快为您处理！`,
                    };
                }
            }
            else if (Content.includes('卜') ||
                Content.includes('卦') ||
                Content.includes('卜卦') ||
                Content.includes('占卜')) {
                this.logger.info('responseMessage', JSON.stringify({
                    ToUserName: FromUserName,
                    FromUserName: ToUserName,
                    CreateTime: CreateTime,
                    MsgType: 'news',
                    ArticleCount: 1,
                    Articles: [
                        {
                            Title: 'AI｜卜卦',
                            Description: '点击此处开始起卦占卜',
                            PicUrl: 'https://wt5iw4-iching.oss.laf.run/WechatIMG279.jpeg',
                            Url: `${const_1.WebUrl}?openId=${FromUserName}`,
                        },
                    ],
                }));
                return {
                    ToUserName: FromUserName,
                    FromUserName: ToUserName,
                    CreateTime: CreateTime,
                    MsgType: 'news',
                    ArticleCount: 1,
                    Articles: [
                        {
                            Title: 'AI｜卜卦',
                            Description: '点击此处开始起卦占卜',
                            PicUrl: 'https://wt5iw4-iching.oss.laf.run/WechatIMG279.jpeg',
                            Url: `${const_1.WebUrl}?openId=${FromUserName}`,
                        },
                    ],
                };
                // return {
                //   ToUserName: FromUserName,
                //   FromUserName: ToUserName,
                //   CreateTime: CreateTime,
                //   MsgType: 'text',
                //   Content: `感谢您的使用，由于当前页面遭到用户的举报将无法在微信环境内打开。可通过复制链接在浏览器内打开：${WebUrl}?openId=${FromUserName}`,
                // };
            }
            else {
                try {
                    await (0, index_1.email)(`云托管公众号：${FromUserName}反馈：${Content}`);
                }
                catch (error) {
                    this.logger.error('mail error', error.message);
                }
                return {
                    ToUserName: FromUserName,
                    FromUserName: ToUserName,
                    CreateTime: CreateTime,
                    MsgType: 'text',
                    Content: '客服当前不在线，稍后自动回复，如有事情咨询请发送邮件至【aiiching@163.com】邮箱，回复【卜卦】关键字可获得占卜页面。',
                };
            }
        }
        if (Event === 'subscribe' && MsgType === 'event') {
            this.logger.info("Event === 'subscribe' && MsgType === 'event'", Event === 'subscribe' && MsgType === 'event');
            // try {
            //   await this.user.saveUser(FromUserName, true);
            // } catch (e) {
            //   this.logger.error('user subscribe error', e);
            // }
            return {
                ToUserName: FromUserName,
                FromUserName: ToUserName,
                CreateTime: CreateTime,
                MsgType: 'news',
                ArticleCount: 1,
                Articles: [
                    {
                        Title: 'AI｜卜卦',
                        Description: '点击卡片开始起卦占卜',
                        PicUrl: 'https://wt5iw4-iching.oss.laf.run/WechatIMG279.jpeg',
                        Url: `${const_1.WebUrl}?openId=${FromUserName}`,
                    },
                ],
            };
        }
        if (Event === 'unsubscribe' && MsgType === 'event') {
            const result = null;
            // try {
            //   result = await this.user.saveUser(FromUserName, false);
            // } catch (e) {
            //   this.logger.error('user unsubscribe', e.message);
            // }
            return { success: true, message: 'OK', data: result };
        }
        return { success: true, message: 'OK', data: message };
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], APIController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], APIController.prototype, "logger", void 0);
__decorate([
    (0, core_1.Get)('/wx_openid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], APIController.prototype, "openid", null);
__decorate([
    (0, core_1.Get)('/getAllUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], APIController.prototype, "getAllUser", null);
__decorate([
    (0, core_1.Get)('/getAllMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], APIController.prototype, "getAllMessage", null);
__decorate([
    (0, core_1.Post)('/receiveMessage'),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], APIController.prototype, "receiveMessage", null);
APIController = __decorate([
    (0, core_1.Controller)('/api')
], APIController);
exports.APIController = APIController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFxRTtBQUVyRSxtRUFBbUU7QUFDbkUsNkRBQTZEO0FBQzdELDJDQUF5QztBQUN6QywwQ0FBeUQ7QUFFekQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBR3hCLElBQU0sYUFBYSxHQUFuQixNQUFNLGFBQWE7SUFhbEIsQUFBTixLQUFLLENBQUMsTUFBTTtRQUNWLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBSUssQUFBTixLQUFLLENBQUMsVUFBVTtRQUNkLHlDQUF5QztRQUN6QyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsYUFBYTtRQUNqQiw0Q0FBNEM7UUFDNUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFFSyxBQUFOLEtBQUssQ0FBQyxjQUFjLENBQVMsT0FBWTtRQUN2QyxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FDckUsT0FBTyxDQUFDO1FBQ1YsSUFBSSxD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