const express = require("express");
const createError = require('http-errors');
const dotenv = require("dotenv").config();
const cors = require('cors');

const app = express();

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
 }))
 
 app.use(express.json())
 app.use(express.urlencoded({ extended: true }))

//initialize DB
require("./initDB")();

const PatientRoute = require("./Routes/Patient.route");
const MeetingsRoute = require("./Routes/Meetings.route");
const PlanningRoute = require("./Routes/Planning.route");
const HopitalRoute = require("./Routes/Hopital.route");
const FichiersRoute = require("./Routes/Fichiers.route");

const AntecedentRoute = require("./Routes/Antecedent.route");
const SignesCliniqueRoute = require("./Routes/SignesClinique.route");
const SignesParacliniqueRoute = require("./Routes/SignesParaclinique.route");
const EvolutionRoute = require("./Routes/Evolution.route");
const UserRoute = require("./Routes/User.route");
const AuthRoute = require("./Routes/Auth.route");
const ConsultationRoute = require("./Routes/Consultation.route");
const path = require("path");


app.use(express.static(path.join(__dirname, "public")));

app.use("/api/patients",PatientRoute);
app.use("/api/patients/antecedents",AntecedentRoute);
app.use("/api/patients/signescliniques",SignesCliniqueRoute);
app.use("/api/patients/signesparacliniques",SignesParacliniqueRoute);
app.use("/api/patients/evolution",EvolutionRoute);
app.use("/api/patients/consultation",ConsultationRoute);
app.use("/api/patients/fichiers",FichiersRoute);

app.use("/api/users",UserRoute);
app.use("/api/auth",AuthRoute);
app.use("/api/meetings",MeetingsRoute);
app.use("/api/planning",PlanningRoute);
app.use("/api/hopital",HopitalRoute);

app.use((req,res,next)=>{
    next(createError(404,"Not found"));
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Server is listenning on port 3000...");
})