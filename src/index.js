const express = require("express");
const mongoConnect = require("./db");
require("dotenv").config();

mongoConnect();
