"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainConfiguration = void 0;
const core_1 = require("@midwayjs/core");
const path_1 = require("path");
const egg = require("@midwayjs/web");
// import * as orm from '@midwayjs/typeorm';
const report_middleware_1 = require("./middleware/report.middleware");
let MainConfiguration = class MainConfiguration {
    async onReady() {
        this.app.useMiddleware([report_middleware_1.ReportMiddleware]);
    }
};
__decorate([
    (0, core_1.App)('egg'),
    __metadata("design:type", egg.Application)
], MainConfiguration.prototype, "app", void 0);
MainConfiguration = __decorate([
    (0, core_1.Configuration)({
        imports: [egg],
        importConfigs: [(0, path_1.join)(__dirname, './config')],
    })
], MainConfiguration);
exports.MainConfiguration = MainConfiguration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFnRTtBQUNoRSwrQkFBNEI7QUFDNUIscUNBQXFDO0FBQ3JDLDRDQUE0QztBQUM1QyxzRUFBa0U7QUFNM0QsSUFBTSxpQkFBaUIsR0FBdkIsTUFBTSxpQkFBaUI7SUFJNUIsS0FBSyxDQUFDLE9BQU87UUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLG9DQUFnQixDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0YsQ0FBQTtBQU5DO0lBQUMsSUFBQSxVQUFHLEVBQUMsS0FBSyxDQUFDOzhCQUNOLEdBQUcsQ0FBQyxXQUFXOzhDQUFDO0FBRlYsaUJBQWlCO0lBSjdCLElBQUEsb0JBQWEsRUFBQztRQUNiLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUNkLGFBQWEsRUFBRSxDQUFDLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUM3QyxDQUFDO0dBQ1csaUJBQWlCLENBTzdCO0FBUFksOENBQWlCIn0=