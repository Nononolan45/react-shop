import React, { useMemo, useState, use } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AddCart from './AddCart';
import './Product.css';


const Product = ({ product }) => {


  const memoRender = useMemo(() => {
    console.log("render produit numero :" , product.id);
    return <Card variant="outlined">
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
  }, [product]);

  return memoRender;

};






export default Product