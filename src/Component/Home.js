import React, { useState, useEffect } from 'react'
import axios from "axios";

const Home = ({ res1, setRes1, res2, setRes2, err, seterror }) => {

    // let [res1, setRes1] = useState([]);
    // let [res2, setRes2] = useState([]);
    let [res3, setRes3] = useState([]);
    // let [err, seterror] = useState("");
    let [detailInfoObj, setDetailInfoObj] = useState(null)

    console.log(res1, res2)

    async function request1() {
        axios.get("https://www.googleapis.com/books/v1/volumes?q=harry+potter")
            .then((res) => {
                // console.log(" req 1")
                // console.log(res.data.items)
                let arr = res.data.items.splice(0, 3)
                setRes1(arr)
                setRes2(res.data.items);
                seterror("")
                // console.log(arr,res.data.items)

            })
            .catch((err) => seterror(err.message));
    }
    async function request2() {
        axios.get("https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes")
            .then((res) => {
                // console.log(" req 2")

                // console.log(res.data.items)
                setRes3(res.data.items)
                // console.log(res.data.items)

                seterror("")
            })
            .catch((err) => seterror(err.message));
    }
    useEffect(() => {
        // request1().then(() => {
        //     // console.log("beforen req 1")
        //     request2()
        // }).then(() => {
        //     console.log(res1, res2)
        // }).catch((err) => console.log(err));
        async function handelAsy() {
            await request1();
            await request2();
            console.log(res1, res2, res3)

        };
        handelAsy()
        console.log("inside useEff")
    }, [])

    return (
        <div className='home'>
            <div className='upper-cont'>
                {
                    (res1 && res1.length > 0) ? (

                        res1.map((obj, i) => {
                            return (
                                <div className={`item a${i}`} id={`a${i}`} key={`a${i}`} onClick={() => { setDetailInfoObj(obj); setRes1([]) }}>
                                    <div className='left'>
                                        {console.log(i,obj,obj.volumeInfo.imageLinks.thumbnail)}
                                        <img src={obj.volumeInfo.imageLinks.thumbnail} alt="book-img" />
                                    </div>
                                    <div className='right'>
                                        <div><strong>{obj.volumeInfo.title}</strong></div>
                                        <div>{obj.volumeInfo.description.slice(0, 62)}</div>
                                        <button>Now Read!</button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (detailInfoObj) ?
                        (<div className='detail-cont'>
                            <div className='left'>
                                <img src={detailInfoObj.volumeInfo.imageLinks.thumbnail} />
                            </div>
                            <div className='right'>
                                <div className='title'>{detailInfoObj.volumeInfo.title}</div>
                                <div className='author'>
                                    <div>{detailInfoObj.volumeInfo.authors[0]}</div>
                                    <div>Published On: {detailInfoObj.volumeInfo.publishedDate}</div>
                                </div>
                                {
                                    detailInfoObj.volumeInfo.description ?( <div className='descript'>{detailInfoObj.volumeInfo.description.trim().slice(0, 180)}</div>):("No Descriptions!")
                                }
                               

                                <div className='rating'>
                                    <div><strong>averageRating:</strong>{detailInfoObj.volumeInfo.averageRating}</div>
                                    <div><strong>ratingsCount:</strong>{detailInfoObj.volumeInfo.ratingsCount}</div>
                                    <div><strong>publisher:</strong>{detailInfoObj.volumeInfo.publisher}</div>
                                    <div><strong>language:</strong>{detailInfoObj.volumeInfo.language}</div>
                                </div>

                                <div className='btn-cont'>
                                    <button><a href={detailInfoObj.volumeInfo.previewLink} target="blank">Now Read!</a></button>
                                    <button><a href={detailInfoObj.volumeInfo.infoLink} target="blank">More Info!</a></button>
                                </div>
                            </div>
                        </div>) : ("")
                }
            </div>

            <h1>More Books</h1>

            <div className='lower-cont'>
                {
                    (res2 && res2.length > 0) && (
                        res2.map((obj, i) => {
                            return (
                                <div className='item' key={`b${i}`} onClick={() => { setDetailInfoObj(obj); setRes1([]) }}>
                                    <div className='left'>
                                        <img src={obj.volumeInfo.imageLinks.thumbnail} alt="book-img" />
                                    </div>
                                </div>
                            )
                        })

                    )
                }

                {
                    (res3 && res3.length > 0) && (
                        res3.map((obj, i) => {
                            return (
                                <div className='item' key={`c${i}`} onClick={() => { setDetailInfoObj(obj); setRes1([]) }}>
                                    <div className='left'>
                                        <img src={obj.volumeInfo.imageLinks.thumbnail} />
                                    </div>
                                </div>
                            )
                        })

                    )
                }

                {
                    err && (<div style={{ color: "red", marginInline: "auto" }}>{err}</div>)
                }
            </div>
        </div>
    )
}

export default Home

/*
 (res3 && res3.length > 0) ?
                        (
                            res3.map((obj) => {
                                return (
                                    <div className='item'>
                                        <div className='left'>
                                            <img src={obj.volumeInfo.imageLinks.thumbnail} />
                                        </div>
                                        <div className='right'>
                                            <div><strong>Title:</strong>{obj.volumeInfo.title}</div>
                                            <button>Now Read!</button>
                                        </div>

                                    </div>
                                )
                            })

                        ) :
                        (err) ?
                            (<div>{err}</div>) :
                            ("")
*/
/*
accessInfo
: 
{country: 'IN', viewability: 'NO_PAGES', embeddable: false, publicDomain: false, textToSpeechPermission: 'ALLOWED', …}
etag
: 
"AfgqJBm1F20"
id
: 
"xNgstAEACAAJ"
kind
: 
"books#volume"
saleInfo
: 
{country: 'IN', saleability: 'NOT_FOR_SALE', isEbook: false}
searchInfo
: 
textSnippet
: 
"&quot;Fantastic Beasts and Where to Find Them: Coloring Book&quot; is parody of &quot;Fantastic Beasts and Where to Find Them: Magical Creatures Coloring Book.&quot; Harry Potter fans are loving coloring this book."
[[Prototype]]
: 
Object
selfLink
: 
"https://www.googleapis.com/books/v1/volumes/xNgstAEACAAJ"
volumeInfo
: 
allowAnonLogging
: 
false
authors
: 
['J K. ROFLING']
averageRating
: 
4
canonicalVolumeLink
: 
"https://books.google.com/books/about/Fantastic_Beasts_and_Where_to_Find_Them.html?hl=&id=xNgstAEACAAJ"
contentVersion
: 
"preview-1.0.0"
description
: 
"\"Fantastic Beasts and Where to Find Them: Coloring Book\" is parody of \"Fantastic Beasts and Where to Find Them: Magical Creatures Coloring Book.\" Harry Potter fans are loving coloring this book."
imageLinks
: 
{smallThumbnail: 'http://books.google.com/books/content?id=xNgstAEAC…J&printsec=frontcover&img=1&zoom=5&source=gbs_api',
 thumbnail: 'http://books.google.com/books/content?id=xNgstAEAC…J&printsec=frontcover&img=1&zoom=1&source=gbs_api'}
industryIdentifiers
: 
(2) [{…}, {…}]
infoLink
: 
"http://books.google.co.in/books?id=xNgstAEACAAJ&dq=harry+potter&hl=&source=gbs_api"
language
: 
"en"
maturityRating
: 
"NOT_MATURE"
panelizationSummary
: 
{containsEpubBubbles: false, containsImageBubbles: false}
previewLink
: 
"http://books.google.co.in/books?id=xNgstAEACAAJ&dq=harry+potter&hl=&cd=1&source=gbs_api"
printType
: 
"BOOK"
publishedDate
: 
"2017-09-02"
publisher
: 
"Blurb"
ratingsCount
: 
85
readingModes
: 
{text: false, image: false}
title
: 
"Fantastic Beasts and Where to Find Them"
*/