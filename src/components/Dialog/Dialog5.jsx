"use client";

import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { RiSecurePaymentLine } from "react-icons/ri";
import apiRequest from "@/utils/apiRequest";
import { UidContext } from "@/app/(private)/layout";
import { useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import GrilleForm from "../Grille/AddForm";
import { IoMdAdd } from "react-icons/io";

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
    min_largeur,
    max_largeur,
    montant,
    min_longueur,
    max_longueur,
    setGrille,
    grille,
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
    const data = await apiRequest("http://localhost:3001/grille" + id, {
      method: "POST",
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
        <div className="flex flex-col gap-2 ">
          <GrilleForm
            min_largeur={min_largeur}
            max_largeur={max_largeur}
            montant={montant}
            min_longueur={min_longueur}
            max_longueur={max_longueur}
            setGrille={setGrille}
            grille={grille}
            handleClose={handleClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo4({
  setForm,
  form,
  id,
  changeStatut,
  min_largeur,
  max_largeur,
  montant,
  min_longueur,
  max_longueur,
  setGrille,
  grille,
}) {
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
      <div
        onClick={handleClickOpen}
        // className="w-6 h-6 bg-blue rounded-full flex justify-center items-center text-white "
        className="text-black"
      >
        <IoMdAdd />
      </div>
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
        min_largeur={min_largeur}
        max_largeur={max_largeur}
        montant={montant}
        min_longueur={min_longueur}
        max_longueur={max_longueur}
        setGrille={setGrille}
        grille={grille}
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
