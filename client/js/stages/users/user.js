class User
{
	constructor( currGroup )
	{
		this.div        = creat('div','btn user','', currGroup.div2 );
		this.btn_remove = creat('div','btn btnRemove','', this.div );
		this.userName   = creat('p','userName unselect','', this.div );
		let _this = this;
		this.btn_remove.onclick = function() {
			block.show("delete user");
			socket.once('removeUser', function (id) {
				console.log('removed: ' + id);
				currGroup.currGroup.click();

			});
			socket.emit('removeUser', _this.id);
		}

		this.userName.onclick = function() {
			currGroup.showUserInfo(_this);
		}

	}



	init(data) {
		for( let i in data)
			this[i] = data[i];
		//let nm = this.name.split(' ');
		this.userName.innerHTML = this.name //nm[0]// +' '+ nm[1];
		this.div.style.display = 'block';
		//this.div.innerHTML = str+' asdasd';
	}
}