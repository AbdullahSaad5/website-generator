import { Button, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Header1 from "./components/Headers/Type1";
import Header2 from "./components/Headers/Type2";
import DefaultStyles from "./components/Defaults/Styles";
import LandingPage1 from "./components/LandingPage/Type1";
import LandingPage2 from "./components/LandingPage/Type2";
import ContactUs1 from "./components/ContactUs/Type1";
import LandingPageEditor from "./components/Drawers/LandingPageEditor";
import ComponentEditor from "./components/Drawers/ComponentEditor";
import GetInTouch1 from "./components/GetInTouch/Type1";
import GetInTouch2 from "./components/GetInTouch/Type2";
import GetInTouch3 from "./components/GetInTouch/Type3";
import HTML_CODE from "./components/HTML_Templates/Base-Template.html?raw";
import HTMLRenderer from "./components/HTMLRenderer";
import JornayaScriptEditor from "./components/Drawers/JornayaScriptEditor";

// All the components are imported here
const Headers = [Header1, Header2];
const landingPages = [LandingPage1, LandingPage2];
const contactPages = [ContactUs1];
const getInTouchPages = [GetInTouch1, GetInTouch2, GetInTouch3];

function App() {
  // This is the main component that renders the website
  let [htmlFileString, setHtmlFileString] = useState(null);

  const [images, setImages] = useState({}); // This is the state that stores the images

  // This is the state that stores the selected components
  const [selectedHeader, setSelectedHeader] = useState(0);
  const [selectedLandingPage, setSelectedLandingPage] = useState(0);
  const [selectedContactPage, setSelectedContactPage] = useState(0);
  const [selectedGetInTouchPage, setSelectedGetInTouchPage] = useState(0);

  // This is the state that stores the drawer state
  const [opened, { open, close }] = useDisclosure(false);
  const [opened2, { open: open2, close: close2 }] = useDisclosure(false);

  // This is the state that stores the selected components
  const SelectedHeader = Headers[selectedHeader]({ setImages });
  const SelectedLandingPage = landingPages[selectedLandingPage]({ setImages });
  const SelectedContactPage = contactPages[selectedContactPage]({ setImages });
  const SelectedGetInTouchPage = getInTouchPages[selectedGetInTouchPage]({
    setImages,
  });

  const ScriptEditor = JornayaScriptEditor();

  // This renders the HTML code
  useEffect(() => {
    let HTML = HTML_CODE;

    HTML = HTML.replace(
      "{{styles}}",
      `
      <style>
        ${DefaultStyles()}
        ${SelectedHeader.styles}
        ${SelectedLandingPage.styles}
        ${SelectedContactPage.styles}
        ${SelectedGetInTouchPage.styles}
      </style>
    `
    );

    HTML = HTML.replace("{{header}}", SelectedHeader.code);

    const body =
      SelectedLandingPage.code +
      SelectedContactPage.code +
      SelectedGetInTouchPage.code;

    HTML = HTML.replace("{{body}}", body);

    HTML = HTML.replace("{{jornayaScript}}", ScriptEditor.script);

    setHtmlFileString(HTML);
  }, [
    SelectedHeader.code,
    SelectedHeader.styles,
    SelectedLandingPage.code,
    SelectedLandingPage.styles,
    SelectedContactPage.code,
    SelectedContactPage.styles,
    SelectedGetInTouchPage.code,
    SelectedGetInTouchPage.styles,
    ScriptEditor.script,
  ]);

  // This function downloads the code
  const downloadCode = async () => {
    //  Download all the code, assets  and images in a zip file

    const zip = new JSZip();

    htmlFileString = htmlFileString.replace(
      /\/src/g,
      "src"
    ); /*  Replace all the /src with src */

    // Add all the images to the zip file
    try {
      await Promise.all(
        Object.entries(images).map(async ([key, value]) => {
          if (typeof value === "string") {
            const response = await fetch(value);
            const imageData = await response.blob();
            zip.file(`src/assets/images/${key}.jpg`, imageData);
          } else {
            zip.file(`src/assets/images/${key}.jpg`, value);
            htmlFileString = htmlFileString.replace(
              /blob:([^"]+)/,
              `src/assets/images/${key}.jpg`
            );
          }
        })
      );
    } catch (e) {
      alert("Some error occurred while downloading the images");
      console.log(e);
    }

    zip.file("index.html", htmlFileString);

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, `Your Website.zip`);
    });
  };

  return (
    <>
      {/* Element that renders the HTML Code inside React */}
      <HTMLRenderer htmlFileString={htmlFileString} />

      <Stack style={{ position: "fixed", bottom: "20px", left: "20px" }}>
        <Button onClick={open2} size="lg">
          Change Components
        </Button>
        <Button onClick={open} size="lg">
          Edit Components
        </Button>
      </Stack>

      <LandingPageEditor
        opened={opened}
        close={close}
        components={[
          {
            name: "Header",
            component: SelectedHeader.UI(),
          },
          {
            name: "Landing Page",
            component: SelectedLandingPage.UI(),
          },
          {
            name: "Contact Page",
            component: SelectedContactPage.UI(),
            toggle: true,
          },
          {
            name: "Get In Touch",
            component: SelectedGetInTouchPage.UI(),
            toggle: true,
          },
          {
            name: "Jornaya Script",
            component: ScriptEditor.UI(),
          },
        ]}
      />

      <ComponentEditor
        opened={opened2}
        close={close2}
        components={[
          {
            name: "Headers",
            variants: Headers,
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

      <Button
        onClick={downloadCode}
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
        size="lg"
      >
        Download Code
      </Button>
    </>
  );
}

export default App;
