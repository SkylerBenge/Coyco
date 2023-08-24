$('.choice .slide-button').on('click', function() {
  $(this).parents('.choice').find('.slide-button').removeClass('selected');
  $(this).addClass('selected');

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  const variantData = (val) => {
    console.log(val);
    var order;
    if (val== "Pick-Up" ) {
      $('.chosen .variant').data('option1', 'Pick Up');
      $('.map').appendTo('#shopify-section-subscription');
      $('.map').hide();
      $('.note').appendTo('#shopify-section-pickup-delivery');
      $('.note').hide();
      $('.frequency').slideDown('slow');
      const nextPos = $('.frequency').offset().top - 20;
      $('html, body').animate({
        scrollTop: nextPos,
      }, 600);
    }
    if (val == "Pick-Up" || val== "Delivery" ) {
      order = val;
      $('.order-summary .product-order').text(order);
    }
    if (val == "Vase" ) {
      $('.vase').show();
      $('.hand-tied').hide();
    }
    if (val == "Hand-Tied" ) {
      $('.hand-tied').show();
      $('.vase').hide();
    }

    if ($(this).data('subscription')) {
      $('.chosen .variant').data('subscription', $(this).data('subscription'));
    }

    $('.products .variants').each(function() {
      var product = $(this).data('handle').split('-');
      if (product[0]==(val)) {
        $('.chosen .variant').data('handle', ''+product[0]+'-arrangement-subscription');
        return false;
      } else if ($(this).data('option1').includes(val)) {
        $('.chosen .variant').data('option1', $(this).data('option1'));
        return false;
      } else if ($(this).data('option2').includes(val)) {
        $('.chosen .variant').data('option2', $(this).data('option2'));
        return false;
      }
    });

    $('.products .variants').each(function() {
      if ($(this).data('handle') == $('.chosen .variant').data('handle') && $(this).data('option1') == $('.chosen .variant').data('option1') && $(this).data('option2') == $('.chosen .variant').data('option2')) {
        console.log($(this).data('subscription-1'));
        if ($('.chosen .variant').data('subscription') == 'monthly') {
          $('.chosen .variant').data('subscription-id', $(this).data('subscription-1'));
        } else if ($('.chosen .variant').data('subscription') == 'biweekly') {
          $('.chosen .variant').data('subscription-id', $(this).data('subscription-2'));
        } else {
          $('.chosen .variant').data('subscription-id', $(this).data('subscription-3'));
        }
        console.log('sub: ' + $('.chosen .variant').data('subscription'));
        console.log('subID: ' + $('.chosen .variant').data('subscription-id'));
        $('.chosen .variant').data('id', $(this).data('id'));
        $('.chosen .variant').data('price', ($(this).data('price') / 100).toFixed(2));

        let handle = $('.chosen .variant').data('handle');
        const handles = handle.split('-');

        $('.order-summary .product-size').text(handles[0].capitalize());
        $('.order-summary .product-container').text($('.chosen .variant').data('option2'));
        $('.order-summary .product-day').text($('#my_date_picker').val());
        console.log($('#my_date_picker').val());
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
  onSelect: function(selectedDate) {
    // Get selected date
    var date = $(this).datepicker('getDate');

    // Get subscription type
    var subscription = $('.chosen .variant').data('subscription');

    // Define output variables
    var weekNum = "";
    var dayOfWeekText = "";

    // Switch between different subscription types
    switch (subscription) {
      case "monthly":
        // Get week number and day of the week
        weekNum = Math.ceil(date.getDate() / 7);
        var dayOfWeek = date.getDay();

        // Convert day of the week to text
        var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        dayOfWeekText = daysOfWeek[dayOfWeek];

        // Add appropriate suffix to week number
        var suffix = "";
        if (weekNum == 1) {
          suffix = "st";
        } else if (weekNum == 2) {
          suffix = "nd";
        } else if (weekNum == 3) {
          suffix = "rd";
        } else {
          suffix = "th";
        }

        // Output result
        var result = "The " + weekNum + suffix + " " + dayOfWeekText + " of the month";
        break;

      case "biweekly":
        // Get day of the week
        var dayOfWeek = date.getDay();

        // Convert day of the week to text
        var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        dayOfWeekText = daysOfWeek[dayOfWeek];

        // Output result
        var result = "Every other " + dayOfWeekText;
        break;

      case "weekly":
        // Get day of the week
        var dayOfWeek = date.getDay();

        // Convert day of the week to text
        var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        dayOfWeekText = daysOfWeek[dayOfWeek];

        // Output result
        var result = "Every " + dayOfWeekText;
        break;
    }

    // Set input field value to result
    $('#my_date_picker').val(result);
    $('#my_date_button').val(result);
  }
});


$(".color-check").on('change', function() {
  if(this.checked) {
    if($('.order-summary .product-colors').is(':empty')){
      $('.order-summary .product-colors').append("<span class='chosen-color' data-id="+$(this).data('id')+">"+$(this).val()+"</span>");
    } else {
      $('.order-summary .product-colors').append("<span class='chosen-color' data-id="+$(this).data('id')+">, "+$(this).val()+"</span>");
    }
    $(this).parent().css( "border-color", "#cc3c38" );
  }
  $('#color-button').prop("disabled",false);
});

$('.add-to-cart').on('click', function() {
  var color = $('.chosen-color').text();
  var date = $('#my_date_picker').val();
  var deliveryInstructions = $('.delivery-instructions').val();
  var colorInstructions = $('.color-instructions').val();
  var noteInstructions = $('.note-instructions').val();

  $(this).text('Adding to cart');
  $(this).prop("disabled",true);

  var id = $('.chosen .variant').data('id');
  var selling_plan = $('.chosen .variant').data('subscription-id');

  var data = {
    quantity: 1,
    id: id,
    properties: {
      colors: color,
      date: date,
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