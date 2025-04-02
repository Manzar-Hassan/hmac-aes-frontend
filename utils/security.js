import CryptoJS from "crypto-js";

const AES_KEY = "thisisaverysecretkey1234567890!!"; // 32 bytes
const IV = "1234567890123456"; // 16 bytes
const HMAC_KEY = "my_super_secret_hmac_key";


const encryptAES = (data) => {
    const jsonData = JSON.stringify(data);
    const paddedData = jsonData.padEnd(16 * Math.ceil(jsonData.length / 16), " "); // Manual PKCS7 padding
    const encrypted = CryptoJS.AES.encrypt(paddedData, CryptoJS.enc.Utf8.parse(AES_KEY), {
      iv: CryptoJS.enc.Utf8.parse(IV),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.NoPadding,
    });

    console.log("AES: ", CryptoJS.enc.Base64.stringify(encrypted.ciphertext));

    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

const generateHMAC = (data) => {
    console.log("HmacSHA256: ", CryptoJS.HmacSHA256(data, HMAC_KEY).toString(CryptoJS.enc.Hex));
    return CryptoJS.HmacSHA256(data, HMAC_KEY).toString(CryptoJS.enc.Hex);
}

export { encryptAES, generateHMAC };