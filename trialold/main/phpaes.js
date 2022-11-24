import Crypto from "crypto-js";
import AES from "crypto-js/aes.js";

/**
 * 加解密器
 * php.net 官网 openssl aes 256 示例 js 版。
 * 参数对照 php 示例，可交互。
 */
export class Crypter {
  /**
   * 初始化。
   * 
   * @param {*} key 
   */
  constructor(key) {
    this.key = Crypto.enc.Utf8.parse(key.padEnd(32, "\0"));
    this.option = {
      mode: Crypto.mode.CBC,
      padding: Crypto.pad.Pkcs7,
      algorithm: Crypto.algo.AES,
      formatter: Crypto.format.OpenSSL,
    };
  }

  /**
   * 加密。
   * 
   * @param {*} data 
   */
  encrypt(data) {
    let encrypted = AES.encrypt(
      JSON.stringify(data),
      this.key,
      {
        iv: Crypto.lib.WordArray.random(16),
        ...this.option,
      },
    );

    let iv = encrypted.iv;
    let text = Crypto.enc.Base64.parse(encrypted.toString());
    let hash = Crypto.HmacSHA256(text, this.key);
    let r = Crypto.lib.WordArray
      .create()
      .concat(iv)
      .concat(hash)
      .concat(text);
    return Crypto.enc.Base64.stringify(r);
  }

  /**
   * 解密。
   * 
   * @param {*} data 
   */
  decrypt(data) {
    let raw = Crypto.enc.Base64.parse(data);
    let hex = raw.toString();
    let iv = Crypto.enc.Hex.parse(hex.substr(0, 32));
    let hash = Crypto.enc.Hex.parse(hex.substr(32, 64));
    let text = Crypto.enc.Hex.parse(hex.substr(32 + 64));
    let chash = Crypto.HmacSHA256(text, this.key);
    if (chash.toString() != hash.toString()) {
      throw new Error("哈希校验失败");
    }
    let decrypted = AES.decrypt(
      Crypto.enc.Base64.stringify(text),
      this.key,
      {
        iv: iv,
        ...this.option,
      },
    );
    return JSON.parse(decrypted.toString(Crypto.enc.Utf8));
  }
}


let $c = new Crypter('12356799998');
let $t = '123fsdagfasdf21423sda而阿飞';
let $e = $c.encrypt($t);
let $d = $c.decrypt($e);
console.log($t, $e, $d);