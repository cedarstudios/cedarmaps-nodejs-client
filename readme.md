# cedar-maps [![Build Status](https://travis-ci.org/sinaabadi/cedar-maps.svg?branch=master)](https://travis-ci.org/sinaabadi/cedar-maps)

A mapping service and highly detailed and spatially accurate GIS vector data application that covers the whole country of Iran.


## Install

```
$ npm install cedar-maps
```


## Getting Started
### Getting Access Token
You should have a `client_id` and `client_secret` in order to get an access_token.
```
    POST  "https://api.cedarmaps.com/v1/token" with client_id=<client_id> client_secret=<client_secret>
```

```js
const cedarMaps = require('cedar-maps');

const apiKey = 'YOUR_API_KEY'

const CedarMaps = cedarMaps(apiKey);

```


## API

### #forwardGeocoding(query, index, filters)

#### input
query: `string`, URL-encoded text **[REQUIRED]**

index: Pick from CedarMaps.Constants.INDEXES for example CedarMaps.Constants.INDEXES.STREET_INDEX

filters:

| Param | Type | Description |
| ---- | ---- | ---- |
| limit | integer | Max is 30 |
| distance | float | Unit is km, 0.1 means 100 meters |
| location | Object: {lat:<SOME_LATITUDE>,lon: SOME_LONGITUDE} | Center point of a nearby search. should be accompanied with distance param |
| type | Array |  Pick from CedarMaps.Constants.FORWARD_GEOCODE.TYPE
| ne | Object: {lat:<SOME_LATITUDE>,lon: SOME_LONGITUDE} | Specifies north east of the bounding box - should be accompanied with sw param |
| sw | Object: {lat:<SOME_LATITUDE>,lon: SOME_LONGITUDE} | Specifies south west of the bounding box - should be accompanied with ne param |

##### Sample Response:

```js
[
        {
            "address": "اراضی عباس آباد,مهران,سید خندان,...",
            "components": {
                "city": "تهران",
                "country": "ایران",
                "districts": [
                    "منطقه 4",
                    "منطقه 3"
                ],
                "localities": [
                    "اراضی عباس آباد",
                    "مهران",
                    "سید خندان",
                    "پاسداران"
                ],
                "province": "تهران"
            },
            "id": 429874,
            "location": {
                "bb": {
                    "ne": "35.756689799999997,51.464761500000002",
                    "sw": "35.7491463,51.423702800000001"
                },
                "center": "35.749155599171999,51.428327751596903"
            },
            "name": "همت",
            "type": "expressway"
        },
        {
            "address": "المهدی",
            "components": {
                "city": "تهران",
                "country": "ایران",
                "districts": [
                    "منطقه 5"
                ],
                "localities": [
                    "المهدی"
                ],
                "province": "تهران"
            },
            "id": 338756,
            "location": {
                "bb": {
                    "ne": "35.770861600000003,51.323841700000003",
                    "sw": "35.770540400000002,51.323066400000002"
                },
                "center": "35.770585227006897,51.323426168064202"
            },
            "name": "همت",
            "type": "street"
        }
    ]
```
### #reverseGeocoding(lat, lon, index)
It gives you an address based on a provided LatLng pair.
#### input
lat: `number`, Latitude **[REQUIRED]**

long: `number`, Longitude **[REQUIRED]**

index: Pick from CedarMaps.Constants.INDEXES for example CedarMaps.Constants.INDEXES.STREET_INDEX

##### Sample Response:

```js
{
        "address": "بن بست سروش - زرتشت",
        "city": "تهران",
        "components": [
            {
                "long_name": "بن بست سروش",
                "short_name": "بن بست سروش",
                "type": "residential"
            },
            {
                "long_name": "زرتشت",
                "short_name": "زرتشت",
                "type": "primary"
            },
            {
                "long_name": "بهجت آباد",
                "short_name": "بهجت آباد",
                "type": "locality"
            },
            {
                "long_name": "منطقه 6",
                "short_name": "منطقه 6",
                "type": "district"
            },
            {
                "long_name": "تهران",
                "short_name": "تهران",
                "type": "city"
            }
        ],
        "locality": "بهجت آباد",
        "district": "منطقه 6",
        "traffic_zone": {
            "in_central": true,
            "in_evenodd": true,
            "name": "محدوده طرح ترافیک"
        }
    }
```

### #distance(points)
This method calculates the distance between points in meters. It can be called with up to 100 different points in a single request.

#### input
points: `array`, Array of point objects `{lat:<SOME_LAT>,lon:<SOME_LON>}` **[REQUIRED]**

##### Response Elements:

| Param | Description |
| ---- | ---- |
| distance | The overall distance of the route, in meter |
| time | The overall time of the route, in ms |
| bbox | The bounding box of the route, format: minLon, minLat, maxLon, maxLat |


##### Sample Response:

```js
{
        "routes": [
            {
                "bbox": [
                    51.368587,
                    35.74982,
                    51.41652,
                    35.762383
                ],
                "distance": 7516.338,
                "time": 500912
            }
        ]
    }
```

### #direction(points, options)
This method calculates the optimal driving routes between two or more points.

**Note**: Number of points should be even.

#### input
points: `array`, \[ `{lat:<SOME_LAT>,lon:<SOME_LON>}`,...\] **[REQUIRED]**

options: `object` Currently the only option is `instructions` that is `boolean`

**Example**
```js
{
  instructions: true
}
```

##### Response Elements:

| Param | Description |
| ---- | ---- |
| distance | The overall distance of the route, in meter |
| time | The overall time of the route, in ms |
| bbox | The bounding box of the route, format: minLon, minLat, maxLon, maxLat |
| geometry | The geometry of the route as a GeoJSON LineString |


##### Sample Response:

