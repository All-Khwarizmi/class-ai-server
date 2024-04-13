import { run } from "@backroad/backroad"
import * as dotenv from "dotenv"
import chatService from "./service/chat"
dotenv.config()

const ENV = process.env.NODE_ENV
run(async (br) => {
	const messages = br.getOrDefault("messages", [
		{ by: "ai", content: "Hi, how can I help you today? 😀" },
	])
	br.write({
		body: "# Wolcome To ITS Chatbot!",
	})

	for (const message of messages) {
		br.chatMessage({ by: message.by }).write({ body: message.content })
	}
	const input = br.chatInput({ id: "input" })
	if (input) {
		br.setValue("messages", [
			...messages,
			{ by: "human", content: input },
			{ by: "ai", content: await chatService({ query: input }) },
		])
	}

	//   const input = br.textInput({
	//     label: "Entrez une requête:",
	//     placeholder: "Que voulez-vous savoir?",
	//   });

	//   if (!input || input.length < 5 )  {
	//     br.write({
	//       body: "Veuillez entrer une requête valide! (5 caractères minimum)",
	//     });
	//     return;

	//   }

	//   if (ENV === "development") {
	//     const chatModule = await import("./chat.js");
	//  const model = chatModule.chatModel;
	//  const chatQuery = chatModule.chat;

	//  (async () => {
	//   const response = await chatQuery({
	//     chatModel: model,
	//     query: input,
	//   });
	//   br.write({
	//     body: response,
	//   });
	// })();

	// } else {

	// br.write({
	//     body: `
	//     Requête ${input}
	//     Réponse: LangSmith est une plateforme de chatbot développée par Jason Suárez. Pour l'instant, elle est en cours de développement.
	//     `,
	//   });
	// }
})

const getGPTResponse = (message) => {
	if (message.includes("1+1")) {
		return "Ah, the answer to that is 2!! 😎"
	}
	return `I don't know...
    ![i-dont-know](https://t3.ftcdn.net/jpg/05/66/80/74/360_F_566807496_uKCQoOWWdXbFWKluJXo2ilg7B61J0qIe.jpg)`
}
