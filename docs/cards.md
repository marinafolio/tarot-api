# Cards

## GET /cards

Use `GET /cards` to retrieve a list of all 78 cards.

### Query parameters

Use the optional `arcana` query parameter to filter the returned cards by Major or Minor Arcana. If the parameter is omitted, the API returns all 78 cards.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `arcana` | string | No | Filters cards by arcana. Accepts `major` or `minor`. If omitted, returns all 78 cards. |


### Example request

**Retrieve all 78 cards**

```bash
curl https://tarot-api.marinafolio.workers.dev/cards
```

**Retrieve only Major Arcana cards**

```bash
curl "https://tarot-api.marinafolio.workers.dev/cards?arcana=major"
```


### Example response

**Retrieve all 78 cards**

The following example shows two cards from the response. The full response contains all 78 cards:

```json
[
  {
    "id": 0,
    "name": "The Fool",
    "arcana": "major",
    "number": 0,
    "upright_keywords": [
      "new beginnings",
      "freedom",
      "spontaneity"
    ],
    "reversed_keywords": [
      "recklessness",
      "hesitation",
      "poor judgment"
    ]
  },
  {
    "id": 22,
    "name": "Ace of Wands",
    "arcana": "minor",
    "suit": "wands",
    "number": 1,
    "upright_keywords": [
      "inspiration",
      "initiative",
      "potential"
    ],
    "reversed_keywords": [
      "delays",
      "lack of direction",
      "blocked creativity"
    ]
  }
]
```

**Retrieve only Major Arcana cards**

The following example shows two cards from the filtered response. The full response contains all 22 Major Arcana cards:

```json
[
  {
    "id": 0,
    "name": "The Fool",
    "arcana": "major",
    "number": 0,
    "upright_keywords": [
      "new beginnings",
      "freedom",
      "spontaneity"
    ],
    "reversed_keywords": [
      "recklessness",
      "hesitation",
      "poor judgment"
    ]
  },
  {
    "id": 1,
    "name": "The Magician",
    "arcana": "major",
    "number": 1,
    "upright_keywords": [
      "skill",
      "resourcefulness",
      "manifestation"
    ],
    "reversed_keywords": [
      "manipulation",
      "untapped potential",
      "deception"
    ]
  }
]
```

### Error responses

| HTTP status | Condition | Error message |
|-----------|------|-------------|
| `400 Bad Request` | The `arcana` parameter contains an unsupported value. | `Invalid arcana. Must be 'major' or 'minor'.` |

## GET /cards/{id}

Use `GET /cards/{id}` to retrieve an individual card.

### Path parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | Yes | The unique identifier of the card to retrieve. |


### Example request

```bash
curl https://tarot-api.marinafolio.workers.dev/cards/1
```

### Example response

```json
{
  "id": 1,
  "name": "The Magician",
  "arcana": "major",
  "number": 1,
  "upright_keywords": [
    "skill",
    "resourcefulness",
    "manifestation"
  ],
  "reversed_keywords": [
    "manipulation",
    "untapped potential",
    "deception"
  ]
}
```

### Error responses

| HTTP status | Condition | Error message |
|-----------|------|-------------|
| `400 Bad Request` | The ID has an invalid format. | `Invalid card ID` |
| `404 Not Found` | The ID has a valid format but doesn't match a card. | `Card not found` |

## Card object

The following fields describe a card returned by
`GET /cards` and `GET /cards/{id}`.

### Response fields

| Field | Type | Description |
|-----------|------|-------------|
| `id` | integer | The card's unique identifier. |
| `name` | string | The card's name. |
| `arcana` | string | The card's classification (`major` or `minor`). |
| `suit` | string | The suit of a Minor Arcana card. Not present for Major Arcana cards. |
| `number` | integer | The card's number within its arcana. |
| `upright_keywords` | array of strings | Keywords describing the card's upright interpretation. |
| `reversed_keywords` | array of strings | Keywords describing the card's reversed interpretation. |