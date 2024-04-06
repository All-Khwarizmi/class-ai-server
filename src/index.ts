import { run } from "@backroad/backroad";
import * as dotenv from "dotenv"
import path from "path";
dotenv.config()


const ENV = process.env.NODE_ENV;
run(async (br) => {
  br.write({
    body: `Bienvenue sur le chatbot de Jason Suárez!`,
  });
  const input = br.textInput({
    label: "Entrez une requête:",
    placeholder: `Que voulez-vous savoir?`,
  });
  
  if (!input || input.length < 5 )  {
    br.write({
      body: `Veuillez entrer une requête valide! (5 caractères minimum)`,
    });
    return;

  }

  if (ENV === "development") {
    const chatModule = await import("./chat.js");
 const model = chatModule.chatModel;
 const chatQuery = chatModule.chat;

 (async () => {
  const response = await chatQuery({
    chatModel: model,
    query: input,
  });
  br.write({
    body: response,
  });
})();
  
} else {
 
br.write({
    body: `
    Requête ${input}
    Réponse: LangSmith est une plateforme de chatbot développée par Jason Suárez. Pour l'instant, elle est en cours de développement. 
    `,
  });
}
});
