import * as dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()
const MODELS = {
	mistral: "mistralai/mistral-7b-instruct:free",
	capybara: "nousresearch/nous-capybara-7b:free",
	gemma: "google/gemma-7b-it:free",
	toppy: "undi95/toppy-m-7b:free",
}
const OPEN_ROUTER_URL = "https://openrouter.ai/api/v1"
const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY
const OPENAI_CLIENT = new OpenAI({
	baseURL: OPEN_ROUTER_URL,
	apiKey: OPEN_ROUTER_API_KEY,
})

export default async function chatService({
	query,
}: {
	query: string
}) {
	const response = await OPENAI_CLIENT.chat.completions.create({
		model: MODELS.mistral,
		messages: [
			{ role: "system", content: "You are a helpful assistant." },
			{ role: "user", content: query },
		],
	})
	const aiMessage = response.choices[0].message.content
	console.log({ aiMessage })
	return aiMessage
}
