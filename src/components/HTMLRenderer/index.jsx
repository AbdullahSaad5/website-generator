import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
const HTMLRenderer = ({ htmlFileString }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    // Find and execute scripts in the injected HTML content
    const scripts = contentRef.current.querySelectorAll("script");
    scripts.forEach((script) => {
      const scriptElement = document.createElement("script");
      scriptElement.innerHTML = script.innerHTML;
      document.body.appendChild(scriptElement);
    });
  }, [htmlFileString]);

  return (
    <div
      ref={contentRef}
      style={{
        height: "100%",
      }}
    >
      {/* Inject the HTML content */}
      <div
        dangerouslySetInnerHTML={{ __html: htmlFileString }}
        style={{
          height: "100%",
        }}
      ></div>
    </div>
  );
};

export default HTMLRenderer;
