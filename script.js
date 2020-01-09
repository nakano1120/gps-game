let latinow = 0
let longnow = 0
let lati1 = 0
let long1 = 0
let loops = 0.0
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
      intervaldistance: function(){
        let interval = setInterval(this.plusdistance(),100)
      },
      plusdistance: function(){
        this.getposition();
        loops = Math.round(( loops + 0.0009 ) * 10000 ) / 10000
        console.log(loops)
        var plusdis = Math.floor(this.distance(lati1,long1,latinow,longnow) * 1000)
        console.log(lati1+","+long1+","+latinow+","+longnow)
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
              latinow = position.coords.latitude + loops;
              longnow = position.coords.longitude;

          }
        )
      }
    }
})