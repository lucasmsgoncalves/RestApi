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
var mysql_factory_1 = require("../mysql/mysql_factory");
var decorators_2 = require("../decorators");
var SaboresAction = /** @class */ (function (_super) {
    __extends(SaboresAction, _super);
    function SaboresAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SaboresAction.prototype.generateSQL = function (tamanho) {
        return 'select sabores.sabor, st.idSabor, st.preco ' +
            'from sabores_has_tamanhos as st ' +
            'left join sabores on sabores.id = st.idSabor ' +
            'where st.idTamanho = ' + tamanho;
    };
    SaboresAction.prototype.insertSQL = function () {
        return 'INSERT INTO sabores (sabor) ' +
            'VALUES (\'' + this.req.body.sabor + '\')';
        //    'INSERT INTO sabores_has_tamanhos (idSabor, idTamanho, preco ' +
        //    'VALUES (\'' + this.req.body.preco + '\',\'' + this.req.body.idTamanho + '\', \'' + this.req.body.preco + '\')';
    };
    SaboresAction.prototype.selectLastId = function () {
        return 'SELECT MAX(id) as id from sabores';
    };
    SaboresAction.prototype.insertSQLEntidadeFraca = function () {
        return 'INSERT INTO sabores_has_tamanhos (idSabor, idTamanho, preco) ' +
            'VALUES (\'' + this.idSabor + '\',\'' + this.req.body.idTamanho + '\', \'' + this.req.body.preco + '\')';
    };
    SaboresAction.prototype.getSabores = function () {
        var _this = this;
        var tamanho = this.req.params.tamanho;
        new kernel_utils_1.KernelUtils().createExceptionApiError('1002', 'Tamanho da pizza não informado', (tamanho == null || tamanho == undefined));
        new kernel_utils_1.KernelUtils().createExceptionApiError('1003', 'Tamanho da pizza inválido', (tamanho < 1 || tamanho > 5));
        new mysql_factory_1.MySQLFactory().getConnection().select(this.generateSQL(tamanho)).subscribe(function (data) {
            console.log("data", data);
            _this.sendAnswer(data);
        }, function (error) {
            console.log("ERRO", error);
            _this.sendError(error);
        });
    };
    SaboresAction.prototype.Insert = function () {
        var _this = this;
        new mysql_factory_1.MySQLFactory().getConnection().select(this.insertSQL()).subscribe(
        // (data : any) => {
        //      if (data.length && data.length > 0){
        //        this.sendError(new KernelUtils().createErrorApiObject(401, '1002', 'User already exists'));
        //        return;
        //      }      
        //      new MySQLFactory().getConnection().select(this.insertSQL()).subscribe(
        function (data) {
            new mysql_factory_1.MySQLFactory().getConnection().select(_this.selectLastId()).subscribe(function (data) {
                console.log("lastId", data);
                _this.sendAnswer({ data: data });
                _this.idSabor = data[0].id;
                console.log(_this.idSabor);
                console.log(data.id);
                new mysql_factory_1.MySQLFactory().getConnection().select(_this.insertSQLEntidadeFraca()).subscribe(function (data) {
                    console.log("tableFraca", data);
                }, function (error) {
                    _this.sendError(error);
                });
            }, function (error) {
                _this.sendError(error);
            });
            // this.sendAnswer({
            //     idTamanho : this.req.body.idTamanho,
            //     sabor : this.req.body.sabor,
            //     preco : this.req.body.preco
            // });
        }, function (error) {
            _this.sendError(error);
        });
    };
    SaboresAction.prototype.defineVisibility = function () {
        this.actionEscope = route_types_1.ActionType.atPublic;
    };
    __decorate([
        decorators_1.Get('/sabores/:tamanho'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SaboresAction.prototype, "getSabores", null);
    __decorate([
        decorators_2.Post('/create_sabor'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SaboresAction.prototype, "Insert", null);
    return SaboresAction;
}(action_1.Action));
exports.SaboresAction = SaboresAction;
