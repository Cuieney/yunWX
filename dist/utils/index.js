"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAIStrings = exports.email = void 0;
async function email(message) {
    const nodemailer = require('nodemailer');
    // 创建Nodemailer传输器 SMTP 或者 其他 运输机制
    const transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        port: 465,
        secure: true,
        auth: {
            user: 'aiiching@163.com',
            pass: 'TCFSDCEEIJKIOSGY', // 邮箱授权密码
        },
    });
    // 定义transport对象并发送邮件
    await transporter.sendMail({
        from: 'aiiching@163.com',
        to: 'cuieney@163.com',
        subject: '收到用户反馈',
        text: message, // 文本内容
    });
}
exports.email = email;
const extractAIStrings = (text) => {
    const regex = /ai_[a-zA-Z0-9]+_iching/g;
    return text.match(regex) || [];
};
exports.extractAIStrings = extractAIStrings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsS0FBSyxVQUFVLEtBQUssQ0FBQyxPQUFPO0lBQzFCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN6QyxrQ0FBa0M7SUFDbEMsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztRQUM3QyxJQUFJLEVBQUUsY0FBYztRQUNwQixJQUFJLEVBQUUsR0FBRztRQUNULE1BQU0sRUFBRSxJQUFJO1FBQ1osSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLGtCQUFrQjtZQUN4QixJQUFJLEVBQUUsa0JBQWtCLEVBQUUsU0FBUztTQUNwQztLQUNGLENBQUMsQ0FBQztJQUNILHFCQUFxQjtJQUNyQixNQUFNLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDekIsSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixFQUFFLEVBQUUsaUJBQWlCO1FBQ3JCLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTztLQUN2QixDQUFDLENBQUM7QUFDTCxDQUFDO0FBS1Esc0JBQUs7QUFKZCxNQUFNLGdCQUFnQixHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDaEMsTUFBTSxLQUFLLEdBQUcseUJBQXlCLENBQUM7SUFDeEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNqQyxDQUFDLENBQUE7QUFDZSw0Q0FBZ0IifQ==