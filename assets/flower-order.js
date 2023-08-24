$('.choice .slide-button').on('click', function() {
  $(this).parents('.choice').find('.slide-button').removeClass('selected');
  $(this).addClass('selected');

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  const variantData = (val) => {
    var order;
    if (val== "Delivery" ) {
      $('.time').appendTo('#shopify-section-pickup-delivery');
      $('.time').hide();
      $('.chosen .variant').data('option1', 'Delivery');
      $('.delivery-time').show();
    }
    if (val== "Pick-Up" ) {
      $('.map').appendTo('#shopify-section-pickup-delivery');
      $('.map').hide();
      $('.note').appendTo('#shopify-section-pickup-delivery');
      $('.note').hide();
      $('.product-type').slideDown('slow');
      const nextPos = $('.product-type').offset().top - 20;
      $('html, body').animate({
        scrollTop: nextPos,
      }, 600);
    }
    if (val == "Pick-Up" || val== "Delivery" ) {
      order = val;
      $('.order-summary .product-order').text(order);
    }
    if (val == "bouquet" ) {
      $('.arrangement').show();
      $('.wreath').hide();
    }
    if (val == "wreath" ) {
      $('.wreath').show();
      $('.arrangement').hide();
    }
    if (val == "Vase" ) {
      $('.vase').show();
      $('.hand-tied').hide();
    }
    if (val == "Hand-Tied" ) {
      $('.hand-tied').show();
      $('.vase').hide();
    }
    if (val == "Full" || val == "Half") {
      $('.bouquet').appendTo('#shopify-section-pickup-delivery');
      $('.bouquet').hide();
    }

    $('.products .variants').each(function() {
      var product = $(this).data('handle').split('-');
      if (product[0]==(val)) {
        if (product[0] != "wreath") {
          $('.chosen .variant').data('handle', ''+product[0]+'-arrangement');
        } else {

          $('.chosen .variant').data('handle', ''+product[0]+'');
        }
        return false;
      } else if ($(this).data('option1').includes(val)) {
        $('.chosen .variant').data('option1', $(this).data('option1'));
        return false;
      } else if ($(this).data('option2').includes(val)) {
        $('.chosen .variant').data('option2', $(this).data('option2'));
        return false;
      }
    });

    $('.products .variants').each(function(order) {
      if ($(this).data('handle') == $('.chosen .variant').data('handle') && $(this).data('option1') == $('.chosen .variant').data('option1') && $(this).data('option2') == $('.chosen .variant').data('option2')) {
        $('.chosen .variant').data('id', $(this).data('id'));
        $('.chosen .variant').data('price', ($(this).data('price') / 100).toFixed(2));

        let handle = $('.chosen .variant').data('handle');
        const handles = handle.split('-');

        $('.order-summary .product-size').text(handles[0].capitalize());
        $('.order-summary .product-container').text($('.chosen .variant').data('option2'));
        $('.order-summary .product-day').text($('#my_date_button').val());
        $('.order-summary .product-time').text($('.chosen .variant').data('option1'));
        $('.order-summary .product-price').text($('.chosen .variant').data('price'));
      }
    });
  }
  variantData($(this).val());

  const nextSection = $(this).closest('.choice').next();
  $(nextSection).slideDown('slow');
  const nextPos = nextSection.offset().top - 20;
  $('html, body').animate({
    scrollTop: nextPos,
  }, 600);
});

$(function() {
  var weekday=new Array(7);
  weekday[0]="Sunday";
  weekday[1]="Monday";
  weekday[2]="Tuesday";
  weekday[3]="Wednesday";
  weekday[4]="Thursday";
  weekday[5]="Friday";
  weekday[6]="Saturday";

  $( "#my_date_picker" ).datepicker({
    defaultDate:"12/01/2021",
    firstDay:1,
    maxDate:'+60d',
    minDate: '0d',
    beforeShowDay: function my_check(in_date) {
      if (in_date.getDay() == 0 || in_date.getDay() == 2) {
        return [false, "f", 'Not Available'];
      } else {
        return [true, "t", "Available"];
      }
    },
    onSelect: function() {
      var date = $(this).datepicker('getDate');
      $('#my_date_picker').val(weekday[date.getUTCDay()] + ' ' + $.datepicker.formatDate('mm/dd/yy', date));
      $('#my_date_button').val($('#my_date_picker').val().toLowerCase());
      $('#my_date_button').prop('disabled', false);
    }
  });
});

$(function() {
  $('.timepicker').timepicker({
    timeFormat: 'h:mm p',
    interval: 30,
    minTime: '11',
    maxTime: '4:00pm',
    defaultTime: '12',
    startTime: '11:00',
    dynamic: true,
    dropdown: true,
    scrollbar: true,
    change: function() {
      var str = $(this).val().replace(' PM', '');
      $('#my_time_button').val(str);
    }
  });
});
$(".color-check").on('change', function() {
  if(this.checked) {
    if($('.order-summary .product-colors').is(':empty')){
      $('.order-summary .product-colors').append("<span class='chosen-color' data-id="+$(this).data('id')+">"+$(this).val()+"</span>");
    } else {
      $('.order-summary .product-colors').append("<span class='chosen-color' data-id="+$(this).data('id')+">, "+$(this).val()+"</span>");
    }
    $(this).parent().css( "border-color", "#cc3c38" );
    $('#color-button').prop('disabled', false);
  }
});

$('#color-button').click(function() {
  $('#CartNote').append('Color Instructions: ' + $('#ColorNote').text());
});

$(".card-check").change(function() {
  $(".card-check").not(this).prop('checked',false);
  $('.order-summary .product-cards').html("");
  $('.card-check-container').css( "border-color", "#222" );
  if(this.checked) {
    $('.order-summary .product-cards').html("<span class='chosen-card' data-id="+$(this).data('id')+">"+$(this).val()+"</span>&nbsp;<span class='chosen-card-price' data-price="+$(this).data('price')+">$"+$(this).data('price')/100+"</span>");
    $(this).parent().css( "border-color", "#cc3c38" );
  }
});

$('.card-button').on('click', function() {
  $('.card-choices').slideDown('slow');
  $('#CartNote').append('Note: ' + $('#CardNote').text());
});

$('.add-to-cart').on('click', function() {
  var color = $('.chosen-color').text();
  var date = $('#my_date_button').val();
  var deliveryLocation = $('.delivery-location').val();
  var deliveryInstructions = $('.delivery-instructions').val();
  var colorInstructions = $('.color-instructions').val();
  var noteInstructions = $('.note-instructions').val();

  $(this).text('Adding to cart');
  $(this).prop("disabled",true);

  var id = $('.chosen .variant').data('id');

  $('.chosen-card').each(function() {
    var id = $( this ).data('id');
    const data = {
      quantity: 1,
      id: id
    };
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data,
      dataType: 'json',
      success: () => {
        console.log('added '+$( this ).text()+'');
      },
    });
  });

  $('.product-delivery').each(function() {
    var id = $( this ).data('id');
    const data = {
      quantity: 1,
      id: id
    };
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data,
      dataType: 'json',
      success: () => {
        console.log('added '+$( this ).text()+'');
      },
    });
  });

  var data = {
    quantity: 1,
    id: id,
    properties: {
      colors: color,
      date: date,
      _deliveryLocation: deliveryLocation,
      _deliveryInstructions: deliveryInstructions,
      _colorInstructions: colorInstructions,
      _noteInstructions: noteInstructions
    }
  };

  setTimeout(function(){
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data,
      dataType: 'json',
      success: () => {
        $(this).fadeOut();
        $(".checkout-button").fadeIn();
      },
    });
  }, 1000);
});