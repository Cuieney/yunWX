async function email(message) {
  const nodemailer = require('nodemailer');
  // 创建Nodemailer传输器 SMTP 或者 其他 运输机制
  const transporter = nodemailer.createTransport({
    host: 'smtp.163.com', // 第三方邮箱的主机地址
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'aiiching@163.com', // 发送方邮箱的账号
      pass: 'TCFSDCEEIJKIOSGY', // 邮箱授权密码
    },
  });
  // 定义transport对象并发送邮件
  await transporter.sendMail({
    from: 'aiiching@163.com', // 发送方邮箱的账号
    to: 'cuieney@163.com', // 邮箱接受者的账号
    subject: '收到用户反馈', // Subject line
    text: message, // 文本内容
  });
}
const extractAIStrings = (text) =>{
  const regex = /ai_[a-zA-Z0-9]+_iching/g;
  return text.match(regex) || [];
}
export { email, extractAIStrings };
