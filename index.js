const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require('qrcode-terminal');

const client = new Client({
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    });

client.on("authenticated", (session) => {
  console.log("AUTHENTICATED", session);
});

client.on("auth_failure", (msg) => {
    console.error("AUTHENTICATION FAILURE", msg);
    });

client.on("ready", () => {
    console.log("READY");
    });

client.on("message", async (msg) => {  
    if (msg.from.endsWith('@g.us')) { // grup
        return;
    }
    if (msg.body.startsWith("!ping")) {
        msg.reply("pong");
    }
            });

client.initialize();