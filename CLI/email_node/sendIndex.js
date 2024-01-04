//收发邮件   qq邮箱设置中开启smtp,imap,pop3等服务，拿到授权码
const nodemailer = require("nodemailer");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 587,
  secure: false,
  auth: {
    user: "3615739566@qq.com",
    pass: "zptnvojrpzipdbfd",
  },
});

async function main() {
  const info = await transporter.sendMail({
    from: '"guang" <3615739566@qq.com>',
    to: "'hours' <2563661991@qq.com>",
    subject: "这是一个测试node 发送邮件功能",
    // text: "this is a node email test hours",
    html: fs.readFileSync("./index.html"),
  });

  console.log("邮件发送成功：", info.messageId);
}

main().catch(console.error);
