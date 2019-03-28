class Stage
{
	constructor(main)
	{
		this.main = main;
		this.div = creat('div','','stage',main.div);
		this.menuName = creat('p','','stageName',this.div);
		this.menuName.innerHTML = 'MenuName';
		this.menuName.style.display= "none";
		this.stages = [];
		this.currShow = null;
	}
	addStage(stg)
	{
		this.stages.push(stg);
		this.main.leftMenu.addBtn( stg.id );
		stg.hide();
	}
	swapStage( idStage )
	{
		
		if(this.currShow)
			  this.currShow.hide();
		for(let i = 0; i < this.stages.length; i++)
		{
			let curr = this.stages[i];
			
			if(curr.id === idStage)
			{
			    curr.show();
				this.currShow = curr;
				return;
			}
		}
	}
	resize()
	{
		this.div.style.top = "" + this.main.headerHG+"px";
		this.div.style.height = this.main.leftMenu.div.style.height;
		if(this.main.leftMenu.div.style.display === "block")
			this.div.style.width = "" + (this.main.div.offsetWidth-200) +"px"//+this.top;
		else
			this.div.style.width = "100%"// + this.top;
	}
}