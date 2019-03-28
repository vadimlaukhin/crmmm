class Login
{
    constructor()
    {
        this.div = document.getElementById('login');
        this.block        = creat('div','block center','',this.div);
        this.block_header = creat('p'  ,'headrBlock',     '',this.block,'Логин');
        this.inp_phone = new ChekInp(this.block,'inp_phone','Телефон', true);
        this.inp_pass  = new ChekInp(this.block,'inp_pass','Пароль', false);
        this.btn       = creat('button','btnBlock','',this.block,'Вход');
        let _this = this;
        this.btn.onclick = function ()
        {

          //  _this.inp_phone.check ([]);
          //  _this.inp_pass.check  ([]);

            if( _this.inp_phone.isError() || _this.inp_pass.isError() )
                return;

            block.show();
            socket.emit('login',{phone: '93' , pass: 'ww' })
            //socket.emit('login',{phone: _this.inp_phone.inp.value , pass: _this.inp_pass.inp.value })
        }

    }
    hide()
    {
        this.div.style.display = "none";
    }
    showError(data)
    {
        if( data==="Not found user")
            this.inp_phone.showError("Пользователь не найден");
        else if( data === "Wrong password" )
            this.inp_pass.showError("Неверный пароль");
        else
            this.inp_phone.showError(data);
        block.hide();
        console.log(data);
    }

}