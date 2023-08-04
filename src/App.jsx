import { Button, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
// import JSZip from "jszip";
// import { saveAs } from "file-saver";
import Header1 from "./components/Headers/Type1";
import Header2 from "./components/Headers/Type2";
import DefaultStyles from "./components/Defaults/Styles";
import LandingPage1 from "./components/LandingPage/Type1";
import LandingPage2 from "./components/LandingPage/Type2";
import ContactUs1 from "./components/ContactUs/Type1";
import LandingPageEditor from "./components/Drawers/LandingPageEditor";
import ComponentEditor from "./components/Drawers/ComponentEditor";
import GetInTouch1 from "./components/GetInTouch/Type1";
import HTML_CODE from "./components/HTML_Templates/Base-Template.html?raw";

function App() {
  let [htmlFileString, setHtmlFileString] = useState();

  const Headers = [Header1, Header2];
  const landingPages = [LandingPage1, LandingPage2];
  const contactPages = [ContactUs1];
  const getInTouchPages = [GetInTouch1];

  const [selectedHeader, setSelectedHeader] = useState(0);
  const [selectedLandingPage, setSelectedLandingPage] = useState(0);
  const [selectedContactPage, setSelectedContactPage] = useState(0);
  const [selectedGetInTouchPage, setSelectedGetInTouchPage] = useState(0);

  const [opened, { open, close }] = useDisclosure(false);
  const [opened2, { open: open2, close: close2 }] = useDisclosure(false);

  const SelectedHeader = Headers[selectedHeader]();
  const SelectedLandingPage = landingPages[selectedLandingPage]();
  const SelectedContactPage = contactPages[selectedContactPage]();
  const SelectedGetInTouchPage = getInTouchPages[selectedGetInTouchPage]();

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
  ]);

  // const downloadCode = async () => {
  //   //  Download all the code, assets  and images in a zip file

  //   const zip = new JSZip();

  //   htmlFileString = htmlFileString.replace(
  //     /\/src/g,
  //     "src"
  //   ); /*  Replace all the /src with src */

  //   if (typeof state.image1 === "string") {
  //     const response1 = await fetch(state.image1);
  //     const image1Data = await response1.blob();
  //     zip.file("src/assets/images/banner.jpg", image1Data);
  //   } else {
  //     zip.file("src/assets/images/banner.jpg", state.image1);
  //     htmlFileString = htmlFileString.replace(
  //       /blob:([^"]+)/,
  //       `src/assets/images/banner.jpg`
  //     );
  //   }

  //   if (typeof state.image2 === "string") {
  //     const response2 = await fetch(state.image2);
  //     const image2Data = await response2.blob();
  //     zip.file("src/assets/images/banner2.jpg", image2Data);
  //   } else {
  //     zip.file("src/assets/images/banner2.jpg", state.image2);
  //     htmlFileString = htmlFileString.replace(
  //       /blob:([^"]+)/,
  //       `src/assets/images/banner2.jpg`
  //     );
  //   }

  //   if (typeof state.image3 === "string") {
  //     const response3 = await fetch(state.image3);
  //     const image3Data = await response3.blob();
  //     zip.file("src/assets/images/banner3.jpg", image3Data);
  //   } else {
  //     zip.file("src/assets/images/banner3.jpg", state.image3);
  //     htmlFileString = htmlFileString.replace(
  //       /blob:([^"]+)/,
  //       `src/assets/images/banner3.jpg`
  //     );
  //   }

  //   if (typeof state.contactImage === "string") {
  //     const response4 = await fetch(state.contactImage);
  //     const contactImageData = await response4.blob();
  //     zip.file("src/assets/images/contact.jpg", contactImageData);
  //   } else {
  //     zip.file("src/assets/images/contact.jpg", state.contactImage);
  //     htmlFileString = htmlFileString.replace(
  //       /blob:([^"]+)/,
  //       `src/assets/images/contact.jpg`
  //     );
  //   }

  //   zip.file("index.html", htmlFileString);

  //   zip.generateAsync({ type: "blob" }).then(function (content) {
  //     saveAs(content, `${state.title || "Your Website"}.zip`);
  //   });
  // };

  return (
    <>
      <p
        dangerouslySetInnerHTML={{ __html: htmlFileString }}
        style={{
          height: "100%",
        }}
      ></p>

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
          },
          {
            name: "Get In Touch",
            component: SelectedGetInTouchPage.UI(),
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
    </>
  );
}

export default App;
