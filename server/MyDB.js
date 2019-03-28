const MyEvents = require('events');
const MySQLDB = require('mysql');

const conf = {host:'localhost', user:'root', password:'123123',database:'crm'};

class MyDB extends  MyEvents
{
    constructor()
    {
        super();
        this.conn = null;
        this.is_first = true;
        this.connect();
        console.log("b");
    }
    connect()
    {
        console.log('Connection to DB!');
        this.handleDisconnect();
    }
    handleDisconnect()
    {
        let _this = this;
        this.conn = MySQLDB.createConnection(conf);
        this.conn.connect( function (err)
        {
            if(err)
            {
                console.log('error when connection to db: ' + err);
                setTimeout(_this.handleDisconnect,2000);
                return;
            }
            if(_this.is_first)
            {
                _this.is_first = false;
                console.log('Connection to DataBase complete!');
            }
            else
            {
                console.log('Reconnecting to mysql');
            }
            _this.emit('connect');
        });
        _this.conn.on('error',function(err)
        {
            if(err.code === 'PROTOCOL_CONNECTION_LOST')
                that.handleDisconnect();
            else
            {
                console.log('db error', err);
                throw err;
            }
        });
    }

    getLoginData(socket) {
        this.getProducts(0, socket);
    }

    getProducts(parent_id, socket, resp) {
        let that = this;
        parent_id = Math.floor(Number(parent_id));
        this.conn.query("SELECT * FROM `products` WHERE `parent_id`='"+parent_id+"'", function (err, result) {
            if(err) {
                console.error('Error getting product with parent id: ' + parent_id);
                console.error(err);
                socket.emit('error', 'Go nahui');
                return;
            }
            if(resp) {
                socket.emit('getProducts', result);
            } else {
                that.getUserGroups(result, socket)
            }

        });
    }

    getUserGroups(prevObj, socket) {
        this.conn.query("SELECT * FROM `usersgroup` WHERE 1", function (err, result) {
            if(err) {
                console.error('Error getting Users group');
                console.error(err);
                socket.emit('error', 'Go nahui');
                return;
            }
            socket.emit('logindata', result, prevObj);
        })

    }

    async LoginUser(data)
    {
        let _this = this;
        return await new Promise(function (resolve , reject)
        {
            if(data.phone && data.pass)
            {
                let query = "SELECT * FROM `users` WHERE `phone` = " + data.phone;
                _this.conn.query(query, function (err, row)
                {
                    if(err)
                    {
                        console.error(err);
                        resolve(err);
                        return;
                    }
                    if( row.length == 0 )
                    {
                        resolve("Not found user");
                        return;
                    }
                    else if( !(row[0].pass === data.pass) )
                    {
                        resolve("Wrong password");
                        return;
                    }
                    else
                        resolve("inside");
                })
            }
            else
                resolve('Incorrect data');
        })

    }

    async getProdType(data)
    {
        let _this = this;
        return await new Promise(function (resolve , reject)
        {
            let query = "SELECT * FROM `productstype` ORDER BY `id` ASC LIMIT 20";
            _this.conn.query(query, function (err, row)
            {
                if(err)
                {
                    console.error(err);
                    resolve(err);
                    return;
                }
                resolve(row);
            })
        })
    }




    async insertUsersGroup(name)
    {
        let _this = this;
        return await new Promise(function (resolve , reject)
        {
            let query = "INSERT INTO `usersgroup`(`name`) VALUES ('" + name + "')";
            _this.conn.query(query, function (err, result)
            {
                if(err)
                {
                    console.error(err)
                    resolve(false);
                    return;
                }
                console.log('Insert users group done id: ' + result);
                resolve(true);
            })
        })
    }
    async getUsersByGroup(data)
    {
        let _this = this;
        return await new Promise(function (resolve , reject)
        {
            if(data.id)
            {
                let query = "SELECT * FROM `users` WHERE `groupID` = " + data.id + " LIMIT 10 OFFSET 10";
                _this.conn.query(query, function (err, row)
                {
                    if(err)
                    {
                        console.error(err);
                        resolve(err);
                        return;
                    }
                    resolve(row);
                })
            }
            else
                resolve("data does not have id");
        })
    }
    async addUser(data)
    {
        let _this = this;
        return await new Promise(function (resolve , reject)
        {
            if(data.phone && data.mail && data.name && data.groupID && data.balanc && data.shopID )
            {
                let query = "INSERT INTO `users` (`id`, `phone`, `pass`, `mail`, `name`, `groupID`, `balanc`, `shopID`) VALUES (NULL, '"+ data.phone +"', '"+data.pass+"', '"+data.mail+"', '"+data.name+"', '"+data.groupID+"', '"+data.balanc+"', '"+data.shopID+"')"
                _this.conn.query(query, function (err, result)
                {
                    if(err)
                    {
                        console.error(err);
                        resolve(err);
                        return;
                    }
                    resolve("creat");
                })
            }
            else
                resolve("Error client data");

        })
    }


    async dellUser(data)
    {
        let _this = this;
        return await new Promise(function (resolve , reject)
        {
            if(data.id)
            {
                let query = "UPDATE `users` SET `groupID` = '0' WHERE `users`.`id` = " + data.id;
                _this.conn.query(query, function (err, result)
                {
                    if(err)
                    {
                        console.error(err);
                        resolve(err);
                        return;
                    }
                    console.log('dell user ' + result);
                    resolve("dell");
                })
            }
            else
                resolve("data does not have id");

        })
    }


    getGroupUser(socket, group_id) {
        this.conn.query("SELECT * FROM `users` WHERE `groupID`='"+group_id+"'", function (err, result) {
            if(err) {
                console.error('Error getting  group Users');
                console.error(err);
                socket.emit('error', 'Go nahui');
                return;
            }
            socket.emit('getGroupUsers', result);
        });
    }

    removeUser(socket, user_id) {
        this.conn.query("UPDATE `users` SET `groupID`=0 WHERE `id`='"+user_id+"'", function (err, result) {
            if(err) {
                console.error('Error getting  group Users');
                console.error(err);
                socket.emit('error', 'Go nahui');
                return;
            }
            console.log(result);
            socket.emit('removeUser', user_id);
        });
    }

    insertUser(user, socket) {
        this.conn.query("INSERT INTO `users`(`phone`, `pass`, `mail`, `name`, `groupID`, `balanc`, `shopID`) VALUES ('" + user.phone +  "','"+ 123+"','"+user.mail+"','"+user.name+"','"+user.groupID+"','"+user.balanc+"','"+user.shopID+"')", function (err, result) {
            if(err) {
                console.error('Error getting  group Users');
                console.error(err);
                socket.emit('error', 'Go nahui');
                return;
            }
            console.log(result);
            user.id = result.insertId;
            socket.emit('addUser', user);
        });
    }
}
module.exports = MyDB;