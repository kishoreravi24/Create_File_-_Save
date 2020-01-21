var fs = require('fs');
var http = require('http');
var alert = require('alert-node');
var server=http.createServer((req,res)=>{
    var url = req.url;
    var body='';
    if(url=='/create_file'&&req.method==='POST'){
        req.on('data',(data)=>{
            body+=data;
        });
        req.on('end',()=>{
            fun(body);
            var index = fs.readFileSync('index.html','utf-8');
            res.writeHead(200,{"Content-Type":"text/html"});
            alert("Text saved to File");
            res.write(index);
            res.end();
        })
    }
}).listen(3000,()=>{
    console.log("Server Running!");
})
var entry_activate_key=0,file_name='';
function fun(body){
    server.close();
    var entry=0;
    for(var i=0;i<body.length;i++){
        if(entry==1&&body[i]!='&'){
            file_name=file_name+body[i];
        }
        if(body[i]=='='){
            entry=entry+1;
        }
        if(body[i]=='&'){
            entry_activate_key=entry_activate_key+i;
            text_Area(body);
            return;
        }
    }
    console.log(file_name);
}
var Entire_file='';
function text_Area(body){
    var entry=0;
    for(var i=entry_activate_key+1;i<body.length;i++){
        if(entry==1&&body[i]!='+'){
            Entire_file=Entire_file+body[i];
        }
        if(body[i]=='+'&&entry==1){
            Entire_file=Entire_file+" ";
        }
        if(body[i]=='='){
            entry=1;
        }
    }
    console.log(Entire_file);
    write();
    return;
}

//File_name && Entire_file created ,, using fs create a file and enter value.
function write(){
fs.writeFile(`${file_name}.txt`,Entire_file,(err)=>{
    if(err){
        console.log("Error");
    }else{
        console.log("Saved!!");
        return;
    }
})
}
