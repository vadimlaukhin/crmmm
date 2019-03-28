var express     = require('express');
var app         = express();
var serv        = require('http').Server(app);
var dataBase    = require('./server/MyDB');


var DB = new dataBase(); //MdyDB();

app.get('/',function(req,res)
{
    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client',express.static(__dirname + '/client'));

serv.listen(2001);
console.log('Server started');


var io = require('socket.io')(serv,{});
io.sockets.on('connection',function(socket)
{
    /* let groupNames = ['Супервайзер','Менеджер ВС','Поставщик','Менеджер Магазина','Клиент розница','Клиент ОПТ','Прораб','Инвестор','Владелец зем участка 4%','Региональный представитель 1%','Реализатор 10%']; //,
       for(let i=0; i < groupNames.length; i++)
          await DB.insertUsersGroup(groupNames[i]);*/

    socket.on('login', async function(data)
    {
            let answer = await DB.LoginUser(data);
            if(answer === "inside")
            {
                socket.logged = true;
                DB.getLoginData(socket);

                socket.on('getProducts', function (parent_id) {
                    DB.getProducts(parent_id, socket, true);
                });

                socket.on('getGroupUsers', function (group_id) {
                    DB.getGroupUser(socket, group_id);
                });

                socket.on('addUser', function (user) {
                    DB.insertUser(user, socket);
                })

                socket.on('removeUser', function (user_id) {
                    if(socket.logged) {
                        DB.removeUser(socket, user_id);
                    }
                })

                //socket.user_id = db id;

                /*call(socket,'getUsersByGroup');
                call(socket,'addUser');
                call(socket,'dellUser');
                call(socket,'getProdGroups');*/

                //call(socket,'getProdType');

            }
    })
})




function call( socket , str )
{
    socket.on(str, async function (data)
    {
        let answer = await DB[str](data);
        socket.emit( str + '_Ans', answer );
    })
}



