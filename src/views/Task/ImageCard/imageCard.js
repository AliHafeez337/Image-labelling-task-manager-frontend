import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { ReactPictureAnnotation } from "react-picture-annotation";

import { apiURL } from '../../../config';
// import an from './annotorious';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const arrVar = [
  {
    comment: "face",
    id: "mP2KXX",
    mark: {
      height: 246.2595658285179,
      type: "RECT",
      width: -246.25956582851788,
      x: 430.9800580977667,
      y: 84.80630579415902
    }
  },
  {
    comment: "haha",
    id: "mP2KXY",
    mark: {
      height: 246.2595658285179,
      type: "RECT",
      width: -150.25956582851788,
      x: 330.9800580977667,
      y: 184.80630579415902
    }
  }
]

const useStyles = makeStyles(styles);


const ImageCard = (props) => {
  // const [pageSize, setPageSize] = useState({
  const [, setPageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // console.log(pageSize.width)
  // console.log(pageSize.height)
  // console.log(props.selectedLabel)

  const onResize = () => {
    setPageSize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onSelect = selectedId => console.log(selectedId);
  const onChange = data => console.log(data);

  const classes = useStyles();

  try{
    console.log(props.photo._id)
    console.log(props.taskId)
    console.log(props.selectedLabelObject._id)
  }
  catch(e){}

  return (
    <div>
      {/* <script type="text/javascript" src="../../../assets/annotorious.min.js"></script> */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Picture</h4>
              <p className={classes.cardCategoryWhite}>Please label the picture below.</p>
            </CardHeader>
            <CardBody>
              {
                props.selectedLabelObject ? 
                <ReactPictureAnnotation
                  image = {apiURL + '/' + props.photo.url}
                  onSelect = {onSelect}
                  onChange = {onChange}
                  width = {500}
                  height = {800}
                  // width={pageSize.width}
                  // height={pageSize.height}
                  annotationData = {arrVar}
                />
                :
                <img 
                  className = "annotatable"
                  id = "annotoriousLabels"
                  src = {apiURL + '/' + props.photo.url} 
                  alt = "To be labelled..."
                  width = '100%'
                  height = '100%'
                />  
              }
            </CardBody>
            <CardFooter>
              <Button color="success">Save Changes</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default ImageCard;
