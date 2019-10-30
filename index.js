var express =require('express');
var app2= express();

const electron =require('electron');
const fetch = require('node-fetch');

const apiReq= require('./Request');
//const apiNode=require('./Node');
const http=require('http');

const {app,BrowserWindow}=require('electron');

var resppp="default resppponseee";
let listMain=[];

app.on('ready',createWindow)






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
    
    
    
    


    console.log("create window");

    const {ipcMain} =require('electron')

    console.log("elect requ");

    



           

   

        console.log(resppp);

 
        
    



    console.log("sync");

    let win =new BrowserWindow({

        width:800,
        height:600,

        webPreferences:{
            nodeIntegration:true
        }

    })
 
/*
    win.webContents.send('h1:getter',resppp);
    */
    win.loadFile('index.html');


    ipcMain.on('inputKey', (err, data) => {
       
        console.log(data);

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


}




app2.post('/VehicleAdding', (req,res)=>

{

  return res.send('post mesajı alındı');

});

console.log("while öncesi");


app2.listen(3000, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);

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




/*
http.createServer((req,res)=> {

    if(req.url==="/request"){

        apiReq.callApi(function(response){

            console.log(response);
            resppp=response;
            res.write(JSON.stringify(response));

            res.end();



        });

    }

    else{

    console.log("hatalı işlem...")
}

}).listen(3000)
*/





