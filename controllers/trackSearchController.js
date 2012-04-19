var json;

module.exports = 
{
    index : function index(req, res){
        console.log("track search controller");

        json = { something: "something2"};
        res.send(json);
    }
}