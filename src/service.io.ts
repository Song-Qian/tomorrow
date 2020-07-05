/**
 * Developer    :   SongQian
 * Time         :   2020-06-22
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   服务端Socket
 */
 import { Server } from 'socket.io'

 export default function(io : Server) {
    const app = this;
    app.set("userLists", new Map<string, any>());
    io.on('connect', (socket) => {

        socket.on('sysRestoreAccout', (u) => {
            let users : Map<string, any> = app.get("userLists");
            if(!users.has(socket.id)) {
                users.set(socket.id, u);
            }
            socket.emit('sysonline', [...users.values()]);
        })

        socket.on('disconnect', (reason) => {
            if(reason === 'transport close') {
                let users : Map<string, any> = app.get("userLists");
                if(users.has(socket.id)) {
                    users.delete(socket.id);
                    io.emit('sysunline', [...users.values()]);
                }
                socket.disconnect(true);
            }
        })
        
    })
 }