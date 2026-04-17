const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    sessionId: String,
    disease: String,
    messages: [
      {
        role: String, // 'user' or 'assistant'
        content: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Conversation", ConversationSchema);
