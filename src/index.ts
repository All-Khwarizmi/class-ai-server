import { run } from "@backroad/backroad";
run(async (br) => {
  br.write({
    body: `# 🛣️ Welcome to Backroad
This is a quick start template to help you get started developing backroad apps. You can also checkout the examples on [stackblitz](https://stackblitz.com/@sudo-vaibhav/collections/backroad)`,
  });
  const input = br.textInput({
    label: "Enter your name",
    placeholder: "John Doe",
  });
  br.write({
    body: `Hello ${input}!`,
  });
  
});
