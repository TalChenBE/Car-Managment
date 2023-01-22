import { useRef, useState } from "react";
import axios from "../../api/axios";
import "./ContectUs.css";

const CONTECTUS_URL = "contact_us";

const ContectUs = () => {
  const [subject, setSubject] = useState("Contact us concerning: *");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const menuRef = useRef(null);
  const messageRef = useRef(null);
  const confirmRef = useRef(null);

  const handleChangeName = () => {
    if (nameRef.current.value === "")
      nameRef.current.style.borderBottom = "2px solid red";
    else nameRef.current.style.borderBottom = " 2px solid #b0b3b9";
  };

  const handleChangeEmail = () => {
    if (emailRef.current.checkValidity() === false)
      emailRef.current.style.borderBottom = "2px solid red";
    else emailRef.current.style.borderBottom = " 2px solid #b0b3b9";
  };

  const handelDropdwonClick = () => {
    menuRef.current.style = `display:${
      menuRef.current.style.display === "none" ? "block" : "none"
    }`;
  };

  const handelDropdwonItemClick = (event) => {
    handelDropdwonClick();
    setSubject(event.target.innerText);
  };

  const handelSubmitClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        CONTECTUS_URL,
        JSON.stringify({
          name: nameRef.current.value,
          email: emailRef.current.value.toLocaleLowerCase(),
          subject: subject,
          body: messageRef.current.value,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      confirmRef.current.innerText = "Send the message";
      confirmRef.current.style.background = "#13b8609b";
      confirmRef.current.style.color = "#111";
      // const accessToken = response?.data?.accessToken;
      // setAuth({ email: email, password: password, accessToken });
    } catch (err) {
      console.error(err?.response.data.message);
    }
  };

  return (
    <div>
      <form className="contact-page" onSubmit={handelSubmitClick}>
        <div className="left">
          <div className="overlay">
            <h1>Contact Us</h1>
            <div className="contact-container">
              <div className="support">
                <h2>24/7 support</h2>
                <a
                  href={`mailto:car.managemnet.service@gmail.com?`}
                  className="btn btn-outline-info"
                >
                  Contact Support
                </a>
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
                    <p>car.managemnet.service@<br/>gmail.com</p>
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
              ref={nameRef}
              required
              onBlur={handleChangeName}
            />
          </div>
          <div className="contact-email-continer inputs">
            <input
              className="contact-input contact-input-email"
              type="email"
              ref={emailRef}
              placeholder="Enter email *"
              required
              onBlur={handleChangeEmail}
            />
          </div>
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="true"
              onClick={handelDropdwonClick}
            >
              {subject}
            </button>
            <ul
              className="dropdown-menu"
              ref={menuRef}
              style={{ display: "none" }}
            >
              <li className="dropdown-item" onClick={handelDropdwonItemClick}>
                Erorr in login
              </li>
              <li className="dropdown-item" onClick={handelDropdwonItemClick}>
                Erorr in signin
              </li>
              <li className="dropdown-item" onClick={handelDropdwonItemClick}>
                About us
              </li>
              <li className="dropdown-item" onClick={handelDropdwonItemClick}>
                Other
              </li>
            </ul>
          </div>
          <div className="contact-subject-continer inputs">
            <textarea
              className="form-control textarea-subject"
              // aria-label="Enter subject *"
              ref={messageRef}
              required
            ></textarea>
          </div>

          <div className="submit-continer">
            <input className="submit-button" type="submit" value="Submit" />
          </div>
          <div ref={confirmRef} className="confirm-msg"></div>
        </div>
      </form>
    </div>
  );
};

export default ContectUs;
