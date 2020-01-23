var taro = new Vue({
    el: "#app",
    data: {
      postnum:"",
      address:[],
      query:""
    },
    methods:{
      getaddress:function(){
        if(this.postnum>1000000 && this.postnum<9999999){
          axios
            .get('https://zip-cloud.appspot.com/api/search?zipcode='+String(this.postnum),{target: text})
            .then(response => (this.address = response.results))
            console.log(this.address)
        }
      }
    }
})