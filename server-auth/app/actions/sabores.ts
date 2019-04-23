import { Get} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import { KernelUtils } from '../kernel/kernel-utils';
import {MySQLFactory} from '../mysql/mysql_factory';

export class SaboresAction extends Action {

    private generateSQL(tamanho : number) : string {
        return 'select sabores.sabor, st.idSabor, st.preco ' + 
               'from sabores_has_tamanhos as st ' +
               'left join sabores on sabores.id = st.idSabor ' +
               'where st.idTamanho = '+ tamanho;
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

    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}