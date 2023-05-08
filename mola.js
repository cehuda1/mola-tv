import fetch from 'node-fetch';
import fs from 'fs';
import readline from 'readline-sync';
import chalk from 'chalk';
import moment from 'moment';
import console from 'console';
import cheerio from 'cheerio';
import axios from 'axios';
import delay from 'delay';


const getData = () =>
  new Promise((resolve, reject) => {
    fetch("https://name-fake.com/id_ID", {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-GB,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        DNT: "1",
        Connection: "keep-alive",
        Cookie:
          "PHPSESSID=78fd62f29ab0d35bb777ca6edfffb335; prefetchAd_2861429=true",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        TE: "trailers",
      },
    })
      .then((ress) => ress.text())
      .then(async (result) => {
        const $ = await cheerio.load(result);
        const firstName = $("div[id=copy1]").text();
        const lastName = $("div[id=copy2]").text();
        const ressEmail = $("div[id=copy4]").text().split("@");
        const dnsEmail =
          ressEmail[0] + Math.floor(Math.random() * 1000) + "@qiott.com";

        resolve({
          firstName: firstName,
          lastName: lastName,
          email: dnsEmail,
        });
      })
      .catch((err) => reject(err));
  });

const getEmails = async (email) => {
  const response = await axios.get(
    `https://www.1secmail.com/api/v1/?action=getMessages&login=${email}&domain=qiott.com`
  );
  return response.data;
};

const getOTP = async (email, emailIdnya) => {
  const response = await axios.get(
    `https://www.1secmail.com/api/v1/?action=readMessage&login=${email}&domain=qiott.com&id=${emailIdnya}`
  );
  const html1 = response.data.textBody[23];
  const html2 = response.data.textBody[24];
  const html3 = response.data.textBody[25];
  const html4 = response.data.textBody[26];
  const html5 = response.data.textBody[27];
  const html6 = response.data.textBody[28];
  //   const $ = cheerio.load(html);
  const result = html1 + html2 + html3 + html4 + html5 + html6;
  return result;
};

const getRegist = (email) =>
  new Promise((resolve, reject) => {
    fetch("https://api2-mola.onwards.pro/v1/subscriber/send/otp", {
      method: "POST",
      headers: {
        Host: "api2-mola.onwards.pro",
        "Content-Length": "44",
        "Sec-Ch-Ua": '"Chromium";v="109", "Not_A Brand";v="99"',
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=UTF-8",
        "Sec-Ch-Ua-Mobile": "?0",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.75 Safari/537.36",
        "Sec-Ch-Ua-Platform": '"Windows"',
        Origin: "https://mola.tv",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        Referer: "https://mola.tv/",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,en;q=0.9",
      },
      body: JSON.stringify({
        email: email,
        lang: "en",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

const accRegist = (OTPnya, email, password) =>
  new Promise((resolve, reject) => {
    fetch("https://api2-mola.onwards.pro/v1/subscriber/idToken/new", {
      method: "POST",
      headers: {
        Host: "api2-mola.onwards.pro",
        "Content-Length": "71",
        "Sec-Ch-Ua": '"Chromium";v="109", "Not_A Brand";v="99"',
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=UTF-8",
        "Sec-Ch-Ua-Mobile": "?0",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.75 Safari/537.36",
        "Sec-Ch-Ua-Platform": '"Windows"',
        Origin: "https://mola.tv",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        Referer: "https://mola.tv/",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,en;q=0.9",
      },
      body: JSON.stringify({
        OTP: OTPnya,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((err) => reject(err));
  });

const ValidateToken = (token) =>
  new Promise((resolve, reject) => {
    fetch("https://api2-mola.onwards.pro/v1/subscriber/register", {
      method: "POST",
      headers: {
        Host: "api2-mola.onwards.pro",
        "Content-Length": "956",
        "Sec-Ch-Ua": '"Chromium";v="109", "Not_A Brand";v="99"',
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=UTF-8",
        "Sec-Ch-Ua-Mobile": "?0",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.75 Safari/537.36",
        "Sec-Ch-Ua-Platform": '"Windows"',
        Origin: "https://mola.tv",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        Referer: "https://mola.tv/",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,en;q=0.9",
      },
      body: JSON.stringify({
        idToken: token,
        isReceive: false,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

const Trial = (deviceIdnya, token, serial) =>
  new Promise((resolve, reject) => {
    fetch("https://api2-mola.onwards.pro/v1/subscriber/login", {
      method: "POST",
      headers: {
        "user-agent": "Mola/2.2.5.18 (Android 7.1.2; Polytron 2K PA Smart TV)",
        "x-mola-version":
          "Mola/2.2.5.18 (Android 7.1.2; Polytron 2K PA Smart TV)",
        "content-type": "application/json; charset=UTF-8",
        "accept-encoding": "gzip",
      },
      body: JSON.stringify({
        advertisingId: "efdbe35f-f4f8-4f57-b27e-ba39b7802fb5",
        appsflyerId: "1683431267418-5848736556801870020",
        deviceId: deviceIdnya,
        deviceName: "Polytron",
        deviceType: "Android",
        idToken: token,
        modelNo: "2K PA Smart TV",
        serialNo: serial,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((err) => reject(err));
  });

const min = Math.pow(10, 14);
const max = Math.pow(10, 15) - 1;
const rand = Math.floor(Math.random() * (max - min + 1) + min);

(async () => {
  let repeat;
  while (!repeat) {
    const getDatanya = await getData();
    const firstNamee = getDatanya.firstName;
    const lastNamee = getDatanya.lastName;
    const fullName = `${firstNamee} ${lastNamee}`;
    const emailnya = getDatanya.email;
    const newEmail = emailnya.trim();
    const password = "Juragan123";

    console.log(newEmail);

    const getRegister = await getRegist(newEmail);
    console.log(getRegister);

    if (getRegister.message === "OK") {
      console.log(`OTP Success Send! check your email!`);
    } else {
      console.log(`Cannot send OTP!`);
    }

    await delay(10000);

    const resultEmail = emailnya;
    const emailbgt = resultEmail.split("@")[0];
    const realEmail = emailbgt.trim();

    const autogetEmail = await getEmails(realEmail);
    console.log(autogetEmail);

    const autogetEmailId = autogetEmail[0].id;
    console.log(autogetEmailId);

    const emailIdnya = autogetEmailId;

    const autoGetOtp = await getOTP(realEmail, emailIdnya);
    console.log(autoGetOtp);

    console.log(`OTP nya adalah : ` + autoGetOtp);

    const otp = autoGetOtp.trim();

    let token = null;
    while (!token) {
      const getToken = await accRegist(otp, newEmail, password);
      //   console.log(getToken);
      if (getToken.message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        console.log(`Error`);
      } else {
        token = getToken.idToken;
      }
    }
    const validToken = await ValidateToken(token);
    // console.log(validToken);

    console.log(`Get Trial!`);
    const device = rand;
    const deviceId = device.toString();

    const serial = rand;
    const serialId = serial.toString();

    const newToken = token;

    const subscribe = await Trial(deviceId, newToken, serialId);
    console.log(subscribe);

    console.log(`Activate Subscribed : ${subscribe.status}`);

    const MoveData = `${realEmail}|${password}\n`;
    if (MoveData) {
      const MoveResult = fs.appendFileSync("dataresult.txt", MoveData);
    }
    console.log("");
  }
})();