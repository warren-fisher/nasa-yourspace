import { Layout, Banner } from '@shopify/polaris';
import { useState, useEffect } from 'react';

import ImageCard from '../components/ImageCard.js';

/**
 * 
 * @param {Date} dateStart the date selected to start from
 * @param {Date} dateEnd the date selected to end at
 * @returns 
 */
function App({dateStart, dateEnd}) 
{
    const dateToNASAFormat = (date) => 
    {
        let year = new Intl.DateTimeFormat('en', { year: 'numeric'}).format(date);
        let month = new Intl.DateTimeFormat('en', { month: '2-digit'}).format(date);
        let day = new Intl.DateTimeFormat('en', { day: '2-digit'}).format(date);

        // Convert to YYYY-MM-DD for the NASA APOD API.
        return `${year}-${month}-${day}`;
    }

    const startDate = dateToNASAFormat(dateStart);
    const endDate = dateToNASAFormat(dateEnd);

    const key = 'ObXI2f3pCMbG8VkIXi13SVAXRnSZJdgYL0QVerkM';

    const [data, setData] = useState({});

    // only run on initial load
    useEffect(() => {
        let resp = (async () => {
            try {
                let r = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&start_date=${startDate}&end_date=${endDate}`, {method: "GET"});
                let data = await r.json();
                setData(data);
            }
            catch (error) 
            {
                setData("error");
                console.error("UH OH! Cannot fetch data");
            }
        })();

    }, [startDate, endDate]);

    if (data === {}) 
    {
        return null;
    }

    if (data === "error")
    {
        return (
            <Banner title="Problem with api.nasa.gov" status="critical">
                <p>
                    There is a problem with the NASA API this website is based on. Perhaps there have been too many 
                    requests from your IP, or the API is overloaded.
                </p>
            </Banner>
        )
    }

    return (
        <Layout>
        {Object.keys(data).map((keyName, i) => 
        {
            const date = data[keyName]["date"];
            const explanation = data[keyName]["explanation"];
            const title = data[keyName]["title"];
            const media_type = data[keyName]["media_type"];
            const url = data[keyName]["url"];

            return (
                <Layout.Section key={url}>
                    <ImageCard key={url} date={date} url={url} explanation={explanation} title={title} media_type={media_type}></ImageCard>
                </Layout.Section>);
        })}
        </Layout>
    );
}


export default App;