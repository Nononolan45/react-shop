import React, { useMemo } from 'react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Category from './Category'



export default function Categories({ categories, setCategories }) {

    return useMemo(() => {

        const handleChange = (e) => {
            let cat = categories.find(c => c.name === e.target.name);
            if (cat) {
                cat.checked = !cat.checked;
            };
            setCategories([...categories]);
        }
        return <>
            <ListItemText primary="CATEGORIES" />
            { (categories.length === 0) ?
                (<div> No category found </div>) :
                (<List dense>
                    {categories.map((category) => {
                        return <Category key={category.name} category={category} handleChange={handleChange} />
                    })}
                </List>)}
        </>
    }, [categories, setCategories]);
}
