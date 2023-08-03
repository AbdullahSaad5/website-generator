const index = () => {
  const code = `
    <section class="contact-page-1" id="contact-us">
    <div class="contact-form-container">
      <div class="contact-page-1__background-image">
        <img src="{{contactImage}}" alt="" />
      </div>
      <div class="contact-page-1__content">
        <div class="contact-page-1__content__wrapper">
        <h2>Contact</h2>
        <p>1512 Chemin de Stramousse, 06530 Grasse, Provence-Alpes-Côte d'Azur France</p>
        <p>Tel {{phone}}</p>
        <p>{{email}}</p>
        </div>
      </div>
  </div>
  </section>`;

  const styles = `
  /* Contact Page */

  .contact-page-1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fafafa;
    padding: 2rem;
  }

  .contact-form-container {
    width: 100%;
    max-width: 1100px;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.01);
    background-color: #fff;
  }

  .contact-page-1__background-image {
    flex: 1;
    max-height: 700px;
    height: 100%;
    width: 100%;
  }
  .contact-page-1__background-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .contact-page-1__content {
    flex: 1;
  }
  .contact-page-1__content__wrapper {
    padding: 8rem;
    color: black;
  }
  .contact-page-1__content__wrapper h2 {
    font-size: 6rem;
    font-weight: 400;
    font-family: "Prata", serif;
    margin-bottom: 3rem;
  }

  .contact-page-1__content__wrapper p {
    font-size: 1.8rem;
    font-weight: 300;
    margin-bottom: 2rem;
  }

  @media screen and (max-width: 1200px) {
    .contact-form-container {
      max-width: 800px;

    }
    .contact-page-1__background-image {
      max-height: 400px;
    }
    .contact-page-1__content__wrapper {
      padding: 4rem;
    }

    .contact-page-1__content__wrapper h2 {
      font-size: 4.5rem;
    }
  
    .contact-page-1__content__wrapper p {
      font-size: 1.5rem;
    }
  }

    @media screen and (max-width: 800px) {

      .contact-page-1{
        padding: 0 5rem;
      }
      .contact-form-container {
        flex-direction: column;
      }
    
    }
  `;

  return [code, styles];
};

export default index;
