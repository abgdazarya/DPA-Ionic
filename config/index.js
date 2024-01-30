const fs = require("fs");

var CryptoJS = require("crypto-js");

const dummyKey = "1231@AWEDQ#$SDADS#Q$@#DSDSsdFEW#@DSFDSFSDF.w,rweWER@#EWF";
const dummyIv = "1231@AWEDQ#$SDADS#Q$@#DSDSsdFEW#@DSFDSFSDF.w,rweWER@#EWF";

const SOURCE_ENV = [
  "./src/environments-raw/environment.json",
  "./src/environments-raw/environment.dev.json",
  "./src/environments-raw/environment.prod.json",
];

const Encoding64 = (str = "") => {
  return encrypt(
    str,
    CryptoJS.enc.Base64.parse("Ew#@DvF").toString(),
    CryptoJS.enc.Base64.parse("k7yg-").toString()
  );
};

const createStringKey = (str) => {
  const hash64 = Encoding64(str);
  const arr = hash64.split("").reverse();
  return arr.join("-");
};

const encrypt = (value, secretKeyConfig, ivRaw) => {
  var iv = CryptoJS.enc.Hex.parse(ivRaw);
  const excryptedKey = CryptoJS.MD5(secretKeyConfig);
  const bytes = CryptoJS.AES.encrypt(value, excryptedKey + secretKeyConfig, iv);
  return bytes.toString();
};

const encodeData = async (data, targetObject, secretKeyConfig, ivRaw) => {
  return new Promise(async (resolve) => {
    for (const key in data) {
      if (key !== "secretKeyConfig" && key !== "secretIvConfig") {
        const value = data[key];
        const newKey = encrypt(key, secretKeyConfig, ivRaw);
        await new Promise(async (resolveArr) => {
          if (typeof value === "object") {
            const newChild = {};
            await encodeData(value, newChild, secretKeyConfig, ivRaw);
            targetObject[newKey] = newChild;
          } else {
            targetObject[newKey] = encrypt(
              value?.toString(),
              secretKeyConfig,
              ivRaw
            );
          }
          resolveArr(true);
        });
      }
    }
    resolve(true);
  });
};

const writeFileJs = async (str, targetPath = "") => {
  targetPath = targetPath?.toString();
  const arr = await targetPath?.split?.(/\//);
  const fileName = arr[arr.length - 1]?.replace(/json/, "ts");
  arr[arr.length - 1] = `${fileName}`;
  arr[arr.length - 2] = `${arr[arr.length - 2].replace("-raw", "")}`;
  const newArr = JSON.parse(JSON.stringify(arr));
  newArr.pop();
  targetPath = await arr.join("/");
  const newDir = newArr.join("/");
  const isDirExist = await fs.existsSync(newDir);
  if (!isDirExist) {
    await fs.mkdirSync(newDir);
  }
  await fs.writeFile(targetPath, str, "utf8", (err) => {
    if (err) {
      return console.error(err);
    }
    console.log(
      "\x1b[0m",
      `write file "${targetPath}"`,
      "\x1b[42m",
      "SUCCESS",
      "\x1b[0m"
    );
    console.log("");
  });
};

const renderText = (code, data, secretKeyConfig, ivRaw) => {
  return `
    ${code}
    const ivRaw = "${ivRaw}";
    const secretKeyConfig = "${secretKeyConfig}";
    const env = ${JSON.stringify(data)};
    export const environment: environment | any = getEnv(env, secretKeyConfig, ivRaw)
  `;
};

const recordData = async (data, path, resolve) => {
  const objectData = await JSON.parse(data);
  try {
    fs.readFile("./config/utility.ts", "utf8", async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const obj = {};
      const secretKeyConfig = objectData.secretKeyConfig || dummyKey;
      const ivRaw = objectData.secretKeyConfig || dummyIv;
      await encodeData(objectData, obj, secretKeyConfig, ivRaw);
      // console.log(data);
      const stringResult = renderText(
        data.toString(),
        obj,
        createStringKey(secretKeyConfig),
        createStringKey(ivRaw)
      );
      await writeFileJs(stringResult, path);
      resolve(true);
    });
  } catch (e) {
    console.log(e);
  }
};

const readingFile = () => {
  for (let i = 0; i < SOURCE_ENV.length; i++) {
    new Promise(async (resolve) => {
      const item = SOURCE_ENV[i];
      if (fs.existsSync(item)) {
        try {
          fs.readFile(item, "utf8", async (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            await recordData(data, item, resolve);
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
};

readingFile();
