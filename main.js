

var data = [
    { id:"1", fname:"Avro", lname:"Energy"},
    { id:"2", fname:"Better", lname:"Energy"},
    { id:"3", fname:"Boost", lname:"Power"},
    { id:"4", fname:"British", lname:"Gas"},
    { id:"5", fname:"Bulb", lname:"Energy"},
    { id:"6", fname:"Co-Operative", lname:"Energy"},
    { id:"7", fname:"E.", lname:"ON"},
    { id:"8", fname:"EDF", lname:"Energy"},
    { id:"9", fname:"Engie", lname:""},
    { id:"10", fname:"Energy", lname:"Plus"},
    { id:"11", fname:"Enstroga", lname:""},
    { id:"12", fname:"Entice", lname:"Energy"},
    { id:"13", fname:"ESB", lname:"Energy"},
    { id:"14", fname:"Extra", lname:"Energy"},
    { id:"15", fname:"Flow", lname:"Energy"},
    { id:"16", fname:"Foxglove", lname:"Energy"},
    { id:"17", fname:"Future", lname:"Energy"},
    { id:"18", fname:"Good", lname:"Energy"},
    { id:"20", fname:"Great North", lname:"Energy"},
    { id:"21", fname:"Green", lname:"Energy UK"},
    { id:"22", fname:"Green Network", lname:"Energy"},
    { id:"23", fname:"Igloo", lname:"Energy"},
    { id:"24", fname:"Lumo", lname:"Energy"},
    { id:"25", fname:"M&S", lname:"Energy"},
    { id:"26", fname:"Nabuh", lname:"Energy"},
    { id:"27", fname:"Npower", lname:""},
    { id:"28", fname:"Octopus", lname:"Energy"},
    { id:"29", fname:"OVO", lname:"Energy"},
    { id:"30", fname:"People's", lname:"Energy"},
    { id:"31", fname:"Powershop", lname:"UK"},
    { id:"32", fname:"Pure", lname:"Planet"},
    { id:"33", fname:"Robin", lname:"Hood Energy"},
    { id:"34", fname:"Shell", lname:"Energy"},
    { id:"35", fname:"So", lname:"Energy"},
    { id:"36", fname:"SSE", lname:""},
    { id:"37", fname:"Scottish", lname:"Power"},
    { id:"38", fname:"Tonik", lname:"Energy"},
    { id:"39", fname:"Utilita", lname:"Energy"},
    { id:"40", fname:"Utility", lname:"Point"},
    { id:"41", fname:"Utility", lname:"Warehouse"},
    { id:"42", fname:"Yorkshire", lname:"Energy"},
  ];
  
  
  $('#txt-search').keyup(function(){
      $('.next').prop('disabled', true);
      var searchField = $(this).val();
      if(searchField === '')  {
        $('#filter-records').html('');
        return;
      }
      var regex = new RegExp(searchField, "i");
      var output = '';
      $.each(data, function(key, val){
        var fullname = val.fname +' '+ val.lname;
        if ((fullname.search(regex) != -1)) {
          output += '<li id="' +val.id +'" class="li-search">'+ val.fname +' '+ val.lname +'</li>';
        }
      });
      $('#filter-records').html(output);
  });
  
  $(document).on("click", ".li-search", function () {
    $("#txt-search").val($(this).html());
    setFormFields($(this).attr("id"));
    $("#filter-records").html("");
    $(".next").prop("disabled", false);
  });
  
  $(".radio-group .radio").on("click", function () {
    $(".selected .fa").removeClass("fa-check");
    $(".radio").removeClass("selected");
    $(this).addClass("selected");
    if ($("#suser").hasClass("selected") == true) {
      $(".next").prop("disabled", true);
      $(".searchfield").show();
    } else {
      setFormFields(false);
      $(".next").prop("disabled", false);
      $("#filter-records").html("");
      $(".searchfield").hide();
    }
  });
  
  var step = 1;
  $(document).ready(function () { stepProgress(step); });



  
  $(".next").on("click", function () {
    var nextstep = false;
    if (step == 2) {
      nextstep = checkForm("userinfo");
      if (!$("input[name='utility']:checked").val()) {
        alert("Please select a radio button.");
        return;
    }
    } else {
      nextstep = true;
    }
    if (nextstep == true) {


      if(step == 3){
        $("#overlay").show();
        $(".loader-container").show();
        setTimeout(function () {
          $("#overlay").hide();
          $(".loader-container").hide();
  
          if (step < $(".step").length) {
            $(".step").show();
            $(".step")
              .not(":eq(" + step++ + ")")
              .hide();
            stepProgress(step);
          }
          hideButtons(step);
        }, 2000000); 

        setTimeout( function(){
          const start = () => {
                confetti.start()
        };
  
        //  Stop
  
        const stop = () => {
            setTimeout(function() {
                confetti.stop()
            }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
        };
        start();
        stop();
          
        }, 2000000)
       

   
        
      }
      else{
        $("#overlay").show();
        $("#loader").show();
        setTimeout(function () {
          $("#overlay").hide();
          $("#loader").hide();
  
          if (step < $(".step").length) {
            $(".step").show();
            $(".step")
              .not(":eq(" + step++ + ")")
              .hide();
            stepProgress(step);
          }
          hideButtons(step);
        }, 2000); 
        
        
      }
      // Show overlay and loader for 4 seconds
    
      
      // 4 seconds delay
    }
});

$(".submit").on("click", function () {

  if(document.querySelector("canvas").style.borderColor != 'red'){
    var nextstep = true;
 
    if (nextstep == true) {
     
      if (step < $(".step").length) {
        $(".step").show();
        $(".step")
          .not(":eq(" + step++ + ")")
          .hide();
          stepProgress(step);
      }
      hideButtons(step);
    }

  }


  
});

  
  
  // ON CLICK BACK BUTTON
 // ON CLICK BACK BUTTON
$(".back").on("click", function () {
    if (step > 1) {
      step -= 1;
      $(".step").hide();
      $(".step")
        .filter(":eq(" + (step - 1) + ")")
        .show();
      stepProgress(step);
      hideButtons(step);
    }
  });
  
  // CALCULATE PROGRESS BAR
  stepProgress = function (currstep) {
    var percent = parseFloat(100 / $(".step").length) * currstep;
    percent = percent.toFixed();
    $(".progress-bar")
      .css("width", percent + "%")
      //.html(percent + "%");
  };
  
  // DISPLAY AND HIDE "NEXT", "BACK" AND "SUMBIT" BUTTONS
  hideButtons = function (step) {
    var limit = parseInt($(".step").length);
    $(".action").hide();
    if (step < limit - 1) {
      $(".next").show();
    }
    if (step > 1) {
      $(".back").show();
    }
    if(step == limit){
      $(".back").hide();
    }
    if(step == 3){
     $(".btn-uniqe").hide();
    }
    if (step == (limit - 1)) {
      $(".next").hide();
      $(".submit").show();
    }
  };
  
  function setFormFields(id) {
    if (id != false) {
      // FILL STEP 2 FORM FIELDS
      d = data.find(x => x.id === id);
     
    } else {
      // EMPTY USER SEARCH INPUT
      $("#txt-search").val('');
       // EMPTY STEP 2 FORM FIELDS
       $('#fname').val('');
       $('#lname').val('');
       $('#team').val('');
       $('#address').val('');
       $('#tel').val('');
    }
  }
  
  function checkForm(val) {
    // CHECK IF ALL "REQUIRED" FIELD ALL FILLED IN
    var valid = true;
    $("#" + val + " input:required").each(function () {
      if ($(this).val() === "") {
        $(this).addClass("is-invalid");
        valid = false;
      } else {
        $(this).removeClass("is-invalid");
      }
    });
    return valid;
  }
var gasValue = 0;
var elecValue = 0;
var elecMonthvalue = 0;
var gasMonthvalue = 0;



var totalPrice1 = 0;
var totalPrice2 = 0;
var totalPrice3 = 0;
var totalPrice4 = 0;
  $('#customRange1').on('input', function() {
    $('#gasValue').text("£ "+ $(this).val());
    gasValue = parseInt($(this).val());
    updatePriceOne();
    updatePriceTwo()
    updateBothprice()

});


$('#customRange2').on('input', function() {
    $('#gasContractValue').text($(this).val()+" Months");
    gasMonthvalue = parseInt($(this).val());
    updatePriceOne();
    updatePriceTwo()
    updateBothprice()

});

$('#customRange3').on('input', function() {
    $('#eleValue').text("£ "+ $(this).val());

    elecValue = parseInt($(this).val());
    updateEPriceOne();
    updatePriceTwo()
    updateBothprice()
    
});

$('#customRange4').on('input', function() {
    $('#electricContractValue').text($(this).val()+" Months");
    elecMonthvalue = parseInt($(this).val());
    updateEPriceOne();
    updateEPriceTwo()
    updateBothprice()
});

$('input[type="radio"]').change(function() {
    if ($(this).val() === 'gas') {
        $('.condition1').show();
        $('.condition2').hide();
        $('.bothprice').hide();

    } else if ($(this).val() === 'electric') {
        $('.condition1').hide();
        $('.condition2').show();
        $('.bothprice').hide();

    }else{
      $('.condition1').show();
      $('.gas-claim').hide();
      $('.condition2').show();
      $('.indivisul_price').hide();

      $('.bothprice').show();
      

      
    }
});function updatePriceOne() {
  totalPrice1 = ((gasValue * gasMonthvalue) * 0.14);
  $(".priceone").text("£ "+parseInt(totalPrice1));
  updateBothprice();
}

function updatePriceTwo() {
  totalPrice2 = ((gasValue * gasMonthvalue) * 0.22);
  $(".priceTwo").text("£ "+ parseInt(totalPrice2));
  updateBothprice();
}

function updateEPriceOne() {
  totalPrice3 = ((elecValue * elecMonthvalue) * 0.14);
  $(".priceEOne").text("£ "+ parseInt(totalPrice3));
  updateBothprice();
}

function updateEPriceTwo() {
  totalPrice4 = ((elecValue * elecMonthvalue) * 0.22);
  $(".priceETwo").text("£ "+ parseInt(totalPrice4));
  updateBothprice();
}

function updateBothprice() {
  $(".bothprice1").text("£ "+ parseInt(totalPrice3 + totalPrice1));
  $(".bothprice2").text("£ "+ parseInt(totalPrice2 + totalPrice4));
}

