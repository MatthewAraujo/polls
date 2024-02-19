import fastify from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import websocket from "@fastify/websocket";
import { createPoll } from "./routes/create-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import { getPoll } from "./routes/get-polls";
import { pollResults } from "./ws/poll-results";

const app = fastify();

app.register(cors, {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
});

app.register(cookie, {
  secret: "my-secret",
  hook: "onRequest",
});

app.register(async () => {
  app.get("/", async () => {
    return { hello: "world" };
  })
})
app.register(websocket);

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);

app.register(pollResults);
app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});
