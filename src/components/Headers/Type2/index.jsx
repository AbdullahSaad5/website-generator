import HTML_CODE from "./template.html?raw";
import CSS_CODE from "./styles.css?raw";
import { useReducer } from "react";
import {
  Button,
  ColorInput,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconTrash } from "@tabler/icons-react";

const Header2 = () => {
  const initialState = {
    links: ["Home", "Rooms & Suites", "About Us", "Contact"],
    link: "",
    title: "Brooklyn Heights",
    backgroundColor: "transparent",
    foregroundColor: "white",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_LINK":
        return {
          ...state,
          link: action.payload,
        };

      case "ADD_LINK":
        return {
          ...state,
          links: [...state.links, action.payload],
          link: "",
        };
      case "REMOVE_LINK":
        return {
          ...state,
          links: state.links.filter((_, i) => i !== action.payload),
        };
      case "SET_TITLE":
        return {
          ...state,
          title: action.payload,
        };

      case "MOVE_UP":
        return {
          ...state,
          links: state.links.map((link, i) => {
            if (i === action.payload) {
              return state.links[i - 1];
            } else if (i === action.payload - 1) {
              return state.links[i + 1];
            } else {
              return link;
            }
          }),
        };
      case "MOVE_DOWN":
        return {
          ...state,
          links: state.links.map((link, i) => {
            if (i === action.payload) {
              return state.links[i + 1];
            } else if (i === action.payload + 1) {
              return state.links[i - 1];
            } else {
              return link;
            }
          }),
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

  const HTML_LINKS = state?.links?.map((link) => {
    if (
      link.toLowerCase() === "contact" ||
      link.toLowerCase() === "contact us"
    ) {
      return `<li><a href="#contact-us" class="navigation-links__link">${link}</a></li>`;
    }
    return `<li><a href="#" class="navigation-links__link">${link}</a></li>`;
  });

  code = code.replace(/{{links}}/g, HTML_LINKS?.join(""));

  code = code.replace(
    "{{logo}}",
    state.title.trim().length ? state.title : "Brooklyn Heights"
  );

  const styles = CSS_CODE.replace(
    /var\(--header-background-color\)/g,
    state.backgroundColor
  ).replace(/var\(--header-text-color\)/g, state.foregroundColor);

  const UI = () => (
    <Stack spacing={"lg"} key={"header-1-editor"}>
      <ColorInput
        label="Background Color"
        value={state.backgroundColor}
        onChange={(color) => {
          dispatch({
            type: "SET_BACKGROUND_COLOR",
            payload: color,
          });
        }}
      />

      <ColorInput
        label="Foreground Color"
        value={state.foregroundColor}
        onChange={(color) => {
          dispatch({
            type: "SET_FOREGROUND_COLOR",
            payload: color,
          });
        }}
      />

      <TextInput
        label="Title"
        value={state.title}
        onChange={(e) =>
          dispatch({
            type: "SET_TITLE",
            payload: e.target.value,
          })
        }
      />
      <TextInput
        label="Add Link"
        value={state.link}
        onChange={(e) =>
          dispatch({
            type: "SET_LINK",
            payload: e.target.value,
          })
        }
        rightSection={
          <Button
            onClick={() => {
              if (!state.link.length) return;

              if (state.links.length >= 6) return;
              dispatch({
                type: "ADD_LINK",
                payload: state.link,
              });
            }}
          >
            Add
          </Button>
        }
        rightSectionWidth={80}
      />

      {state.links?.map((link, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text fz={"sm"}>{link}</Text>
            <Group>
              <IconChevronUp
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (index === 0) return;
                  dispatch({
                    type: "MOVE_UP",
                    payload: index,
                  });
                }}
                size={16}
              />

              <IconChevronDown
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (index === state.links.length - 1) return;
                  dispatch({
                    type: "MOVE_DOWN",
                    payload: index,
                  });
                }}
                size={16}
              />

              <IconTrash
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  dispatch({
                    type: "REMOVE_LINK",
                    payload: index,
                  });
                }}
                size={16}
              />
            </Group>
          </div>
        );
      })}

      <Button
        onClick={() => {
          dispatch({
            type: "RESET",
          });
        }}
      >
        Reset
      </Button>
    </Stack>
  );

  return {
    code,
    styles,
    UI,
  };
};

export default Header2;
