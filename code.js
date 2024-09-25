// let aladhanurl = "http://api.aladhan.com/v1/timings/24-09-2024?latitude=40.7128&longitude=-74.0060&method=3";
// let cityapiurl = "https://api.opencagedata.com/geocode/v1/json?q=Giza&key=76ba4592215c448b99da1b8912d0a979";
let Fajr;
let Sunrise;
let Duhr;
let Asr;
let Maghrib;
let Isha;
let prayertime = document.querySelectorAll(".prayertime p");
inputcity = document.getElementById("city"); 
inputdate = document.getElementById("date"); 
let mycity = "";
let mydate = "";
let citylat;
let citylng;
let mybutton = document.getElementsByTagName("button")[0];

mybutton.onclick = function (){
    if(inputcity.value !=="" && inputdate.value !== ""){
        mycity = inputcity.value; 
        mydate = inputdate.value; 
        cityapiurl = `https://api.opencagedata.com/geocode/v1/json?q=${mycity}&key=76ba4592215c448b99da1b8912d0a979`;
        let month = mydate.slice(5,7);
        let day = mydate.slice(8);
        let year = mydate.slice(0,4);
        new Promise((resolve,reject) => {
            let myrequest = new XMLHttpRequest();
            myrequest.open("get", cityapiurl);
            myrequest.responseType = "json";
            myrequest.send();
            myrequest.onload = function(){
                if(myrequest.readyState == 4 && 200 < ( myrequest.status) < 300){
                    resolve(myrequest.response.results[0].geometry);
                }
                else {
                    reject();
                }
            }
        }).then((geo) => {
            citylat = geo.lat;
            citylng = geo.lng;
            return `http://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${citylat}&longitude=${citylng}&method=2`;
        }).then((adanurl) => {
            new Promise((res,rej) => {
                let myreq = new XMLHttpRequest();
                myreq.open("get", adanurl);
                myreq.responseType = "json";
                myreq.send();
                myreq.onload = function(){
                    if(myreq.readyState == 4 && 200 < ( myreq.status) < 300){
                        res(myreq.response);
                    }
                    else{
                        rej()
                    }
                }
            }).then((ress) => {
                Fajr = ress.data.timings.Fajr;
                Sunrise = ress.data.timings.Sunrise;
                Duhr = ress.data.timings.Dhuhr;
                Asr = ress.data.timings.Asr;
                Maghrib = ress.data.timings.Maghrib;
                Isha = ress.data.timings.Isha;

                prayertime[0].textContent = Fajr;
                prayertime[1].textContent = Sunrise;
                prayertime[2].textContent = Duhr;
                prayertime[3].textContent = Asr;
                prayertime[4].textContent = Maghrib;
                prayertime[5].textContent = Isha;
            })


        })
    }if(inputcity.value !=="" && inputdate.value == ""){
        alert("يجب عليك ادخال التاريخ");
    }if(inputdate.value !=="" && inputcity.value == ""){
        alert("يجب عليك ادخال المدينة");
    }if(inputcity.value =="" && inputdate.value == ""){
        alert("يجب عليك ادخال التاريخ و المدينة");
    }
}







































