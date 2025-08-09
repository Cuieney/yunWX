"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportMiddleware = void 0;
const core_1 = require("@midwayjs/core");
let ReportMiddleware = class ReportMiddleware {
    resolve() {
        return async (ctx, next) => {
            const startTime = Date.now();
            const body = ctx.request.body;
            const result = await next();
            if (ctx.path !== '/hs') {
                ctx.logger.info(`耗时时间", rt = ${Date.now() - startTime}ms, body: ${JSON.stringify(body)}`);
            }
            return result;
        };
    }
    static getName() {
        return 'report';
    }
};
ReportMiddleware = __decorate([
    (0, core_1.Middleware)()
], ReportMiddleware);
exports.ReportMiddleware = ReportMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0Lm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZS9yZXBvcnQubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBeUQ7QUFJbEQsSUFBTSxnQkFBZ0IsR0FBdEIsTUFBTSxnQkFBZ0I7SUFDM0IsT0FBTztRQUNMLE9BQU8sS0FBSyxFQUFFLEdBQVksRUFBRSxJQUFTLEVBQUUsRUFBRTtZQUN2QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDN0IsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDOUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUM1QixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO2dCQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDYixlQUFlLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLGFBQWEsSUFBSSxDQUFDLFNBQVMsQ0FDOUQsSUFBSSxDQUNMLEVBQUUsQ0FDSixDQUFDO2FBQ0g7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0NBQ0YsQ0FBQTtBQXBCWSxnQkFBZ0I7SUFENUIsSUFBQSxpQkFBVSxHQUFFO0dBQ0EsZ0JBQWdCLENBb0I1QjtBQXBCWSw0Q0FBZ0IifQ==