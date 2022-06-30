import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useState } from "react";

type Props = {
  reload: () => void;
};

export default function ModalAddPerson(props: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        handleClose();
        setPersonState({ firstName: "", lastName: "", email: "" });
        props.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add A New Owner
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Create Profile`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            fullWidth
            variant="standard"
            value={firstName}
            onChange={(e) => {
              setPersonState((prevState) => ({
                ...prevState,
                firstName: e.target.value,
              }));
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Last Name"
            fullWidth
            variant="standard"
            value={lastName}
            onChange={(e) => {
              setPersonState((prevState) => ({
                ...prevState,
                lastName: e.target.value,
              }));
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => {
              setPersonState((prevState) => ({
                ...prevState,
                email: e.target.value,
              }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddPerson}>Apply</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
