import { Button, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useEffect, useReducer, useState } from "react";
import Image1 from "./assets/images/banner.jpg";
import Image2 from "./assets/images/banner2.jpg";
import Image3 from "./assets/images/banner3.jpg";
import contactImage from "./assets/images/contacts-hero.jpg";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Header1 from "./components/Headers/Type1";
import Header2 from "./components/Headers/Type2";
import DefaultStyles from "./components/Defaults/Styles";
import LandingPage1 from "./components/LandingPage/Type1";
import ContactUs1 from "./components/ContactUs/Type1";
import LandingPageEditor from "./components/Drawers/LandingPageEditor";
import ComponentEditor from "./components/Drawers/ComponentEditor";
import GetInTouch1 from "./components/GetInTouch/Type1";

function App() {
  let [htmlFileString, setHtmlFileString] = useState();

  const headers = [Header1, Header2];
  const landingPages = [LandingPage1];
  const contactPages = [ContactUs1];
  const getInTouchPages = [GetInTouch1];

  const [selectedHeader, setSelectedHeader] = useState(0);
  const [selectedLandingPage, setSelectedLandingPage] = useState(0);
  const [selectedContactPage, setSelectedContactPage] = useState(0);
  const [selectedGetInTouchPage, setSelectedGetInTouchPage] = useState(0);

  const initialState = {
    links: ["Home", "Rooms & Suites", "About Us", "Contact"],
    link: "",
    title: "Brooklyn Heights",
    tagLine: "A Rustic Retreat Deep in the Brooklyn Mountains",
    phone: "1-800-123-4567",
    email: "brooklynheights@gmail.com",
    buttonText: "Book A Room",
    image1: Image1,
    image2: Image2,
    image3: Image3,
    contactImage: contactImage,
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

  const [opened, { open, close }] = useDisclosure(false);
  const [opened2, { open: open2, close: close2 }] = useDisclosure(false);

  const fetchHtml = useCallback(async () => {
    let HTML = await (
      await fetch(`/src/components/HTML_Templates/Base-Template.html`)
    ).text();

    const HTML_Links = state.links.map((link) => {
      if (
        link.toLowerCase() === "contact" ||
        link.toLowerCase() === "contact us"
      ) {
        return `<li><a href="#contact-us" class="navigation-links__link">${link}</a></li>`;
      }
      return `<li><a href="#" class="navigation-links__link">${link}</a></li>`;
    });

    HTML = HTML.replace(
      "{{styles}}",
      `
    <style>
    ${DefaultStyles()}
    ${headers[selectedHeader]()[1]}
    ${LandingPage1()[1]}
    ${ContactUs1()[1]}
    ${GetInTouch1()[1]}
    </style>
    `
    );

    HTML = HTML.replace("{{header}}", headers[selectedHeader]()[0]);

    const body =
      LandingPage1()[0] +
      ContactUs1()[0] +
      GetInTouch1([
        {
          name: "first_name",
          label: "First Name",
          placeholder: "First Name",
        },
        {
          name: "last_name",
          label: "Last Name",
          placeholder: "Last Name",
        },
        {
          name: "phone",
          label: "Phone",
          placeholder: "Phone",
        },
        {
          name: "email",
          label: "Email",
          placeholder: "Email",
        },
        {
          name: "message",
          label: "Message",
          placeholder: "Message",
          type: "textarea",
        },
      ])[0];

    HTML = HTML.replace("{{body}}", body);

    HTML = HTML.replace(/{{links}}/g, HTML_Links.join(""));

    HTML = HTML.replace(
      "{{logo}}",
      state.title.trim().length ? state.title : "Brooklyn Heights"
    );

    HTML = HTML.replace(
      /{{phone}}/g,
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
        : "A Rustic Retreat Deep in the Brooklyn Mountains"
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

    HTML = HTML.replace(
      /{{contactImage}}/g,
      state.contactImage
        ? state.contactImage?.preview || state.contactImage
        : contactImage
    );

    setHtmlFileString(HTML);
  }, [state, selectedHeader, headers]);

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

      <Stack style={{ position: "fixed", bottom: "20px", left: "20px" }}>
        <Button onClick={open} size="lg">
          Open Landing Page Editor
        </Button>

        <Button onClick={open2} size="lg">
          Open Component Editor
        </Button>
      </Stack>

      <LandingPageEditor
        dispatch={dispatch}
        downloadCode={downloadCode}
        opened={opened}
        state={state}
        close={close}
      />

      <ComponentEditor
        opened={opened2}
        close={close2}
        components={[
          {
            name: "Headers",
            variants: headers,
            setter: setSelectedHeader,
            getter: selectedHeader,
          },
          {
            name: "Landing Pages",
            variants: landingPages,
            setter: setSelectedLandingPage,
            getter: selectedLandingPage,
          },
          {
            name: "Contact Pages",
            variants: contactPages,
            setter: setSelectedContactPage,
            getter: selectedContactPage,
          },
          {
            name: "Get In Touch Pages",
            variants: getInTouchPages,
            setter: setSelectedGetInTouchPage,
            getter: selectedGetInTouchPage,
          },
        ]}
      />
    </>
  );
}

export default App;
