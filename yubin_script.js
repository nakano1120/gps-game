let headers={ 
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*'
}
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
            .get('//zip-cloud.appspot.com/api/search?zipcode='+this.postnum, headers)
            .then(response => (address = response.results))
            console.log(address)
        }
      }
    }
})