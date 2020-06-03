import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import NavigateNext from "@material-ui/icons/NavigateNext";

import axios from '../../../axiosSet'
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

  // try{
  //   console.log(apiURL + '/' + props.photo.url)
  //   console.log(props.photo)
  //   console.log(props.taskId)
  //   console.log(props.selectedLabelObject)
  // }
  // catch(e){}

  const Annotorious = window.Annotorious
  // console.log(Annotorious);
  // setTimeout(() => {
  //   // const anno = new Annotorious({ image: 'annotoriousLabels' });
  //   var anno = Annotorious.init({
  //     image: 'annotoriousLabels'
  //   });
    
  // }, 2000)

  if (props.selectedLabelObject){

    var annBody = [
      // {
      //   "type": "TextualBody",
      //   "purpose": "commenting",
      //   "value": "These are lips..."
      // },
      {
        "type": "TextualBody",
        "purpose": "tagging",
        "value": props.selectedLabelObject.category
      }, {
        "type": "TextualBody",
        "purpose": "tagging",
        "value": props.selectedLabelObject.name
      }
    ]
    
    var anno = Annotorious.init({
      image: 'annotoriousLabels'
    });
    props.anno(anno)
    
    // console.log(props.photo._id)
    anno.loadAnnotations('http://localhost:3100/label/picture/' + props.photo._id).then(function(annotations) {
      // Do something
      console.log(annotations)
    });
    
    axios.get('/label/picture/' + props.photo._id)
      .then(res => {
        console.log(res.data)
        for (let i = 0; i < res.data.length; i++){
          console.log(res.data[i].label)
          console.log(props.selectedLabelObject._id)
          if (res.data[i].label === props.selectedLabelObject._id){
            console.log('Selected Annotation', res.data[i])
            
            anno.selectAnnotation(res.data[i].id)
            break
          }
        }
      }
    )
    
    anno.applyTemplate(annBody, true)
    
    anno.on('selectAnnotation', function(annotation) {
      console.log('selected', annotation);
    });

    anno.on('createAnnotation', function(annotation) {
      // console.log('created', annotation);
      var obj = {
        task: props.taskId,
        label: props.selectedLabelObject._id,
        picture: props.photo._id,
        '@context': "http://www.w3.org/ns/anno.jsonld",
        id: annotation.id,
        type: annotation.type,
        body: annotation.body,
        target: annotation.target
      }
      console.log('created', obj)
      axios.post('/label/add', obj)
        .then(res => {
          // props.done()
          // anno.destroy()
        })
    });

    anno.on('updateAnnotation', function(annotation, previous) {
      // console.log('updated', previous, 'with', annotation);
      var obj = {
        task: props.taskId,
        label: props.selectedLabelObject._id,
        picture: props.photo._id,
        '@context': "http://www.w3.org/ns/anno.jsonld",
        id: annotation.id,
        type: annotation.type,
        body: annotation.body,
        target: annotation.target
      }
      console.log('updated', previous, 'with', obj)
      axios.post('/label/add', obj)
        .then(res => {
          // props.done()
          // anno.destroy()
        })
    });

    anno.on('deleteAnnotation', function(annotation) {
      console.log('deleted', annotation);
      var obj = {
        task: props.taskId,
        label: props.selectedLabelObject._id,
        picture: props.photo._id,
        '@context': "http://www.w3.org/ns/anno.jsonld",
        id: annotation.id,
        type: annotation.type,
        body: annotation.body,
        target: annotation.target
      }
      console.log('deleted', obj)
      axios.delete('/label/delete', {
          params: {id: obj.id}
        })
        .then(res => {
          // props.done()
          // anno.destroy()
        })
    });
  }

  const classes = useStyles();

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {/* <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Previous Picture",
                  tabIcon: NavigateBefore,
                  tabContent: (
                    <img 
                      className = "annotatable"
                      id = "annotoriousLabels"
                      src = {apiURL + '/' + props.photo.url} 
                      alt = "To be labelled..."
                      width = '100%'
                      height = '100%'
                    /> 
                  )
                },
                {
                  tabName: "Next Picture",
                  tabIcon: NavigateNext,
                  tabContent: (
                    <img 
                      className = "annotatable"
                      id = "annotoriousLabels"
                      src = {apiURL + '/' + props.photo.url} 
                      alt = "To be labelled..."
                      width = '100%'
                      height = '100%'
                    /> 
                  )
                }
              ]}
            /> */}
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
              <p><b>Note:</b> Select a category first, then the label, after that you'll be able to label the picture.</p>
              {/* <Button color="success">Save Changes</Button> */}
            </CardFooter>
            <CardFooter>
              <p><b>Note:</b> Progress will be saved on each step so don't worry.</p>
            </CardFooter>
            <CardFooter>
              <p><b>Note:</b> Upon every label click you'll see your old progress.</p>
            </CardFooter>
            <CardFooter>
              <p><b>Note:</b> One label can ony have one annotation on one picture.</p>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default ImageCard;
