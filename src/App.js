import './App.css';
import React, { useEffect, useState, useCallback, useMemo, useReducer } from 'react';
import Filters from './Filters';
import ListProducts from './ListProducts';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const initialStoreValue = {
  carts: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CART':
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

    case 'CLEAR_CART':
      return { carts: [] }

    default:
      throw new Error();
  }
}

export const Context = React.createContext(initialStoreValue, null);

export default function App() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState([0, 1000]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCat] = useState(true);
  const contextReducer = useReducer(reducer, initialStoreValue)


  const loadProducts = useCallback(async () => {
    const URL = process.env.REACT_APP_URL_PRODUCTS ||
      'https://fakestoreapi.com/products';

    let req = await fetch(URL);
    const response = await req.json();

    if (req.status === 200) {
      setProducts(response);
      loadCategories(response)
    }
    else {
      setError(true);
    }
  }, []);

  const loadCategories = (products) => {
    const categories = products
      .map(product => product.category)
      .reduce((reducer, value) => {
        let cat = reducer.find(c => c.name === value);
        if (cat) {
          cat.count++;
        }
        else {
          reducer.push({ name: value, count: 1, checked: false });
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

  const filterProducts = useMemo(
    () => {

      let listProducts = [...products];
      const categoriesChecked = categories.filter(elmt => elmt.checked).map(elmt => elmt.name);

      return listProducts = listProducts.filter((product) => {
        if (
          (product.title.toLowerCase().includes(search.toLowerCase()) || isBlank(search) || isEmpty(search)) &&
          (categoriesChecked.includes(product.category) || categoriesChecked.length === 0) &&
          (product.price > price[0] && product.price < price[1])) {
          return product
        }
        else {
          return false
        }
      });
    }, [categories, price, search, products]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (

    <Context.Provider value={contextReducer}>
      < Header />
      <Container className="container-shop" maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Filters categories={categories} search={search} price={price}
              setSearch={setSearch} setPrice={setPrice} setCategories={setCategories}
              loadingCategories={loadingCategories} />
          </Grid>
          <Grid item xs={8}>
            <ListProducts products={filterProducts} />
          </Grid>
        </Grid>
      </Container>
    </Context.Provider>
  );
}

