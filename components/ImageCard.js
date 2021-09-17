import * as styles from '../styles/ImageCard.module.css';

import { MediaCard, Collapsible, TextContainer} from '@shopify/polaris';

import { useState } from 'react';

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
    const [liked, setLike] = useState(false);

    const [open, setOpen] = useState(true);

    if (url === undefined)
    {
        return null;
    }

    return (
        <MediaCard
            title={`${date} - ${title}`}
            primaryAction={{
                content: liked == true ? "Liked!" : "Like",
                onAction: () => {setLike(!liked)},
            }}
            secondaryAction={{
                content: "Toggle description",
                onAction: () => setOpen(!open),
            }}
            description={          
            <Collapsible
                open={open}
                id="basic-collapsible"
                transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
                expandOnPrint>
                <TextContainer>
                <p>
                    {explanation}
                </p>
                </TextContainer>
            </Collapsible>}
            popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
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