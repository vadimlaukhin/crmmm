class LeftMenu
{
	constructor()
	{
		let _this = this;
		this.overlay = new Overlay("main",10,function(){ _this.hide() });
		this.div = creat('div','show','leftMenu',main.div);
		this.btnLeft = creat('p','btn','btnHeaderLeft', main.div );
		this.btnLeft.innerHTML = "T";
		this.btnLeft.style.display = "none";
		this.btnLeft.onclick = function()
		{
			if(_this.btnLeft.innerHTML=== "X")
			  _this.hide()
			else
			_this.show()
		}

	}
	addBtn( str )
	{
		 let btn = creat('p','btnLeft btn','', this.div );
		 btn.innerHTML = str;
		 let _this = this;
		 btn.onclick = function()
		 {
			// if(_this.main.header.menuName.innerHTML === btn.innerHTML)
			//	return;
			 
			 main.stage.swapStage(str) //oNclick();
			 main.header.menuName.innerHTML = btn.innerHTML;
			 main.stage.menuName.innerHTML  = btn.innerHTML;
			 if(_this.btnLeft.style.display=== "block")
			 _this.hide();
		 }
	}
	resize()
	{
		this.div.style.height = (window.innerHeight - main.headerHG)+"px";
		this.div.style.top = main.headerHG+"px";
		if( main.div.offsetWidth < main.minWD )
		{
			this.btnLeft.style.display = "block";
			this.hide();
		}
		else
		{
			this.btnLeft.style.display = "none";
			this.hide();
			this.show();
		}
	}
	hide()
	{
	    this.div.style.display = "none";
		this.overlay.hide();
		if( this.btnLeft.style.display == "block" )
		{
			this.btnLeft.innerHTML = "T";
			 this.div.className = "";
			 this.div.style.left = 0;
		}	
	}
	show()
	{
		this.div.style.display = "block";
		if( this.btnLeft.style.display == "block" )
		{
			this.overlay.show();
			this.btnLeft.innerHTML = "X";
			 this.div.className = "showLeft";
		}
	}
	
}