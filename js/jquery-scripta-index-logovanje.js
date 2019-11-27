$(document).ready(function(){



// var jezik = "Promeni_jezik";      //ovim bzv definisemo globalnu variablu jezik
//   $("#engleski").click(function(){
//        jezik = "engleski";                         //a zatim klikom na dugme  menjamo joj vrednost koja ce se kasnije slati na sve ostale stranice
//      })
//    $("#srpski").click(function(){             //ili joj menjamo vrednost u drugi izabrani jezik
//        jezik = "srpski";
//      })
//
//
//
//   $("#posalji").click(function(){
//   	var email = $("#email-login").val();
//   	var lozinka = $("#password").val();
//     var posalji = $("#posalji").val();
//     if($("#zapamti_me").is(':checked'))           //PROVERAVAMO DA LI JE CEKIRANO POLJE ZA PAMCENJE EMAILA I LOZINKE
//     {
//       var zapamti_me ="1";   //AKO JESTE DODELJUJEMO NEKU BEZVEZE VREDNOST VARIJABLI KOJU SALJEMO NA LOGIN.PHP
//     }
//     else{
//       var zapamti_me ="";  //A AKO NIJE CEKIRANO ONDA SALJEMO KAO PRAZNU VREDNOST NA LOGIN.PHP PA SA empty() OPCIJOM PROVERAVAMO DA LI JE
//     }              //PRAZNO / CEKIRANO ILI NE
//
//
//
//     if(email == "" && lozinka == ""){
// 		   $( "#email-login" ).effect( "shake" );     //U ZAVISNOSTI OD TOGA STA JE PRAZNO/NE POPUNJENO...TO VIBRIRA
// 		   $( "#password" ).effect( "shake" );     //ZA OVO JE OBAVEZNO UVEZTI JQUERY DODATAK
//        return;  //PREKID KODA
// 	}
// 	else if(email == "" || email == null){
// 		   $( "#email-login" ).effect( "shake" );
//        return;  //PREKID KODA
// 	}
// 	else if(lozinka == "" || lozinka == null){
// 		   $( "#password" ).effect( "shake" );
//        return;  //PREKID KODA
// 	}
//   var login_strana = "login_strana";
//                           //ZA SVE OSTALO ISPISUJE GRESKU
//   	$.post("php/index_php/handler_index.php",{
//   		  email:email,
//   		  lozinka:lozinka,
//         zapamti_me:zapamti_me,
//         posalji:posalji,
//         login_strana:login_strana,
//       },function(data,status){
//
//   		             var data = jQuery.parseJSON(data);
//
//   		               if(data === "Uspesno logovanje"){
//                               window.location.href = 'pocetna.php?jezik='+jezik;
//                               //prethodno definisana varijabla odabirom na dugme menja vrednost u zeljeni jezik ili je saljemo kao prvobitno definisanu {Promeni_jezik}
//   					   }
//   		               else if(data === "Nismo pronasli vas EMAIL!"){
//
//                            if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == ""){
//
//                              swal({
//                                        title: 'Nismo pronasli vas EMAIL!',
//                                        icon: "warning",              //ALERT BOX
//                                        timer: 2000,
//                                        buttons: false,
//                                        closeOnClickOutside: false,
//                                    });
//                                    return;
//                            }
//                            else if(jezik == 'engleski' || jezik == 'Promeni_jezik' || jezik == null || jezik == ""){
//
//                              swal({
//                                        title: 'We could not find your EMAIL!',
//                                        icon: "warning",              //ALERT BOX
//                                        timer: 2000,
//                                        buttons: false,
//                                        closeOnClickOutside: false,
//                                    });
//                                    return;
//                            }
//                          }
//                            else if(data === "Pogresna lozinka"){
//
//                                  if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == ""){
//
//                                    swal({
//                                              title: 'Pogresna lozinka!',
//                                              icon: "warning",              //ALERT BOX
//                                              timer: 2000,
//                                              buttons: false,
//                                              closeOnClickOutside: false,
//                                          });
//                                          return;
//                                  }
//                                  else if(jezik == 'engleski' || jezik == 'Promeni_jezik' || jezik == null || jezik == ""){
//
//                                    swal({
//                                              title: 'Wrong password!',
//                                              icon: "warning",              //ALERT BOX
//                                              timer: 2000,
//                                              buttons: false,
//                                              closeOnClickOutside: false,
//                                          });
//                                          return;
//                                  }
//
//   					    	}
//
//                   else if(data === "Vase obaveze nisu izmirene")
//                   {
//                                   if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == ""){
//
//                                     swal({
//                                               title: 'Vase obaveze nisu izmirene!',
//                                               icon: "error",              //ALERT BOX
//                                               closeOnClickOutside: false,
//                                           });
//                                           return;
//                                   }
//                                   else if(jezik == 'engleski' || jezik == 'Promeni_jezik' || jezik == null || jezik == ""){
//
//                                     swal({
//                                               title: 'Your liabilities are not paid!',
//                                               icon: "error",              //ALERT BOX
//                                               closeOnClickOutside: false,
//                                           });
//                                           return;
//                                   }
//                   }
//
//   		     }
//   	   );
//
// });
//        $("#link_zaboravljena_lozinka").click(function(){
//
//          $("#logovanje_div").css("display","none");
//          $("#ceo_div_zaboravljena_lozinka").slideToggle('fast');
//        });
//
//      $("#dugme_posalji_email_za_obnovu_lozinke").click(function(){
//
//        var email_zaboravljena_lozinka = $("#email_zaboravljena_lozinka").val();
//
//        $.post("php/index_php/handler_index.php",{
//               email_zaboravljena_lozinka:email_zaboravljena_lozinka
//        },function(data,status){
//          var data = jQuery.parseJSON(data);
//
//             if(data == "Nismo uspeli da pronadjemo vasu Email adresu!")
//             {
//                       $("#ispis_obavestenja_zaboravljena_lozinka").html('Nismo uspeli da pronadjemo vasu Email adresu!').css('display', 'block');
//                       setTimeout(function(){ $("#ispis_obavestenja_zaboravljena_lozinka").css('display', 'none'); }, 3500);
//             }
//
//             else if(data == "Email je uspesno poslat!")
//              {
//                        $("#ispis_obavestenja_zaboravljena_lozinka").html('Email je uspesno poslat!').css('display', 'block');
//                        setTimeout(function(){ $("#ispis_obavestenja_zaboravljena_lozinka").css('display', 'none'); }, 3500);
//              }
//             else if(data == "Doslo je do greske prilikom slanja Emaila-a!")
//              {
//                        $("#ispis_obavestenja_zaboravljena_lozinka").html('Doslo je do greske prilikom slanja Emaila-a!').css('display', 'block');
//                        setTimeout(function(){ $("#ispis_obavestenja_zaboravljena_lozinka").css('display', 'none'); }, 3500);
//              }
//
//        })
//      })
//
//
//      $("#dugme_demo").click(function(){
//           var dugme_demo = "dugme_demo";
//           $.post("php/index_php/handler_index.php",{
//                dugme_demo:dugme_demo,
//           },function(data,status){
//                  var data = jQuery.parseJSON(data);
//
//                  if(data == "Uspesno logovanje-demo")
//                  {
//                      window.location.href = 'pocetna.php?jezik='+jezik;
//                  }
//           })
//      });
//
//
//
//
//
//      $(window).scroll(function() {   //dugme je po defaultu nevidljivo
//       $("#dugme_za_povratak_na_vrh").css("display","block"); //kad krene skrolovanje onda se pojavljuje
//       if($(this).scrollTop() == 0)   //i kad je ponovo stranica na vrhu
//       {
//         $("#dugme_za_povratak_na_vrh").css("display","none"); //onda ga sklanja
//       }
//
//    });
// $("#dugme_za_povratak_na_vrh").click(function() {
//
//        $('html, body').animate({
//          scrollTop: $("#naslov_sidro").offset() == 0   //a kada se klike na njega onda se stranica automacki skroluje ka vrhu
//       }, 500);
//        $("#dugme_za_povratak_na_vrh").css("display","none");  //i sklanja dugme
//             });
//
//
// var clicks = 0;
// $("#dugme_za_slanje_poruke_podrsci").click(function(){
//           if (clicks == 0){                                  //dugme za prikaz i sklanjanje diva za slanje poruke adminu
//                 // first click
//                 $("#poruka_adminu").css("display","block"); //ova funkcija imitira toggle samo meni je trebala da bih znao kada je koji klik u pitanju
//                 $("#slicica_porukica_podrsci").attr("src","slika/cancel.png");
//                 $("#donja_navigacija").css("height","64px");
//                 $("#poruka_adminu").css({
//                   position:"absolute",
//                   bottom:"60px",
//                   right:"20px"
//                 });
//                 $("#dugme_za_slanje_poruke_podrsci").css({
//                   position:"relative",
//                   top:"0px"
//                 });
//                 clicks++;  //radi po principu kad je 0 pokazi i pomeri click na 1
//             } else{
//                 // second click
//                 $("#poruka_adminu").css("display","none");   //kad je 1 i kad klikne vrati click na 0
//                 $("#slicica_porukica_podrsci").attr("src","slika/porukica_podrsci.png");
//                 $("#dugme_za_slanje_poruke_podrsci").css({
//                   position:"relative",
//                   top:"0px",
//                 });
//                 clicks--;
//             }
//
// });
//
//  $("#dugme_posalji_korisnika_koji_mi_salje_poruke").click(function(){
//
//     var email_korisnika_koji_mi_salje_poruke = $("#email_korisnika_koji_mi_salje_poruke").val();
//     var poruka_korisnika_koji_mi_salje_poruke = $("#poruka_korisnika_koji_mi_salje_poruke").val();
//     var verifikacija_slanje_poruke_adminu = "verifikacija_slanje_poruke_adminu";
//
//     $.post("php/pocetna_php/handler_pocetna.php",{
//       email_korisnika_koji_mi_salje_poruke:email_korisnika_koji_mi_salje_poruke,
//       poruka_korisnika_koji_mi_salje_poruke:poruka_korisnika_koji_mi_salje_poruke,
//       verifikacija_slanje_poruke_adminu:verifikacija_slanje_poruke_adminu,
//     },function(data,status){
//        var data = jQuery.parseJSON(data);
//        if(data == "Email je uspesno poslat!"){
//          $("#slikica_o_slanju_emaila_od_korisnika").css("display","block");
//          setTimeout(function(){ $("#slikica_o_slanju_emaila_od_korisnika").css('display', 'none'); }, 3500);
//        }
//        else if(data == "Doslo je do greske prilikom slanja Emaila-a!"){
//          $("#slikica_za_menjanje_pri_slanju_emaila").attr("src","slika/cancel.png");
//          $("#slikica_o_slanju_emaila_od_korisnika").css("display","block");
//          setTimeout(function(){ $("#slikica_o_slanju_emaila_od_korisnika").css('display', 'none'); }, 3500);
//        }
//     });
//  });
//
// $("#modal_uslovi_koriscenja").click(function(){
//   $('#exampleModalScrollable').modal('show');
// })
// $("#dugme_prihvatam_uslove_koriscenja").click(function(){
//   $('#dugme_zatvori_modal_uslove_koriscenja').click();
//   $("#uslovi_koriscenja").prop('checked', true);
// });
// $('#dugme_zatvori_modal_uslove_koriscenja, #dugme_gornje_zatvori_modal_uslove_koriscenja').click(function(){
//   $("#uslovi_koriscenja").prop('checked', false);
// })
//
//
// $(window).scroll(function() {   //PRIKAZ POMOCNOG MENIJA POSLE 170PX SKROLOVANJA
//         if ($(document).scrollTop() > 170 && $(window).width() > 600)
//         {
//           $( "#rezervna_navigacija" ).slideDown( "fast", function() {
//
//               });
//         }
//         else if($(window).width() < 600)  //NE ZNAM DA LI TREBA TREBA PROVERITI
//         {
//          $( "#rezervna_navigacija" ).css("display","none");
//         }
//         else if($(document).scrollTop() < 170 && $(window).width() > 600) {   //SKLANJANJE POMOCNOG MENIJA
//           $( "#rezervna_navigacija" ).slideUp( "fast", function() {
//               });
//
//         }
//
//     });
//
//
//
// $(document).keydown(function(event) {  //ZABRANA ZUMIRANJA NA INDEX STRANICI
//     if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  )) {
//
//         event.preventDefault();
//      }
//      $(window).bind('mousewheel DOMMouseScroll', function (event) {
//        if (event.ctrlKey == true) {
//        event.preventDefault();
//        }
//      }
//    )
// });
//
//
//
// //API
// $.get("https://api.ipdata.co?api-key=test", function (response) {
//   grad = response.time_zone.name;
//   grad = grad.substring(7);       //PRVI API UZIMA PODATKE O LOKACIJI I TU IZDVAJA IME GRADA
//
//
//
// $.ajax({
//   url:"https://api.openweathermap.org/data/2.5/find?q="+grad+"&units=metric&APPID=1a662b04aa49c64b2a212ba6ed82c60a",
//   type:"GET",
//   dataType:"jsonp",                    //DRUGI API UZIMA PODATKE O VREMENSKOJ PROGNOZI ZA IZABRANI GRAD
//   success:function(data){
//      var trenutna_temperatura = data.list[0].main.temp;
//      var ime_grada = data.list[0].name;
//      var min_temperatura = data.list[0].main.temp_min;
//      var max_temperatura = data.list[0].main.temp_max;
//      var trenutno = data.list[0].weather[0].main;
//      var ikonica = data.list[0].weather[0].icon;           //NAZIV SLIKE(ikonice)
//      var iconurl = "http://openweathermap.org/img/w/" + ikonica + ".png";        //URL KA SLICICAMA I KONKRETNOS SLICICI
//
//
//      $("#min").html('Min Temp&nbsp;'+min_temperatura);
//      $("#max").html('Max Temp&nbsp;'+max_temperatura);
//      $("#trenutna").html(trenutna_temperatura);       //ISPIS PODATAKA
//      $("#opis").html(trenutno);
//      $("#ime_grada").html(ime_grada);
//
//
//     $("#trenutna").css("background-image",'url("' + iconurl + '")');     //PRIKAZ I SLICICE
//     $("#trenutna").css("background-repeat",'no-repeat');
//
//    }
// });
// }, "json");
// //API


});
