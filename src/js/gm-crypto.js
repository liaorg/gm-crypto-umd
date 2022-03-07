var gm = require('gm-crypto');
function nanoid(size) {
    size = size ? size : 21;
    var urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
    var id = '';
    var i = size;
    while (i--) {
        id += urlAlphabet[(Math.random() * 64) | 0];
    }
    return id;
}
function getCookie(name) {
    var prefix = name + "="
    var start = document.cookie.indexOf(prefix)
 
    if (start == -1) {
        return null;
    }
 
    var end = document.cookie.indexOf(";", start + prefix.length)
    if (end == -1) {
        end = document.cookie.length;
    }
    var value = document.cookie.substring(start + prefix.length, end)
    return unescape(value);
}
// 生成安全的随机数
function newSecureRandom(seed) {
    seed = seed ? seed : (new Date()).getTime();
    seed = ( seed * 9301 + 49297 ) % 233280; //为何使用这三个数?Hull-Dobell定理
    return seed / ( 233280.0 );
}
// 生成 请求头部
function createRequestHeader() {
    var timestamp = Date.parse(new Date()).toString();
    timestamp = timestamp.substr(0,10);
    var quesid = md5(newSecureRandom() + nanoid());
    var access_token = getCookie('access_token');
    var headers = {
        Authorization: 'Bearer ' + access_token + ' ' + timestamp + ' '+quesid
    };
    headers.Authorization += ' ' + md5(headers.Authorization);
    return headers;
}
function encrypt(param, url) {
    return param;
    var type = typeof param;
    if (typeof param != 'object') {
        // string a=b&c=d  或 a/b/c/d
        param = {};
    }
    var originalData = JSON.stringify(param);
    var key = md5(nanoid());
    var iv  = md5(nanoid());
    var SM4 = gm.SM4;
    var encryptedData = SM4.encrypt(originalData, key, {
      iv: iv,
      mode: SM4.constants.CBC,
      inputEncoding: 'utf8',
      //outputEncoding: 'hex',
      outputEncoding: 'base64'
    });
    return {enparams: iv+key+encryptedData};
}
window.gmCrypto = gm;
window.gmNanoid = nanoid;
window.gmEncrypt = encrypt;
window.gmHeader = createRequestHeader;