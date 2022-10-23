var express = require('express');
var router = express.Router();
const RabbitMQ = require('../services/rabbitmq')

const publisher = async() => {
  const server = await RabbitMQ.publish()
  return await server.createChannel()
}

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res) => {
  const publish = await publisher()

  publish.sendToQueue('live', Buffer.from(JSON.stringify(req.body)))
})

module.exports = router;
