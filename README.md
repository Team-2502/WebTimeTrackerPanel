# TimeTracker
TimeTracker is a simple (yet effective!) time tracking program.

## Building
- `npm run electron:windows` - Build the Electron app for Windows
- `npm run build:prod` - Build the Angular app

## Config
The default config points to `api.timetracker.team2502.com`. This can easily be changed on Electron by modifying the config path at `~/.timetracker/config.json`.

To change the config for the Angular app, modify the `config.service.ts` file to point to your API instance.

## Images
Home page:

![home page](https://i.imgur.com/4Jh1Z5p.png "Home page")

Leaderboard page:

![leaderboard page](https://i.imgur.com/9bKEysB.png "Leaderboard page")
