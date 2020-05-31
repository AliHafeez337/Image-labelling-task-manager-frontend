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

// import { Annotorious } from '@recogito/annotorious';
import { Annotation } from 'react-image-annotation';


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

const useStyles = makeStyles(styles);


const ImageCard = (props) => {
  const classes = useStyles();
  // console.log(props.photo)

  // var loadScript = function(src) {
  //   var tag = document.createElement('script');
  //   tag.async = false;
  //   tag.src = src;
  //   document.getElementsByTagName('body').appendChild(tag);
  // }
  
  // const anno = new Annotorious({ image: 'annotoriousLabels' });
  if (props.photo.url){
  }
  

  const fun = () => {
    // loadScript('../../../assets/annotorious.min.js')
    // console.log(Annotorious)
    // var anno = Annotorious.init({
    //   image: 'annotorious-Labels'
    // });
    
    // anno.on('selectAnnotation', function(annotation) {
    //   console.log('selected', annotation);
    // });

    // anno.on('createAnnotation', function(a) {
    //   console.log('created', a);
    // });

    // anno.on('updateAnnotation', function(annotation, previous) {
    //   console.log('updated', previous, 'with', annotation);
    // });

    // anno.on('deleteAnnotation', function(annotation) {
    //   console.log('deleted', annotation);
    // });
    
    // anno.loadAnnotations('annotations.w3c.json');
  }
  
  return (
    <div>
      {/* <script type="text/javascript" src="../../../assets/annotorious.min.js"></script> */}
      {fun()}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Picture</h4>
              <p className={classes.cardCategoryWhite}>Please label the picture below.</p>
            </CardHeader>
            <CardBody>
              {/* <Annotation
                src={apiURL + '/' + props.photo.url}
                alt='Two pebbles anthropomorphized holding hands'

                annotations={this.state.annotations}

                type={this.state.type}
                value={this.state.annotation}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
              /> */}
              {/* <img 
              className = "annotatable"
              id = "annotoriousLabels"
              src = {apiURL + '/' + props.photo.url} 
              alt = "To be labelled..."
              width = '100%'
              height = '100%'
              /> */}
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
