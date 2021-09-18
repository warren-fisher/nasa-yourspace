import { MediaCard, Button} from '@shopify/polaris';

import { useCallback, useEffect, useState, useRef } from 'react';

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

    // Our ref for lazy loading
    const mediaRef = useRef(null);

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
        }, [liked, open, dismissed, url]);

    const changeOpen = useCallback(()=> 
        {
            setOpen(!open);
            localStorage.setItem(url, JSON.stringify({"liked": liked, "open": !open, "dismissed": dismissed}));
        }, [liked, open, dismissed, url]);

    const changeDismiss = useCallback(()=> 
        {
            setDismissed(!dismissed);
            localStorage.setItem(url, JSON.stringify({"liked": liked, "open": open, "dismissed": !dismissed}));
        }, [liked, open, dismissed, url]);

    // Use Effect for lazy loading images, changing on dismissal so that newly
    // dismissed or undismissed items can be lazy-loaded/ignored.
    useEffect(() => {
        if (dismissed) 
        {
            return;
        }

        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const { isIntersecting } = entry;     
                if (isIntersecting && mediaRef != undefined) {
                  mediaRef.current.src = url;
                  observer = observer.disconnect();
                }
              });
        }, []);
        
        observer.observe(mediaRef.current);
    }, [dismissed, url]);
    
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
            open ? explanation : explanation.slice(0, 100) + "..."}        
            popoverActions={[{content: 'Dismiss', onAction: changeDismiss}]}
            >

                {media_type === "image" ? 
                    <img ref={mediaRef}
                        alt={title}
                        width="100%"
                        height="100%"
                        style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        }}
                    /> :
                    <iframe ref={mediaRef} title={title} height="100%" width="100%" allowFullScreen></iframe>
                }
        </MediaCard>
    );
}


export default MediaCardNASA;