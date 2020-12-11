import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import './DetailsCart.css';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';





const rand = () => {
    return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    inline: {
        display: 'inline',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 40,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1)
    }

}));

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});







const DetailsCart = ({ carts, dispatch, handleClose, open }, ref) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const generateListCout = (count) => {
        return Array.from(Array(Math.ceil(count / 10) * 10).keys());
    }

    const handleChangeSelect = (e) => {
        dispatch({ type: 'UPDATE_COUNT_CART', value: { count: Number(e.target.value), id: Number(e.target.id) } });

    }

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    }

    const handleDelete = (e) => {
        dispatch({ type: 'DELETE_CART', value: { id: Number(e.target.id) } });
    }

    const totalPriceAllCart = () => {
        return carts.reduce((sum, cart) => {
            return sum + (cart.price * cart.count)
        }, 0)
    }




    return <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            CART
        </DialogTitle>
        <DialogContent dividers>
            {(carts.length === 0) && (<p>Your cart is empty.</p>)}

            {(carts.length > 0) && (
                <List className={classes.root}>
                    {carts.map((cart) => (
                        <>
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
                                                className={classes.inline}
                                                color="textPrimary"
                                            > {`Indiv ${cart.price}$`}
                                            </Typography>
                                            <div id="total">Total {cart.price * cart.count}$</div>
                                        </>
                                    }
                                />

                                <FormControl className={classes.formControl}>
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
                    ))}
                </List>
            )}
        </DialogContent>
        <DialogActions>

            <Button
                startIcon={<DeleteIcon />}
                onClick={clearCart}
                color="primary"
                variant="contained"
                className={classes.button}
            >
                CLEAR CART
            </Button>

            <Button
                className={classes.button}
                startIcon={<CreditCardIcon />}
                onClick={handleClose}
                color="primary"
                variant="contained"
            >{
             `CHECKOUT ${totalPriceAllCart()}$`}
            </Button>

        </DialogActions>
    </Dialog>
}

export default React.forwardRef(DetailsCart);
