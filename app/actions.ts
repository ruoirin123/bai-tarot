"use server"

import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"

interface TarotCardForAI {
  name: string
  meaning: string
}

export async function generateTarotReading(cards: TarotCardForAI[]) {
  if (cards.length !== 3) {
    return { error: "Exactly three cards are required for this reading." }
  }

  const [pastCard, presentCard, futureCard] = cards

  const prompt = `Bạn là một người đọc Tarot khôn ngoan và sâu sắc. Tôi đã rút ba lá bài cho một trải bài 'Quá Khứ, Hiện Tại, Tương Lai'.
Dưới đây là các lá bài và ý nghĩa của chúng:
1.  **Lá bài Quá Khứ**: ${pastCard.name} - ${pastCard.meaning}
2.  **Lá bài Hiện Tại**: ${presentCard.name} - ${presentCard.meaning}
3.  **Lá bài Tương Lai**: ${futureCard.name} - ${futureCard.meaning}

Vui lòng cung cấp một bản giải thích ngắn gọn và mạch lạc về ba lá bài này, giải thích cách quá khứ ảnh hưởng đến hiện tại và tương lai sẽ ra sao dựa trên quỹ đạo hiện tại. Viết bản giải thích bằng tiếng Việt. Bắt đầu trực tiếp bằng bản giải thích, không có bất kỳ cụm từ giới thiệu nào như 'Dựa trên những lá bài này...' hoặc 'Đây là bài đọc của bạn:'`

  try {
    const { text } = await generateText({
      model: xai("grok-3"),
      prompt: prompt,
      temperature: 0.7, // Adjust for creativity vs. directness
      maxTokens: 500, // Limit response length
    })
    return { reading: text }
  } catch (error) {
    console.error("Error generating tarot reading:", error)
    return { error: "Không thể tạo bài đọc Tarot. Vui lòng thử lại." }
  }
}
