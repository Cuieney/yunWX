import { Inject, Controller, Post, Get, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
// import { MessageService } from '../servicedsad/message.service';
// import { UserService } from '../servicedsad/user.service';
import { WebUrl } from '../common/const';
import { email, extractAIStrings } from '../utils/index';
import { ILogger } from '@midwayjs/logger';
const axios = require('axios');

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  // @Inject()
  // message: MessageService;

  // @Inject()
  // user: UserService;

  @Inject()
  logger: ILogger;
  @Get('/wx_openid')
  async openid() {
    const appid = this.ctx.request.headers['x-wx-from-appid'] || '';
    return { success: true, message: 'OK', data: appid };
  }


  @Get('/getAllUser')
  async getAllUser() {
    // const all = await this.user.findAll();
    return { success: true, message: 'OK', data: null };
  }

  @Get('/getAllMessage')
  async getAllMessage() {
    // const all = await this.message.findAll();
    const all = null;
    return { success: true, message: 'OK', data: all };
  }
  @Post('/receiveMessage')
  async receiveMessage(@Body() message: any) {
    const { Event, ToUserName, FromUserName, MsgType, Content, CreateTime } =
      message;
    this.logger.info('receiveMessage', JSON.stringify(message));
    try {
      const response = await axios.post(
        'https://wt5iw4.laf.run/gongzhonghaologin',
        {
          openid: FromUserName,
          Event,
          ToUserName,
          FromUserName,
          MsgType,
          Content,
          CreateTime,
        }
      );
      this.logger.info('POST Response:', response.data);
    } catch (error) {
      this.logger.info('Error with POST request:', error);
    }
    // try {
    //   await this.message.saveMessage(message);
    // } catch (e) {
    //   console.log('user receiveMessage error', e.message);
    // }

    if (MsgType === 'text') {
      let inviteIdList = []
      try {
        inviteIdList = extractAIStrings(Content)
      } catch (error) {
        this.logger.info('extractAIStrings error:', error.message);
      }
    
      if (inviteIdList && inviteIdList.length > 0) {
        const inviteId = inviteIdList[0]
        this.logger.info('extractAIStrings success:', inviteId);

        try {
          const response = await axios.post(
            'https://wt5iw4.laf.run/addInviteUser',
            {
              openid: FromUserName,
              inviteId
            }
          );
          this.logger.info('POST invite Response:', response.data);
          if (response.data.code === 200) {
            this.logger.info(
              'invite responseMessage',
              JSON.stringify({
                ToUserName: FromUserName,
                FromUserName: ToUserName,
                CreateTime: CreateTime,
                MsgType: 'news',
                ArticleCount: 1,
                Articles: [
                  {
                    Title: 'AI｜点击开始卜卦',
                    Description: `${response.data.message}`,
                    PicUrl: 'https://wt5iw4-iching.oss.laf.run/WechatIMG279.jpeg',
                    Url: `${WebUrl}?openId=${FromUserName}`,
                  },
                ],
              })
            );
            return  {
              ToUserName: FromUserName,
              FromUserName: ToUserName,
              CreateTime: CreateTime,
              MsgType: 'news',
              ArticleCount: 1,
              Articles: [
                {
                  Title: 'AI｜点击此处开始卜卦',
                  Description: `${response.data.message}`,
                  PicUrl: 'https://wt5iw4-iching.oss.laf.run/WechatIMG279.jpeg',
                  Url: `${WebUrl}?openId=${FromUserName}`,
                },
              ],
            }
          } else {
            this.logger.info(
              'invite responseMessage',
              JSON.stringify({
                ToUserName: FromUserName,
                FromUserName: ToUserName,
                CreateTime: CreateTime,
                MsgType: 'text',
                Content:`${response.data.message}`,
              })
            );
            return {
              ToUserName: FromUserName,
              FromUserName: ToUserName,
              CreateTime: CreateTime,
              MsgType: 'text',
              Content:`${response.data.message}`,
            };
          }
          
        } catch (error) {
          try {
            await email(`云托管公众号：${FromUserName}-${inviteId}绑定数据异常：${error.message}`);
          } catch (error) {
            this.logger.error('mail error', error.message);
          }
          this.logger.info('Error invite with POST request:', error.message);
          return {
            ToUserName: FromUserName,
            FromUserName: ToUserName,
            CreateTime: CreateTime,
            MsgType: 'text',
            Content:`出现未知错误，给您带来了不便，感谢您的使用，管理员收到通知后将很快为您处理！`,
          };
        }
      } else if (
        Content.includes('卜') ||
        Content.includes('卦') ||
        Content.includes('卜卦') ||
        Content.includes('占卜')
      ) {
        this.logger.info(
          'responseMessage',
          JSON.stringify({
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
                Url: `${WebUrl}?openId=${FromUserName}`,
              },
            ],
          })
        );
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
          await email(`云托管公众号：${FromUserName}反馈：${Content}`);
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
      this.logger.info(
        "Event === 'subscribe' && MsgType === 'event'",
        Event === 'subscribe' && MsgType === 'event'
      );
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
            Url: `${WebUrl}?openId=${FromUserName}`,
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
}
