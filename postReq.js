var express =require('express');
var bodyParser  =require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var Dequeue  = require('dequeue');
var dequeList = new Dequeue();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

app.get('/testo', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'todos retrieved successfully'
      
      
    })
  });

app.post('/VehicleAdding', (req, res) => {

  console.log(req.body);
  if(!req.body.v_title || 1==0 ) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    });
  } else if(1==0 ) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }
 const newVehicle = {
   id: req.body.id,
   v_title: req.body.v_title,
   v_category: req.body.v_category
 }
 console.log(newVehicle);
 dequeList.push(newVehicle);
 return res.status(201).send({
   success: 'true',
   message: 'todo added successfully',
   newVehicle
 })
});