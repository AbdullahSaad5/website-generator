import {
  Button,
  Drawer,
  FileInput,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useEffect, useReducer, useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import Image1 from "./assets/images/banner.jpg";
import Image2 from "./assets/images/banner2.jpg";
import Image3 from "./assets/images/banner3.jpg";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function App() {
  let [htmlFileString, setHtmlFileString] = useState();

  const initialState = {
    links: ["Home", "Rooms & Suites", "About Us", "Contact"],
    link: "",
    title: "Brooklyn Heights",
    tagLine: "A Rustic Retreat Deep in the <br/> Brooklin Mountains",
    phone: "1-800-123-4567",
    email: "brooklynheights@gmail.com",
    buttonText: "Book A Room",
    image1: Image1,
    image2: Image2,
    image3: Image3,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_LINK":
        return {
          ...state,
          link: action.payload,
        };

      case "SET_BUTTON_TEXT":
        return {
          ...state,
          buttonText: action.payload,
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
      case "SET_TAGLINE":
        return {
          ...state,
          tagLine: action.payload,
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

  const [opened, { open, close }] = useDisclosure(true);

  const fetchHtml = useCallback(async () => {
    let HTML = await (
      await fetch(`/src/components/HTML/Landing-Page-1.html`)
    ).text();

    const HTML_Links = state.links.map((link) => {
      return `<li><a href="#" class="navigation-links__link">${link}</a></li>`;
    });

    HTML = HTML.replace("{{links}}", HTML_Links.join(""));

    HTML = HTML.replace(
      "{{logo}}",
      state.title.trim().length ? state.title : "Brooklyn Heights"
    );

    HTML = HTML.replace(
      "{{phone}}",
      state.phone.trim().length ? state.phone : "1-800-123-4567"
    );

    HTML = HTML.replace(
      /{{email}}/g,
      state.email.trim().length ? state.email : "brooklynheights@gmail.com"
    );

    HTML = HTML.replace(
      "{{tagline}}",
      state.tagLine.trim().length
        ? state.tagLine
        : "A Rustic Retreat Deep in the <br/> Brooklin Mountains"
    );

    HTML = HTML.replace(
      "{{Button Text}}",
      state.buttonText.trim().length ? state.buttonText : "Book A Room"
    );

    HTML = HTML.replace(
      /{{image1}}/g,
      state.image1 ? state.image1?.preview || state.image1 : Image1
    );

    HTML = HTML.replace(
      /{{image2}}/g,
      state.image2 ? state.image2?.preview || state.image2 : Image2
    );

    HTML = HTML.replace(
      /{{image3}}/g,
      state.image3 ? state.image3?.preview || state.image3 : Image3
    );

    setHtmlFileString(HTML);
  }, [state]);

  const downloadCode = async () => {
    //  Download all the code, assets  and images in a zip file

    const zip = new JSZip();

    htmlFileString = htmlFileString.replace(
      /\/src/g,
      "src"
    ); /*  Replace all the /src with src */

    if (typeof state.image1 === "string") {
      const response1 = await fetch(state.image1);
      const image1Data = await response1.blob();
      zip.file("src/assets/images/banner.jpg", image1Data);
    } else {
      zip.file("src/assets/images/banner.jpg", state.image1);
      htmlFileString = htmlFileString.replace(
        /blob:([^"]+)/,
        `src/assets/images/banner.jpg`
      );
    }

    if (typeof state.image2 === "string") {
      const response2 = await fetch(state.image2);
      const image2Data = await response2.blob();
      zip.file("src/assets/images/banner2.jpg", image2Data);
    } else {
      zip.file("src/assets/images/banner2.jpg", state.image2);
      htmlFileString = htmlFileString.replace(
        /blob:([^"]+)/,
        `src/assets/images/banner2.jpg`
      );
    }

    if (typeof state.image3 === "string") {
      const response3 = await fetch(state.image3);
      const image3Data = await response3.blob();
      zip.file("src/assets/images/banner3.jpg", image3Data);
    } else {
      zip.file("src/assets/images/banner3.jpg", state.image3);
      htmlFileString = htmlFileString.replace(
        /blob:([^"]+)/,
        `src/assets/images/banner3.jpg`
      );
    }

    zip.file("index.html", htmlFileString);

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, `${state.title || "Your Website"}.zip`);
    });
  };

  useEffect(() => {
    fetchHtml();
  }, [fetchHtml]);

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: htmlFileString }}
        style={{
          height: "100%",
        }}
      ></div>

      <Button
        onClick={open}
        size="lg"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
        }}
      >
        Open drawer
      </Button>
      <Drawer opened={opened} onClose={close} title="Edit Home Page">
        <Stack spacing={"lg"}>
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
                <IconTrash
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_LINK",
                      payload: index,
                    });
                  }}
                  size={16}
                />
              </div>
            );
          })}

          <Textarea
            maxLength={80}
            label="Tagline"
            value={state.tagLine.replace(/<br\/>/g, "")}
            onChange={(e) => {
              let text = e.target.value;

              const words = text.split(" ").length;
              if (words >= 6) {
                text = text.replace(/(\s+\S+){5}/, "$&<br/>");
              }

              dispatch({
                type: "SET_TAGLINE",
                payload: text,
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

          <Button
            onClick={() => {
              dispatch({
                type: "RESET",
              });
            }}
          >
            Reset
          </Button>

          <Button onClick={downloadCode}>Download Code</Button>
        </Stack>
      </Drawer>
    </>
  );
}

export default App;
