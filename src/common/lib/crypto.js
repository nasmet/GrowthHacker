import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("1234567890000000"); //16位
const iv = CryptoJS.enc.Utf8.parse("1234567890000000");

//aes加密
export function encrypt(data) {
	const srcs = CryptoJS.enc.Utf8.parse(data);
	const encrypted = CryptoJS.AES.encrypt(srcs, key, {
		iv,
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.toString();
}

//aes解密
export function decrypt(data, type = 'string') {
	const decrypt = CryptoJS.AES.decrypt(data, key, {
		iv,
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}