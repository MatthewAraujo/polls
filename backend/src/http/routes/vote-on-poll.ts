import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import z from "zod";
import { randomUUID } from "node:crypto";
import { redis } from "../../lib/redis";
import { votingPubSub } from "../../utils/voting-pub-sub";
import console from "node:console";

export async function voteOnPoll(app: FastifyInstance) {
  app.post("/polls/:pollId/votes", async (request, reply) => {
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    });

    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = voteOnPollParams.parse(request.params);
    const { pollOptionId } = voteOnPollBody.parse(request.body);

    let { sessionId } = request.cookies;

    if (sessionId) {
      const userPreviousVoteOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            pollId,
            sessionId,
          },
        },
      });

      if (
        userPreviousVoteOnPoll &&
        userPreviousVoteOnPoll.pollOptionId !== pollOptionId
      ) {
        await prisma.vote.delete({
          where: {
            id: userPreviousVoteOnPoll.id,
          },
        });

        const votes = await redis.zincrby(
          pollId,
          -1,
          userPreviousVoteOnPoll.pollOptionId
        );

        votingPubSub.publish(pollId, {
          pollOptionId: userPreviousVoteOnPoll.pollOptionId,
          votes: Number(votes),
        });
      } else if (userPreviousVoteOnPoll) {
        return reply.status(400).send({
          message: "You have already voted on this poll",
        });
      }
    }

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        signed: true,
        httpOnly: true,
      });
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId,
      },
    });

    const votes = await redis.zincrby(pollId, 1, pollOptionId);

    votingPubSub.publish(pollId, {
      pollOptionId,
      votes: Number(votes),
    });

    return reply.status(201).send();
  });
}
