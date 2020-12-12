import Product from './Product';
import Grid from '@material-ui/core/Grid';
import { useMemo } from 'react'

export default function ListProducts({ products }) {

    return useMemo(() =>
    (<>
        {(products.length > 0) ?
            (<Grid container item spacing={2}>
                { products.map(product => (
                    <Grid item sm={12} md={6} key={product.id}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>) :
            (<div>No product found </div>)}

    </>
    ), [products])
}

