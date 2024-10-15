import * as crypto from "crypto";

// longer
function md5Hex(unencrypted: string) {
    const md5 = crypto.createHash('md5');
    return md5.update(unencrypted).digest('hex');
}

// shorter
function md5Base64(unencrypted: string) {
    const md5 = crypto.createHash('md5');
    return md5.update(unencrypted).digest('base64');
}


export default {
   md5Hex,
   md5Base64,
}
