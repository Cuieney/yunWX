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
exports.HomeController = void 0;
const core_1 = require("@midwayjs/core");
let HomeController = class HomeController {
    async home() {
        return 'Hello Midwayjs!';
    }
};
__decorate([
    (0, core_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "home", null);
HomeController = __decorate([
    (0, core_1.Controller)('/')
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVyL2hvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQWlEO0FBRzFDLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWM7SUFFbkIsQUFBTixLQUFLLENBQUMsSUFBSTtRQUNSLE9BQU8saUJBQWlCLENBQUM7SUFDM0IsQ0FBQztDQUNGLENBQUE7QUFITztJQURMLElBQUEsVUFBRyxFQUFDLEdBQUcsQ0FBQzs7OzswQ0FHUjtBQUpVLGNBQWM7SUFEMUIsSUFBQSxpQkFBVSxFQUFDLEdBQUcsQ0FBQztHQUNILGNBQWMsQ0FLMUI7QUFMWSx3Q0FBYyJ9