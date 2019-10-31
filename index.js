//var express =require('express');
//var app2= express();

const electron =require('electron');
const fetch = require('node-fetch');

const apiReq= require('./Request');
//const apiNode=require('./Node');
const http=require('http');

const {app,BrowserWindow}=require('electron');

var resppp="default resppponseee";
let listMain=[];

app.on('ready',createWindow)


// New Vehicle and push deque
var express =require('express');
var bodyParser  =require('body-parser');
const app2 = express();

app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: false }));

var Dequeue  = require('dequeue');
var dequeList = new Dequeue();

const PORT = 5000;

app2.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

app2.get('/testo', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'todos retrieved successfully'
      
      
    })
  });

//app2. post metodunun yeri





function createWindow(){


    async function subscribe() {
      
        let response = await fetch("http://localhost:9090/all");
        
        if (response.status == 502) {
    
            console.log("asyn func long poll 3");
            console.log("asyn func long poll 3");
          // Status 502 is a connection timeout error,
          // may happen when the connection was pending for too long,
          // and the remote server or a proxy closed it
          // let's reconnect
          await subscribe();
        } else if (response.status != 200) {
    
            console.log("asyn func long poll 4");
          // An error - let's show it
          console.log("response status 200 değil");
         
          // Reconnect in one second
          await new Promise(resolve => setTimeout(resolve, 1000));
          await subscribe();
        } else {
         

     

         let message2 = await response.text();
         var myObj=JSON.parse(message2);

         win.webContents.send('outputKey', myObj.sayi);
         
         
         for(var i=0;i<myObj.liste.length;i++){

       
           

           if(myObj.liste.length!=listMain.length){
            listMain.push(
                
                myObj.liste[myObj.liste.length-1]
            )

            console.log(listMain[listMain.length -1]);
            win.webContents.send('outputKey2',listMain[listMain.length -1]);
          }
        
        }

          // Call subscribe() again to get the next message
          await subscribe();
        }
      
    } 

      subscribe();
    
      const {ipcMain} =require('electron')

      
    let win =new BrowserWindow({

        width:800,
        height:600,

        webPreferences:{
            nodeIntegration:true
        }

    })

    
    win.loadFile('index.html');


    ipcMain.on('uiToLcNewvehicle', (err, data) => {
       
        console.log(data);
        dequeList.unshift(data);
        win.webContents.send('dequeList',dequeList);

        if(data){

            console.log("data var");
            fetch("http://localhost:9090/VehicleAdding", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))

     }
        
        })

        // lc den gelen vehicle nesnelerinin bir deque ye eklenmesi

        app2.post('/VehicleAdding', (req, res) => {

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
        
         dequeList.push(newVehicle);
         console.log(dequeList);
         win.webContents.send('dequeList',dequeList);
        
        
         return res.status(201).send({
           success: 'true',
           message: 'todo added successfully',
           newVehicle
         })
        });


        //araç geçiş onayıyla en öndeki araç listeden çıkar

        app2.post('/VehicleRemoving', (req, res) => {

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
       
         dequeList.shift();
         
         console.log(dequeList);
         win.webContents.send('dequeList',dequeList);
        
        
         return res.status(201).send({
           success: 'true',
           message: 'todo added successfully',
           
         })
        });



}






apiReq.callApi(function(response){
            resppp=response;
 });



    console.log("while sonrası");
apiReq.callApi(function(response){
   
   if(resppp!=response)
   {
        resppp=response;
       

    }
   

});








