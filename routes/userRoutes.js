
const express = require('express');
const router = express.Router();

const getUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Ruta aun no implementada',
  });
};

const getUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'Ruta aun no implementada',
    });
  };

  const postUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'Ruta aun no implementada',
    });
  };

  const deleteUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'Ruta aun no implementada',
    });
  };

  const putUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'Ruta aun no implementada',
    });
  };

  router.get('/', getUsers);
  router.get('/:id', getUser);
  router.post('/', postUser);
  router.delete('/:id', deleteUser);
  router.put('/:id', putUser);

  module.exports = router;
