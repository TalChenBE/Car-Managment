import { useState } from "react";
import menu from "../../utils/icons/sidenav.png";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import "./Sidenav.css";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setIsOpen(false)}
      onKeyDown={() => setIsOpen(false)}
    >
      <ListItemButton>
        <a className="sidenav-link" href="/Dashboard">
          Dashboard
        </a>
      </ListItemButton>

      <Divider />
      <label>Pages</label>
      <List>
        {[
          { text: "Dashboard", link: "Dashboard" },
          { text: "Contect us", link: "ContectUs" },
          { text: "Login", link: "Login" },
          { text: "Forget Password", link: "ForgetPassword" },
          { text: "Sing Up", link: "Signup" },
          { text: "Page Not Found", link: "PageNotFound" },
        ].map((element) => (
          <ListItem key={element.text} disablePadding>
            <ListItemButton>
              <a className="sidenav-link" href={`/${element.link}`}>
                {element.text}
              </a>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItemButton>
        <a className="sidenav-link" href="/">
          Loguot
        </a>
      </ListItemButton>
      <Divider />
    </Box>
  );

  return (
    <div className="sidenav">
      <img
        alt="menu"
        className="menu-icon"
        src={menu}
        onClick={() => setIsOpen(true)}
      />
      <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
        {list("left")}
      </Drawer>
    </div>
  );
};

export default Sidenav;
