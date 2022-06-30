import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Box,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";

import { useState } from "react";
import axios from "axios";

type Props = {
  carId: string;
  year: string;
  make: string;
  model: string;
  price: string;
  owner: string;
  person_id: any;
  people: any;
  reload: () => void;
};

export default function ModalCar(props: Props) {
  const peopleArray = Object.values(props.people.people);
  const [open, setOpen] = useState(false);

  const [carOwnerState, setCarOwnerState] = useState({
    year: props.year,
    make: props.make,
    model: props.model,
    price: props.price,
    owner: props.owner,
    person_id: props.person_id,
  });

  const { year, make, model, price, person_id, owner } = carOwnerState;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateCar = (id: string) => {
    axios
      .put(`http://localhost:3000/cars/${id}`, {
        year,
        make,
        model,
        price,
        person_id,
      })
      .then(function (response) {
        props.reload();
        console.log("successfully updated car");
      })
      .catch(function (error) {
        console.log(error);
        console.log("ERROR adding car PLS TRY AGAIN");
      });

    handleClose();
  };

  const getKeyByValue = (obj: any, value: any) => {
    return Object.keys(obj).find((key) => obj[key] === value);
  };
  const [name, setName] = useState(props.people.people[person_id]);

  const handleChange = (e: SelectChangeEvent) => {
    setName(e.target.value);

    setCarOwnerState((prev) => ({
      ...prev,
      person_id: Number(getKeyByValue(props.people.people, e.target.value)),
    }));
  };

  return (
    <Box>
      <Box>
        <EditIcon onClick={handleClickOpen} />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Update ${carOwnerState.owner}'s ${carOwnerState.year} ${carOwnerState.make} ${carOwnerState.model}`}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>{person_id}</DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            label="year"
            fullWidth
            variant="standard"
            value={year}
            onChange={(e) => {
              setCarOwnerState((prev) => ({
                ...prev,
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
              setCarOwnerState((prev) => ({
                ...prev,
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
              setCarOwnerState((prev) => ({
                ...prev,
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
              setCarOwnerState((prev) => ({
                ...prev,
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
          <Button onClick={() => handleUpdateCar(props.carId)}>Apply</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
