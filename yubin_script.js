
var taro = new Vue({
    el: "#app",
    data: {
      postnum:"",
      address:[
        {
          results:{
            address1:"",
            address2:"",
            address3:""
          }
        }
      ],
      query:"",
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
      }
    },
    methods:{
      getaddress:function(){
        if(this.postnum>1000000 && this.postnum<9999999){
          axios
            .get('https://zip-cloud.appspot.com/api/search?zipcode='+this.postnum, this.headers)
            .then(response => (this.address = response.results))
        }
      }
    }
})