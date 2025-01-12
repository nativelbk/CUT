"use client";

import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Element from "@/components/CheckoutForm/Element";
import { RiSecurePaymentLine } from "react-icons/ri";
import apiRequest from "@/utils/apiRequest";
import { UidContext } from "@/app/(private)/layout";
import { useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";

function SimpleDialog(props) {
  const {
    onClose,
    selectedValue,
    open,
    setForm,
    form,
    id,
    changeStatut,
    handleClick,
    setOpen1,
  } = props;
  const { io } = useContext(UidContext);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const data = await apiRequest("http://localhost:3001/panneau/bill/" + id, {
      method: "PATCH",
      body: form,
    });
    changeStatut(id);
    handleClick();
    setOpen1(true);
    io.emit("sendRequest", "okok");
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
      <DialogContent>
        <DialogContentText>
          Veuillez remplir les informations pour envoyer votre demande
        </DialogContentText>
        <div className=" mt-4 ">
          <Element />
        </div>
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} type="submit">
          Subscribe
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({ setForm, form, id, changeStatut }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const [open1, setOpen1] = useState(false);
  console.log(open1);

  const handleClick = () => {
    console.log("open", open1);
  };

  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen1(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <button
        onClick={handleClickOpen}
        className="w-6 h-6 bg-blue rounded-full flex justify-center items-center text-white "
      >
        <RiSecurePaymentLine />
      </button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        setForm={setForm}
        form={form}
        id={id}
        changeStatut={changeStatut}
        handleClick={handleClick}
        setOpen1={setOpen1}
      />
      <Snackbar
        open={open1}
        autoHideDuration={5000}
        onClose={handleClose1}
        message="Demande envoyée!!"
      />
    </div>
  );
}
