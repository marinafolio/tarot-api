import cards from "../data/cards.json";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Retrieve all cards, optionally filtered by arcana
    if (request.method === "GET" && url.pathname === "/cards") {
      const arcana = url.searchParams.get("arcana");

      if (arcana && !["major", "minor"].includes(arcana)) {
        return Response.json(
          { error: "Invalid arcana. Must be 'major' or 'minor'." },
          { status: 400 }
        );
      }

      const results = arcana
        ? cards.filter((card) => card.arcana === arcana)
        : cards;

      return Response.json(results);
    }

    // Retrieve a single card by ID
    if (request.method === "GET" && url.pathname.startsWith("/cards/")) {
      const id = Number(url.pathname.split("/")[2]);

      if (!Number.isInteger(id) || !url.pathname.match(/^\/cards\/\d+$/)) {
        return Response.json(
          { error: "Invalid card ID" },
          { status: 400 }
        );
      }

      const card = cards.find((card) => card.id === id);

      if (!card) {
        return Response.json(
          { error: "Card not found" },
          { status: 404 }
        );
      }

      return Response.json(card);
    }

    return Response.json(
      { error: "Endpoint not found" },
      { status: 404 }
    );
  }
};