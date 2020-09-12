const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();
const userRouter = require('./routes/userRoutes');
app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('estoy en un middleware');
  next();
});

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

const getGatitos = (req, res) => {
  console.log(req.requestedAt);

  fs.readFile(`${__dirname}/assets/gatitos.json`, (err, data) => {
    dataJSON = JSON.parse(data);
    res.json({
      requestedAt: req.requestedAt,
      status: 'success',
      data: dataJSON,
    });
    if (err) {
      res.sendStatus(500).send('Algo anda mal');
    }
  });
};

const getGatito = (req, res) => {
  const idGatito = Number(req.params.id);
  console.log(idGatito);
  fs.readFile(`${__dirname}/assets/gatitos.json`, (err, data) => {
    dataJSON = JSON.parse(data);
    const gatito = dataJSON[idGatito];
    if (!gatito) {
      return res.status(404).json({
        requestedAt: req.requestedAt,
        status: 'fail',
        message: 'Gato no encontrado',
      });
    }
    res.json({
      status: 'success',
      data: gatito,
    });
  });
};

const postGatito = (req, res) => {
  let nuevoGatitoAGuardar = req.body;

  if (nuevoGatitoAGuardar) {
    fs.readFile(`${__dirname}/assets/gatitos.json`, (err, data) => {
      const dataJSON = JSON.parse(data);
      nuevoGatitoAGuardar.id = dataJSON.length;

      dataJSON.push(nuevoGatitoAGuardar);

      fs.writeFile(
        `${__dirname}/assets/gatitos.json`,
        JSON.stringify(dataJSON),
        err => {
          res.status(201).json({
            estado: 'success',
            data: {
              requestedAt: req.requestedAt,
              nuevoGatitoAGuardar,
              createAt: new Date(),
            },
          });
        },
      );
    });
  }
};

const deleteGatito = (req, res) => {
  fs.readFile(`${__dirname}/assets/gatitos.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    idGatitoABorrar = Number(req.params.id);

    const arrGatitosFiltrados = dataJSON.filter(
      gato => gato.id !== idGatitoABorrar,
    );

    fs.writeFile(
      `${__dirname}/assets/gatitos.json`,
      JSON.stringify(arrGatitosFiltrados),
      err => {
        res.status(202).json({
          requestedAt: req.requestedAt,
          status: 'success',
          data: arrGatitosFiltrados,
        });
      },
    );
  });
};

const putGatito = (req, res) => {
  fs.readFile(`${__dirname}/assets/gatitos.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const idGatitoAEditar = Number(req.params.id);
    const nuevoGatito = req.body;

    let gatoEncontrado = dataJSON.find(gato => gato.id === idGatitoAEditar);

    if (gatoEncontrado) {
      let gatoActualizado = {
        id: gatoEncontrado.id,
        name: nuevoGatito.name,
        shortDesc: nuevoGatito.shortDesc,
        longDesc: nuevoGatito.longDesc,
        img: nuevoGatito.img,
        colores: nuevoGatito.colores,
        sexo: nuevoGatito.sexo,
        disponible: nuevoGatito.disponible,
      };
      let targetIndex = dataJSON.indexOf(gatoEncontrado);

      dataJSON.splice(targetIndex, 1, gatoActualizado);

      fs.writeFile(
        `${__dirname}/assets/gatitos.json`,
        JSON.stringify(dataJSON),
        err => {
          res.status(201).json({
            requestedAt: req.requestedAt,
            status: 'success',
            data: dataJSON,
          });
        },
      );
    } else {
      res.sendStatus(404);
    }
  });
};


app.get('/gatitos', getGatitos);
app.get('/gatitos/:id', getGatito);
app.post('/gatitos', postGatito);
app.delete('/gatitos/:id', deleteGatito);
app.put('/gatitos/:id', putGatito);

app.use('/users', userRouter);


const port = 8080;

app.listen(port, () => {
  console.log(`App esta corriendo en el puerto ${port}`);
});

// gatitos --> gatitos
// users --> admin, mod, clientes
// refugios
