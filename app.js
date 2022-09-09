const app = require("express")();
const db = require("./db.json");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.get("/users", (req, res) => {
    console.log("Request...");
    res.send(200, db);
});

app.get("/users/:id", (req, res) => {
    console.log(req.params.id, "numaralı kişi arandı...");
    if(isNaN(req.params.id)){
        res.send(400, {
            message : "işlenemeyen veri..."
        })
    } else {
        const user = db.find(u => u.id = req.params.id)
        if(user){
            res.send(200, user)
        } else {
            res.send(404, {
                message : "Kullanıcı bulunamadı"
            })
        }
    }
});
app.post("/users", (req, res) => {});
app.patch("/users", (req, res) => {});
app.delete("/users/:id", (req, res) => {});

app.listen(process.env.PORT || 3000, () => {
    console.log("Sunucu ayaktadır... Çalışıyor... ");
});