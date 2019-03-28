class ProductsStage extends  BaseStage
{
    constructor( name ) {
        super( name );
        this.productTypes = { };
        for(let i in servData.products)
        {
            let obj = servData.products[i];
            console.log(obj.name);
            this.productTypes[ obj.id ] = new ProductType( this , obj );
        }
    }

}