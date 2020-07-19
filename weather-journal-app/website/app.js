/* Global Variables */
var tempInClusis;
var serverData;
var flag=true;
var massage="";
let zipCode=document.getElementById("zip");
let cont=document.getElementById("feelings");
const dateDv=document.getElementById("date");
const tempDv=document.getElementById("temp");
const contentDv=document.getElementById("content");
const entryHolderDv=document.getElementById("entryHolder");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// get temp from external api
getTemp=async (zipCode)=>{
    
    const url="http://api.openweathermap.org/data/2.5/weather?zip=";
    const key="&appid=7bec44cbaaad420b4c0b0a3666c80a6c&units=metric";
    const api=url+zipCode+key;
    let res=await fetch(api)
    try {
        let data=await res.json();
        tempInClusis=Math.floor(data.main.temp);
        flag=true;
    } catch (error) {
        massage=`can't receive Data from external API {${error}}`;
        flag=false;
    };
};

//use post route to send data to server side
postData =async( url = '', data={})=>{
    let res=await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},      
        body: JSON.stringify(data)
       }
    );
    try {
        let r=await res.text();
        flag=true;
    } catch (error) {
        massage=`can't send Data to local server {${error}}`;
        flag=false;
    }
};

//using get route to receive data from server side 
let getData= async (url='')=>{
    let res=await fetch(url,{method: 'get'})
    try{
        data=await res.json();
        serverData={date:data.date ,temp:data.temp,content:data.content};
        flag=true;
    }catch(error){
        massage=`can't receive Data from local server{${error}}`;
        flag=false;
    };
};


// according to data received update divs of (temp ,date ,content) in UI
updateUI=()=>{ 
    if(flag===true){
        dateDv.innerHTML=`Date : ${serverData.date}`;
        tempDv.innerHTML=`Tempreture : ${serverData.temp} C`;
        contentDv.innerHTML=`Content : ${serverData.content}`;
    }else{
         entryHolderDv.innerHTML=`Error: ${massage}`;
    }
    
}


// button generate Event 
document.getElementById("generate").addEventListener("click",async ()=>{
 
    await getTemp(zipCode.value);    
    let dataObj={date:newDate ,temp:tempInClusis,content:cont.value};
    postData("/storeData",dataObj);
    await getData("/getData");
    updateUI();

});

