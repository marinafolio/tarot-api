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

    // Generate a tarot reading
    if (request.method === "POST" && url.pathname === "/readings") {
      let options;

      try {
        options = await request.json();
      } catch {
        return Response.json(
          { error: "Request body must contain valid JSON." },
          { status: 400 }
        );
      }

      if (
        options === null ||
        typeof options !== "object" ||
        Array.isArray(options)
      ) {
        return Response.json(
          { error: "Request body must be a JSON object." },
          { status: 400 }
        );
      }

      const { spread = "one-card", allow_reversals = true } = options;

      if (!["one-card", "three-card"].includes(spread)) {
        return Response.json(
          { error: "Invalid spread. Must be 'one-card' or 'three-card'." },
          { status: 400 }
        );
      }

      if (typeof allow_reversals !== "boolean") {
        return Response.json(
          { error: "allow_reversals must be a boolean." },
          { status: 400 }
        );
      }

      const count = spread === "three-card" ? 3 : 1;

      if (cards.length < count) {
        return Response.json(
          { error: "Not enough cards available for this spread." },
          { status: 422 }
        );
      }

      // Shuffle a copy so cards are never repeated within a reading
      const shuffled = [...cards].sort(() => Math.random() - 0.5);

      const selected = shuffled.slice(0, count);

      const positions =
        spread === "three-card"
          ? ["past", "present", "future"]
          : ["guidance"];

      return Response.json({
        spread,
        cards: selected.map((card, index) => {
          const orientation =
            allow_reversals && Math.random() < 0.5
              ? "reversed"
              : "upright";

          return {
            position: positions[index],
            id: card.id,
            name: card.name,
            orientation,
            keywords:
              orientation === "upright"
                ? card.upright_keywords
                : card.reversed_keywords
          };
        })
      });
    }

    return Response.json(
      { error: "Endpoint not found" },
      { status: 404 }
    );
  }
};