import Product from './Product';
import Grid from '@material-ui/core/Grid';

const ListProducts =  ({products}) => {
    console.log('render list')
    return <Grid container item  spacing={2}>
         { products.map(product => (
             <Grid item sm={12} md={6} key={product.id}>
                 <Product  product={product} />
             </Grid>
        ))}
    </Grid>

         }

export default ListProducts
