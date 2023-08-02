const index = () => {
  const styles = `
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html {
      height: 100%;
      font-size: 62.5%;
      font-family: "Plus Jakarta Sans", sans-serif !important;
      scroll-behavior: smooth;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: "Prata", serif;
    }

    body {
      line-height: 1.5;
      color: white;
      height: 100%;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    ul {
      list-style: none;
      font-family: inherit;
    }
    a,
    button {
      cursor: pointer;
      font-family: inherit !important;
    }

    section {
      height: 100%;
    }`;
  return styles;
};

export default index;
