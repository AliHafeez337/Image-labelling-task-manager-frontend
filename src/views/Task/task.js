import React from "react";
import { connect } from 'react-redux';

import ImageCard from "./ImageCard/imageCard";
import LabelsCard from "./Labels/labels"
import CategoriesCard from "./LabelCategories/categories"
import Button from "components/CustomButtons/Button.js";

import axios from '../../axiosSet'

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskId: '',
      task: {},
      thisPicture: {},
      thisPictureIndex: null,
      categories: [],
      categoryObjects: [],
      selectedCategory: null,
      labelObjects: [],
      selectedLabelObject: null,
      selectedLabel: null,
      labels: [],
      annoDuplicateInstance: null,
    }
  }
  componentDidMount() {

    // const script = document.createElement("script");
    // script.src = "./a.js";
    // script.async = true;
    // document.body.appendChild(script);

    // console.log(this.ref)
    console.log(this.props.taskId)
    // if (this.props.taskId){

      axios.get('/task/5ed20b50d052443ddc52963e')
      // axios.get('/task/' + this.props.taskId)
      .then(res => {
        this.setState({ task: res.data })
        if (res.data.photos[0]){
          this.setState({
            thisPicture: res.data.photos[0],
            thisPictureIndex: 0
          })
        }
        res.data.labels.forEach((value, indx) => {
          // console.log(value, indx)
          if (!this.state.categories.includes(res.data.labels[indx].category)){
            // this.state.categories.push(res.data.labels[indx].category)
            var tempArr = [...this.state.categories]
            var tempArr2 = [...this.state.categoryObjects]
            tempArr.push(res.data.labels[indx].category)
            tempArr2.push(res.data.labels[indx])
            this.setState({
              categories: tempArr,
              categoryObjects: tempArr2
            })
          }
        })
        this.getPicture(this.state.thisPicture._id)
      })
    // }
  }
  getPicture = id => {
    axios.get('/label/picture/'+ id)
    .then(res => {
      // console.log(res.data)
      this.setState({ labels: res.data })
    })
  }
  checkOldAnnoInstance = () => {
    // console.log(this.state.annoDuplicateInstance)
    if (this.state.annoDuplicateInstance){
      this.state.annoDuplicateInstance.destroy()
      this.setState({
        selectedLabelObject: null,
        selectedLabel: null
      })
    }
  }
  nextPictureHandler = () => {
    this.checkOldAnnoInstance()
    if (this.state.task.photos[this.state.thisPictureIndex + 1]){
      this.getPicture(this.state.task.photos[this.state.thisPictureIndex + 1]._id)
      this.setState({
        thisPicture: this.state.task.photos[this.state.thisPictureIndex + 1],
        thisPictureIndex: this.state.thisPictureIndex + 1
      })
    }
  }
  previousPictureHandler = () => {
    this.checkOldAnnoInstance()
    
    if (this.state.task.photos[this.state.thisPictureIndex - 1]){
      this.getPicture(this.state.task.photos[this.state.thisPictureIndex - 1]._id)
      this.setState({
        thisPicture: this.state.task.photos[this.state.thisPictureIndex - 1],
        thisPictureIndex: this.state.thisPictureIndex - 1
      })
    }
  }
  handleCategory = (value, index) => {
    this.checkOldAnnoInstance()
    if (this.state.selectedCategory !== index){
      this.setState({ 
        selectedLabel: null,
        selectedLabelObject: null
      })
    }
    this.setState({ selectedCategory: index})
    var tempArr = []
    this.state.task.labels.forEach((val) =>{
      // console.log(val.category)
      if (val.category === value.category){
        tempArr.push(val)
      }
    })
    this.setState({ labelObjects: tempArr })
  }
  handleLabelName = (value, index) => {
    this.checkOldAnnoInstance()
    this.setState({ 
      selectedLabel: index,
      selectedLabelObject: value
    })
  }
  handleLabellingDone = () => {
    this.setState({ 
      selectedLabel: null,
      selectedLabelObject: null
    })
  }
  handleAnnoInstance = (anno) => {
    this.state.annoDuplicateInstance = anno
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-8 col-md-8">
            <ImageCard 
              // ref="inner"
              // url= {"https://lokeshdhakar.com/projects/lightbox2/images/image-3.jpg"}
              photo = { this.state.thisPicture }
              labels = { this.state.labels }
              selectedLabelObject = { this.state.selectedLabelObject }
              taskId = { this.state.task._id }
              done = { this.handleLabellingDone }
              anno = { this.handleAnnoInstance }
            ></ImageCard>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <Button 
                  color="warning"
                  onClick = {this.previousPictureHandler}
                  round
                  >Previous Picture</Button>
                <Button 
                  color = "warning"
                  onClick = {this.nextPictureHandler}
                  round
                  >Next Picture</Button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <CategoriesCard
                  categories = { this.state.categoryObjects }
                  onSelectCategory = { this.handleCategory }
                  selectedCategory = { this.state.selectedCategory }
                ></CategoriesCard>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <LabelsCard
                  labelObjects = { this.state.labelObjects }
                  onSelectLabel = { this.handleLabelName }
                  selectedLabel = { this.state.selectedLabel }
                ></LabelsCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = state => {
  const a = {
    taskId: state.recentTaskId
  }
  // console.log(a.taskId)

  return a
}

export default connect(mapStoreToProps, null)(Task);