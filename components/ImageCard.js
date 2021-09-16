import * as styles from '../styles/ImageCard.module.css';

import { Button } from '@shopify/polaris';

import { useState } from 'react';

/**
 * Display an image card
 * 
 * @param {Date} props.date the date selected
 * @param {str} props.title the date selected
 * @param {str} props.url the date selected
 * @param {str} props.explanation the date selected
 * 
 * @returns 
 */
function App({date, title, url, explanation}) 
{
    const [liked, setLike] = useState(false);

    return (<article className={styles.imgCard}>
        <img src={url}></img>
        <div> 
            <h4>{title}</h4>
            <p>{date}</p>
            <Button fullwidth={true} outline={true} onClick={()=>{setLike(!liked)}}>{liked == true ? "Liked!" : "Like"}</Button>       
        </div>
        </article>);
}


export default App;