import React, { useMemo } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';




export default function DetailsCart({cart,handleChangeSelect, handleDelete }){

    const generateListCout = (count) => {
        return Array.from(Array(Math.ceil(count / 10) * 10).keys());
    }

    return useMemo(() => {
        return <>
        <ListItem alignItems="flex-start" key={cart.id}>

            <ListItemAvatar>
                <Avatar alt="..." src={cart.image} />
            </ListItemAvatar>

            <ListItemText
                primary={cart.title}
                secondary={
                    <>
                        <Typography
                            component="div"
                            variant="body2"
                            // className={classes.inline}
                            color="textPrimary"
                        > {`Indiv ${cart.price}$`}
                        </Typography>
                        <div id="total">Total {cart.price * cart.count}$</div>
                    </>
                }
            />

            <FormControl >
                <InputLabel htmlFor="count"></InputLabel>
                <Select
                    native
                    value={cart.count}
                    onChange={handleChangeSelect}
                    inputProps={{
                        name: 'count',
                        id: cart.id,
                    }}
                >
                    {generateListCout(cart.count).map(item => (
                        (item !== 0) && <option key={item} value={item}>{item}</option>
                    ))}
                </Select>

                <Button color="secondary" onClick={handleDelete} variant="contained">
                    <span id={cart.id}>DELETE</span>
                </Button>

            </FormControl>
        </ListItem>
        <Divider />
    </>
    }, [cart, handleDelete, handleChangeSelect]);
}