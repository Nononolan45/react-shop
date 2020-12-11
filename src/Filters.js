import { Slider } from '@material-ui/core';
import Categories from './Categories';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import './Filters.css';


import Divider from '@material-ui/core/Divider';



const Filters = ({ categories, search, price, setSearch, setPrice,
    loadingCategories, setCategories, filterProducts }) => {

    const handleChangeSlider = (event, newValue) => {
        setPrice(newValue);
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    
  

    return <>
            <form >
                <div  className="filter">
                    <ListItemText primary="FILTERS" />
                    <ListItem>
                        <TextField  id="standard-basic" label="Search" name="search" value={search} onChange={handleChangeSearch} />
                    </ListItem>
                    <Divider />
                </div>

                <div  className="filter">
                    <ListItemText primary="PRICE" />
                    <ListItemText primary={`Between ${price[0]}$ and ${price[1]}$`} />
                    <ListItem>
                        <Slider value={price} onChange={handleChangeSlider} min={0} step={10} max={1000}
                            valueLabelDisplay="auto" aria-labelledby="range-slider"
                        />                   
                    </ListItem>
                    <Divider />
                </div>

                <div className="filter">
                    <Categories categories={categories} setCategories={setCategories} 
                    loadingCategories={loadingCategories} />
                </div>
                
            </form>
    </>
}

export default Filters

