/**
 * Developer    :   SongQian
 * Time         :   2019-09-18
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   广场业务类
 */
import 'reflect-metadata'
import { Params, Paginated, Id, Hook } from '@feathersjs/feathers'
import { Model } from 'objection'
import { injectable, inject } from 'inversify'
import { AbstructService } from './AbstructService'
import { PiazzaModel } from '../model/PiazzaModel'
import { RepositoryIdentifier } from '../inject_type'
import { Piazza_Repository } from '~/repository/implements/Piazza_Repository'
import { User_Repository } from '~/repository/implements/User_Repository'
import { IBusiness_UnitOfWorkRepositroy } from '~/repository/IBusiness_UnitRepositroy'
import  RestfulFormatHook from '../hooks/restful.fromat.hook'
import PiazzaPublishHook from '../hooks/piazza_publish.hook'
import { UserModel } from '~/model/UserModel'

@injectable()
@Reflect.metadata('RequestMapping', '/piazza')
export class PiazzaService extends  AbstructService<PiazzaModel> {

    
    protected get afterHooks() : { [key : string] : Hook[] } {
        return {
            all : [
                RestfulFormatHook()
            ],
            create : [
                PiazzaPublishHook()
            ]
        }
    }
    
    @inject(RepositoryIdentifier.PiazzaRepository) protected readonly model !: Model

    @inject(RepositoryIdentifier.UserRepository) protected readonly userRepository !: Model;

    public async find (params?: Params | undefined): Promise<PiazzaModel | PiazzaModel[] | Paginated<PiazzaModel>> {
        const me = this;
        me.raw = 200;
        let page = params?.query && params.query.page || 1;
        let limit = params?.query && params.query.limit || 50;
        let uid = params?.query && params.query.uid || '';
        const repositroy: IBusiness_UnitOfWorkRepositroy<PiazzaModel> =  me.model as Piazza_Repository;
        const expression = () => {
            let andWhere: { [key : string]: any } | null =  uid ? { uid } : null;
            return {
                andWhere,
                orderBy : [['p.createTime', 'desc']]
            }
        }
        let result = await repositroy.getConditionForPage(expression, page, limit);
        return result;
    }

    public async get (id: Id, params?: Params | undefined): Promise<PiazzaModel> {
        throw new Error('Method not implemented.')
    }

    public async create (data: Partial<PiazzaModel>, params?: Params | undefined): Promise<PiazzaModel> {
        const me = this
        me.raw = 200;
        let model = new PiazzaModel(undefined, data.text, undefined, data.image, data.uid);
        if(!(data as PiazzaModel).uid) {
            me.raw = 3001;
        }
        const repositroy: IBusiness_UnitOfWorkRepositroy<PiazzaModel> =  me.model as Piazza_Repository;
        let result : any = await repositroy.add({ ...model });
        model.id = result.id;
        if(!result.uid) {
            me.raw = 3002;
            model.user = Object.create(null);
            return model;
        }

        const u_repositroy :IBusiness_UnitOfWorkRepositroy<UserModel> = me.userRepository as User_Repository;
        const user = await u_repositroy.get(result.uid);
        model.createTime = new Date().getTime();
        model.user = user ? { ...user, createTime : (user.createTime as Date).getTime() } : Object.create(null);
        return model;
    }

    public async update (id: Id, data: PiazzaModel, params?: Params | undefined): Promise<PiazzaModel | PiazzaModel[]> {
        throw new Error('Method not implemented.')
    }

    public async patch (id: Id, data: Partial<PiazzaModel>, params?: Params | undefined): Promise<PiazzaModel | PiazzaModel[]> {
        throw new Error('Method not implemented.')
    }

    public async remove (id: Id, params?: Params | undefined): Promise<PiazzaModel | PiazzaModel[]> {
        throw new Error('Method not implemented.')
    }

}