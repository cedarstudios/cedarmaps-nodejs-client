# Cedarmaps
A [node.js](https://nodejs.org/) and browser JavaScript client to CedarMaps services.

# Table of contents
- [Cedarmaps](#cedarmaps)
- [Installation](#installation)
  * [Initialization](#initialization)
- [API](#api)
  * [Forward Geocoder](#forward-geocoder)
  * [Reverse Geocoder](#reverse-geocoder)
  * [Trip Calculator](#trip-calculator)
  * [Turn by Turn Navigation](#turn-by-turn-navigation)
  * [TileJSON](#tilejson)


# Installation
```
$ npm i @cedarstudios/cedarmaps
```

In order to use CedarMaps' API, you **MUST** have an access token. Get one from [CedarMaps](https://www.cedarmaps.com/) website (Menu link: "درخواست اکانت رایگان"). It may take a couple of hours until your request is processed and your credentials are emailed to you.

## Initialization

```javascript
const cedarMaps = require('@cedarstudios/cedarmaps');
const client = cedarMaps('<YOUR ACCESS TOKEN>'); // Get your token from cedarmaps.com
```

# API
## Forward Geocoder
Signature: `client.forwardGeocoding(queryString, searchIndex, filters, callback)`

| Options | Value | Description |
|--------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| queryString (_required_) | String | a query, expressed as a string, like 'ونک'. This string **MUST** be URI encoded. Use `encodeURIComponent('ونک')` for example. |
| searchIndex (_required_) | String | Available profiles: <ul><li> `cedarmaps.streets` Only searches through map features - 1 API Call</li><li> `cedarmaps.places` Only searches through places (Source: [kikojas.com](https://www.kikojas.com)) - 2 API Calls</li><li> `cedarmaps.mix` Searches through both profiles above - 3 API Calls</li></ul> |
| filters | Object | Example: `{ distance: 0.5, limit: 5 }`. <br />Available filters:  <ul><li>`limit` *integer* - Number of returned results. Default is `10`, Max is `30`.</li><li>`distance` *float* - Unit is km, `0.1` means 100 meters.</li><li>`location` *lat,lng* - For searching near a location. should be used only with `distance` param.</li><li>`type` *enum* - Types of map features to filter the results. Possible values: `street`, `poi`, `village`, `roundabout`, `expressway`, `locality`, `town`, `city`, `junction`, `freeway`, `boulevard`, `region`, `state` <br />(You can mix types by separating them with commas).</li><li>`ne` *lat,lng* - Specifies north east of the bounding box - should be used with `sw` param.</li><li>`sw` lat,lng - Specifies south west of the bounding box - should be used with `ne` param.</li></ul> |
| callback (_required_) | Function | A callback with passed params: `(error, result)`. |

Sample usage:

```js
client.forwardGeocoding(encodeURIComponent('ونک'), 'cedarmaps.streets', {type: 'roundabout'}, (err, res) => {console.log(res);});
```

## Reverse Geocoder
Signature: `client.reverseGeocoding(location, options, callback)`

Queries the reverse geocoder with a location and returns the address in desired format.

| Options | Value | Description |
|-----------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| location (_required_) | Mixed | A point can be formatted in one of the forms below:<ul><li>`[lon, lat] // an array of lon, lat`</li><li>`{ lat: 0, lon: 0 } // a lon, lat object`</li><li>`{ lat: 0, lng: 0 } `</li></ul>  |
| options | Object | <ul><li>`format` - Address format with a number of place holders. Example: `{province}{sep}{city}{sep}{locality}{sep}{district}{sep}{address}{sep}{place}` </li><li>`Prefix` - Possible values: `short`, `long`</li><li>`Separator` - Character for `{sep}` placeholder. Example: `"، "`</li><li>`Verbosity` - Either `true` or `false`</li></ul> |
| callback (_required_) | Function | A callback with passed params: `(error, result)`. |

Sample usage:

```js
client.reverseGeocoding([35.76312468, 51.40292645], {verbosity: true}, (err, res) => { console.log(res) });
```

## Trip Calculator
Signature: `client.distance(points, callback)`

Travel-time and distance between up to **100** pairs of origin and destination, in one single request.

| Options | Value | Description |
|-----------------------|----------|---------------------------------------------------|
| points (_required_) | Array | An Array of {lat,lon} pairs. Example: `[{ lat: 35.76312468, lon: 51.40292645 }, { lat: 35.76288091, lon: 51.37305737}]` |
| callback (_required_) | Function | A callback with passed params: `(error, result)`. |

Reponse object description: 

| Param | Description |
| ---- | ---- |
| distance | The total distance of the route, in Meters. |
| time | The total time of the route, in Milliseconds. |
| bbox | The bounding box of the route, format: minLon, minLat, maxLon, maxLat. |

Sample usage:

```js
client.distance([{ lat: 35.76312468, lon: 51.40292645 }, { lat: 35.76288091, lon: 51.37305737}], (err, res) => {console.log(res)});
```

## Turn by Turn Navigation
Calculates the optimal driving routes between two or more points. (Shortest path)
Signature: `client.distance(points, callback)`

**Note**: The number of provided points must be even.

| Options | Value | Description |
|-----------------------|----------|-------------------------------------------------------------------------------------------------------------------------|
| points (_required_) | Array | An Array of {lat,lon} pairs. Example: `[{ lat: 35.76312468, lon: 51.40292645 }, { lat: 35.76288091, lon: 51.37305737}]` |
| options | Object | The only available option for now is `instructions` (*Boolean*) which adds driving instructions object to the response. |
| callback (_required_) | Function | A callback with passed params: `(error, result)`. |

Sample usage:

```js
client.direction([{ lat: 35.76312468, lon: 51.40292645 }, { lat: 35.76288091, lon: 51.37305737 }], {instructions: true}, (err, res) => { console.log(err, res) })
```
Reponse object description: 

| Param | Description |
| ---- | ---- |
| distance | The total distance of the route, in Meters. |
| time | The total time of the route, in Milliseconds. |
| bbox | The bounding box of the route, format: minLon, minLat, maxLon, maxLat. |
| geometry | The geometry of the route as a GeoJSON LineString. |

Here's the `intructions` object description:
**Note:** The last item in instructions array is the stop item with `distance` and `time` values of `0`.

| Param | Description |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| text | Descriptive text of the instruction. |
| street_name | The name of the street to turn onto in order to follow the route. |
| distance | The distance for this instruction, in Meters. |
| time | The duration for this instruction, in Milliseconds. |
| interval | An array containing the first and the last index (relative to geometry.coordinates) of the points for this instruction. This is useful to know for which part of the route the instructions are valid. |
| sign | A number which specifies the sign to show <ul><li>Keep Left=-7</li> <li>Turn Sharp Left = -3</li> <li>Turn Left = -2</li> <li>Turn Slight Left = -1</li> <li>Continue = 0</li> <li>Turn Slight Right = 1</li> <li>Turn Right = 2</li> <li>Turn Sharp Right = 3</li> <li>Reached via = 5</li> <li>Roundabout = 6</li> <li>Finish = 4</li></ul> |


## TileJSON
Signature: `client.tile(profile)`

TileJSON is a format that manages the complexities of custom maps. It organizes zoom levels, center points, legend contents, and more, into a format that makes it easy to display a map. In order to get CedarMaps tiles you need to have their specification and then pass these info to your favorite map libarary (Leaflet, OpenLayers, etc.)

| Options | Value | Description |
|----------------------|--------|-------------------------------------------------------|
| profile (_required_) | String | Only available option is `cedarmaps.streets` for now. |

Sample Response:

```js
{
  "tilejson": "2.2.0",
  "name": "cedarmaps.streets",
  "version": "3.0",
  "description": "CedarMaps covers the whole world in general and Iran in details",
  "tiles": [
    "https://api.cedarmaps.com/v1/tiles/cedarmaps.streets/{z}/{x}/{y}.png?access_token=<your access token>"
  ],
  "attribution": "<a href=\"https://www.cedarmaps.com\">CedarMaps</a>",
  "minzoom": 0,
  "maxzoom": 17,
  "bounds": [-180, -90, 180, 90]
}
```

Sample usage:

```js
client.tile('cedarmaps.streets', (err, res) => { console.log(err, res)});
```