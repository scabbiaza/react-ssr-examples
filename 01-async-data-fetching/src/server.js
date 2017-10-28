import express from "express"
import routes from "./backend"

let app = express()

app.use("/", routes)

// STATIC
app.use(express.static("public"))

app.set("port", process.env.PORT || 3000)
app.listen(3000, function () {
  console.log("App is listening on port 3000!")
})
