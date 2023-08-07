import HTML_CODE from "./template.html?raw";
import CSS_CODE from "./styles.css?raw";
import { useReducer, useState } from "react";
import { Button, Group, Select, Stack, Text, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

const GetInTouch1 = () => {
  // Dynamically generating inputs code to be injected into the template

  const [inputName, setInputName] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const [inputType, setInputType] = useState("text");

  const initialState = {
    heading: "Get In Touch",
    inputs: [
      {
        name: "first_name",
        label: "First Name",
        placeholder: "First Name",
        type: "text",
      },
      {
        name: "last_name",
        label: "Last Name",
        placeholder: "Last Name",
        type: "text",
      },
      {
        name: "phone",
        label: "Phone",
        placeholder: "Phone",
        type: "text",
      },
      {
        name: "email",
        label: "Email",
        placeholder: "Email",
        type: "email",
      },
      {
        name: "message",
        label: "Message",
        placeholder: "Message",
        type: "textarea",
      },
    ],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_INPUT":
        if (state.inputs.find((input) => input.name === action.payload.name))
          return alert("Input name already exists");

        return {
          ...state,
          inputs: [...state.inputs, action.payload],
        };
      case "REMOVE_INPUT":
        return {
          ...state,
          inputs: state.inputs.filter((input) => input.name !== action.payload),
        };
      case "UPDATE_INPUT":
        return {
          ...state,
          inputs: state.inputs.map((input) => {
            if (input.name === action.payload.name) {
              return {
                ...input,
                ...action.payload,
              };
            }
            return input;
          }),
        };
      case "UPDATE_HEADING":
        return {
          ...state,
          heading: action.payload,
        };

      case "RESET":
        return {
          ...initialState,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const inputsCode = state?.inputs
    ?.map((input) => {
      return `<div class="form-group ${input.type}">
          ${
            input.type === "textarea"
              ? `<textarea name="${input.name}" id="${input.name}" placeholder="${input.placeholder}"></textarea>`
              : `<input type="${input.type}" name="${input.name}" id="${input.name}" placeholder="${input.placeholder}" />`
          }
      </div>`;
    })
    ?.join("");

  let code = HTML_CODE.replace(/{{inputs}}/g, inputsCode);

  code = code.replace(/{{heading}}/g, state.heading);

  let styles = CSS_CODE;

  let UI = () => (
    <Stack gap="md" key="get-in-touch-1">
      <TextInput
        label="Heading"
        placeholder="Heading"
        value={state.heading}
        onChange={(event) => {
          dispatch({
            type: "UPDATE_HEADING",
            payload: event.target.value,
          });
        }}
      />

      <TextInput
        label="Input Name"
        placeholder="Input Name"
        value={state.inputName}
        onChange={(event) => {
          setInputName(event.target.value);
        }}
      />

      <TextInput
        label="Input Label"
        placeholder="Input Label"
        value={state.inputLabel}
        onChange={(event) => {
          setInputLabel(event.target.value);
        }}
      />

      <TextInput
        label="Input Placeholder"
        placeholder="Input Placeholder"
        value={state.inputPlaceholder}
        onChange={(event) => {
          setInputPlaceholder(event.target.value);
        }}
      />

      <Select
        label="Input Type"
        placeholder="Input Type"
        data={[
          { value: "text", label: "Text" },
          { value: "textarea", label: "Text Area" },
        ]}
        onChange={setInputType}
      />

      <Button
        onClick={() => {
          dispatch({
            type: "ADD_INPUT",
            payload: {
              name: inputName,
              label: inputLabel,
              placeholder: inputPlaceholder,
              type: inputType,
            },
          });
        }}
      >
        Add Input
      </Button>

      {
        <Stack gap="md">
          {state.inputs.map((input) => {
            return (
              <Group key={input.label}>
                <Text color="gray">{input.label}</Text>
                <IconTrash
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_INPUT",
                      payload: input.name,
                    });
                  }}
                />
              </Group>
            );
          })}
        </Stack>
      }
    </Stack>
  );

  return {
    code,
    styles,
    UI,
  };
};

export default GetInTouch1;
