import * as styles from '../styles/App.module.css';

import { useState, useEffect } from 'react';

function App(props) 
{
    const key = 'ObXI2f3pCMbG8VkIXi13SVAXRnSZJdgYL0QVerkM';

    const [date, setDate] = useState();
    const [explanation, setExplanation] = useState();
    const [title, setTitle] = useState();
    const [url, setUrl] = useState();

    const [liked, setLike] = useState(false);

    // only run on initial load
    useEffect(() => {
        let resp = (async () => {
            let r = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`, {method: "GET", mode: "cors"});
            let data = await r.json();
            setDate(data.date);
            setExplanation(data.explanation);
            setTitle(data.title);
            setUrl(data.hdurl);
        })();

    }, []);

    if (!date) 
    {
        return null;
    }

    return (<article className={styles.imgCard}>
        <img src={url}></img>
        <div> 
            <h4> {title} </h4>
            <p> {date} </p>
            <button onClick={()=>{setLike(!liked)}}><p>{liked == true ? "Liked!" : "Like"}</p></button>
        </div>
        </article>);
}


export default App;