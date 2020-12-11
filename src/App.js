import './App.css';
import React, { useEffect, useState, useCallback, useContext, useReducer } from 'react';
import Filters from './Filters';
import ListProducts from './ListProducts';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const initialStoreValue = {
  carts: []
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CART':
      console.log('on passe dans le dispatch ', action.value.id);
      console.log([...state.carts.filter(cart => cart.id !== action.value.id)]);
      return { carts: [...state.carts.filter(cart => cart.id !== action.value.id)] };
    case 'ADD_CART':
      let cart = state.carts.find(cart => cart.id === action.value.id);
      if (cart) {
        cart.count += action.value.count;
      }
      else {
        state.carts.push(action.value);
      }
      return { carts: [...state.carts] };
    case 'UPDATE_COUNT_CART':
      let found = state.carts.find(cart => cart.id === action.value.id);
      found.count = action.value.count;
      return { carts: [...state.carts] };
    case 'CLEAR_CART': {
      return { carts: [] }
    }

    // break;
    default:
      throw new Error();
  }
}
export const Context = React.createContext(initialStoreValue, null);


const App = () => {



  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState([0, 1000]);
  const [categories, setCategories] = useState([]);
  const [productsAvailable, setProductsAvailable] = useState([]);
  const [loadingCategories, setLoadingCat] = useState(true);
  const contextReducer = useReducer(reducer, initialStoreValue)
  const classes = useStyles();





  const loadProducts = useCallback(async () => {
    console.log('je passe ici chager les produits')
    const URL = process.env.REACT_APP_URL_PRODUCTS;

    let req = await fetch(URL);
    const response = await req.json();

    if (req.status === 200) {
      console.log(response)
      setProducts(response);
      setProductsAvailable(response);
      loadCategories(response)
    }
    else {
      setError(true);
    }
  }, [])

  const loadCategories = (products) => {
    const categories = products.map(product => product.category)
      .reduce((reducer, value) => {
        let cat = reducer.find(c => c.name === value);
        if (cat) {
          cat.count++;
        }
        else {
          reducer.push({ name: value, count: 0, checked: false });

        }

        return reducer;
      }, []);
    setCategories(categories)
    setLoadingCat(false)


  }

  const isBlank = (str) => {
    return (!str || /^\s*$/.test(str));
  }

  const isEmpty = (str) => {
    return (!str || 0 === str.length);
  }

  const filterProducts = () => {
    let listProducts = [...products];
    const categoriesChecked = categories.filter(elmt => elmt.checked).map(elmt => elmt.name);
    listProducts = listProducts.filter((product) => {
      if (
        (product.title.includes(search) || isBlank(search) || isEmpty(search)) &&
        (categoriesChecked.includes(product.category) || categoriesChecked.length === 0) &&
        (product.price > price[0] && product.price < price[1])) {
        return product
      } else {
        return false
      }
    });
    setProductsAvailable(listProducts);
  }

  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
    else {
      filterProducts();
    }
  }, [loadProducts, search, categories, price]);








  return (

    <Context.Provider value={contextReducer}>



      < Header />
      <Container className="container-shop" maxWidth="lg">
        <Grid container spacing={4}>

          <Grid item xs={4}>
            <Filters categories={categories} search={search} price={price}
              setSearch={setSearch} setPrice={setPrice} setCategories={setCategories}
              loadingCategories={loadingCategories} />      </Grid>
          <Grid item xs={8}>
            <ListProducts products={productsAvailable} />
          </Grid>

        </Grid>
      </Container>
    </Context.Provider>

  );
}

export default App;
