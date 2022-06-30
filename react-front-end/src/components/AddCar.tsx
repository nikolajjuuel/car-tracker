import {
  Button,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const AddCar = () => {
  const [carState, setCarState] = useState({
    year: "",
    make: "",
    model: "",
    price: "",
    person: "",
  });
  const { year, make, model, price, person } = carState;

  const handleAddCar = () => {
    axios
      .post("http://localhost:3000/people", {
        year,
        make,
        model,
        price,
        person,
      })
      .then(function (response) {
        setCarState({ year: "", make: "", model: "", price: "", person: "" });
        console.log("successfully added car");
      })
      .catch(function (error) {
        console.log(error);
        console.log("ERROR adding car PLS TRY AGAIN");
      });
  };

  return (
    <div>
      FORM ADD Car
      <Input
        value={year}
        placeholder={"Year"}
        onChange={(e) => {
          setCarState((prevState) => ({
            ...prevState,
            year: e.target.value,
          }));
        }}
      />
      <Input
        value={make}
        placeholder={"Make"}
        onChange={(e) => {
          setCarState((prevState) => ({
            ...prevState,
            make: e.target.value,
          }));
        }}
      />
      <Input
        value={model}
        placeholder={"Model"}
        onChange={(e) => {
          setCarState((prevState) => ({
            ...prevState,
            model: e.target.value,
          }));
        }}
      />
      <Input
        value={price}
        placeholder={"Price"}
        onChange={(e) => {
          setCarState((prevState) => ({
            ...prevState,
            price: e.target.value,
          }));
        }}
      />
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={person}
        label="Person"
        onChange={(e) => {
          setCarState((prevState) => ({
            ...prevState,
            person: e.target.value,
          }));
        }}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <div>
        <Button variant="contained" onClick={handleAddCar}>
          Add Car
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setCarState({
              year: "",
              make: "",
              model: "",
              price: "",
              person: "",
            });
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddCar;
