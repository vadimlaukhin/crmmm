class BaseStage
{
    constructor( name )
    {
        this.id  = name;
        this.div = creat('div','window','', main.stage.div);
    }
    hide()
    {
        this.div.style.display = "none";
    }
    show()
    {
        this.div.style.display = "block";
    }
}