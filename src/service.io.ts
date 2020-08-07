/**
 * Developer    :   SongQian
 * Time         :   2020-06-22
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   服务端Socket
 */
 import { Server, Socket } from 'socket.io'

 export default function(io : Server) {
    const app = this;
    app.set("userLists", new Map<string, any>());
    app.set("walkieTalkieList", new Map<string, Socket>());
    // io.origins((origin, callback) => {
    //     if (origin !== `http://localhost:3029`) {
    //       return callback('origin not allowed', false);
    //     }
    //     callback(null, true);
    // });
    io.on('connect', (socket) => {

        socket.on('sysRestoreAccout', (u) => {
            let users : Map<string, any> = app.get("userLists");
            if(!users.has(socket.conn.id)) {
                users.set(socket.conn.id, u);
            }
            io.emit('sysonline', [...users.values()]);
        })

        socket.on('sysModifyUser', (u) => {
            let users : Map<string, any> = app.get("userLists");
            if(!users.has(socket.conn.id)) {
                users.set(socket.conn.id, u);
            }
        })

        socket.on('disconnect', (reason) => {
            if(reason === 'transport close') {
                let users : Map<string, any> = app.get("userLists");
                if(users.has(socket.conn.id)) {
                    if(!users.delete(socket.conn.id)) {
                        users = new Map<string, any>([ ...users].filter(([k, v]) => k));
                        app.set("userLists", users);
                    }
                    io.emit('sysunline', [...users.values()]);
                }
                socket.disconnect(true);
            }
        })
        
    })

    var walkieTalkieNamespace = io.of(/^\/WalkieTalkie\-([a-z0-9]+)$/);
    walkieTalkieNamespace.use((socket, next) => {
        if(socket.handshake.query.token !== '') {
            next();
        } else {
            next(new Error('当前非法用户连接!'));
        }
        
    });
    walkieTalkieNamespace.on('connect', (socket) => {
        const namespaceName = socket.nsp.name;
        const id : any = namespaceName.match(/([a-z0-9]{32})/g);
        let userSockets :  Map<string, Socket> = app.get("walkieTalkieList");
        userSockets.set(id[0] || '', socket);

        socket.on('to', (uid: string, message: string) => {
            let toSocket = userSockets.get(uid);
            if(toSocket) {
                toSocket.emit('from', id[0], message);
                return void 0;
            } else {
                 socket.emit('empty user');
            }
        })

        socket.on('disconnect', (reason) => {
            if(reason === 'transport close') {
                const namespaceName = socket.nsp.name;
                const id : any = namespaceName.match(/([a-z0-9]{32})/g);
                if(userSockets.has(id[0])) {
                    userSockets.delete(id[0]);
                }
                socket.disconnect(true);
            }
        })

    })
 }