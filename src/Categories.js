import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));


const Categories = ({ categories, setCategories, loadingCategories, filterProducts }) => {

    const classes = useStyles();

    const handleChange = (e) => {
        let cat = categories.find(c => c.name === e.target.name);
        if (cat) {
            cat.checked = !cat.checked;
        };
        setCategories([...categories]);
    }

    const toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    return <>
        <ListItemText primary="CATEGORIES" />
        <List dense className={classes.root}>
            {categories.map((category) => {
                return (
                    <ListItem key={category.name} button>
                        <ListItemAvatar>
                            <Avatar>{category.count}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={toTitleCase(category.name)} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                onChange={handleChange}
                                checked={category.checked}
                                inputProps={{ 'name': category.name }}
                                color="primary"
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    </>
}

export default Categories