import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AddCart from './AddCart';
import LabelIcon from '@material-ui/icons/Label';
import Icon from '@material-ui/core/Icon';
import './Product.css';


const Product = ({ product }) => {

  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
    <CardActionArea>
      <CardMedia
        image={product.image}
        title={product.title}
        component="img"
        height={200}
      />
      <CardContent>
        <h2 id="title"> {product.title} </h2>
        <p id="content">{product.description}</p>
        <h4> Category: {product.category}</h4>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <AddCart product={product} />
    </CardActions>
  </Card>
  );



}



export default Product