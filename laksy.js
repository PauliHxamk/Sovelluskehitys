const http = require("http");
const url = require("url");
const fs = require("fs");
const port = 3101;

let tilausmaara = 0;

const server = http.createServer((req,res) => {
    let tiedot = url.parse(req.url, true).query;

    let nimi = (tiedot.nimi) ? tiedot.nimi : "Tuntematon";
    let email = (tiedot.email) ? tiedot.email : "Tuntematon";
    let kayttoehdot = (tiedot.kayttoehdot) ? tiedot.kayttoehdot : "Ei valittu";

    console.log(tiedot);

    if(req.url != "/favicon.ico"){

        res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});

        if(nimi != "Tuntematon" && email != "Tuntematon" && kayttoehdot != "Ei valittu"){

            
            res.write("<h2>Olet tilannut onnistuneesti uutiskirjeemme. Kiitos!</h2>");
            res.end();
            tilausmaara++;
            console.log("Uusi tilausvastaanotettu. Tilauksia yhteensä " + tilausmaara + " kappaletta.");
            fs.appendFile("tilaukset.txt", `${nimi}, ${email}\n` , (err) =>{
                if (err) throw err;
                console.log("Lisätty");
            });
        }else{
            res.write("<script language=javascript>alert('Anna nimesi sekä sähköpostiosoitteesi ja hyväksy käyttöehdot');</script>");
            res.end();
        }
        

    }
});

server.listen(port, ()=>{
    console.log("OPEN");
})

