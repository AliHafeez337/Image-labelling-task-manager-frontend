import React from "react";
import ImageCard from "./ImageCard/imageCard";
import LabelsCard from "./Labels/labels"
import CategoriesCard from "./LabelCategories/categories"

import Button from "components/CustomButtons/Button.js";

import axios from '../../axiosSet'

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {},
      thisPicture: {},
      thisPictureIndex: null,
      categories: [],
      categoryObjects: [],
      selectedCategory: null,
      labelObjects: [],
      selectedLabel: null,
    }
  }
  componentDidMount() {  
    axios.get('/task/5ed20b50d052443ddc52963e')
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
        console.log(this.state.categories)
      })
  }
  nextPictureHandler = () => {
    if (this.state.task.photos[this.state.thisPictureIndex + 1]){
      this.setState({
        thisPicture: this.state.task.photos[this.state.thisPictureIndex + 1],
        thisPictureIndex: this.state.thisPictureIndex + 1
      })
    }
  }
  previousPictureHandler = () => {
    if (this.state.task.photos[this.state.thisPictureIndex - 1]){
      this.setState({
        thisPicture: this.state.task.photos[this.state.thisPictureIndex - 1],
        thisPictureIndex: this.state.thisPictureIndex - 1
      })
    }
  }
  handleCategory = (value, index) => {
    this.setState({ selectedCategory: index})
    var tempArr = []
    this.state.task.labels.forEach((val) =>{
      console.log(val.category)
      if (val.category === value.category){
        tempArr.push(val)
      }
    })
    this.setState({ labelObjects: tempArr })
  }
  handleLabelName = (value, index) => {
    this.setState({ selectedLabel: index})
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-8 col-md-8">
            <ImageCard 
              // url= {"https://lokeshdhakar.com/projects/lightbox2/images/image-3.jpg"}
              photo= {this.state.thisPicture}
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

export default Task;