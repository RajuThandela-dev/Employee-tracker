var conf = {
    serverUrl: "http://localhost/project/",
    reload:()=>{
        window.location.reload()
    },
    MY_API_KEY:"AIzaSyAEMyvORxWQgnluBFFaXrtEwzSHvAYyXKM",
    stringValidate:(data)=>{
        let pattern=new RegExp('[a-zA-Z]');
        let testResult=pattern.test(data)
      
        return testResult;
       },
    phonValidate:(data)=>{
        let pattern=new RegExp("[6-9]{1}[0-9]{9}");
        let testResult=pattern.test(data)
        return testResult;
    },
    length:(data)=>{
        let pattern=new RegExp("^[0-9]{2,5}$");
        let testResult=pattern.test(data)
        return testResult;
    },
    lengthQuantity:(data)=>{
        let pattern=new RegExp("^[0-9]{1,3}$");
        let testResult=pattern.test(data)
        return testResult;
    }
}
export default conf;