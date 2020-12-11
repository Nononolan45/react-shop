import { useState, useContext } from 'react';
import { Context } from './App';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import './DetailsCart.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './AddCart.css';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';




const AddCart = ({ product }) => {

    const [count, setCount] = useState(1);
    const listCount = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [value_context, dispatch] = useContext(Context);

    const handleChange = (e) => {
        setCount(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        incrementCountCart();
    }

    const incrementCountCart = () => {
        dispatch({ type: 'ADD_CART', value: { ...product, count: Number(count) } })

    }

    return <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
            <div id="price">{product.price}$
            </div>
        </Grid>
        <Grid item xs={12} sm={6}>
         <InputLabel htmlFor="count"></InputLabel>
         <Select
            native
            value={count}
            onChange={handleChange}
            inputProps={{
                name: 'count',
            }}
            >
            {listCount.map(val => (
                     <option key={val} value={val}>{val}</option>
            ))}
        </Select>
        <Button color="primary" onClick={handleSubmit} variant="contained">
        <AddShoppingCartIcon />
        </Button>
        </Grid>
    </Grid>
}

export default AddCart