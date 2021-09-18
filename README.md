# YourSpace
This is a web application to display images from [NASA's Astronomy Picture of the Day](https://api.nasa.gov/#apod) API

YourSpace is a play on the once-popular social media site MySpace. 
Instead of everyone creating their own "space", I created a "space" for everyone to learn about space.

Users can find photos and videos between certain dates and like and unlike them, toggle viewing their description, and dismiss them from their feed. Additionally, the app supports darkmode. All of these actions persist between pages refreshes via localStorage.

YourSpace supports lazy loading images so that they do not get loaded until they enter your screen.

YourSpace is available at [space.warrenfisher.net](space.warrenfisher.net).

## Features
- like, and unlike images
- hide and unhide images
- hide and unhide image descriptions
- lazy load images so they do not get loaded until appearing on the screen
- load images between START and END days

## Development
YourSpace is built with JavaScript, NextJS (a React framework) and Shopify-Polaris reusable components.

## TODO:
- like button has a animation
- when viewing so many images, dont wait to load all before you can view the first ones
- Bug report for Shopify Polaris DatePicker not SSR

# Citations
- Favicon.ico, pngs, apple-touch-icon and safari-pinned-tab generated from this free clipart https://openclipart.org/detail/176334/Space%20Helmet