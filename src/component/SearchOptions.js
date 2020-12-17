import {useState, useEffect} from 'react';
import Button from './Button.js';

function SearchOptions(props){
    const {text} = props;
    const [searchSites, setSearchSites] = useState([
        { name: "jisho", url: "https://jisho.org/search/" },
        { name: "weblio", url: "https://www.weblio.jp/content/" }
    ]); // default search sites. idea being the user can add their own

    if(!text)
        return null;

    return(
        <ul>
        {searchSites.map(site => {
            return <li><a href={site.url+text}>{site.name}</a></li>
        })}
        </ul>
    );
}

export default SearchOptions;
