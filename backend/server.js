const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("data.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get("/employees/:employeeID", (req, res) => {
  const employeeID = parseInt(req.params.employeeID, 10);
  const employee = router.db
    .get("employees")
    .find({ id: employeeID })
    .value();

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  res.json(employee);
});

// Route for handling PUT request to update an employee
server.put("/employees/:employeeID", (req, res) => {
  const employeeID = parseInt(req.params.employeeID, 10);
  const employee = router.db
    .get("employees")
    .find({ id: employeeID })
    .value();

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  const updatedEmployee = { ...employee, ...req.body };
  router.db
    .get("employees")
    .find({ id: employeeID })
    .assign(updatedEmployee)
    .write();

  res.json(updatedEmployee);
});

server.use(router);

const PORT = 5000;
server.listen(PORT, () => {
  console.log("Server running at 5000");
});
