import cards from "../data/cards.json";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/cards") {
      return Response.json(cards);
    }

    return Response.json(
      { error: "Endpoint not found" },
      { status: 404 }
    );
  }
};