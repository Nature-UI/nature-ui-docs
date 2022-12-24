import Button from "@custom/button";
import * as Nature from "@nature-ui/core";
import * as Icons from "@nature-ui/icons";
import * as Formik from "formik";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import {
  MdArrowDropDown,
  MdBuild,
  MdCall,
  MdCheckCircle,
  MdGraphicEq,
  MdGroupWork,
  MdPhone,
  MdReceipt,
  MdSettings,
} from "react-icons/md";
import Lorem from "react-lorem-component";

const reactIcons = {
  MdSettings,
  MdReceipt,
  MdGroupWork,
  MdCheckCircle,
  MdGraphicEq,
  MdBuild,
  MdCall,
  MdPhone,
  MdArrowDropDown,
  AiOutlineUser,
  FaFacebook,
  FaTwitter,
};

export const reactLiveScope = {
  React,
  ...React,
  ...Nature,
  ...Formik,
  ...Icons,
  ...reactIcons,
  Lorem,
  Button,
};
