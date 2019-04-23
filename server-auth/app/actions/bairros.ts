import {Get} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import { KernelUtils } from '../kernel/kernel-utils';
import {MySQLFactory} from '../mysql/mysql_factory';

export class BairrosAction extends Action {

    private generateSQL(cidade : number) : string {
        return 'select bairros.name, bairros.taxa from bairros ' +
        'inner join cidades on cidades.id = bairros.idCidade ' +
        'where bairros.idCidade ='+ cidade;
    }

    @Get('/bairros/:cidade')
    public getBairros(){
        let cidade = this.req.params.cidade;
        
        new KernelUtils().createExceptionApiError('1002', 'Cidade não informada', (cidade == null || cidade == undefined));

        new MySQLFactory().getConnection().select(this.generateSQL(cidade)).subscribe(
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

    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}