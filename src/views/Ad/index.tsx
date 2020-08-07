/**
 * Developer    :   SongQian
 * Time         :   2020-08-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   广场动态
 */

 import * as tsx from 'vue-tsx-support'
 import { Component, Inject, Ref } from 'vue-property-decorator'
 import { mapGetters, mapActions } from 'vuex'

 import "vue-tsx-support/enable-check"
 import moment from 'moment'
 import RESTFULAPI from '~/utils/RestfulApi'

 @Component
 export default class Ad extends tsx.Component<any> {

    constructor() {
        super();
        moment.locale('zh-cn');
    }
    
    @Inject(Symbol.for('sys.io')) SysSocket;

    @Ref("addPiazzaForm") private readonly addPiazzaForm;

    @Ref("piazzaBackground") private readonly piazzaBackground;

    private openAdDialog = false;
    private piazzaModel = {
        text : '',
        image : ''
    }

    protected get piazzaModelRules() {
        let text = [
            { required: true, message: '我们还没有话题内容', trigger: 'blur' },
            { min : 1, max : 3000, message: '文本内容最大输入3000字', trigger: 'blur'}
        ]

        let image = [
            { required : false, trigger: 'blur'},
            { validator: (rule, value, callback) => value && /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i.test(value) ? callback() : callback(new Error('请上传合法文件')), trigger: 'blur' }
        ]
        return { text, image };
    } 

    protected openPiazza() {
        let  me = this;
        me.openAdDialog = true;
    }

    protected closePiazza() {
        let me = this;
        me.openAdDialog = false;
        me.addPiazzaForm.resetFields();
        me.onRemoveUploadFile();
    }

    protected onRemoveUploadFile() {
        let me = this;
        me.piazzaModel.image = "";
    }

    protected onBeforeFileUpload(file) {
        let me = this;
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (!isJPG && !isPNG) {
            me.$message({  type : "error",  customClass : "tomorrow-message",  message : "话题背景图片只能是 JPG，PNG 图片格式!",  dangerouslyUseHTMLString : true });
        }

        if (!isLt10M) {
            me.$message({  type : "error",  customClass : "tomorrow-message",  message : "话题背景图片大小不能超过 10MB!",  dangerouslyUseHTMLString : true });
        }
        me.blobToBase64String(file).then(function(data) {
            me.piazzaModel.image = data.result;
        });
        // me.piazzaModel.image = URL.createObjectURL(file);
        return isJPG && isLt10M;
    }

    protected onNotUploader(xhr) {
        if(xhr.action === "#") {
            // action: "javascript: void 0"
            // data: undefined
            // file: File {uid: 1596470108795, name: "tomorrow.jpg", lastModified: 1594654064526, lastModifiedDate: Mon Jul 13 2020 23:27:44 GMT+0800 (中国标准时间), webkitRelativePath: "", …}
            // filename: "file"
            // headers: {__ob__: Observer}
            // onError: ƒ onError(err)
            // onProgress: ƒ onProgress(e)
            // onSuccess: ƒ onSuccess(res)
            // withCredentials: false
            // __proto__: Object
            xhr.onSuccess();
        }
    }

    protected blobToBase64String(blob) : Promise<any> {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                resolve({ result : e.target?.result, error : null });
            };
            // readAsDataURL
            fileReader.readAsDataURL(blob);
            fileReader.onerror = () => {
                reject({ result : '', error : new Error('blobToBase64 error') });
            };
        });
    }

    protected async addPiazzaModel() {
        let me = this;
        let validate = await me.addPiazzaForm.validate().catch(() => false);
        if(validate) {
            let { "User/getUser" : user } = mapGetters(['User/getUser']);
            let u = user.apply(me);
            let result : any = await me.$http.post(
                (RESTFULAPI.injective.Api as any).Piazza,
                { text : me.piazzaModel.text, image : me.piazzaModel.image, uid : u.id },
                { emulateHTTP: true, emulateJSON: false })
    
            if(result.body.status && result.body.code === 200) {
                // me.adList.unshift(result.body.data);
                me.closePiazza();
                return;
            }
            me.$message({ type : "error",  customClass : "tomorrow-message",  message : result.body.message });
        }
    }

    protected async getPiazzaList() {
        let me = this;
        let result : any = await me.$http.get(
            (RESTFULAPI.injective.Api as any).Piazza,
            { params : { page : 1,  limit :  999 } },
            { emulateHTTP: false, emulateJSON: false }
        )
        
        if(result.body.status && result.body.code === 200) {
            let { 'Piazzas/resetPiazzas' : resetPiazzas } = mapActions(['Piazzas/resetPiazzas'])
            resetPiazzas.apply(me, [result.body.data || []]);
        }
    }

    protected mounted() {
        let me = this;
        me.getPiazzaList();
    }

    protected render() : JSX.Element {
        let me = this;
        let { "Sys/hasUserOnline" : hasUserOnline, 'User/getUser' : getUser, 'Piazzas/getPiazzaList' : getPiazzaList } = mapGetters(['Sys/hasUserOnline', 'User/getUser', 'Piazzas/getPiazzaList']);
        let u = getUser.apply(me);
        let piazza_list = getPiazzaList.apply(me);
        let myFirstPiazza = piazza_list.filter(it => it.user.id === u.id);
        let online = hasUserOnline.apply(me)(u.id || '') || false;
        let defaultSlot = !me.piazzaModel.image ?  <i class="el-icon-plus piazza-uploader-icon"></i> : <img class="piazza-upimage" src={ me.piazzaModel.image } /> ;
        let piazza_els = piazza_list.map((it) => {
            let piazzaImage = it.image ? <div class="piazza-list-card-propagate" style={{ backgroundImage: `url(${it.image})` }}></div> : null;
            return (<el-card shadow="always" class="piazza-list-card">
                <el-row type="flex" justify="center" align="middle">
                    <el-col span={10}><i class={[ 'tomorrow-avatar', `tomorrow-${it.user.avatar}-icon` ]}></i><span style='margin-left: 20px; color: #303133;'>{ it.user.trueName }</span></el-col>
                    <el-col span={10}></el-col>
                    <el-col span={4} style="text-align: right; color: #303133;">{ moment(new Date(it.createTime / 1)).fromNow() }</el-col>
                </el-row>
                <el-row type="flex" justify="center" align="middle">
                    <el-col span={24}>
                        <p style='color: #303133;'>{ it.text }</p>
                    </el-col>
                </el-row>
                { piazzaImage }
                <el-row type="flex" justify="center" align="middle">
                    <el-col span="24">
                        <i class="el-icon-star-off" style='margin-left: 10px; cursor: pointer;' />
                        <i class="el-icon-position" style='margin-left: 10px; cursor: pointer;' />
                        <i class="el-icon-chat-dot-square" style='margin-left: 10px; cursor: pointer;' />
                    </el-col>
                </el-row>
            </el-card>)
        })
        return (
            <div class="piazza">
                <div class="piazza-wrapper">
                    <div class="piazza-screen" style={{ backgroundImage: myFirstPiazza.length && myFirstPiazza[0].image ? `url(${myFirstPiazza[0].image})` : 'url(/assets/images/tomorrow.jpg)' }}>
                        <p class="piazza-name">{ u && u.trueName || '' }</p>
                        <div class="piazza-avatar">
                            <i class={[ 'tomorrow-avatar', `tomorrow-${u && u.avatar || 'default-head'}-icon`, online ? '' : 'tomorrow-avatar-unline' ]}></i>
                        </div>
                    </div>
                    <div class="piazza-list" >
                        <div class="piazza-add" onClick={ me.openPiazza }>
                            <p>创造一个话题，让更多的人来参与</p>
                            <i class="el-icon-plus" ></i>
                        </div>
                        { piazza_els }
                        <el-card shadow="always" class="piazza-list-card">
                            <el-row type="flex" justify="center" align="middle">
                                <el-col span={10}><i class={[ 'tomorrow-avatar', `tomorrow-${u.avatar}-icon` ]}></i><span style='margin-left: 20px; color: #303133;'>{ u.trueName }</span></el-col>
                                <el-col span={10}></el-col>
                                <el-col span={4} style="text-align: right; color: #303133;">{ moment(new Date(u.createTime / 1)).fromNow() }</el-col>
                            </el-row>
                            <el-row type="flex" justify="center" align="middle">
                                <el-col span={24}>
                                    <p style='color: #303133;'>愿你前程似锦，未来可期​。</p>
                                </el-col>
                            </el-row>
                            <div class="piazza-list-card-propagate" style={{ backgroundImage: "url(/assets/images/tomorrow.jpg)" }}></div>
                            <el-row type="flex" justify="center" align="middle">
                                <el-col span="24">
                                    <i class="el-icon-star-off" style='margin-left: 10px; cursor: pointer;' />
                                    <i class="el-icon-position" style='margin-left: 10px; cursor: pointer;' />
                                    <i class="el-icon-chat-dot-square" style='margin-left: 10px; cursor: pointer;' />
                                </el-col>
                            </el-row>
                        </el-card>
                    </div>
                </div>
                <el-dialog title="创建话题" visible={ me.openAdDialog } width="50%" beforeClose={ me.closePiazza } close-on-click-modal={false}>
                    <el-form ref="addPiazzaForm"  model={ me.piazzaModel } rules={ me.piazzaModelRules } label-position="top">
                        <el-form-item label="话题内容：" prop="text">
                            <el-input type="textarea" placeholder="最大输入3000个字符" value={ me.piazzaModel.text } onInput={ (e) => me.piazzaModel.text = e }></el-input>
                        </el-form-item>
                        <el-form-item label="背影墙" prop="image">
                            <el-upload 
                                action="#"
                                class="piazza-uploader"
                                accept="image/png, image/jpeg"
                                ref="piazzaBackground"
                                show-file-list={false}
                                before-upload={ me.onBeforeFileUpload }
                                http-request={ me.onNotUploader } 
                                autoUpload={ true } 
                                multiple={false}>
                                { defaultSlot }
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button onClick={ me.closePiazza }>取 消</el-button>
                        <el-button type="primary" onClick={ me.addPiazzaModel } >确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        )
    }
 }
