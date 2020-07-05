/**
 * Developer    :   SongQian
 * Time         :   2019-09-10
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Service业务层抽像
 */
 import { Params, Paginated, Id, ServiceMethods, Hook } from '@feathersjs/feathers'
 import  RestfulFormatHook from '../hooks/restful.fromat.hook'
 
 import { injectable } from 'inversify'

 @injectable()
 export abstract class AbstructService<T extends { [key : string] : any }> implements ServiceMethods<T> {

    protected get afterHooks() : { [key : string] : Hook[] } {
        return {
            all : [
                RestfulFormatHook()
            ]
        }
    }

    private _raw !: number;
    protected get raw() {
        return this._raw;
    }

    protected set raw(val : number) {
        this._raw = val;
    }


    public abstract async find(params?: Params) : Promise<T | T[] | Paginated<T>>;

    public abstract async get (id: Id, params?: Params): Promise<T>;

    public abstract async create(data: Partial<T> | Array<Partial<T>>, params?: Params) : Promise<T | T[]>;

    public abstract async update(id: Id, data: T, params?: Params) : Promise<T | T[]>;

    public abstract async patch(id: Id, data: Partial<T>, params?: Params) : Promise<T | T[]>;

    public abstract async remove(id: Id, params?: Params) : Promise<T | T[]>;

    /**
     * public RestResult(code : number, data : any) : any {
        return RestfulFormat.restFromat(code, data);
    }

    async find (params?: Params | undefined): Promise<T[] | Paginated<T>>;
    find(params?: Params | undefined): Promise<T | T[] | Paginated<T>> {
        throw new Error("Method not implemented.");
    }
    
    async get (id: Id, params?: Params | undefined): Promise<T>;
    get(id: Id, params?: Params | undefined): Promise<T> {
        throw new Error("Method not implemented.");
    }

    create(data: Partial<T>, params?: Params | undefined): Promise<T>;
    create(data: Partial<T>[], params?: Params | undefined): Promise<T[]>;
    create(data: Partial<T> | Partial<T>[], params?: Params | undefined): Promise<T | T[]>;
    async create(data: any, params?: any) : Promise<T | T[]> {
        throw new Error("Method not implemented.");
    }

    update(id: Id, data: T, params?: Params | undefined): Promise<T>;
    update(id: null, data: T, params?: Params | undefined): Promise<T[]>;
    update(id: import("@feathersjs/feathers").NullableId, data: T, params?: Params | undefined): Promise<T | T[]>;
    async update(id: any, data: any, params?: any) : Promise<T | T[]>  {
        throw new Error("Method not implemented.");
    }
    patch(id: Id, data: Partial<T>, params?: Params | undefined): Promise<T>;
    patch(id: null, data: Partial<T>, params?: Params | undefined): Promise<T[]>;
    patch(id: import("@feathersjs/feathers").NullableId, data: Partial<T>, params?: Params | undefined): Promise<T | T[]>;
    async patch(id: any, data: any, params?: any) : Promise<T | T[]>  {
        throw new Error("Method not implemented.");
    }
    remove(id: Id, params?: Params | undefined): Promise<T>;
    remove(id: null, params?: Params | undefined): Promise<T[]>;
    remove(id: import("@feathersjs/feathers").NullableId, params?: Params | undefined): Promise<T | T[]>;
    async remove(id: any, params?: any) : Promise<T | T[]>  {
        throw new Error("Method not implemented.");
    }

    id?: any;
    _serviceEvents !: string[];
    methods !: { [method: string]: string[]; };
    
    hooks(hooks: Partial<import("@feathersjs/feathers").HooksObject>): this {
        throw new Error("Method not implemented.");
    }
    publish(publisher: import("@feathersjs/transport-commons/lib/channels/mixins").Publisher<T>): this;
    publish(event: import("@feathersjs/transport-commons/lib/channels/mixins").Event, publisher: import("@feathersjs/transport-commons/lib/channels/mixins").Publisher<T>): this;
    publish(event: any, publisher?: any) : this {
        throw new Error("Method not implemented.");
    }
    registerPublisher(publisher: import("@feathersjs/transport-commons/lib/channels/mixins").Publisher<T>): this;
    registerPublisher(event: import("@feathersjs/transport-commons/lib/channels/mixins").Event, publisher: import("@feathersjs/transport-commons/lib/channels/mixins").Publisher<T>): this;
    registerPublisher(event: any, publisher?: any) : this {
        throw new Error("Method not implemented.");
    }
    addListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    on(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    once(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    prependListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    off(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    removeAllListeners(event?: string | symbol | undefined): this {
        throw new Error("Method not implemented.");
    }
    setMaxListeners(n: number): this {
        throw new Error("Method not implemented.");
    }
    getMaxListeners(): number {
        throw new Error("Method not implemented.");
    }
    listeners(event: string | symbol): Function[] {
        throw new Error("Method not implemented.");
    }
    rawListeners(event: string | symbol): Function[] {
        throw new Error("Method not implemented.");
    }
    emit(event: string | symbol, ...args: any[]): boolean {
        throw new Error("Method not implemented.");
    }
    eventNames(): (string | symbol)[] {
        throw new Error("Method not implemented.");
    }
    listenerCount(type: string | symbol): number {
        throw new Error("Method not implemented.");
    }

     */
 }