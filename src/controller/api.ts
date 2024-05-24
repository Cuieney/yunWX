import { Inject, Controller, Post, Get, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import { MessageService } from '../service/message.service';
import { UserService } from '../service/user.service';
import { WebUrl } from '../common/const';
import { email } from '../utils/index';
import { ILogger } from '@midwayjs/logger';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  message: MessageService;

  @Inject()
  user: UserService;

  @Inject()
  logger: ILogger;
  @Get('/wx_openid')
  async openid() {
    const appid = this.ctx.request.headers['x-wx-from-appid'] || '';
    return { success: true, message: 'OK', data: appid };
  }

  @Get('/getAllUser')
  async getAllUser() {
    const all = await this.user.findAll();
    return { success: true, message: 'OK', data: all };
  }

  @Get('/getAllMessage')
  async getAllMessage() {
    const all = await this.message.findAll();
    return { success: true, message: 'OK', data: all };
  }
  @Post('/receiveMessage')
  async receiveMessage(@Body() message: any) {
    const { Event, ToUserName, FromUserName, MsgType, Content, CreateTime } =
      message;
    this.logger.info('receiveMessage', JSON.stringify(message));
    try {
      await this.message.saveMessage(message);
    } catch (e) {
      console.log('user receiveMessage error', e.message);
    }
    if (MsgType === 'text') {
      if (
        Content.includes('卜') ||
        Content.includes('卦') ||
        Content.includes('卜卦') ||
        Content.includes('占卜')
      ) {
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
              Url: `${WebUrl}?openId=${FromUserName}`,
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
      } else {
        try {
          await email(`公众号用户${FromUserName}反馈:${Content}`);
        } catch (error) {
          this.logger.error('mail error', error.message);
        }
        return {
          ToUserName: FromUserName,
          FromUserName: ToUserName,
          CreateTime: CreateTime,
          MsgType: 'text',
          Content:
            '客服当前不在线，稍后自动回复，如有事情咨询请发送邮件至【aiiching@163.com】邮箱，回复【卜卦】关键字可获得占卜页面。',
        };
      }
    }
    if (Event === 'subscribe' && MsgType === 'event') {
      try {
        await this.user.saveUser(FromUserName, true);
      } catch (e) {
        this.logger.error('user subscribe error', e);
      }
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
            Url: `${WebUrl}?openId=${FromUserName}`,
          },
        ],
      };
    }
    if (Event === 'unsubscribe' && MsgType === 'event') {
      let result = null;
      try {
        result = await this.user.saveUser(FromUserName, false);
      } catch (e) {
        this.logger.error('user unsubscribe', e.message);
      }
      return { success: true, message: 'OK', data: result };
    }
    return { success: true, message: 'OK', data: message };
  }
}
