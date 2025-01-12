"use client";

import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import apiRequest from "@/utils/apiRequest";
import { BiX } from "react-icons/bi";
import { UidContext } from "@/app/(private)/layout";
import { useContext } from "react";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, setForm, form, id, user, removeItem } =
    props;

  const { io } = useContext(UidContext);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleSubmit = async () => {
    const data = await apiRequest(
      `http://localhost:3001/panneau/bill/validate/${id}?response=false`,
      {
        method: "PATCH",
      }
    );
    io.emit("sendResponse", user);
    removeItem(id);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const email = formJson.email;
          console.log(email);
          handleClose();
        },
      }}
    >
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} type="submit">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo3({ id, user, removeItem }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleClickOpen}
        className="w-6 h-6 bg-red-500 flex items-center justify-center rounded-full"
      >
        <BiX color="white" />{" "}
      </button>
      <SimpleDialog
        removeItem={removeItem}
        open={open}
        user={user.id}
        id={id}
        onClose={handleClose}
      />
    </div>
  );
}
