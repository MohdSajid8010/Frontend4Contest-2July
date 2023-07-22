import React, { useState } from 'react'
import axios from 'axios';
import logo from "./logo.png";
import bellIcon from "./images/ic_round-notifications-none.png"
import heartIcon from "./images/bx_bx-book-heart.png";
import diamondicon from "./images/fluent_premium-person-20-regular.png";
import userimg from "./images/IMG20210528181544.png";
import searchIcon from "./images/search-icon.png";

const Nav = ({ setRes1, setRes2, seterror }) => {
    let [searchStr, setSearchStr] = useState("")

    function handleSearch() {
        console.log(searchStr)
        if (searchStr.trim()) {
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchStr.trim()}`)
                .then((res) => {
                    // console.log(" req 1")
                    // console.log(res.data.items)
                    let arr = res.data.items.splice(0, 3)
                    // console.log(arr, res.data.items)
                    setRes1(arr)
                    setRes2(res.data.items);
                    seterror("")

                })
                .catch((err) => seterror(err.message));
        }
    }
    return (
        <div className='nav'>
            <div className='left'>
                <img src={logo} />
                <div className='keazon'>KeazoN</div>
                <span >BOOKS</span>
            </div>

            <div className='mid'>
                <img src={searchIcon}/>
                <input type='text' value={searchStr} onChange={(e) => setSearchStr(e.target.value)} placeholder='Search for the book you want and read it now... Sherlock Holmes, Harry Pot...' />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className='right'>
                <img src={heartIcon} />
                <img src={bellIcon} />
                <img src={diamondicon} />
                <img src={userimg} />

            </div>
        </div>
    )
}

export default Nav