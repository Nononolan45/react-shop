import Product from './Product';
import Grid from '@material-ui/core/Grid';
import { useMemo } from 'react'

const ListProducts =  ({products}) => {

    const render = (products) => {
        if(products.length > 0) {
            return <Grid container item  spacing={2}>
            { products.map(product => (
                <Grid item sm={12} md={6} key={product.id}>
                    <Product  product={product} />
                </Grid>
           ))}
       </Grid>
        }
        else {
            return <div>No product found </div>
        }


 }

 return useMemo(() => render(products), [products]);
}

export default ListProducts