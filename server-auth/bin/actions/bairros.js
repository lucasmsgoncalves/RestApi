"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var decorators_1 = require("../decorators");
var action_1 = require("../kernel/action");
var route_types_1 = require("../kernel/route-types");
var kernel_utils_1 = require("../kernel/kernel-utils");
var BairrosAction = /** @class */ (function (_super) {
    __extends(BairrosAction, _super);
    function BairrosAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BairrosAction.prototype.getBairros = function () {
        var bairros = [];
        var idcidade = this.req.params.idcidade;
        new kernel_utils_1.KernelUtils().createExceptionApiError('1002', 'Cidade não informada', (idcidade == null || idcidade == undefined));
        if (idcidade == 1) {
            bairros.push({
                name: "Centro",
                value: 1.50
            }, {
                name: "Agua Verde",
                value: 2.35
            }, {
                name: "Chico de Paula",
                value: 3.80
            }, {
                name: "Figueira",
                value: 4
            });
        }
        if (idcidade == 2) {
            bairros.push({
                name: "Seminário",
                value: 6.8
            }, {
                name: "Ano bom",
                value: 6.75
            }, {
                name: "Centro",
                value: 6
            });
        }
        ;
        if (idcidade == 3) {
            bairros.push({
                name: "Amizade",
                value: 12
            }, {
                name: "Centro",
                value: 8
            }, {
                name: "Avai",
                value: 7
            }, {
                name: "Corticeira",
                value: 7
            });
        }
        ;
        this.sendAnswer(bairros);
    };
    BairrosAction.prototype.defineVisibility = function () {
        this.actionEscope = route_types_1.ActionType.atPublic;
    };
    __decorate([
        decorators_1.Get('/bairros/:idcidade'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BairrosAction.prototype, "getBairros", null);
    return BairrosAction;
}(action_1.Action));
exports.BairrosAction = BairrosAction;
