class Header
{
	constructor()
	{
		this.div = creat('header','','', main.div);

		this.srmLogo = creat('p','','hdCRM',this.div);
		this.srmLogo.innerHTML = 'Beton CRM';

		this.menuName = creat('div','','hdName',this.div);
        this.menuName.innerHTML = 'MenuName';

		this.resize();

	}
	resize()
	{
		if( main.div.offsetWidth < main.minWD )
		{
			this.menuName.style.width  = "100%";
			this.srmLogo.style.display = "none";
		}
		else
		{
			this.srmLogo.style.display = "block";
			this.menuName.style.width = (main.div.offsetWidth-200) + "px";
		}
	}
}