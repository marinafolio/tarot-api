# Readings

## POST /readings

Use `POST /readings` to generate a one-card or three-card reading.

### Request body

Send a JSON object containing the reading options. Both fields are optional.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `spread` | string | no | `one-card` | Controls whether the reading is one card or three cards. Accepts `one-card` or `three-card`. |
| `allow_reversals` | boolean | no | `true` | Controls whether cards can appear in the reversed orientation. |

### Example requests

```bash
curl -X POST \
  https://tarot-api.marinafolio.workers.dev/readings \
  -H "Content-Type: application/json" \
  -d '{"spread":"one-card","allow_reversals":false}'
```

### Example responses

```json
{
  "spread": "one-card",
  "cards": [
    {
      "position": "guidance",
      "id": 25,
      "name": "Four of Wands",
      "orientation": "upright",
      "keywords": [
        "celebration",
        "community",
        "stability"
      ]
    }
  ]
}
```

### Error responses

| HTTP status | Condition | Error message |
|-----------|------|-------------|
| `400 Bad Request` | The request body contains malformed JSON or cannot be parsed as JSON. | `Request body must contain valid JSON.` |
| `400 Bad Request` | The request body is not a JSON object. | `Request body must be a JSON object.` |
| `400 Bad Request` | The `spread` field contains an unsupported value. | `Invalid spread. Must be 'one-card' or 'three-card'.` |
| `400 Bad Request` | The `allow_reversals` field is not a boolean. | `allow_reversals must be a boolean.` |
| `422 Unprocessable Content` | There are not enough cards available to generate the requested spread. | `Not enough cards available for this spread.` |



## Reading object

The Reading object contains the generated spread and the cards drawn for the reading.

### Response fields

| Field | Type | Description |
|-----------|------|-------------|
| `spread` | string | The type of reading generated. |
| `cards` | array of objects | The cards included in the reading. |
| `cards[].position` | string | The card's position in the reading. |
| `cards[].id` | integer | The card's unique identifier. |
| `cards[].name` | string | The card's name. |
| `cards[].orientation` | string | Whether the card is upright or reversed. |
| `cards[].keywords` | array of strings | Keywords describing the card's interpretation. |