import http from "http"
import fetch from "node-fetch"

const server = http.createServer((req, res) =>{
    const url = req.url
    let tableData = "<table border = '1'><tr><th>name</th><th>height</th><th>birth year</th><th>gender</th><th>url</th></tr>"
    if(url === '/'){
        res.write('<h1>Home Page</h1> <img src = "https://www.bluehorizonprints.com.au/wp-content/uploads/Star-Wars-Movie-Poster-sm.jpg">');
        res.end();
    }else if(url === '/list'){
        fetch('https://swapi.dev/api/people')
            .then(res => res.json())
            .then(data =>{
                createData(data.results)
                res.write(tableData)
                res.end();

            })
    }else {
        res.write("Page Not Found");
        res.end();
    }
    
    function createData(data){
        data.forEach(element => {
            tableData += `<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td></tr>`
        });
        tableData += "</table>"
    }



}).listen(5000, console.log(`Server is listening on port 5000`)) 