import * as styles from '../styles/ImageCard.module.css';

import { MediaCard, Collapsible, Button} from '@shopify/polaris';

import { useCallback, useState } from 'react';

/**
 * Display an image card
 * 
 * @param {Date} props.date the date selected
 * @param {str} props.title the title
 * @param {str} props.url the url to the image or video
 * @param {str} props.explanation the explanation
 * @param {str} props.media_type whether it is an image or video
 * 
 * @returns 
 */
function MediaCardNASA({date, title, url, explanation, media_type}) 
{
    const thisItem = JSON.parse(localStorage.getItem(url));

    // Get the state, or default value if none for this URL
    const getSavedState = (prop, defaultVal) => 
    {
        if (thisItem === null)
        {
            return defaultVal;
        }
        return thisItem[prop];
    }

    const [dismissed, setDismissed] = useState(getSavedState("dismissed", false));

    const [liked, setLike] = useState(getSavedState("liked", false));

    const [open, setOpen] = useState(getSavedState("open", true));

    // These change function must set to opposite of value as well, since state didnt update yet
    const changeLike = useCallback(()=> 
        {
            setLike(!liked);
            localStorage.setItem(url, JSON.stringify({"liked": !liked, "open": open, "dismissed": dismissed}));
        }, [liked, open, dismissed]);

    const changeOpen = useCallback(()=> 
        {
            setOpen(!open);
            localStorage.setItem(url, JSON.stringify({"liked": liked, "open": !open, "dismissed": dismissed}));
        }, [liked, open, dismissed]);

    const changeDismiss = useCallback(()=> 
        {
            setDismissed(!dismissed);
            localStorage.setItem(url, JSON.stringify({"liked": liked, "open": open, "dismissed": !dismissed}));
        }, [liked, open, dismissed]);

    if (dismissed)
    {
        return <Button fullWidth destructive={true} onClick={changeDismiss}>Unhide {date} - {title}</Button>;
    }
    return (
        <MediaCard
            title={`${date} - ${title}`}
            primaryAction={{
                content: liked == true ? "Liked!" : "Like",
                onAction: changeLike,
            }}
            secondaryAction={{
                content: "Toggle description",
                onAction: changeOpen,
            }}
            size="small"
            description={          
            <Collapsible
                open={open}
                id="collapse-description"
                transition={{duration: '450ms', timingFunction: 'ease-in-out'}}
                expandOnPrint>
                {explanation}
            </Collapsible>}
            popoverActions={[{content: 'Dismiss', onAction: changeDismiss}]}
            >

                {media_type === "image" ? 
                    <img className={styles.displayImg}
                        alt={title}
                        width="100%"
                        height="100%"
                        style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        }}
                        src={url}
                    /> :
                    <iframe title={title} src={url} height="100%" width="100%" allowFullScreen></iframe>
                }
        </MediaCard>
    );
}


export default MediaCardNASA;