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
import { FaMapMarkerAlt } from "react-icons/fa";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, src, localisation } = props;

  console.log(localisation);
  const { io } = useContext(UidContext);

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          handleClose();
        },
      }}
    >
      <DialogContent>
        <div className=" w-[500px] h-[500px] rounded-md overflow-hidden shadow-md">
          <iframe
            title="Carte interactive"
            className="w-full h-full"
            src={`https://www.google.com/maps?q=${localisation}&output=embed`}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
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

export default function SimpleDialogDemo({ autorisation, localisation }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const [open1, setOpen1] = useState(false);

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
    <div className="w-full">
      <button
        onClick={handleClickOpen}
        className="bg-blue w-full justify-center items-center flex gap-1  text-white rounded "
      >
        <FaMapMarkerAlt className="w-[20px] h-[20px]" size={20} /> Voir sur une
        carte
      </button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        handleClick={handleClick}
        setOpen1={setOpen1}
        localisation={localisation}
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
