const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { init: initDB, Counter } = require("./db");

const logger = morgan("tiny");
const webUrl ="https://yijing-8gk8qf01dc156952-1257934448.ap-shanghai.app.tcloudbase.com/#/"
const { Cloud } = require("laf-client-sdk");
const cloud = new Cloud({
    baseUrl: "https://wt5iw4.laf.run",   // APPID 在首页应用列表获取
    getAccessToken: () => "",    // 这里不需要授权，先填空
})
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 更新计数
app.post("/api/count", async (req, res) => {
  const { action } = req.body;
  if (action === "inc") {
    await Counter.create();
  } else if (action === "clear") {
    await Counter.destroy({
      truncate: true,
    });
  }
  res.send({
    code: 0,
    data: await Counter.count(),
  });
});

// 获取计数
app.get("/api/count", async (req, res) => {
  const result = await Counter.count();
  res.send({
    code: 0,
    data: result,
  });
});

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
});

const sendMessage = (from_appid, appid) => {
  const request = require('request')
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      // url: 'http://api.weixin.qq.com/cgi-bin/message/custom/send',
      // 资源复用情况下，参数from_appid应写明发起方appid
      url: `http://api.weixin.qq.com/cgi-bin/message/custom/send?from_appid=${appid}`,
      body: JSON.stringify({
        touser: from_appid, // 一般是消息推送body的FromUserName值，为用户的openid
        msgtype: "text",
        text: {
          content: `欢迎关注Ai卜卦，点击链接开始卜卦：${webUrl}?openId=${from_appid}`
        }
      })
    },function (error, response) {
      console.log('接口返回内容', response.body)
      resolve(JSON.parse(response.body))
    })
  })
}
const weblogin = (from_appid) => {
  const request = require('request')
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      url: `https://wt5iw4.laf.run/getAiCount`,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        openid:`${from_appid}`
      })
    },function (error, response) {
      console.log('接口返回内容', response.body, error)
      resolve(JSON.parse(response.body))
    })
  })
}
app.post("/api/receiveMessage", async (req, res) => {
  console.log('req', req.body)
  const appid = req.headers['x-wx-from-appid'] || ''
  const { Event, ToUserName, FromUserName, MsgType, Content, CreateTime } = req.body
  if (MsgType === 'text') { 
    if (Content.includes('卜卦')) {
      res.send({
        ToUserName: FromUserName,
        FromUserName: ToUserName,
        CreateTime: CreateTime,
        MsgType: 'news',
        ArticleCount: 1,
        Articles: [{
          Title: 'AI｜卜卦',
          Description: '点击开始起卦',
          PicUrl: 'https://wt5iw4-iching.oss.laf.run/WechatIMG279.jpeg',
          Url: `${webUrl}?openId=${FromUserName}`
        }]
      })
    } else {
      res.send({
        ToUserName: FromUserName,
        FromUserName: ToUserName,
        CreateTime: CreateTime,
        MsgType: 'text',
        Content: '客服正忙，稍后自动回复'
      })
    }
  }
  if (Event === 'subscribe' && MsgType === 'event') {
    try{
        const res = await weblogin(FromUserName)        
        console.log('weblogin', res)
    }catch(e){console.log(e)}
    res.send({
      ToUserName: FromUserName,
      FromUserName: ToUserName,
      CreateTime: CreateTime,
      MsgType: 'news',
      ArticleCount: 1,
      Articles: [{
        Title: 'AI｜卜卦',
        Description: '点击开始起卦',
        PicUrl: 'https://wt5iw4-iching.oss.laf.run/WechatIMG279.jpeg',
        Url: `${webUrl}?openId=${FromUserName}`
      }]
    })
  } else {
    res.send({
      code: 0,
      data: null,
    });
  }
  
})
const port = process.env.PORT || 80;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
