class ProductType
{
    constructor( productsStage, obj )
    {
        this.productsStage = productsStage;
        this.div = creat('div','group btn','', productsStage.div);
        let _this = this;
        this.prodTypeData = null;
        this.div.onmousedown = function()
        {
            _this.click();
        }
        this.init(obj)
        block.hide();
    }

    click() {
        socket.once('getProducts', function (res) {
            console.log(res);
        })
        socket.emit('getProducts', this.id);
    }
    init( obj )
    {
        for(var i in obj)
        {
            this[i] = obj[i];
        }
        this.div.innerHTML = obj.name;
    }
}