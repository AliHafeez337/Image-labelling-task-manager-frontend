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
// import { Annotorious } from '@recogito/annotorious/src';
// import ReactImageAnnotate from "react-image-annotate"
// @import url("https://rsms.me/inter/inter.css");
import {TwoDimensionalImage} from "react-annotation-tool";
import myData from './annotations.w3c.json';

import { apiURL } from '../../../config';

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

// const arrVar = [
//   {
//     comment: "face",
//     id: "mP2KXX",
//     mark: {
//       height: 246.2595658285179,
//       type: "RECT",
//       width: -246.25956582851788,
//       x: 430.9800580977667,
//       y: 84.80630579415902
//     }
//   },
//   {
//     comment: "haha",
//     id: "mP2KXY",
//     mark: {
//       height: 246.2595658285179,
//       type: "RECT",
//       width: -150.25956582851788,
//       x: 330.9800580977667,
//       y: 184.80630579415902
//     }
//   }
// ]


const useStyles = makeStyles(styles);


const ImageCard = (props) => {
//   const options = {id: "0", value: "root", children: [
//     {id: "1", value: "Head", children: [
//        {id: "1-1", value: "Lips", children: []}, 
//        {id: "1-2", value: "Tongue", children: []}
//     ]},
//     {id: "2", value: "Arm", children: [
//       {id: "2-1", value: "Hand", children: []}, 
//     ]},
//     {id: "3", value: "Leg", children: [
//       {id: "3-1", value: "Foot", children: []}, 
//       {id: "3-2", value: "Knee", children: []}
//     ]}
//  ]}

  // const anno = new Annotorious({ image: 'annotoriousLabels' });
  // const script = document.createElement("script");
  // script.src = './a.js';
  // script.async = true;
  // document.body.appendChild(script);

  // const [pageSize, setPageSize] = useState({
  // const [, setPageSize] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight
  // });

  // console.log(pageSize.width)
  // console.log(pageSize.height)
  // console.log(props.selectedLabel)

  // const onResize = () => {
  //   setPageSize({ width: window.innerWidth, height: window.innerHeight });
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", onResize);
  //   return () => window.removeEventListener("resize", onResize);
  // }, []);

  // const onSelect = selectedId => console.log(selectedId);
  // const onChange = data => console.log(data);

  var annBody = [{
      "type": "TextualBody",
      "purpose": "commenting",
      "value": "These are lips..."
    }
    , {
      "type": "TextualBody",
      "purpose": "tagging",
      "value": "Lips"
    }, {
      "type": "TextualBody",
      "purpose": "tagging",
      "value": "Face"
    }
  ]

  const Annotorious = window.Annotorious
  console.log(Annotorious);
  // setTimeout(() => {
  //   // const anno = new Annotorious({ image: 'annotoriousLabels' });
  //   var anno = Annotorious.init({
  //     image: 'annotoriousLabels'
  //   });
    
  // }, 2000)

  if (props.selectedLabelObject){
    var anno = Annotorious.init({
      image: 'annotoriousLabels'
    });
    
    anno.loadAnnotations('http://localhost:3100/label/picture/5ed3bab2b5d460542ce12081').then(function(annotations) {
      // Do something
      console.log(annotations)
    });
    
    anno.applyTemplate(annBody, false)
    
    anno.on('selectAnnotation', function(annotation) {
      console.log('selected', annotation);
    });

    anno.on('createAnnotation', function(a) {
      console.log('created', a);
    });

    anno.on('updateAnnotation', function(annotation, previous) {
      console.log('updated', previous, 'with', annotation);
    });

    anno.on('deleteAnnotation', function(annotation) {
      console.log('deleted', annotation);
    });
  }

  const classes = useStyles();

  try{
    console.log(apiURL + '/' + props.photo.url)
    console.log(props.photo._id)
    console.log(props.taskId)
    console.log(props.selectedLabelObject._id)
  }
  catch(e){}

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Picture labelling area.</h4>
              <p className={classes.cardCategoryWhite}>Please select a category first, then the label, after that you'll be able to label the picture.</p>
            </CardHeader>
            <CardBody>
              <img 
                className = "annotatable"
                id = "annotoriousLabels"
                src = {apiURL + '/' + props.photo.url} 
                alt = "To be labelled..."
                width = '100%'
                height = '100%'
              />  
              {/* {
                props.selectedLabelObject ? 
                
                // <ReactPictureAnnotation
                //   image = {apiURL + '/' + props.photo.url}
                //   onSelect = {onSelect}
                //   onChange = {onChange}
                //   width = {500}
                //   height = {800}
                //   // width={pageSize.width}
                //   // height={pageSize.height}
                //   annotationData = {arrVar}
                // />
                
                // <ReactImageAnnotate
                //   selectedImage={apiURL + '/' + props.photo.url}
                //   taskDescription="# Draw region around each face\n\nInclude chin and hair."
                //   images={[{ src: "http://localhost:3100/5ed20b50d052443ddc52963e/1590824002588.JPG-DSC_0005 (3).JPG", name: "Image 1" }]}
                //   regionClsList={["Man Face", "Woman Face"]}
                // />

                // <TwoDimensionalImage
                //   url = {apiURL + '/' + props.photo.url}
                //   className = 'annotatable'
                //   hasSkipButton = {true}
                //   onSkipClick = {onChange}
                //   isLabelOn = {true}
                //   isDynamicOptionsEnable = {true}
                //   options = {options}
                //   isDynamicOptionsEnable = {false}
                //   // isViewOnlyMode = {true}
                //   disabledOptionLevels = "1"
                // />
                :
                <img 
                  className = "annotatable"
                  id = "toBeLabelled"
                  src = {apiURL + '/' + props.photo.url} 
                  alt = "To be labelled..."
                  width = '100%'
                  height = '100%'
                />  
              } */}
            </CardBody>
            <CardFooter>
              <Button color="success">Save Changes</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      {/* <script type="text/javascript" src="./a.js"></script> */}
      {/* <script>
        (function() {
          console.log('aaa', window.Annotorious)
          // var anno = Annotorious.init({
          //   image: 'hallstatt'
          // });

          // anno.loadAnnotations('annotations.w3c.json');
        })()
      </script> */}
    </div>
  );
}

export default ImageCard;
