const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0Uva2I2bEI0VTlVTGYyZkNuYmpMSlRzR1g5YkJsbk1rRWtQZmR1TnRXRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUmZxRmc3Q3ptUzBOY0JJYklJVWV6WEJaYXRjVU9lNnNTV0ZrdkViOGoxbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4R2VGd0Erd3NwSlpuZmV0OWRSbjRDMDBFWmgyS3hUUC9KTUVnVVhZcW5NPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMMXFBb3haamlmYnh5Z21HNXhwQVh0TEo2ZllOU1ZFSWM4SnJmY2tLeVJ3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlHMW1KbTdidzlJMDh3S21LUnVSdElBdU41TzNwRlN4cnM5M0pzbTlQbVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkR2OVZSakRFTFpPUjEwM2VPaGtuR01uR2hHaHBDM3R3SFY5K1A2STA2d2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUlUZGNmSzNPL0VCLzlCQThVdU50WUYzUmdtVVVyWnB3Qk9nWHRscktIND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibkZmcWlUYW1oaGdzYnFuQ1ViQTB0NDZVTUNpdm5adDcrcjRpSzA0VU5YWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjV1TW81ZExHNWowai9KUzA0Z2ZSNFp1TzBYcnNCYzZWa3phOG9LQWpaNzJHQjZNY1Y3cEQyUWIwNjBuSXF0U2xnM0pVVjdPa0tDNGxNZWkrZTJnSkN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA4LCJhZHZTZWNyZXRLZXkiOiJVVkRrdnpXc2ttNDlJYlY4STA5WHlUcmRWOGxGYjVnUTd4dGJCV05Ba3Z3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI2VFRjMnE0c1JOU3hKdkYxbWlwSVJBIiwicGhvbmVJZCI6IjBlNWNhYTgxLTI1ZGMtNDcyYy05Y2JjLWMyZDc0M2E5ZDU4NiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoL2RTbkM0YTBVdmNCQnBoNTJ5WFc2QzhNRlE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoianRtMkFJZXpBOGdwL0x4NHZPZTl4U3BiM3VJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ilc2WTlBQTQ1IiwibWUiOnsiaWQiOiI5MjMyNTI4NTQ4ODY6NDBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiwqzwnZCBxpAnIPCdkIDOt9y6yZHNonPMkeKAuuKAoi7igKLigbjigbYifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tHSDJQc0ZFSXEyaHJzR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im1GV29DNW9BR0dXWU9vNnMxSlRkbzh1SlpOcmRRVXBYbGRpWkVyL1NXejg9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjhNblk2QS9XMng5VjRnYVNBMEdJQnZJZ01UdHRScmVhQ2NBZFJqUEhWajAxUXgybUNCU2tLYzJDRnJsMHpRbXJwRm4vTVEwQXI5K1RoZVJvd3FFdENRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJRWUxPRUZRZnZPelBzN3VhZ3NVcVZMRmh1ckhmS0paVDNWczlDOTFYMlJtUzVUdjI3c29EMEpINzhrY2NMTHlLMm83Z3c3dE55UDhOdEJ5SEVHbnpEQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzI1Mjg1NDg4Njo0MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaaFZxQXVhQUJobG1EcU9yTlNVM2FQTGlXVGEzVUZLVjVYWW1SSy8wbHMvIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM0NDQ5OTQ1fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Fredi Ezra",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 255752593977",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
