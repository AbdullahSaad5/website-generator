import HTML_CODE from "./template.html?raw";
import CSS_CODE from "./styles.css?raw";
import {
  ColorInput,
  FileInput,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import Image1 from "../../../assets/images/image1.jpg";
import Landing2_backgroundImage from "../../../assets/images/Landing2_backgroundImage.png";
import { useEffect, useReducer } from "react";
const LandingPage2 = ({ setImages }) => {
  const initialState = {
    tagLine: "A Rustic Retreat Deep in the Brooklyn Mountains",
    subLine:
      "We offer a wide variety of doors & windows, with a wide range of styles and sizes to choose from.",
    buttonText1: "Book A Room",
    buttonText2: "Learn More",
    image1: Image1,
    Landing2_backgroundImage: Landing2_backgroundImage,
    textColor: "#000c66",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_TEXT_COLOR":
        return {
          ...state,
          textColor: action.payload,
        };

      case "SET_TAGLINE":
        return {
          ...state,
          tagLine: action.payload,
        };

      case "SET_SUBLINE":
        return {
          ...state,
          subLine: action.payload,
        };

      case "SET_BUTTON_TEXT_1":
        return {
          ...state,
          buttonText1: action.payload,
        };

      case "SET_BUTTON_TEXT_2":
        return {
          ...state,
          buttonText2: action.payload,
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
        return {
          ...initialState,
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setImages((images) => ({
      ...images,
      image1: state.image1,
      Landing2_backgroundImage: state.Landing2_backgroundImage,
    }));
  }, [state.image1, setImages, state.Landing2_backgroundImage]);

  let code = HTML_CODE;

  code = code.replace(/{{tagline}}/g, state.tagLine);

  code = code.replace(/{{subline}}/g, state.subLine);
  code = code.replace(/{{buttonText1}}/g, state.buttonText1);

  code = code.replace(/{{buttonText2}}/g, state.buttonText2);

  code = code.replace(
    /{{image1}}/g,
    state.image1 ? state.image1?.preview || state.image1 : Image1
  );

  let styles = CSS_CODE;

  styles = styles.replace(
    /{{image1}}/g,
    state.image1 ? state.image1?.preview || state.image1 : Image1
  );

  styles = styles.replace(
    /{{Landing2_backgroundImage}}/g,
    state.Landing2_backgroundImage
      ? state.Landing2_backgroundImage?.preview ||
          state.Landing2_backgroundImage
      : Landing2_backgroundImage
  );

  styles = styles.replace(/var\(--landing-page-text-color\)/g, state.textColor);

  const UI = () => (
    <Stack key="landing-page-2">
      <Textarea
        maxLength={50}
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

      <Textarea
        maxLength={80}
        label="Subline"
        value={state.subLine}
        onChange={(e) => {
          let text = e.target.value;

          dispatch({
            type: "SET_SUBLINE",
            payload: text,
          });
        }}
      />

      <TextInput
        label="Button Text 1"
        value={state.buttonText1}
        maxLength={20}
        onChange={(e) => {
          dispatch({
            type: "SET_BUTTON_TEXT_1",
            payload: e.target.value,
          });
        }}
      />

      <TextInput
        label="Button Text 2"
        value={state.buttonText2}
        maxLength={20}
        onChange={(e) => {
          dispatch({
            type: "SET_BUTTON_TEXT_2",
            payload: e.target.value,
          });
        }}
      />

      <ColorInput
        label="Text Color"
        value={state.textColor}
        onChange={(color) => {
          dispatch({
            type: "SET_TEXT_COLOR",
            payload: color,
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
