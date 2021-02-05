import React, { useEffect } from "react";
import app from "../../../src/firebase";
import { Container, Typography, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import "../../static/home.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";



const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#FFFFFF",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  main_container: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: 'center',
    alignItems: "center",
    flexGrow: "1",
  },
  custom: {
    color: "#ffffff",
    paddingTop: "23vh",
  },
  customButton: {
    marginTop: "40vh",
    right: "3%",
    color: "#FFFFFF",
    fontSize: "25px",
  },
  getStartedButton: {
    paddingLeft: "20%",
  },
}));

export default function Home() {
  const history = useHistory();

  const routeChange = () => {
    let path = `signup`;
    history.push(path);
  };

  useEffect(() => {
    console.log(app);
  }, []);

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <div className="main_container">
          <Container className={classes.main_container}>
            <Typography variant="h3" className={classes.custom}>
              Make 2021 the year of re-connection
            </Typography>
            <Button
              variant="outlined"
              className={classes.customButton}
              color="secondary"
              onClick={routeChange}
            >
              <p className="shimmer">Get Started</p>
            </Button>
          </Container>
        </div>
        <svg id="svgelem1" height="200" xmlns="http://www.w3.org/2000/svg">
          <circle id="redcircle" cx="50" cy="50" r="50" fill="red" />
        </svg>
        <svg id="svgelem3" height="200" xmlns="http://www.w3.org/2000/svg">
          <circle id="redcircle" cx="50" cy="50" r="50" fill="blue" />
        </svg>
        <div className="img-text-row">
          <img
            className="image-laptop"
            src="https://demos.creative-tim.com/now-ui-kit-react/static/media/hero-image-1.a76c7b4c.png"
            alt="Some Image"
          />
          <p className="img-text-row-text">
            Stay Updated about your field at the comport of your home. This is
            the best way to enhance in your career!
          </p>
        </div>
        <div className="img-text-row">
          <p className="img-text-row-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
            facilis ad quas illum quod, dolor hic sunt neque sapiente
            voluptatem.
          </p>
          <img
            className="image-laptop"
            src="https://demos.creative-tim.com/now-ui-kit-react/static/media/hero-image-2.9616730d.png"
            alt="Some Image"
          />
        </div>
        <svg id="svgelem2" height="200" xmlns="http://www.w3.org/2000/svg">
          <circle id="redcircle" cx="50" cy="50" r="50" fill="green" />
        </svg>
      </div>
      {/* <Footer /> */}
    </MuiThemeProvider>
  );
}
