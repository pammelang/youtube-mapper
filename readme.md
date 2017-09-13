# Youtube Mapper

This app renders a basic visualization of the geolocations of youtube videos.

## Functionalities

* The map is set by default to the location of Singapore.
* The map can be zoomed in and out. The videos will refresh each time a new map is rendered.
* The top 20 videos in each map will be displayed as markers.
* Each marker is clickable and will render an InfoMap of the video's title, views, author
* Upon clicking the InfoMap, the user will be redirected to the youtube link of the video.

# Current issues

* map state not updating with dragend/zoom
* cannot get the user input form to overlap the map element
* need to buildApiRequest for youtube data using fetch() everytime a new map renders
* need to pass youtube data to Markers component through Map function getYoutubeData()

## Running

First `npm install` to grab all the necessary dependencies.

Then run `npm start` and open <localhost:7770> in your browser.

## Production Build

Run `npm build` to create a distro folder and a bundle.js file.
