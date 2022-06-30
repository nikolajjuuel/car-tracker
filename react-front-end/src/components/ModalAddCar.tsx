import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type Props = {
  people: any;
  reload: () => void;
};
export default function ModalAddCar(props: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [carState, setCarState] = useState({
    year: "",
    make: "",
    model: "",
    price: "",
    person_id: "",
  });
  const { year, make, model, price, person_id } = carState;

  const peopleArray = Object.values(props.people.people);

  const handleAddCar = () => {
    axios
      .post("http://localhost:3000/cars", {
        year,
        make,
        model,
        price,
        person_id,
      })
      .then(function (response) {
        setCarState({
          year: "",
          make: "",
          model: "",
          price: "",
          person_id: "",
        });
        handleClose();
        props.reload();

        console.log("successfully added car");
      })
      .catch(function (error) {
        console.log(error);
        console.log("ERROR adding car PLS TRY AGAIN");
      });
  };

  const getKeyByValue = (obj: any, value: any) => {
    return Object.keys(obj).find((key) => obj[key] === value);
  };
  const [name, setName] = useState("");

  const handleChange = (e: SelectChangeEvent) => {
    setName(e.target.value);

    setCarState((prev: any) => ({
      ...prev,
      person_id: Number(getKeyByValue(props.people.people, e.target.value)),
    }));
  };

  return (
    <Box sx={{ marginTop: "5px" }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add A New Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Update profile`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Year"
            fullWidth
            variant="standard"
            value={year}
            onChange={(e) => {
              setCarState((prevState) => ({
                ...prevState,
                year: e.target.value,
              }));
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Make"
            fullWidth
            variant="standard"
            value={make}
            onChange={(e) => {
              setCarState((prevState) => ({
                ...prevState,
                make: e.target.value,
              }));
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Model"
            fullWidth
            variant="standard"
            value={model}
            onChange={(e) => {
              setCarState((prevState) => ({
                ...prevState,
                model: e.target.value,
              }));
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Price"
            fullWidth
            variant="standard"
            value={price}
            onChange={(e) => {
              setCarState((prevState) => ({
                ...prevState,
                price: e.target.value,
              }));
            }}
          />

          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel>Owner</InputLabel>
            <Select value={name} onChange={handleChange} label="Owner">
              {peopleArray.map((name: any) => (
                <MenuItem value={name}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddCar}>Apply</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
