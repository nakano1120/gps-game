let latinow
let longnow
let lati1
let long1
var taro = new Vue({
    el: "#app",
    data: {
      timerOn: false,
      alldis:0
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
        console.log(plusdis)
        this.alldis+=plusdis;
      },
      getposition: function(){
        navigator.geolocation.getCurrentPosition(
          function( position ){
              latinow = position.coords.latitude;
              longnow = position.coords.longitude;
              if(lati1 == 0 || long1 == 0 ){
                lati1 = position.coords.latitude;
                long1 = position.coords.longitude;
              }else{
                  lati1 = this.latinow;
                  long1 = this.longnow;
              }
          }
        )
      },
    }
})