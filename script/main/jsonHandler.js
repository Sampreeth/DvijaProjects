function parseJsonStr(data){
    try{
        return jQuery.parseJSON(data);
    }catch(err){
        return null;
    }
}
