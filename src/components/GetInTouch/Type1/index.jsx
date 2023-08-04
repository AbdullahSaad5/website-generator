import HTML_CODE from "./template.html?raw";
import CSS_CODE from "./styles.css?raw";

const index = (inputs) => {
  // Dynamically generating inputs code to be injected into the template
  const inputsCode = inputs
    ?.map((input) => {
      return `<div class="form-group ${input.type}">
          ${
            input.type === "textarea"
              ? `<textarea name="${input.name}" id="${input.name}" placeholder="${input.placeholder}"></textarea>`
              : `<input type="${input.type}" name="${input.name}" id="${input.name}" placeholder="${input.placeholder}" />`
          }
      </div>`;
    })
    .join("");

  const code = HTML_CODE.replace(/{{inputs}}/g, inputsCode);

  const styles = CSS_CODE;

  return [code, styles];
};

export default index;
