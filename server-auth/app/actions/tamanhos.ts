import {Get} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import {MySQLFactory} from '../mysql/mysql_factory';

export class TamanhosAction extends Action {

    private generateSQL() : string {
        return 'select id, name from tamanhos';
    }

    @Get('/tamanhos')
    public getTamanhos(){
        new MySQLFactory().getConnection().select(this.generateSQL()).subscribe(
            (data : any) => {
                this.sendAnswer(data);
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