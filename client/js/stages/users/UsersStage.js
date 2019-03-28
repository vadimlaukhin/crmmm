class UsersStage extends BaseStage
{
	constructor( name )
	{
		super( name );
		this.groups = { };

		this.currGroup = new CurrGroup(this);

		for(let i= 0; i < servData.groups.length; i++) {
			let obj = servData.groups[i]
			this.groups[ obj.id ] = new Group( this , obj );
		}
		this.groupInterval = null;

	}
	showCurrGroup(group)
	{
		for( let i in this.groups)
		{
			this.groups[i].div.style.display = 'none'; 
		}
		this.currGroup.show(group);
		console.log(servData);
	}
	show()
	{
		super.show();
		this.currGroup.hide();
		for( let i in this.groups)
		{
			this.groups[i].div.style.display = 'block';
		}
	}

	showGroups()
	{
		this.show();
		/*
		this.currGroup.hide();
		let i;
		if(this.groupInterval ) clearInterval(this.groupInterval);

		for( i = 0; i < this.groups.length; i++)
		{
			this.groups[i].div.style.display = 'block';
			this.groups[i].div.style.visibility = 'hidden';
			this.groups[i].div.classList.remove("animGroup");
		}
		i=0;
		let _this = this;
		this.groupInterval = setInterval(function()
		{
			//console.log(this.groups);
			_this.groups[i].div.style.visibility = 'visible';
			_this.groups[i].div.classList.add("animGroup");
			i++;
			if(i > _this.groups.length-1 ) { clearInterval(_this.groupInterval);_this.groupInterval = null }
		},100)*/
	}

}