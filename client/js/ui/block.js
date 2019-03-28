class Block extends Overlay
{
    constructor( )
    {
        super("lock",50, null);
        this.bg.onclick = null;
        this.txt = creat('p','center','lockTxt', super.getCont(),'test');
    }
    show(str)
    {
        super.show();
        if(str)
        this.txt.innerHTML = str;
    }

}