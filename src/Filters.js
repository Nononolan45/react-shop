import { Slider } from '@material-ui/core';
import Categories from './Categories';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { useMemo } from 'react';
import './Filters.css';
import Divider from '@material-ui/core/Divider';



export default function Filters({ categories, search, price, 
    setSearch, setPrice, setCategories }) {

    const memoSearch = useMemo(() => {

        const handleChangeSearch = (e) => { 
            console.log('render search ');
            setSearch(e.target.value);
        }
            return  <div  className="filter">
            <ListItemText primary="FILTERS" />
            <ListItem>
                <TextField  id="standard-basic" label="Search" name="search" value={search} onChange={handleChangeSearch} />
            </ListItem>
            <Divider />
        </div>
    }, [search, setSearch]);

    const memoPrice = useMemo(() => {

        const handleChangeSlider = (event, newValue) => {
            setPrice(newValue);
        }

        return <div  className="filter">
        <ListItemText primary="PRICE" />
        <ListItemText primary={`Between ${price[0]}$ and ${price[1]}$`} />
        <ListItem>
            <Slider value={price} onChange={handleChangeSlider} min={0} step={10} max={1000}
                valueLabelDisplay="auto" aria-labelledby="range-slider"
            />                   
        </ListItem>
        <Divider />
    </div>
    },[setPrice, price]);

    const memoCategories = useMemo(() => {
        return  <div className="filter">
        <Categories categories={categories} setCategories={setCategories} />
        </div>
    }, [categories, setCategories]);

    return <>
            <form >
                {memoSearch}
                {memoPrice}
                {memoCategories}
            </form>
    </>
}


