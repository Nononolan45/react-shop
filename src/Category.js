import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';



export default function Category ({category, handleChange}) {
    console.log('render category ', category.name);

    const toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }
    return  <ListItem>
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
}