import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1669619954803_205',
  koa: {
    port: 7444,
    // 证书
    // key: join(__dirname, '../ssl/ssl.key'),
    // cert: join(__dirname, '../ssl/ssl.pem'),
  },
  mongoose: {
    dataSource: {
      default: {
        // uri: 'mongodb://root:rootpwd@localhost:27001/?replicaSet=sn&directConnection=true',
        uri: 'mongodb://localhost:27001',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          directConnection: true,
          readPreference: 'primary',
          replicaSet: 'sn',
          user: 'root',
          pass: 'rootpwd'
        },
        // 关联实体
        entities: [ User ]
      },
      db2: {
        // uri: 'mongodb://root:rootpwd@localhost:27002/?replicaSet=sn&directConnection=true',
        uri: 'mongodb://localhost:27002',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          directConnection: true,
          readPreference: 'secondary',
          replicaSet: 'sn',
          user: 'root',
          pass: 'rootpwd'
        },
        // 关联实体
        entities: [ User ]
      },
      db3: {
        // uri: 'mongodb://root:rootpwd@localhost:27003/?replicaSet=sn&directConnection=true',
        uri: 'mongodb://localhost:27003',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          directConnection: true,
          readPreference: 'secondary',
          replicaSet: 'sn',
          user: 'root',
          pass: 'rootpwd'
        },
        // 关联实体
        entities: [ User ]
      },
    }
  },
} as MidwayConfig;
