import HTML_CODE from "./template.html?raw";
import CSS_CODE from "./styles.css?raw";
import contactImage from "../../../assets/images/contacts-hero.jpg";
import { FileInput, Stack, TextInput } from "@mantine/core";
import { useReducer } from "react";
const ContactUs1 = () => {
  const initialState = {
    address:
      "1512 Chemin de Stramousse, 06530 Grasse, Provence-Alpes-Côte d'Azur France",
    phone: "1-800-123-4567",
    email: "brooklynheights@gmail.com",
    contactImage: contactImage,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_ADDRESS":
        return {
          ...state,
          address: action.payload,
        };

      case "SET_PHONE":
        return {
          ...state,
          phone: action.payload,
        };

      case "SET_EMAIL":
        return {
          ...state,
          email: action.payload,
        };

      case "SET_CONTACT_IMAGE":
        return {
          ...state,
          contactImage: action.payload,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  let code = HTML_CODE;

  code = code.replace(/{{address}}/g, state.address);
  code = code.replace(/{{phone}}/g, state.phone);
  code = code.replace(/{{email}}/g, state.email);
  code = code.replace(
    /{{contactImage}}/g,
    state.contactImage
      ? state.contactImage?.preview || state.contactImage
      : contactImage
  );

  let styles = CSS_CODE;

  const UI = () => (
    <Stack>
      <TextInput
        label="Address"
        value={state.address}
        maxLength={15}
        onChange={(e) => {
          dispatch({
            type: "SET_ADDRESS",
            payload: e.target.value,
          });
        }}
      />
      <TextInput
        label="Phone"
        value={state.phone}
        maxLength={15}
        onChange={(e) => {
          dispatch({
            type: "SET_PHONE",
            payload: e.target.value,
          });
        }}
      />

      <TextInput
        label="Email"
        value={state.email}
        maxLength={40}
        onChange={(e) => {
          dispatch({
            type: "SET_EMAIL",
            payload: e.target.value,
          });
        }}
      />
      <FileInput
        label="Contact Image"
        accept="image/*"
        value={state.image1}
        onChange={(e) => {
          const file = e;
          const url = URL.createObjectURL(file);
          file.preview = url;
          dispatch({
            type: "SET_CONTACT_IMAGE",
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

export default ContactUs1;
