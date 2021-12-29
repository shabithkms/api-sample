import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import cssBaseline from "@mui/material/CssBaseline";
import "./Application.css";
import axios from "axios";

function Application() {
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const Data = {
      Name: formData.get("Name"),
      Address: formData.get("Address"),
      City: formData.get("City"),
      State: formData.get("State"),
      Email: formData.get("Email"),
      Phone: formData.get("Phone"),
      CompanyName: formData.get("CompanyName"),
      AboutTeam: formData.get("AboutTeam"),
      AboutProduct: formData.get("AboutProduct"),
      AboutProblem: formData.get("AboutProblem"),
      AboutSolution: formData.get("AboutSolution"),
      AboutValue: formData.get("AboutValue"),
      AboutCompetition: formData.get("AboutCompetition"),
      AboutRevenue: formData.get("AboutRevenue"),
      AboutMarket: formData.get("AboutMarket"),
    };
    await axios
      .post("http://localhost:3001/apply", Data)
      .then((res) => {
        console.log(res.data.errorCode);
        if (res.data.success) {
          alert(res.data.message);
        } else if (res.data.errorCode === 401) {
          alert("email exist");
          setError(true);
        } else {
        }
      })
      .catch(async (err) => {
        console.log(err);
        await setError(true);
        console.log("error", error);
      });
  };
  return (
    <div className="container">
      <h3 style={{ marginTop: "2rem" }}>Registration Form</h3>
      <cssBaseline />
      <div className="container">
        <Box
          className="form"
          component="form"
          sx={{
            mt: 4,
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Name*"
                variant="outlined"
                name="Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Address*"
                variant="outlined"
                name="Address"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="City*"
                variant="outlined"
                name="City"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="State*"
                variant="outlined"
                name="State"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Email*"
                variant="outlined"
                name="Email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Phone number*"
                variant="outlined"
                name="Phone"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Company Name*"
                variant="outlined"
                name="CompanyName"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <TextField id="outlined-basic" fullWidth label="Company Name*" variant="outlined" /> */}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined"
                fullWidth
                label="Describe about your team and background*"
                variant="outlined"
                name="AboutTeam"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Describe your comapny and products*"
                variant="outlined"
                multiline
                name="AboutProduct"
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Describe the problem you are trying to solve*"
                variant="outlined"
                multiline
                rows={3}
                name="AboutProblem"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="What is unique about your solution?*"
                variant="outlined"
                multiline
                name="AboutSolution"
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-multiline-static"
                label="What is your value proposition to the customers?*"
                multiline
                rows={3}
                name="AboutValue"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-multiline-static"
                label="What are your competators and what is your competative advantage?*"
                multiline
                name="AboutCompetition"
                rows={3}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-multiline-static"
                label="Explain your revenue model*"
                multiline
                rows={3}
                name="AboutRevenue"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-multiline-static"
                label="What is the potential market size of the product?*"
                multiline
                name="AboutPotential"
                rows={3}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-multiline-static"
                label="How do you market or plan to market your products and services?*"
                multiline
                rows={3}
                name="AboutMarket"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                fullWidth
                style={{ marginTop: "2rem", marginBottom: "3rem" }}
                variant="contained"
                type="submit"
              >
                APPLY
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Application;
