import HTML_CODE from "./template.html?raw";
import CSS_CODE from "./styles.css?raw";
import { FileInput, Stack, TextInput, Textarea } from "@mantine/core";
import Image1 from "../../../assets/images/image1.jpg";
import Image2 from "../../../assets/images/image2.jpg";
import Image3 from "../../../assets/images/image3.jpg";
import { useEffect, useReducer } from "react";
const LandingPage1 = ({ setImages }) => {
  const initialState = {
    tagLine: "A Rustic Retreat Deep in the Brooklyn Mountains",
    buttonText: "Book A Room",
    image1: Image1,
    image2: Image2,
    image3: Image3,
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

      case "SET_IMAGE2":
        return {
          ...state,
          image2: action.payload,
        };

      case "SET_IMAGE3":
        return {
          ...state,
          image3: action.payload,
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

  useEffect(() => {
    setImages((images) => ({
      ...images,
      image1: state.image1,
      image2: state.image2,
      image3: state.image3,
    }));
  }, [state.image1, state.image2, state.image3, setImages]);

  let code = HTML_CODE;

  code = code.replace(/{{tagline}}/g, state.tagLine);
  code = code.replace(/{{buttonText}}/g, state.buttonText);

  let styles = CSS_CODE;

  styles = styles.replace(
    /{{image1}}/g,
    state.image1 ? state.image1?.preview || state.image1 : Image1
  );

  styles = styles.replace(
    /{{image2}}/g,
    state.image2 ? state.image2?.preview || state.image2 : Image2
  );

  styles = styles.replace(
    /{{image3}}/g,
    state.image3 ? state.image3?.preview || state.image3 : Image3
  );

  const UI = () => (
    <Stack key="landing-page-1">
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

      <FileInput
        label="Image 2"
        accept="image/*"
        value={state.image2}
        onChange={(e) => {
          const file = e;
          const url = URL.createObjectURL(file);
          file.preview = url;
          dispatch({
            type: "SET_IMAGE2",
            payload: file,
          });
        }}
      />

      <FileInput
        label="Image 3"
        accept="image/*"
        value={state.image3}
        onChange={(e) => {
          const file = e;
          const url = URL.createObjectURL(file);
          file.preview = url;
          dispatch({
            type: "SET_IMAGE3",
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

export default LandingPage1;
