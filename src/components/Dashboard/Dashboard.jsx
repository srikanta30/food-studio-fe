import { useState, useEffect } from "react";
import Restaurant from "./Restaurant";
import styles from './dashboard.module.css';
import { Button, Select, TextField, MenuItem, FormControl } from "@mui/material";
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { getRestaurants, searchRestaurants } from "../../redux/restaurant/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useDebounce from "../../utils/useDebounce";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
PaperProps: {
style: {
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    width: 250,
},
},
};



const Dashboard = () => {

const { loading, restaurants, pages, cuisines } = useSelector(state => state.restaurant);
const history = useHistory();

const queryObj = new URLSearchParams(history.location.search);

const queryValues = {
sort: queryObj.get('sort'),
page: queryObj.get('page') || 1,
cuisines: queryObj.get('cuisines') ? queryObj.get('cuisines').split(',') : []
}

const [sort, setSort] = useState(queryValues.sort);
const [currPage, setCurrPage] = useState(queryValues.page);
const [filters, setFilters] = useState(queryValues.cuisines);

const dispatch = useDispatch();

const getRestaurantData = (query) => {
dispatch(getRestaurants(query));
}

const sortDataByPrice = () => {
if (sort === 'asc') {
    setSort('desc');
} else {
    setSort('asc');
}

}

const searchRestaurant = useDebounce((e) => {
const urlParams = new URLSearchParams()
if (e.target.value.length > 0) {
    urlParams.append("s", e.target.value);
    history.push({ search: urlParams.toString() })
    const query = history.location.search;
    dispatch(searchRestaurants(query))
} else {
    window.location.href = '/';
}
}, 1000);

const changeCurrentPage = (i) => {
setCurrPage(i);
}

const handleChange = (event) => {
const {
    target: { value },
} = event;
setFilters(
    typeof value === 'string' ? value.split(',') : value,
);
};

useEffect(() => {
const urlParams = new URLSearchParams()

if (currPage > 1) {
    urlParams.append("page", currPage);
} else if (+currPage === 1) {
    urlParams.delete("page");
}

if (sort) {
    urlParams.append('sort', sort);
}

if (filters.length > 0 && filters) {
    urlParams.append('cuisines', filters.join(","));
}

history.push({ search: urlParams.toString() })

const query = history.location.search;

getRestaurantData(query);
}, [currPage, sort, filters]);


return (
<div>
    <div className={styles.actionsDiv}>
        <TextField
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon color="primary" />
                    </InputAdornment>
                ),
            }}
            onInput={searchRestaurant} type="text" variant="outlined" placeholder="Search Restaurants..." sx={{ width: '400px' }} />
        <Button onClick={sortDataByPrice} variant="contained" disableElevation>Sort {sort === 'ascending' ? `(Oldest)` : `(Latest)`}</Button>
        {cuisines ?
            <FormControl sx={{ minWidth: 200, marginBottom: '20px' }}>
                <InputLabel id="demo-multiple-chip-label">Cuisines</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={filters}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Cuisines" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {cuisines.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            : null}
    </div>
    <div>
        {loading ? <p>Loading....</p> : null}
        {restaurants.length > 0 ?
            <div className={styles.restaurants}>
                {restaurants.map(el => {
                    return <Restaurant key={el._id} data={el} />
                })}
            </div>
            : !loading ? "Sorry, No Restaurants Found!" : null}
    </div>



    <div className={styles.pagination}>
        {pages.length > 0 ?

            pages.map(el => {
                return <Button variant={+el === +currPage ? "contained" : null} onClick={() => changeCurrentPage(el)} key={`buttonKey-${el}`} sx={{ width: '16px', margin: '30px 10px' }}>{el}</Button>
            })
            : <Button variant="contained" sx={{ width: '16px', margin: '30px 10px' }}>1</Button>
        }

    </div>
</div>
)
}

export default Dashboard;