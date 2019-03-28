class Group
{
	constructor( usersStage, obj )
	{
		this.usersStage = usersStage;
		this.div = creat('div','group btn','', usersStage.div);
		let _this = this;
		this.usersData = null;
		this.div.onclick = function() {
			_this.click();
		};
		this.init(obj);
	}

	click() {
		let _this = this;
		block.show('Get Users');
		socket.once('getGroupUsers', function (res) {
			servData.groups[_this.id].users = {};
			for(let i = 0; i < res.length; i++) servData.groups[ _this.id ].users[ res[i].id ] = res[i];
			_this.usersStage.showCurrGroup( _this ); // спрятать все группы, и показать currGroup
			block.hide();
		})
		socket.emit('getGroupUsers', this.id);
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