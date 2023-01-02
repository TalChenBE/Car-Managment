import "./ContectUs.css";

const ContectUs = () => {
  let isPasswordValid = false;
  let isTrueLength, hasUpperCase, hasLowerCase, hasNum, format, hasSpecialChar;
  let passwordVal;
  let issue;
  const handleChangeName = () => {
    const nameInput = document.getElementsByClassName("contact-input-name")[0];
    if (nameInput.value == "") nameInput.style.borderBottom = "2px solid red";
    else nameInput.style.borderBottom = " 2px solid #b0b3b9";
  };

  const handleChangeEmail = () => {
    const emailInput = document.getElementsByClassName(
      "contact-input-email"
    )[0];
    if (emailInput.checkValidity() == false)
      emailInput.style.borderBottom = "2px solid red";
    else emailInput.style.borderBottom = " 2px solid #b0b3b9";
  };

  const handelDropdwonClick = () => {
    const menu = document.getElementById("dropdown-menu");
    console.log("style of menu:", menu.style.display);
    menu.style = `display:${menu.style.display == "none" ? "block" : "none"}`;
  };

  const handelDropdwonItemClick = (event) => {
    const menu = document.getElementById("dropdown-menu");
    menu.style = `display:${menu.style.display == "none" ? "block" : "none"}`;
    issue = event.target.innerText;
  };
  const handelSubmitClick = () => {};

  return (
    <div>
      <form className="contact-page" onSubmit={() => handelSubmitClick()}>
        <div className="left">
          <div className="overlay">
            <h1>Contact Us</h1>
            <div className="contact-container">
              <div className="support">
                <h2>24/7 support</h2>
                <button type="button" className="btn btn-outline-info">
                  Contact Support
                </button>
              </div>
              <div>
                <div className="contact-container-items">
                  <h2>CALL SALER NOW</h2>
                  <span className="flex-container">
                    <i className="fa fa-whatsapp fa-phone"></i>
                    <i className="fa fa-phone"></i>
                    <p>+972-5371-648</p>
                  </span>
                </div>
                <div className="contact-container-items">
                  <h2>Located:</h2>
                  <span className="flex-container">
                    <i className="fa fa-map-marker"></i>
                    <p>Carmiel, yafe 104</p>
                  </span>
                </div>
                <div className="contact-container-items">
                  <h2>MAIL US NOW</h2>
                  <span className="flex-container">
                    <i className="fa fa-envelope"></i>
                    <p>contact_us@best.pro.co.il</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <h2 className="contact-header">Contact Us</h2>
          <div className="contact-name-continer inputs">
            <input
              className="contact-input contact-input-name"
              type="string"
              placeholder="Enter name *"
              required
              onBlur={() => handleChangeName()}
            />
          </div>
          <div className="contact-email-continer inputs">
            <input
              className="contact-input contact-input-email"
              type="email"
              placeholder="Enter email *"
              required
              onBlur={() => handleChangeEmail()}
            />
          </div>
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="true"
              onClick={() => handelDropdwonClick()}
            >
              Contact us concerning: *
            </button>
            <ul
              className="dropdown-menu"
              id="dropdown-menu"
              style={{ display: "none" }}
            >
              <li
                className="dropdown-item"
                onClick={(e) => handelDropdwonItemClick(e)}
              >
                Erorr in login
              </li>
              <li
                className="dropdown-item"
                onClick={(e) => handelDropdwonItemClick(e)}
              >
                Erorr in signin
              </li>
              <li
                className="dropdown-item"
                onClick={(e) => handelDropdwonItemClick(e)}
              >
                About us
              </li>
              <li
                className="dropdown-item"
                onClick={(e) => handelDropdwonItemClick(e)}
              >
                Other
              </li>
            </ul>
          </div>
          <div className="contact-subject-continer inputs">
            <textarea
              className="form-control textarea-subject"
              aria-label="Enter subject *"
              required
            ></textarea>
          </div>
          <div className="submit-continer">
            <input
              className="submit-button"
              type="submit"
              value="Create my account"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContectUs;
