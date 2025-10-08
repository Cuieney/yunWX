"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Message } from '../entity/message.eneity';
// import { User } from '../entity/user.eneity';
exports.default = (appInfo) => {
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
        midwayLogger: {
            default: {
                maxSize: '100m',
                maxFiles: '5d',
            },
            clients: {
                coreLogger: {
                    enableConsole: true,
                    enableError: true,
                    level: 'info',
                    consoleLevel: 'info',
                    // ...
                },
                appLogger: {
                    enableConsole: true,
                    enableError: true,
                    level: 'info',
                    consoleLevel: 'info',
                    format: info => {
                        return `${info.timestamp} ${info.LEVEL} ${info.pid} ${info.labelText}${info.message}`;
                    },
                    // ...
                },
            },
        },
        // typeorm: {
        //   dataSource: {
        //     default: {
        //       type: 'mysql',
        //       host: 'sh-cynosdbmysql-grp-9vgzkja4.sql.tencentcdb.com',
        //       port: 23024,
        //       // host: '10.37.110.35',
        //       // port: 3306,
        //       username: 'root',
        //       password: 'Cui221107',
        //       database: 'iching',
        //       synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        //       logging: false,
        //       // 或者扫描形式
        //       entities: [Message, User],
        //     },
        //   },
        // },
        egg: {
            port: 8080,
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0RBQXNEO0FBQ3RELGdEQUFnRDtBQUNoRCxrQkFBZSxDQUFDLE9BQXNCLEVBQUUsRUFBRTtJQUN4QyxPQUFPO1FBQ0wsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEdBQUcscUJBQXFCO1FBQzFDLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxHQUFHO1NBQ1o7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLEtBQUs7YUFDZDtTQUNGO1FBQ0QsWUFBWSxFQUFFO1lBQ1osT0FBTyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxNQUFNO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsVUFBVSxFQUFFO29CQUNWLGFBQWEsRUFBRSxJQUFJO29CQUNuQixXQUFXLEVBQUUsSUFBSTtvQkFDakIsS0FBSyxFQUFFLE1BQU07b0JBQ2IsWUFBWSxFQUFFLE1BQU07b0JBQ3BCLE1BQU07aUJBQ1A7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULGFBQWEsRUFBRSxJQUFJO29CQUNuQixXQUFXLEVBQUUsSUFBSTtvQkFDakIsS0FBSyxFQUFFLE1BQU07b0JBQ2IsWUFBWSxFQUFFLE1BQU07b0JBQ3BCLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTt3QkFDYixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3hGLENBQUM7b0JBQ0QsTUFBTTtpQkFDUDthQUNGO1NBQ0Y7UUFDRCxhQUFhO1FBQ2Isa0JBQWtCO1FBQ2xCLGlCQUFpQjtRQUNqQix1QkFBdUI7UUFDdkIsaUVBQWlFO1FBQ2pFLHFCQUFxQjtRQUNyQixpQ0FBaUM7UUFDakMsdUJBQXVCO1FBQ3ZCLDBCQUEwQjtRQUMxQiwrQkFBK0I7UUFDL0IsNEJBQTRCO1FBQzVCLGlFQUFpRTtRQUNqRSx3QkFBd0I7UUFDeEIsa0JBQWtCO1FBQ2xCLG1DQUFtQztRQUNuQyxTQUFTO1FBQ1QsT0FBTztRQUNQLEtBQUs7UUFDTCxHQUFHLEVBQUU7WUFDSCxJQUFJLEVBQUUsSUFBSTtTQUNYO0tBQ2MsQ0FBQztBQUNwQixDQUFDLENBQUMifQ==