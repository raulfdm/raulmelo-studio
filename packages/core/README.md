# @raulfdm/core

This package is responsible to holding the core logic for my website which includes:

- data fetching (e.g. posts, tags, tils, etc.)
- basic utilities function (e.g. isNil, head, etc)

## Data Fetching

All data fetching is made against my sanity project and uses their own SDK to
ease the requests.

That means no configuration needed, just calling the methods to get the data.
