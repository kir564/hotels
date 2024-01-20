require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const ROLE = require('./constants/roles');

const { getHotels, getHotel } = require('./controllers/hotel');
const { register, login, getUsers, getUser } = require('./controllers/user');
const {
  addHotelComment,
  deleteHotelComment,
  updateHotelComment,
} = require('./controllers/hotelComment');
const {
  orderHotel,
  cancelOrderedHotel,
  getOrderedHotels,
} = require('./controllers/orderedHotel');

const authenticated = require('./middleware/authenticated');
const hasRole = require('./middleware/hasRole');

const mapOrderedHotel = require('./helpers/mapOrderedHotel');
const mapOrderedHotelForAdmin = require('./helpers/mapOrderedHotelForAdmin');
const mapHotel = require('./helpers/mapHotel');
const mapUser = require('./helpers/mapUser');
const mapHotelComment = require('./helpers/mapHotelComment');

const port = 3001;
const app = express();

app.use(express.static('../frontend/build'));

app.use(cookieParser());
app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res
      .cookie('token', token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error ' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie('token', token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error ' });
  }
});

app.post('/logout', async (req, res) => {
  res.cookie('token', '', { httpOnly: true }).send({});
});

app.get('/hotels', async (req, res) => {
  const { hotels, lastPage, count } = await getHotels({
    limit: req.query.limit,
    page: req.query.page,
    city: req.query.city,
    quantity: req.query.quantity,
    category: req.query.category,
  });

  res.send({ hotels: hotels.map(mapHotel), lastPage, count });
});

app.get('/hotels/:id', async (req, res) => {
  const hotel = await getHotel(req.params.id);

  res.send({ data: mapHotel(hotel), error: null });
});

app.use(authenticated);

app.get('/users', async (req, res) => {
  const users = await getUsers();

  res.send({ data: users });
});

app.get('/users/person', async (req, res) => {
  const user = await getUser(req.user.id);

  res.send({ data: mapUser(user) });
});

app.post('/hotels/:id/order', async (req, res) => {
  const orderedHotel = await orderHotel(req.params.id, req.user.id);

  res.send({ data: mapOrderedHotel(orderedHotel), error: null });
});

app.delete('/users/:userId/cancelOrder/:orderedHotelId', async (req, res) => {
  await cancelOrderedHotel(req.user.id, req.params.orderedHotelId);

  res.send({ error: null });
});

app.get('/users/:id/admin', hasRole([ROLE.ADMIN]), async (req, res) => {
  const orderedHotels = await getOrderedHotels();

  res.send({ data: orderedHotels.map(mapOrderedHotelForAdmin) });
});

app.post('/hotels/:id/comments', async (req, res) => {
  const newComment = await addHotelComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  res.send({ data: mapHotelComment(newComment) });
});

app.delete(
  '/hotels/:hotelId/comments/:commentId',
  hasRole([ROLE.ADMIN]),
  async (req, res) => {
    await deleteHotelComment(req.params.hotelId, req.params.commentId);

    res.send({ error: null });
  }
);

app.patch('/hotels/:hotelId/comments/:commentId', async (req, res) => {
  const newComment = await updateHotelComment(req.params.commentId, {
    content: req.body.content,
  });

  res.send({ error: null, data: mapHotelComment(newComment) });
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}... `);
  });
});
