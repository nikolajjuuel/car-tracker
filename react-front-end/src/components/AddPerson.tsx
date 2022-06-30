import { Button, Input } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const AddPerson = () => {
  const [personState, setPersonState] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const { firstName, lastName, email } = personState;

  const handleAddPerson = () => {
    axios
      .post("http://localhost:3000/people", {
        firstName,
        lastName,
        email,
      })
      .then(function (response) {
        setPersonState({ firstName: "", lastName: "", email: "" });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <Input
          value={firstName}
          placeholder={"First Name"}
          onChange={(e) => {
            setPersonState((prevState) => ({
              ...prevState,
              firstName: e.target.value,
            }));
          }}
        />
        <Input
          value={lastName}
          placeholder={"Last Name"}
          onChange={(e) => {
            setPersonState((prevState) => ({
              ...prevState,
              lastName: e.target.value,
            }));
          }}
        />
        <Input
          value={email}
          placeholder={"Email"}
          onChange={(e) => {
            setPersonState((prevState) => ({
              ...prevState,
              email: e.target.value,
            }));
          }}
        />
        <Button variant="contained" onClick={handleAddPerson}>
          Add Person
        </Button>
      </div>
    </div>
  );
};

export default AddPerson;
