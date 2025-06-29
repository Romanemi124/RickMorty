// ✅ main.ts compatible con Deno Deploy
import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { GraphQLHTTP } from "gql";
import { makeExecutableSchema } from "graphql_tools";

import { Query } from "./resolvers/query.ts";
import { Character } from "./resolvers/character.ts";
import { Episode } from "./resolvers/episode.ts";
import { Location } from "./resolvers/location.ts";
import { typeDefs } from "./schema.ts";

const resolvers = {
  Query,
  Character,
  Episode,
  Location,
};

const handler = GraphQLHTTP<Request>({
  schema: makeExecutableSchema({ resolvers, typeDefs }),
  graphiql: true,
});

serve((req) => {
  const { pathname } = new URL(req.url);
  return pathname === "/graphql"
    ? handler(req)
    : new Response("Not Found", { status: 404 });
});
