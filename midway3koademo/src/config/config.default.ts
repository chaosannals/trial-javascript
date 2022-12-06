import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1669619954803_205',
  koa: {
    port: 7444,
    // 证书
    // key: join(__dirname, '../ssl/ssl.key'),
    // cert: join(__dirname, '../ssl/ssl.pem'),
  },
} as MidwayConfig;
