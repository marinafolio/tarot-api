# Quickstart

Use the Tarot API to generate a randomized three-card tarot reading. This guide walks you through sending a request and understanding the response.

## Before you begin

You'll need:

- An internet connection
- A terminal with `curl` installed.

## Generate a three-card reading

Send a `POST` request to the `/readings` endpoint to generate a randomized tarot reading.

Run the following command in your terminal:
 
```bash
curl -X POST \
  https://tarot-api.marinafolio.workers.dev/readings \
  -H "Content-Type: application/json" \
  -d '{"spread":"three-card","allow_reversals":true}'
```

The request body contains two properties:

- `spread`: Specifies the type of reading. In this example, `three-card` requests three cards.
- `allow_reversals`: When `true`, cards can appear upright or reversed.

## Understand the response

If the request succeeds, the API returns an `HTTP 200 OK` response containing JSON data for the generated reading.

```json
{
  "spread": "three-card",
  "cards": [
    {
      "position": "past",
      "id": 29,
      "name": "Eight of Wands",
      "orientation": "upright",
      "keywords": ["speed", "movement", "communication"]
    },
    {
      "position": "present",
      "id": 46,
      "name": "Page of Cups",
      "orientation": "reversed",
      "keywords": ["emotional immaturity", "insecurity", "blocked creativity"]
    },
    {
      "position": "future",
      "id": 76,
      "name": "Queen of Pentacles",
      "orientation": "upright",
      "keywords": ["resourcefulness", "care", "practical support"]
    }
  ]
} 
```

The response contains a `spread` property identifying the requested reading type and a `cards` array containing the three randomly selected cards.

Each card includes:

- `position`: The card's placement in the reading (`past`, `present`, or `future`).
- `id`: The card's unique identifier.
- `name`: The card's name.
- `orientation`: Whether the card is `upright` or `reversed`.
- `keywords`: An array of keywords associated with the card's orientation.

Because readings are randomized, the cards and orientations in your response may differ from this example.

You've successfully generated a three-card tarot reading. To explore other reading options, see the API reference.

## Next steps

Now that you've generated your first reading, explore the API reference to learn how to:

- Generate a one-card reading.
- Retrieve all 78 tarot cards.
- Filter cards by Major or Minor Arcana.
- Retrieve an individual card by ID.