```js
 {
        "routes": [
            {
                "bbox": [
                    51.36444,
                    35.76323,
                    51.365623,
                    35.76432
                ],
                "distance": 244.929,
                "geometry": {
                    "coordinates": [
                        [
                            51.365623,
                            35.76432
                        ],
                        [
                            51.365257,
                            35.764303
                        ],
                        [
                            51.364963,
                            35.764235
                        ],
                        [
                            51.364673,
                            35.764141
                        ],
                        [
                            51.364442,
                            35.764025
                        ],
                        [
                            51.364884,
                            35.763525
                        ],
                        [
                            51.364888,
                            35.763482
                        ],
                        [
                            51.365049,
                            35.763228
                        ],
                        [
                            51.36532,
                            35.76332
                        ]
                    ],
                    "type": "LineString"
                },
                "time": 22602
            }
        ]
    }
```

##### Turn-by-turn Navigation

In order to get turn-by-turn instructions you should include {instructions:true} as option.

Response elements when instructions option provided:

| Param | Description |
| ---- | ---- |
| instructions | Instructions for this route. The last instruction is always the Finish instruction and takes 0ms and 0meter |
| instructions[].text | A description what the user has to do in order to follow the route |
| instructions[].street_name | The name of the street to turn onto in order to follow the route |
| instructions[].distance | The distance for this instruction, in meter |
| instructions[].time | The duration for this instruction, in ms |
| instructions[].interval | An array containing the first and the last index (relative to geometry.coordinates) of the points for this instruction. This is useful to know for which part of the route the instructions are valid |
| instructions[].sign | A number which specifies the sign to show <ul><li>Keep Left=-7</li> <li>Turn Sharp Left = -3</li> <li>Turn Left = -2</li> <li>Turn Slight Left = -1</li> <li>Continue = 0</li> <li>Turn Slight Right = 1</li> <li>Turn Right = 2</li> <li>Turn Sharp Right = 3</li> <li>Reached via = 5</li> <li>Roundabout = 6</li> <li>Finish = 4</li></ul> |

Sample Response when instructions option provided:

```js
{
        "routes": [
            {
                "bbox": [
                    51.43418,
                    35.738007,
                    51.43793,
                    35.738693
                ],
                "distance": 570.586,
                "geometry": {
                    "coordinates": [
                        [
                            51.437536,
                            35.738675
                        ],
                        [
                            51.437901,
                            35.738695
                        ],
                        [
                            51.43793,
                            35.738142
                        ],
                        [
                            51.435609,
                            35.738006
                        ],
                        [
                            51.435563,
                            35.738689
                        ],
                        [
                            51.434183,
                            35.738635
                        ],
                        [
                            51.434204,
                            35.738048
                        ]
                    ],
                    "type": "LineString"
                },
                "instructions": [
                    {
                        "distance": 32.977,
                        "heading": 86.21,
                        "interval": [
                            0,
                            1
                        ],
                        "sign": 0,
                        "street_name": "دهم",
                        "text": "تا دهم ادامه دهید",
                        "time": 4748
                    },
                    {
                        "distance": 61.447,
                        "interval": [
                            1,
                            2
                        ],
                        "sign": 2,
                        "street_name": "سیبویه",
                        "text": " به راست بپیچید به سیبویه",
                        "time": 4915
                    },
                    {
                        "distance": 210.041,
                        "interval": [
                            2,
                            3
                        ],
                        "sign": 2,
                        "street_name": "هشتم",
                        "text": " به راست بپیچید به هشتم",
                        "time": 30245
                    },
                    {
                        "distance": 76.09,
                        "interval": [
                            3,
                            4
                        ],
                        "sign": 2,
                        "street_name": "عربعلی",
                        "text": " به راست بپیچید به عربعلی",
                        "time": 6085
                    },
                    {
                        "distance": 124.698,
                        "interval": [
                            4,
                            5
                        ],
                        "sign": -2,
                        "street_name": "نهم",
                        "text": " به چپ بپیچید به نهم",
                        "time": 17956
                    },
                    {
                        "distance": 65.334,
                        "interval": [
                            5,
                            6
                        ],
                        "sign": -2,
                        "street_name": "رهبر",
                        "text": " به چپ بپیچید به رهبر",
                        "time": 9408
                    },
                    {
                        "distance": 0.0,
                        "interval": [
                            6,
                            6
                        ],
                        "last_heading": 178.3159250006148,
                        "sign": 4,
                        "street_name": "",
                        "text": "پایان!",
                        "time": 0
                    }
                ],
                "time": 73357
            }
        ]
    }
```


### #tile(mapId)
TileJSON is a format that manages the complexities of custom maps. It organizes zoom levels, center points, legend contents, and more, into a format that makes it easy to display a map.

#### input
mapId: `string`, Cedar map ID  **[REQUIRED]**


##### Sample Response:

```js
{
    "bounds": [
        44,
        24.6,
        63.4,
        39.8
    ],
    "description": "CedarMaps covering the whole country of Iran",
    "maxzoom": 17,
    "minzoom": 6,
    "name": "CedarMaps Streets",
    "tilejson": "2.3.0",
    "tiles": [
        "https://api.cedarmaps.com/v1/tiles/cedarmaps.streets/{z}/{x}/{y}.png?access_token=<your access token>"
    ],
    "version": "2.0"
}
```

### Callback Interface
 You can provide callback as last parameter:

 **Example**
 ```js
 const cedarMapsApi = CedarMaps.api(accessToken)
 CedarMaps.reverseGeocoding(lat, lng, CedarMaps.Constants.INDEXES.STREET_INDEX, function (err, result) {
    if(err){
       return console.error(err)
    }
    return console.log(result)
 })
 ```

## License

MIT © [Cedar Maps](https://cedarmaps.com)
