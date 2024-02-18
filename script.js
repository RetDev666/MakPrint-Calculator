$(document).ready(function() {
  $('#calculate-btn').click(calculatePrice);
  $('#quantity').keypress(function(event) {
    if (event.keyCode ===  13) {
      event.preventDefault();
      calculatePrice();
      console.log("Press");
    }
  });
  $('#calculate-btn').keypress(function(event) {
    if (event.keyCode ===  13) {
      event.preventDefault();
      calculatePrice();
      console.log("Press");
    }
  });
});

function calculatePrice() {
  var width = parseFloat($('#width').val()) +  0.15; // додати  0,15 см до ширини
  var height = parseFloat($('#height').val()) +  0.15; // додати  0,15 см до висоти
  var area = width * height; // розрахувати площу однієї наклейки
  var quantity = parseInt($('#quantity').val()); // отримати кількість стікерів
  var sheets = Math.ceil(quantity / (1037 / area)); // розрахувати кількість аркушів
  var pricePerSheet; // змінна для зберігання ціни за аркуш
  var poper = $('input[name="flexRadioDefault"]:checked').val(); // отримати тип паперу з радіобокса
  var poper2 = $('input[namr="flexCheckDefault"]:checked').val(); // отримання ламінування з чекбоксу

  // визначити ціну за аркуш на основі кількості замовлених аркушів
  // Updated discount system to apply up to  300 sheets
  if (sheets ==  1) {
    pricePerSheet =  60;
  } else if (sheets ==  2) {
    pricePerSheet =  39.5;
  } else if (sheets ==  3) {
    pricePerSheet =  33.5;
  } else if (sheets ==  4) {
    pricePerSheet =  29.6;
  } else if (sheets ==  5) {
    pricePerSheet =  29.1;
  } else if (sheets ==  6) {
    pricePerSheet =  28.5;
  } else if (sheets ==  7) {
    pricePerSheet =  27;
  } else if (sheets ==  8) {
    pricePerSheet =  26.5;
  } else if (sheets ==  9) {
    pricePerSheet =  26.2;
  } else if (sheets >=  10 && sheets <=  19) {
    pricePerSheet =  26;
  } else if (sheets >=  20 && sheets <=  300) {
    // calculate the discounted price for sheets between  20 and  300
    pricePerSheet =  24.9 + (20 -  24.9) * (sheets -  20) / (300 -  20);
  } else if (sheets >  300) {
    pricePerSheet =  24.9; // фіксована ціна для замовлення понад  300 аркушів
  }

  if(poper === 'Крафтовий папір'){
    pricePerSheet *=  1.75;
  } else if(poper === 'Винний папір'){
    pricePerSheet *=  1.65;
  } else if(poper === 'Самоклеючий папір'){
    pricePerSheet *=  1.1;
  }

  if(poper2 === 'Ламінування'){
    pricePerSheet *=  1.1;
  }

  var price = sheets * pricePerSheet; // Calculate the price without service charge

  if (sheets >=  10 && sheets <  300) {
    price *=  0.9;
  }

  // Calculate the service charge
  var serviceCharge = price *  0.1; //  10% of the price
  price += serviceCharge; // Add the service charge to the price

  // Display the result with the service charge included
  $('#result').html('Потрібно ' + sheets + ' листів. Вартість: ' + Math.round(price) + ' грн.');
}
