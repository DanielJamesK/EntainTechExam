# Next To Go Racing App
This app displays a live feed of upcoming races across Greyhound, Harness, and Thoroughbred categories. Users can filter by category, view race countdowns, and expired races are automatically removed after they have gone 1 minute past their start time. Once there are less than 10 races available, a new request to the API is made to get more upcoming races.

## Post build reflection
I'm quite happy with how to build turned out. The app is functioning as I intended and it was good fun to build. I think one of the areas that can use refinement would be how I am handling the removal of the races after they have expired. I am handling the removal of the race from within each races CountdownTimer component. I don't like how I am drilling the props down multiple levels, App > NextToGoRaces > RaceCard > CountdownTimer. I also didn't want to query the inside every CountdownTimer to access the removeRace action.

I think a better approach would be to emit the raceId from the CountdownTimer of the race that has expired, to to the App, and handle the removal there. That would be a future refactor that I would look into, would love to get your opinion! Hope you enjoy playing around with the app.

Just a final note, from what I could see, next_to_go_races are already coming through in ascending order. I am explicitly sorting the races by shortest `advertised_start.seconds`, but this may be redundant.

## Getting Started
### Start by installing the required depenedencies.
```bash
    npm install
```

### To run the app:
```bash
    npm run dev
```

### To run the tests
```bash
    npm run test:unit
```

## Core Concepts

### Live Race Feed
- Shows up to **5 races** from the API.
- If fewer than 5 races match the active filters, additional races are pulled from the unfiltered list.
- Races are sorted by `advertised_start.seconds` (ascending).

### Countdown Logic
- Each race has a countdown (managed by `CountdownTimer.vue`).
- When a race is **over 60 seconds past** its start time, it is removed by calling `removeRace()`.

## Filtering System

Each race belongs to a category. Filters are toggled by the user:

| Category      | ID |
|---------------|----|
| Greyhound     | `9daef0d7-bf3c-4f50-921d-8e818c60fe61` |
| Harness       | `161d9be2-e909-4326-8c2c-35ed71fb460b` |
| Thoroughbred  | `4a2788f8-e825-4d36-9894-efd4baf1cfae` |

- Users can toggle these filters.
- If all filters are turned off, the app reactivates all filters automatically.

## Store Overview (`useRacesStore`)

The Pinia store manages:

- **`getRaces()`**: Fetches the next 20 races
- **`filteredRaces`**: Races matching current filter settings
- **`unfilteredRaces`**: All races regardless of filter
- **`removeRace(raceId)`**: Removes a race from display
- **`updateRaceFilter(categoryId)`**: Toggles active state for a category

## Tests (Vitest)

Tests cover:

- `NextToGoRaces` renders up to 5 races
- Expired races are filtered out after they have gone 1 minute past their start time
- Filtering logic works with various combinations of active categories
