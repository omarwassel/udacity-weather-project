/* Global Variables */
var tempInClusis;
var serverData;
let zipCode=document.getElementById("zip");
let cont=document.getElementById("feelings");
const dateDv=document.getElementById("date");
const tempDv=document.getElementById("temp");
const contentDv=document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// get temp from external api
getTemp=async (zipCode)=>{
    
    const url="http://api.openweathermap.org/data/2.5/weather?zip=";
    const key=",us&appid=7bec44cbaaad420b4c0b0a3666c80a6c";
    const api=url+zipCode+key;
    await fetch(api).then(res=>{
        let data=res.json();
        return data;
    }).then(data=>{
        tempInClusis=Math.floor(data.main.temp)-273;
    });

    
};

//use post route to send data to server side
postData =async( url = '', data={})=>{
    await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},      
        body: JSON.stringify(data)
       }
    );
};

//using get route to receive data from server side 
let getData= async (url='')=>{
    await fetch(url,{method: 'get'})
    .then((res)=>res.json()).then(data=>{
         serverData={date:data.date ,temp:data.temp,content:data.content};
    });
};


// according to data received update divs of (temp ,date ,content) in UI
updateUI=()=>{ 
    dateDv.textContent=`Date : ${serverData.date}`;
    tempDv.textContent=`Tempreture : ${serverData.temp} C`;
    contentDv.textContent=`Content : ${serverData.content}`;
}


// button generate Event 
document.getElementById("generate").addEventListener("click",async ()=>{
 
    await getTemp(zipCode.value);    
    let dataObj={date:newDate ,temp:tempInClusis,content:cont.value};
    postData("/storeData",dataObj);
    await getData("/getData");
    updateUI(serverData);

});

