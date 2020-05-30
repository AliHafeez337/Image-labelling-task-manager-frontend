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

const CategoriesCard = (props) => {
  const classes = useStyles();
  const rows = []
  
  props.categories.forEach((value, indx) => {
    // console.log(value)
    rows.push(
      <tr 
        key = { indx } 
        onClick = { () => props.onSelectCategory(value, indx) }
        className = { props.selectedCategory == indx ? "bg-success" : null}>
        <th scope="row">{indx + 1}</th>
        <td>{value.category}</td>
      </tr>
    )
  })

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Categories</h4>
            </CardHeader>
            <CardBody>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Names</th>
                  </tr>
                </thead>
                <tbody>
                  { rows }
                </tbody>
              </table>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default CategoriesCard;
