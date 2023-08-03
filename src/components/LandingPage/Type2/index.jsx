const index = () => {
  const code = `
  <section class="landing-page-2">
  <div class="landing-page-2__content">
    <div class="landing-page-2__content__background"></div>
    <div class="landing-page-2__content__foreground">
      <div class="landing-page-2__content__wrapper">
        <div class="landing-page-2__content__inner__wrapper">
          <div class="landing-page-2__content__text">
            <h1 class="landing-page-2__content__text__heading">
              {{tagline}}
            </h1>
            <p class="landing-page-2__content__text__description">
              We offer a wide variety of doors & windows, with a wide range of
              styles and sizes to choose from.
            </p>
          </div>

        <div class="landing-page-2__content__button__wrapper">
          <button class="landing-page-2__content__button" id="btn-1">
            {{Button Text}}
          </button>
          <button class="landing-page-2__content__button" id="btn-2">
            {{Button Text}}
          </button>
        </div>
        </div>
      </div>
      <div class="landing-page-2__content__image"></div>
    </div>
  </div>
</section>

`;

  const styles = `


.landing-page-2 {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color:#000c66;
}

.landing-page-2 h1,
.landing-page-2 h2,
.landing-page-2 h3,
.landing-page-2 h4,
.landing-page-2 h5,
.landing-page-2 h6 {
  font-family: "Space Grotesk", sans-serif;
}

.landing-page-2__content {
  max-width: 1400px;
  max-height: 700px;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  background-color: #dfebf6;
}

.landing-page-2__content__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/src/assets/images/landing-2-background-image.png");
  background-position: center center;
  background-repeat: repeat;
  opacity: 0.5;
}

.landing-page-2__content__foreground {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  overflow: hidden;
  z-index: 2;
}

.landing-page-2__content__wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5rem;

  flex: 9
}

.landing-page-2__content__inner__wrapper {
  padding: 8rem;
}

.landing-page-2__content__text {
  margin-bottom: 5rem;

}

.landing-page-2__content__text__heading {
  font-size: 7rem;
  line-height: 1.2;
  font-weight: 600;
  display: flex;
  flex-direction: column;
}

.landing-page-2__content__text__description {
  font-size: 2rem;
}

.landing-page-2__content__button__wrapper{
display:flex;
flex-direction:row;
gap:2rem;

}

.landing-page-2__content__button {
  padding: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  background-color: transparent;
  color: #000c66;
  outline: none;
  border: 3px solid #000c66;
  transition: all 0.3s;
}

.landing-page-2__content__button#btn-1 {
  background-color: #000c66;
  color: white;
}


.landing-page-2__content__button:hover {
  background-color: white;
  color: black;
}

.landing-page-2__content__image {
  flex: 8;
  height: 100%;
  background-image: url("{{image1}}");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
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
  .landing-page-2__content__text__heading {
    font-size: 4rem;
  }

  .landing-page-2__content__button {
    padding: 1rem 2rem;
    font-size: 1.2rem;
  }

  .landing-page-2__content__text {
    max-width: 600px;
  }
}
`;

  return [code, styles];
};

export default index;
