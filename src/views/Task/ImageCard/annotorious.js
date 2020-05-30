{/* <script type="text/javascript" src="annotorious.min.js"></script> */}
const an = () => {
  

  console.log(Annotorious)
  var anno = Annotorious.init({
    image: 'hallstatt'
  });
  
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
  
  anno.loadAnnotations('annotations.w3c.json');
}

module.exports(an)