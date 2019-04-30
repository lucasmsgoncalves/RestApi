import { Get} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import { KernelUtils } from '../kernel/kernel-utils';
import {MySQLFactory} from '../mysql/mysql_factory';
import { VPUtils } from '../utils/vputils';
import {Post} from '../decorators';

export class SaboresAction extends Action {
    idSabor : any;

    private generateSQL(tamanho : number) : string {
        return 'select sabores.sabor, st.idSabor, st.preco ' + 
               'from sabores_has_tamanhos as st ' +
               'left join sabores on sabores.id = st.idSabor ' +
               'where st.idTamanho = '+ tamanho;
    }

    private insertSQL() : string {
        return 'INSERT INTO sabores (sabor) ' + 
               'VALUES (\'' + this.req.body.sabor + '\')';

            //    'INSERT INTO sabores_has_tamanhos (idSabor, idTamanho, preco ' +
            //    'VALUES (\'' + this.req.body.preco + '\',\'' + this.req.body.idTamanho + '\', \'' + this.req.body.preco + '\')';
    }

    private selectLastId() : any {
       
        return 'SELECT MAX(id) as id from sabores';
    }

    private insertSQLEntidadeFraca(){
        return 'INSERT INTO sabores_has_tamanhos (idSabor, idTamanho, preco) ' +
               'VALUES (\'' + this.idSabor + '\',\'' + this.req.body.idTamanho + '\', \'' + this.req.body.preco + '\')';
    }

    @Get('/sabores/:tamanho')
    public getSabores(){
        let tamanho = this.req.params.tamanho;

        new KernelUtils().createExceptionApiError('1002', 'Tamanho da pizza não informado', (tamanho == null || tamanho == undefined));
        new KernelUtils().createExceptionApiError('1003', 'Tamanho da pizza inválido', (tamanho < 1 || tamanho > 5));

        new MySQLFactory().getConnection().select(this.generateSQL(tamanho)).subscribe(
            (data : any) => {
                console.log("data",data);
                this.sendAnswer(data);
            },
            (error : any) => {
                console.log("ERRO",error);
                this.sendError(error);
            }
        );
    }

    @Post('/create_sabor')
    public Insert(){

        new MySQLFactory().getConnection().select(this.insertSQL()).subscribe(
            // (data : any) => {
            //      if (data.length && data.length > 0){
            //        this.sendError(new KernelUtils().createErrorApiObject(401, '1002', 'User already exists'));
            //        return;
            //      }      

            //      new MySQLFactory().getConnection().select(this.insertSQL()).subscribe(
            (data : any) => {
                new MySQLFactory().getConnection().select(this.selectLastId()).subscribe(
                    (data : any) => {
                        console.log("lastId",data);
                        this.sendAnswer({data});
                        this.idSabor = data[0].id;
                        console.log(this.idSabor);
                        console.log(data.id);
                        
                        new MySQLFactory().getConnection().select(this.insertSQLEntidadeFraca()).subscribe(
                            (data : any) => {
                                console.log("tableFraca",data);
                                this.sendAnswer({
                                    idTamanho : this.req.body.idTamanho,
                                    sabor : this.req.body.sabor,
                                    preco : this.req.body.preco
                                }); 
                            },
                            (error : any) => {
                                this.sendError(error);
                                this.sendError(new KernelUtils().createErrorApiObject(401, '1002', 'Cadastro não realizado'));
                            }
                        );
                    },
                    (error : any) => {
                        this.sendError(error);
                    }
                );
               
            },
            (error : any) => {
                this.sendError(error);
            }
        ); 
    }


    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}