class Main 
{
	constructor()
	{
		this.div = document.getElementById('main');
		this.div.style.display = "block";
		this.headerHG = 60;
		this.minWD = 800;
	}
	init()
	{
		this.header = new Header();
		this.leftMenu = new LeftMenu();
		this.stage = new Stage(this);

		block.hide();

		let _this = this;
		window.onresize = function(event)
		{
            _this.resize();
        };

		this.resize();

		this.stage.addStage( new UsersStage('Пользователи') );
		this.stage.addStage( new ProductsStage('Товары') );
		this.stage.addStage( new ShopStage('Магазин') );


	}
	resize()
	{
		this.header.div.style = "height:" + this.headerHG + "px;";
		this.header.resize();
		this.leftMenu.resize();
		this.stage.resize();
	}
	
}