import React, { useContext, useMemo } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import './Header.css'
import { Context } from './App'
import Modal from '@material-ui/core/Modal';
import Cart from './Cart';


const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

export default function Header () {

    const classes = useStyles();
    const [value_context, dispatch] = useContext(Context);
    const [open, setOpen] = React.useState(false);

    return useMemo(() => {
        
        const handleOpen = () => {
            setOpen(true);
        };
    
        const handleClose = () => {
            setOpen(false);
        };
    
    return <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Icon fontSize="large" color="inherit">
                    <StoreIcon fontSize="large" />
                </Icon>
                <Typography variant="h6" className={classes.title} >
                    React Shop
        </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={value_context.carts.length} color="secondary">
                        <ShoppingCartIcon onClick={handleOpen} fontSize="inherit" />

                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div>
                <Cart carts={value_context.carts} dispatch={dispatch} handleClose={handleClose} open={open}
            
            />
                </div>
        </Modal>
    </div>
    }, [classes, dispatch, open, value_context]);

}






