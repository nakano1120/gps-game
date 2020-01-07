var taro = new Vue({
    el: "#app",
    data: {
      timerOn: false,
      lati1:0,
      long1:0,
      latinow:0,
      longnow:0,
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
        var plusdis = this.distance(this.lati1,this.long1,this.latinow,this.longnow)
        alert(this.lati1+","+this.long1+","+this.latinow+","+this.longnow)
        alert(plusdis)
        this.alldis+=plusdis;
      },
      getposition: function(){
        navigator.geolocation.getCurrentPosition(
          function( position ){
              if(this.lati1 == 0 || this.long1 == 0 ){
                this.lati1=position.coords.latitude;
                this.long1=position.coords.longitude;
              }else{
                this.lati1=this.latinow;
                this.long1=this.longnow;
              }
              this.latinow=position.coords.latitude;
              this.longnow=position.coords.longitude;
          }
        )
        return
      }
    }
})