class Overlay
{
	constructor(parrID,zIndex, hideResponse )
	{
		let parr = document.getElementById(parrID);
		let cont = this.creat('div','','', parr);
		this.cont = cont;
		cont.style.width = '100%';
		cont.style.height= '100%';
		cont.style.position = 'fixed'
		cont.style.zIndex = zIndex;
		cont.style.top = '0';
		cont.style.left = '0';
		cont.style.display = 'none';
		
		let bg = this.creat('div','','',cont);
		bg.style.width = '100%';
		bg.style.height ='100%';
		bg.style.position = "absolute";
		bg.style.backgroundColor = 'rgba(0,0,0,0.6)';
		
		let _this = this;
		this.bg = bg;
		bg.onclick = function(){ _this.hide();  if(hideResponse) hideResponse() }
	}
	getCont()
	{
		return this.cont;
	}
	hide()
	{
		this.cont.style.display = "none";
	}
	creat( tag, clas, ids , parr )
	{
		let obj = document.createElement( tag );
		if(clas)
		  obj.className = clas;
		if(ids)
		  obj.id = ids;
		parr.appendChild(obj);
		return obj;
	}
	show()
	{
		this.cont.style.display = "block";
	}
}