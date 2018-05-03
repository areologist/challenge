# Server

## Running the app

A Google geocode API token is required.

Define an env var called `GEOCODE_API_TOKEN`.

If a `.env` file exists in this directory it will be loaded automatically.


## To-do

* More and better unit tests
* Better error handling and more meaningful responses
* Improve location search design
* Cache invalidation consistent with Google's policies
* Cache failed and non-ROOFTOP results to avoid superfluous calls
* Possibly a worker that will pre-geocode addresses in the background when no user requests
* more...
