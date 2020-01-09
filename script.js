let latinow = 0
let longnow = 0
let lati1 = 0
let long1 = 0
let loops = 0.0
let goal = 0
let time = 0
let player=[
  {id:"1",name:"<span class='red'>あなた大</span>",target:0,par:0},
  {id:"2",name:"体操大",target:0,par:0},
  {id:"3",name:"大正大",target:0,par:0},
  {id:"4",name:"開拓大",target:0,par:0},
  {id:"5",name:"城山大",target:0,par:0},
  {id:"6",name:"六浦大",target:0,par:0},
  {id:"7",name:"七海大",target:0,par:0},
  {id:"8",name:"西洋大",target:0,par:0}
]
var taro = new Vue({
    el: "#app",
    data: {
      timerOn: false,
      alldis:0,
      parsent1:0,
      parsent2:0,
      parsent3:0,
      parsent4:0,
      parsent5:0,
      parsent6:0,
      parsent7:0,
      parsent8:0,
      todoname:"マラソン大会",
      nowtime:"00:00:00",
      stationtimer:null
    },
    methods:{
      distance: function(lat1,lng1,lat2,lng2) {
        lat1 *= Math.PI / 180;
        lng1 *= Math.PI / 180;
        lat2 *= Math.PI / 180;
        lng2 *= Math.PI / 180;
        return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
      },
      plusdistance: function(){
        this.getposition();
        var plusdis = Math.floor(this.distance(lati1,long1,latinow,longnow) * 1000)
        console.log(lati1+","+long1+","+latinow+","+longnow)
        if(lati1 == latinow && long1 == longnow){
          plusdis = 0;
        }else if(plusdis == NaN){
          plusdis = 0;
        }
        console.log(plusdis)
        this.alldis+=plusdis;
      },
      getposition: function(){
        navigator.geolocation.getCurrentPosition(
          function( position ){
              if(lati1 == 0 && long1 == 0 ){
                lati1 = position.coords.latitude;
                long1 = position.coords.longitude;
              }else{
                lati1 = latinow;
                long1 = longnow;
              }
              latinow = position.coords.latitude;
              longnow = position.coords.longitude;

          }
        )
      },
      addZero: function(value){
        if (value < 10 && value > -1) {
          value = '0' + value;
        }
        return value;
      },
      timer: function(){
        if(document.getElementById("time").value<1 || document.getElementById("sec").value == ""){
          alert("時間が不正です")
          return
        }
        start = new Date();
        alert("出発します。")
        nowstation = 0
        document.getElementById("form1").style.display = "none";
        goal = document.getElementById("todo").value
        departuretime = parseInt(document.getElementById("time").value * 60) + parseInt(document.getElementById("sec").value)
        this.todoname = "マラソン大会(" + document.getElementById("todo").value + "m)"
        for( let i=1 ; i<8 ; i++){
          player[i].target = ((parseInt(departuretime))+ Math.floor( Math.random() * parseInt(departuretime/2) ) - parseInt(departuretime/4)) * 1000
          console.log(player[i].target)
        }
        this.stationtimer = setInterval(this.timermain.bind(this), 300);
      },
      timermain: function(){
        this.plusdistance()
        player[0].par = this.alldis
        let now = new Date();
        let diftime = (now.getTime() - start.getTime());
        let point = Math.floor(diftime / 100);
        let point2 = Math.floor(point % 10);
        let sec = Math.floor(diftime / 1000);
        let secsec = Math.floor(sec % 60);
        let min = Math.floor(sec / 60);
        let minmin = Math.floor(min % 60);
        let hour = Math.floor(min / 60);
        secsec = this.addZero(secsec);
        min2 = this.addZero(minmin);
        hour = this.addZero(hour);
        document.getElementById("nowtime").innerHTML=""+hour+":"+min2+":"+secsec+"."+point2;
        for( let i=1 ; i<8 ; i++){ 
            player[i].target += (Math.floor( Math.random() * 1000 ) - 500);
            player[i].par = Math.floor((Math.floor((diftime / player[i].target)* 10000) / 100) * (goal/100))
            if (player[i].par > goal){
              player[i].par == goal
            }
        }
        let playersort = player.slice().sort(function(a,b){
            if(a.par > b.par) return -1;
            if(a.par < b.par) return 1;
            return 0;
        });
        this.parsent1 = playersort[0].par
        this.parsent2 = playersort[1].par
        this.parsent3 = playersort[2].par
        this.parsent4 = playersort[3].par
        this.parsent5 = playersort[4].par
        this.parsent6 = playersort[5].par
        this.parsent7 = playersort[6].par
        this.parsent8 = playersort[7].par
        for (let l=1 ; l<9 ; l++){
            document.getElementById("name"+l).innerHTML=playersort[l-1].name
            document.getElementById("pb"+l).style.width=(playersort[l-1].par * 100) / goal+"%"
            if((playersort[l-1].par * 100) / goal > 100 ){
              document.getElementById("pb"+l).style.width = "100%"
            }
        }
        if(player[0].par > goal){
            clearInterval(this.stationtimer);
            alert("終了です。")
        }
      }
    }
})