import { useState, useEffect } from 'react';

import ImageCard from '../components/ImageCard.js';

/**
 * 
 * @param {Date} props.date the date selected
 * @returns 
 */
function App(props) 
{
    let year = new Intl.DateTimeFormat('en', { year: 'numeric'}).format(props.date);
    let month = new Intl.DateTimeFormat('en', { month: '2-digit'}).format(props.date);
    let day = new Intl.DateTimeFormat('en', { day: '2-digit'}).format(props.date);

    // Convert to YYYY-MM-DD for the NASA APOD API.
    let todaysDateString = `${year}-${month}-${day}`;

    const key = 'ObXI2f3pCMbG8VkIXi13SVAXRnSZJdgYL0QVerkM';

    const [date, setDate] = useState();
    const [explanation, setExplanation] = useState();
    const [title, setTitle] = useState();
    const [url, setUrl] = useState();

    const [liked, setLike] = useState(false);

    // only run on initial load
    useEffect(() => {
        let resp = (async () => {
            try {
                let r = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${todaysDateString}`, {method: "GET"});
                let data = await r.json();
                setDate(data.date);
                setExplanation(data.explanation);
                setTitle(data.title);
                setUrl(data.hdurl);
            }
            catch (error) 
            {
                console.error("UH OH! Tried to fetch with date=", todaysDateString);
            }
        })();

    }, [todaysDateString]);

    if (!date) 
    {
        return null;
    }

    return (
        <ImageCard date={date} url={url} explanation={explanation} title={title}></ImageCard>
    );
}


export default App;