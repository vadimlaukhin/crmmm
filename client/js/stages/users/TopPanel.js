class TopPanel
{
    constructor( curr_group )
    {
        this.curr_group = curr_group;
        this.div  = creat('p',  '','currGroupHeader', curr_group.div);
       // this.div   = creat('div','userName unselect','', curr_group.div );

        this.btnBack = creat('div',  'btn','btnBackCurrGroup', curr_group.div);
        this.btnAdd = creat('div',  'btn','btnEditAdd',curr_group.div);
        this.btnEdit = creat('div',  'btn','btnEditCurrGroup',curr_group.div);
        this.editDiv = creat('div',  '','editCurrGroup', curr_group.div);
        let _this = this;
        this.btnBack.onclick = function()
        {
            curr_group.usersStage.show();
        }
        this.btnEdit.onclick = function()
        {

        }
        this.btnAdd.onclick = function()
        {
            _this.swapDialog();
             _this.showAddUserDialog();
        }
        this.creatUserDiv = new CreatUserDiv(this);
    }
    swapDialog()
    {
        if(this.editDiv.style.display === "block")
            this.editDiv.style.display = "none";
        else
            this.editDiv.style.display = "block";
    }
    showAddUserDialog()
    {
        //this.editDiv.style.display = "block";
        this.creatUserDiv.show();
    }
    showEditGroupDialog()
    {

    }
    setName(str)
    {
        this.div.innerHTML = str;
    }
}

class CreatUserDiv
{
    constructor(top_panel)
    {
        this.top_panel = top_panel;
        this.div = creat('div','creatUser','', top_panel.editDiv);
        this.inps = [];
        let txts = ['Фамилия','Имя','Отчество','Телефон','E-mail','Баланс'];
        for( let z =0 ; z < txts.length ; z++ )
        {
            let inp = new ChekInp( this.div, txts[z],txts[z], false );
            inp.inp.style.width = "60%";
            inp.div.style.marginTop = "15px";
            inp.inp.style.cssFloat = "right";
            inp.txt.style.left = "40%";
            inp.arr.style.left = "45%";
            let txt = creat('p','textUserInfo','', inp.div);
            txt.style.width = "45%";
            txt.style.textAlign = "center";
            txt.innerHTML = txts[z];
            this.inps[z] = inp;
        }
        this.creatSellect();
        this.creatBTN();
        let _this = this;
        this.btn.onclick = function ()
        {

            for (let i = 0; i < _this.inps.length; i++)
            {
                _this.inps[i].check([]);
            }

            for (let z = 0; z < _this.inps.length; z++)
            {
                if(_this.inps[z].isError())
                    return;
            }

            _this.creatNewUser();
            _this.hide();
            //_this.top_panel.cu
            main.stage.stages[0].currGroup.topPanel.creatUserDiv.top_panel.curr_group.currGroup.click();
        }
    }

    creatNewUser() {
        let that = this;
        let obj =   {
                        name: this.inps[0].inp.value + ' '+ this.inps[1].inp.value + ' '+ this.inps[2].inp.value,
                        phone: this.inps[3].inp.value,
                        pass:'',
                        mail: this.inps[4].inp.value,
                        groupID: this.top_panel.curr_group.currGroup.id,
                        balanc: this.inps[5].inp.value,
                        shopID: this.sell.value
                    };
        socket.once('addUser', function (res) {
            console.log(res);
            //this.top_panel.currGroup.usersStage.show();
        })
        socket.emit('addUser', obj);


        /*return await new Promise(function (resolve,reject)
        {
            socket.once('addUser_Ans', function (data)
            {
                if(data === "creat")
                    resolve(true);
                else
                {
                    console.log(data);
                    resolve(false);
                }

            })
        })*/
    }
    creatBTN()
    {
        let btn =  creat ('button', '','', this.div);
        btn.innerHTML = "Создать";
        btn.style.width = "90%";
        btn.style.marginLeft = "5%";
        btn.style.marginTop = "15px";
        btn.style.height = "50px";
        this.btn = btn;
    }
    creatSellect()
    {
        let div = creat ('div', 'inpParr','', this.div);
        div.style.marginTop = "15px";
        this.sell = creat('select','inpUserInfo','',div);
        this.sell.style.width = "60%";
        this.sell.style.height = "30px";
        this.sell.style.fontSize = "16px";
        this.sell.style.lineHeight = "16px";
        this.sell.style.padding = "5px";
        this.sell.style.cssFloat = "right";
/*
        width:100%;
        height:30px;
        font-size:16px;
        line-height:16px;
        padding:5px;*/
        let txt = creat('p','textUserInfo','', div);
        txt.style.width = "45%";
        txt.style.textAlign = "center";
        txt.innerHTML = "Магазин";

        let nms = ['Лука 1','Лука Базар','Оптовый'];
        for(let y = 0; y < 3; y++)
        {
            let opt = creat('option','','', this.sell);
            opt.value =  y;
            opt.innerHTML = nms[y] ;
        }
    }
    show()
    {
        this.div.style.display = "block";
        for (let i = 0; i < this.inps.length; i++)
        {
           this.inps[i].inp.value ="";
        }
    }
    hide()
    {
        this.div.style.display = "none";
    }

    isShow()
    {
        return this.div.style.display === "block";
    }
}