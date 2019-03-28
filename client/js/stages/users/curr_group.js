class CurrGroup
{
	constructor( usersStage )
	{
		this.usersStage = usersStage;
		this.users = [];
		this.div     = creat('div','','currGroup',usersStage.div);
        	this.topPanel = new TopPanel(this);
			this.div2    = creat('div','','currGroupCont', this.div);

		this.div_info   = creat('div','userInfo','', this.div2 );
		this.p1         = creat('p','','', this.div_info );


		/*

		
		
		let _this = this;

		this.btnEdit.onclick = function()
		{
			if( _this.editDiv.style.display === "block" )
			  _this.editDiv.style.display = "none";
			else
			  _this.editDiv.style.display = "block";
		}
		this.btnAdd.onclick = function()
		{
			if( _this.editDiv.style.display === "block" )
			  _this.editDiv.style.display = "none";
			else
			  _this.editDiv.style.display = "block";
		}
		this.groupInterval = null;
		this.currGroup;*/
	}
	showUserInfo(user)
	{
		let nms = ['Лука 1','Лука Базар','Оптовый'];
		this.p1.innerHTML =    user.name + '<br>' ;
		this.p1.innerHTML +=  'Телефон: ' + user.phone + '<br>' ;
		this.p1.innerHTML +=  'E-mail: ' + user.mail + '<br>' ;
		this.p1.innerHTML +=  'Баланс: ' + user.balanc + ' грн <br>' ;
		this.p1.innerHTML +=  'Магазин: ' + nms[user.shopID] + '<br>' ;

		let i 
		if(this.div_info.style.display === "none")
		{
			for(i =0; i < this.users.length; i++)
			  this.users[i].div.style.display = "none";
			
			user.div.style.display = "block";
			this.div2.appendChild(this.div_info);
			this.div_info.style.display = "block";
		}
		else
		{
			this.hide();
			this.show(this.currGroup);
		}
		
	}
	show(group)
	{
		this.hide();
		this.currGroup = group;
		this.div.style.display = "block";
		this.topPanel.setName(group.name);
		//this.header.innerHTML = group.name;

		let i;
		let user;
		console.log('  ')
		console.log( servData.groups[group.id]);
		for( let i in servData.groups[group.id].users )
		{
			user = this.getUser();
			user.init ( servData.groups[group.id].users[i] );
			//actUsers.push( user );
			//user.div.style.display = 'block';
		}
		this.topPanel.editDiv.style.display = "none";
		/*
		let actUsers = [];
		let i;
		let user;
		console.log(group.usersData);
		for( i=0; i< group.usersData.length; i++ )
		{
			user = this.getUser();
			user.set(group.usersData[i]);
			actUsers.push( user );
			user.div.style.display = 'block';
			user.div.style.visibility = 'hidden';
			user.div.classList.remove("animGroup");
		}
		
		
		i=0;
		let _this = this;
		if(this.groupInterval ) clearInterval(this.groupInterval);
		if(actUsers.length === 0) return;
		this.groupInterval = setInterval(function()
		{
			//console.log(this.groups);
			actUsers[i].div.style.visibility = 'visible';   
			actUsers[i].div.classList.add("animGroup");
			i++;
			if(i > actUsers.length-1 ) { clearInterval(_this.groupInterval);_this.groupInterval = null }
		},100)
			*/
	}
	hide()
	{
		//this.currGroup = null;
		this.div_info.style.display= "none";
		this.div.style.display = "none";
		for(let i = 0; i < this.users.length; i++)
			this.users[i].div.style.display = 'none';
	}
	getUser()
	{
		let user;
		for(let i = 0; i < this.users.length; i++)
		{
			user = this.users[i];
			if(user.div.style.display === 'none')
			  return user;
		}
		user = new User(this);
		this.users.push(user);
		return user;
	}
}