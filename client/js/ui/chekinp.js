class ChekInp
{
    constructor( parr, nm, plc , onlyNumber  )
    {
        let div = creat ('div', 'inpParr','',parr);
        let inp =  creat('input','','', div);
        inp.setAttribute('type',"text");
        inp.setAttribute('name',nm);
        inp.id = nm;
        inp.placeholder = plc;

        let txt = creat('p','error','',div);
        txt.innerHTML = 'pp';
        let arr = creat('div','arr center','',div);


        inp.onfocus = function(){ txt.style.display = "none"; arr.style.display = "none" };
        if(onlyNumber)
        {
            inp.onkeypress = function(evt)
            {
                var theEvent = evt || window.event;

                if (theEvent.type === 'paste')
                {
                    key = event.clipboardData.getData('text/plain');
                    console.log('paste');
                } else
                {

                    var key = theEvent.keyCode || theEvent.which;
                    key = String.fromCharCode(key);
                }
                var regex = /[0-9]|\./;
                if( !regex.test(key) )
                {
                    theEvent.returnValue = false;
                    if(theEvent.preventDefault) theEvent.preventDefault();
                }
            }
        }

        this.txt = txt;
        this.inp = inp ;
        this.arr = arr;
        this.div = div;
    }
    check( val, lg )
    {
        if(this.inp.value.length === 0)
        {
            this.showError("Заполните єто поле");
            return;
        }

        for( let i = 0; i < val.length; i++)
        {
            if(!val[i].b)
            {
                this.showError(val[i].e);
                break;
            }
        }
    }
    showError(str)
    {
        this.txt.style.display = "block";
        this.arr.style.display = "block";
        this.txt.innerHTML = str;
    }
    isError()
    {
        return this.txt.style.display === "block";
    }
}