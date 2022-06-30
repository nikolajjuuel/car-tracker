import { Button, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  personId: string;
  reload: () => void;
};

export default function ModalPerson(props: Props) {
  const [open, setOpen] = useState(false);

  const [personState, setPersonState] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
    email: props.email,
  });

  const { firstName, lastName, email } = personState;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdatePerson = (id: string) => {
    handleClose();

    axios
      .put(`http://localhost:3000/people/${id}`, {
        firstName,
        lastName,
        email,
      })
      .then(function (response) {
        handleClose();
        props.reload();
        console.log("successfully updated person");
      })
      .catch(function (error) {
        console.log(error);
        console.log("ERROR adding car PLS TRY AGAIN");
      });
  };

  return (
    <div>
      <Box onClick={handleClickOpen}>
        <EditIcon />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Update profile`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            fullWidth
            variant="standard"
            value={firstName}
            onChange={(e) => {
              setPersonState((prev) => ({
                ...prev,
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
              setPersonState((prev) => ({
                ...prev,
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
              setPersonState((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleUpdatePerson(props.personId)}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
