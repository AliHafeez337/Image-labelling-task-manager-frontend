import React from "react";
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

const useStyles = makeStyles(styles);

const ImageCard = (props) => {

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
  // console.log(Annotorious);
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
