import { Conversation, Message } from "./message.model";

export async function startConversation(req: any, res: any) {
  const { userA, userB } = req.body;
  console.log(userA, userB);
  const participants = [userA, userB].sort();
  if (!userA || !userB) {
    return res.status(400).send({ message: "Two users required" });
  }
  try {
    let conversation = await Conversation.findOne({
      participants,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants,
        lastUpdated: new Date(),
      });
    }

    return res.json({ conversationId: conversation._id });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "a server error occured trying to create the conversation",
    });
  }
}

export async function findConversations(req: any, res: any) {
  const username = req.query.username;
  console.log(username);
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  try {
    const conversations = await Conversation.find({ participants: username })
      .sort({ lastMessageTimestamp: -1 })

      .exec();

    res.json(conversations);
  } catch (error) {
    console.error("Error retrieving conversations:", error);
    res.status(500).json({ error: "Failed to load conversations" });
  }
}
