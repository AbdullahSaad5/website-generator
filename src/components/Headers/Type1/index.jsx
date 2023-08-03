const index = () => {
  const code = `
    <header>
    <nav class="navigation-links">
      <ul>
        {{links}}
      </ul>
    </nav>
    <div class="logo-text">
      <div class="logo-text__logo">{{logo}}</div>
    </div>
    <div class="info">
      <ul>
        <li class="info__phone-number">{{phone}}</li>
        <li class="info__email">
          <a
            href="mailto:
            {{email}}"
            class="info__email-link"
          >
            {{email}}
          </a>
        </li>
      </ul>
    </div>

    <div class="hamburger-icon">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </header>

  <nav class="mobile-nav">
    <ul>
      {{links}}

      <li class="info__phone-number">{{phone}}</li>

      <li class="info__email">
        <a
          href="mailto:
          {{email}}"
          class="info__email-link"
        >
          {{email}}
        </a>
      </li>
    </ul>
  </nav>`;

  const styles = ` header {
    display: flex;
    align-items: center;
    padding: 4rem 8.5rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .navigation-links {
    flex: 1;
  }
  .navigation-links ul {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 3.5rem;
    flex-wrap: wrap;
  }

  .navigation-links__link {
    font-family: "Roboto", sans-serif;
    font-size: 1.6rem;
    font-weight: 500;
    letter-spacing: 0.2rem;
    transition: all 0.3s;
  }

  .logo-text {
    text-align: center;
    font-size: 3rem;
    font-family: "Prata", serif;
    padding-inline: 4rem;
  }

  .info {
    flex: 1;
    display: flex;
  }

  .info ul {
    margin-left: auto;
    display: flex;
    gap: 3.5rem;
    font-size: 1.6rem;
  }
  
  
  .hamburger-icon {
    display: none;
  }

  .hamburger-icon span {
    display: block;
    width: 3rem;
    height: 0.3rem;
    background-color: white;
    margin-bottom: 0.5rem;
    transition: all 0.3s;
  }

  .mobile-nav {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 300px;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    z-index: 100;
    display: flex;
    flex-direction: column;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s;
    padding-top: 5rem;
    padding-left: 3rem;
    font-size: 1.6rem;
    transform: translateX(-300px);
  }

  .mobile-nav.active {
    opacity: 1;
    pointer-events: all;
    transform: translateX(0);
  }
  .mobile-nav ul {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }


  @media screen and (max-width: 1500px) {
    .info,
    .navigation-links {
      display: none;
    }

    .logo-text {
      flex: 1;
    }

    .hamburger-icon {
      display: block;
    }

    .mobile-nav {
      opacity: 1;
      pointer-events: all;
    }
  }
  `;
  return [code, styles];
};

export default index;
