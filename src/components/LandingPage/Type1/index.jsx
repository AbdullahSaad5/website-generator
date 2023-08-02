const index = () => {
  const code = `
    <section class="landing-page-1">
        <div class="landing-page-1__text">
          <h1 class="landing-page-1__text__heading">
            <span class="landing-page-1__text__heading__part-1"></span>
             {{tagline}}
            </span>
       
          </h1>

          <button class="landing-page-1__text__button">{{Button Text}}</button>
        </div>
      </section>
`;

  const styles = `
main {
  height: 100%;
}

.landing-page-1 {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;

  background-repeat: no-repeat;
  /* background-position: center; */
  background-position: 0 0;
  /* background-attachment: fixed; */
  animation: imageChange 20s infinite ease-in-out;
}

.landing-page-1__text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  gap: 5rem;
  max-width: 1000px;
}

.landing-page-1__text__heading {
  font-size: 7rem;
  font-weight: 400;
  font-family: "Prata", serif;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.landing-page-1__text__button {
  padding: 2rem 4rem;
  font-size: 1.6rem;
  text-transform: uppercase;
  font-weight: 500;
  background-color: transparent;
  color: white;
  outline: none;
  border: 3px solid white;
  transition: all 0.3s;
}

.landing-page-1__text__button:hover {
  background-color: white;
  color: black;
}

@keyframes imageChange {
  0%,
  28%,
  100% {
    background-image: url("{{image1}}");
  }
  35%,
  63% {
    background-image: url("{{image2}}");
  }
  70%,
  94% {
    background-image: url("{{image3}}");
  }
}

@media screen and (max-width: 1000px) {
  .landing-page-1__text__heading {
    font-size: 4rem;
  }

  .landing-page-1__text__button {
    padding: 1rem 2rem;
    font-size: 1.2rem;
  }

  .landing-page-1__text {
    max-width: 600px;
  }
}
`;

  return [code, styles];
};

export default index;
