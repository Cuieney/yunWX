import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import { Message } from '../entity/message.eneity';
import { User } from '../entity/user.eneity';
export default (appInfo: MidwayAppInfo) => {
  return {
    keys: appInfo.name + '_1702274003351_3577',
    cors: {
      origin: '*',
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    typeorm: {
      dataSource: {
        default: {
          type: 'mysql',
          host: 'sh-cynosdbmysql-grp-9vgzkja4.sql.tencentcdb.com',
          port: 23024,
          // host: '10.37.110.35',
          // port: 3306,
          username: 'root',
          password: 'Cui221107',
          database: 'iching',
          synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
          logging: false,
          // 或者扫描形式
          entities: [Message, User],
        },
      },
    },
    egg: {
      port: 8080,
    },
  } as MidwayConfig;
};
