//收发邮件
const nodemailer = require("nodemailer");

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
    to: "2563661991@qq.com",
    subject: "Hello node email_test",
    text: "this is a node email test hours",
  });

  console.log("邮件发送成功：", info.messageId);
}

main().catch(console.error);

console.log("affaf");
