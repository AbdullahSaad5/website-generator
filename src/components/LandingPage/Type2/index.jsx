import HTML_CODE from "./template.html?raw";
import CSS_CODE from "./styles.css?raw";
import { FileInput, Stack, TextInput, Textarea } from "@mantine/core";
import Image1 from "../../../assets/images/banner.jpg";
import { useReducer } from "react";
const LandingPage2 = () => {
  const initialState = {
    tagLine: "A Rustic Retreat Deep in the Brooklyn Mountains",
    buttonText: "Book A Room",
    image1: Image1,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_TAGLINE":
        return {
          ...state,
          tagLine: action.payload,
        };

      case "SET_BUTTON_TEXT":
        return {
          ...state,
          buttonText: action.payload,
        };

      case "SET_IMAGE1":
        return {
          ...state,
          image1: action.payload,
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

  let code = HTML_CODE;

  code = code.replace(/{{tagline}}/g, state.tagLine);
  code = code.replace(/{{buttonText}}/g, state.buttonText);

  code = code.replace(
    /{{image1}}/g,
    state.image1 ? state.image1?.preview || state.image1 : Image1
  );

  let styles = CSS_CODE;

  styles = styles.replace(
    /{{image1}}/g,
    state.image1 ? state.image1?.preview || state.image1 : Image1
  );

  const UI = () => (
    <Stack>
      <Textarea
        maxLength={80}
        label="Tagline"
        value={state.tagLine}
        onChange={(e) => {
          let text = e.target.value;

          dispatch({
            type: "SET_TAGLINE",
            payload: text,
          });
        }}
      />

      <TextInput
        label="Button Text"
        value={state.buttonText}
        maxLength={20}
        onChange={(e) => {
          dispatch({
            type: "SET_BUTTON_TEXT",
            payload: e.target.value,
          });
        }}
      />

      <FileInput
        label="Image 1"
        accept="image/*"
        value={state.image1}
        onChange={(e) => {
          const file = e;
          const url = URL.createObjectURL(file);
          file.preview = url;
          dispatch({
            type: "SET_IMAGE1",
            payload: file,
          });
        }}
      />
    </Stack>
  );

  return {
    code,
    styles,
    UI,
  };
};

export default LandingPage2;
