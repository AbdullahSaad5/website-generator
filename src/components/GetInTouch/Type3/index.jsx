import HTML_CODE from "./template.html?raw";
import CSS_CODE from "./styles.css?raw";
import { useReducer, useState } from "react";
import { Button, Group, Select, Stack, Text, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import getInTouchImage from "../../../assets/images/getInTouchImage.jpg";

const GetInTouch1 = () => {
  // Dynamically generating inputs code to be injected into the template

  const [inputName, setInputName] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const [inputType, setInputType] = useState("text");

  const initialState = {
    heading: "Get In Touch",
    heading2: "Contact Us",
    subText: "We're open for any suggestion or just to have a chat",
    address: "123, Main Street, New York, NY 10030",
    phone: "+1 234 567 890",
    email: "brooklynheights@gmail.com",
    website: "www.brooklynheights.com",
    getInTouchImage: getInTouchImage,
    companyName: "Brooklyn Heights",
    inputs: [
      {
        name: "firstName",
        label: "First Name",
        placeholder: "First Name",
        type: "text",
        required: true,
      },
      {
        name: "lastName",
        label: "Last Name",
        placeholder: "Last Name",
        type: "text",
        required: true,
      },
      {
        name: "phone",
        label: "Phone",
        placeholder: "Phone",
        type: "text",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        placeholder: "Email",
        type: "email",
        required: true,
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

      case "UPDATE_HEADING2":
        return {
          ...state,
          heading2: action.payload,
        };

      case "UPDATE_SUBTEXT":
        return {
          ...state,
          subText: action.payload,
        };

      case "UPDATE_ADDRESS":
        return {
          ...state,
          address: action.payload,
        };

      case "UPDATE_PHONE":
        return {
          ...state,
          phone: action.payload,
        };

      case "UPDATE_EMAIL":
        return {
          ...state,
          email: action.payload,
        };

      case "UPDATE_WEBSITE":
        return {
          ...state,
          website: action.payload,
        };

      case "UPDATE_COMPANY_NAME":
        return {
          ...state,
          companyName: action.payload,
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
              ? `<textarea name="${input.name}" id="${
                  input.name
                }" placeholder="${input.placeholder}" ${
                  input.required && "required"
                }></textarea>`
              : `<input type="${input.type}" name="${input.name}" id="${
                  input.name
                }" placeholder="${input.placeholder}" ${
                  input.required && "required"
                }/>`
          }
      </div>`;
    })
    ?.join("");

  let code = HTML_CODE.replace(/{{inputs}}/g, inputsCode);

  code = code.replace(/{{heading}}/g, state.heading);

  code = code.replace(/{{heading2}}/g, state.heading2);

  code = code.replace(/{{subText}}/g, state.subText);

  code = code.replace(/{{address}}/g, state.address);

  code = code.replace(/{{phone}}/g, state.phone);

  code = code.replace(/{{email}}/g, state.email);

  code = code.replace(/{{website}}/g, state.website);

  code = code.replace(
    /{{companyName}}/g,
    state.companyName || initialState.companyName
  );
  let styles = CSS_CODE;

  styles = styles.replace(
    /{{getInTouchImage}}/g,
    state.getInTouchImage ? state.getInTouchImage : getInTouchImage
  );

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
        label="Heading 2"
        placeholder="Heading 2"
        value={state.heading2}
        onChange={(event) => {
          dispatch({
            type: "UPDATE_HEADING2",
            payload: event.target.value,
          });
        }}
      />

      <TextInput
        label="Company Name"
        placeholder="Company Name"
        value={state.companyName}
        onChange={(event) => {
          dispatch({
            type: "UPDATE_COMPANY_NAME",
            payload: event.target.value,
          });
        }}
      />

      <TextInput
        label="Sub Text"
        placeholder="Sub Text"
        value={state.subText}
        onChange={(event) => {
          dispatch({
            type: "UPDATE_SUBTEXT",
            payload: event.target.value,
          });
        }}
      />

      <TextInput
        label="Address"
        placeholder="Address"
        value={state.address}
        onChange={(event) => {
          dispatch({
            type: "UPDATE_ADDRESS",
            payload: event.target.value,
          });
        }}
      />

      <TextInput
        label="Phone"
        placeholder="Phone"
        value={state.phone}
        onChange={(event) => {
          dispatch({
            type: "UPDATE_PHONE",
            payload: event.target.value,
          });
        }}
      />

      <TextInput
        label="Email"
        placeholder="Email"
        value={state.email}
        onChange={(event) => {
          dispatch({
            type: "UPDATE_EMAIL",
            payload: event.target.value,
          });
        }}
      />

      <TextInput
        label="Website"
        placeholder="Website"
        value={state.website}
        onChange={(event) => {
          dispatch({
            type: "UPDATE_WEBSITE",
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
              <Group key={input.label} position="apart">
                <Text color="gray" size={"md"}>
                  {input.label}
                </Text>
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
