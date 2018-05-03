# Client

## Running the app

By default the app will try to connect via WebSocket to `ws://localhost:8080`.

This can be configured by defining the following environment variable.

`CHALLENGE_CLIENT_WSS_URL`

If a `.env` file exists in this directory it will be loaded automatically.


## To-do

* More unit tests
* Better styling approach
  * Such as `.scss` with good organization or possibly `styled-components`
* SVG icon system with easy styling rather than the `.svg` imports
* Better error handling / feedback
* Cleanup / refactor of the state management
* Misc UI improvements
* Link from list view to pin on Map view
* Dynamic zoom and interpolation in Map view
* more...
