const axios = require('axios');
const catchAsync = require('../utils/catchAsync');

exports.filterCards = catchAsync(async (req, res, next) => {
  //costimize the size on the query
  const size = req.query.size || 10;
  const options = {
    method: 'GET',
    url: `https://random-data-api.com/api/v2/credit_cards?size=${size}`,
  };

  const response = await axios.request(options);
  const cardsData = response.data;

  //filter the data we get to be type of vise only
  const filteredCards = cardsData
    .filter((e) => e.credit_card_type.toLowerCase() == 'visa')
    .map((e) => ({
      id: e.id,
      uid: e.uid,
      credit_card_expiry_date: e.credit_card_expiry_date,
      credit_card_type: e.credit_card_type,
    }));

  res.status(200).json({
    status: 'success',
    data: {
      filteredCards: filteredCards,
    },
  });
});
