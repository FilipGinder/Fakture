$(document).ready(function(){
jezik = window.location.search.substring(7);
smanjeni_ekran();
prikaz_labela_u_kontakt_divu_na_index_strani();

$("#rotirajuci_logo").show('slide', { direction: "down" } , 500);

$(window).resize(function(){
  smanjeni_ekran();
});

$('#carouselExampleInterval').carousel({
		pause: 'none',
    interval: 5000
	})
      $("#engleski").click(function(){
        jezik = 'engleski';
      });
      $("#srpski").click(function(){
        jezik = 'srpski';
      });

    $("#dugme_registracija, #dugme_registracija_pomocno").click(function(){

          $("#logovanje_div").css("display","none");      //PRIKAZ REGISTRACIJE FORMA
          $("#vreme").css("display","none");
          $("#ceo_div_zaboravljena_lozinka").css("display","none");
          $("#okvir").slideToggle('fast');
    });
    $("#dugme_logovanje, #dugme_logovanje_pomocno").click(function(){
            $("#okvir").css("display","none");      //PRIKAZ LOGOVANJE FORME
            $("#vreme").css("display","none");
            $("#navbarNavDropdown").css("display","none");
            $("#ceo_div_zaboravljena_lozinka").css("display","none");
            $("#logovanje_div").slideToggle('fast');
            $('html').css("overflow-y","scroll");
          //  if($("#logovanje_div").is(':visible'))
          // {
          //   $(document).touch(function(e)
          //   {
          //       var container = $("#forma");
          //
          //       if (!container.is(e.target) && container.has(e.target).length === 0) //PROVERITI DA LI RADI NA TELEFONU
          //       {
          //           $("#logovanje_div").slideToggle('fast');
          //       }
          //   });
          //
          // }
    });

    $("#zatvori").click(function(){

          $("#logovanje_div").css("display","none");      //ZATVARANJE REGISTRACIJE FORMA
          $("#okvir").css("display","none");
          $("#vreme").css("display","block");
    });
    $("#dugme_pocetna, #dugme_pocetna_pomocno").click(function(){

          $("#logovanje_div").css("display","none");      //PRIKAZ POCETNE
          $("#okvir").css("display","none");
          $("#ceo_div_zaboravljena_lozinka").css("display","none");
          $("#vreme").css("display","block");
    });


           $("#email").on( 'keyup keypress',function(){
             var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

             if(!email_regex.test($("#email").val())){
               $("#email").css("border","1px solid red");
             }
             else{
               $("#email").removeAttr('style');
             }
           })

           $("#lozinka").on( 'keyup keypress',function(){
             var sifra = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/;

             if(!sifra.test($("#lozinka").val())){
               $("#lozinka").css("border","1px solid red");
             }
             else{
               $("#lozinka").removeAttr('style');
             }
           })

           $("#ziro_racun").on( 'keyup keypress',function(){
             if($("#ziro_racun").val().length == 3){
               $("#ziro_racun").val($("#ziro_racun").val()+'-');
             }
            else if($("#ziro_racun").val().length == 17){
              $("#ziro_racun").val($("#ziro_racun").val()+'-');
            }


           })

           $("#pib_firme").on( 'keyup keypress',function(){
                  var jedino_broj = /^[0-9]*$/;
             if($("#pib_firme").val().length !== 9 || !jedino_broj.test($("#pib_firme").val())){

               $("#pib_firme").css("border","1px solid red");
             }
            else if($("#pib_firme").val().length == 9){
              $("#pib_firme").removeAttr('style');
            }

           })

           $("#maticni_br_firme").on( 'keyup keypress',function(){
                 var jedino_broj = /^[0-9]*$/;
             if($("#maticni_br_firme").val().length !== 8 || !jedino_broj.test($("#maticni_br_firme").val())){
               $("#maticni_br_firme").css("border","1px solid red");
             }
            else if($("#maticni_br_firme").val().length == 8){
              $("#maticni_br_firme").removeAttr('style');
            }

           })

           $("#broj_telefona").on( 'keyup keypress',function(){

             if($("#broj_telefona").val().length == 3){
               $("#broj_telefona").val($("#broj_telefona").val()+'/');
             }
            else if($("#broj_telefona").val().length == 7){
              $("#broj_telefona").val($("#broj_telefona").val()+'-');
            }

           })

           $("#fix_br_telefona").on( 'keyup keypress',function(){

             if($("#fix_br_telefona").val().length == 3){
               $("#fix_br_telefona").val($("#fix_br_telefona").val()+'/');
             }
            else if($("#fix_br_telefona").val().length == 7){
              $("#fix_br_telefona").val($("#fix_br_telefona").val()+'-');
            }

           })





$("#nazad").attr('disabled','disabled');

    $("#napred").click(function(){
             $("#nazad").attr('disabled',false);
//KORAK NULA NA JEDAN
                  if($("#korak-0").is(':visible'))
                  {

                            var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
                            var sifra = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/;

                                if($("#email").val() == "" || $("#email").val() == null)
                                {
                                  $( "#email" ).effect( "shake" );
                                }

                              else if(!email_regex.test($("#email").val()))
                              {
                                        if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                                                                       swal({
                                                                                 title: 'Nepravilno unet email',
                                                                                 icon: "warning",              //ALERT BOX
                                                                                 timer: 2000,
                                                                                 buttons: false,
                                                                                 closeOnClickOutside: false,
                                                                             });
                                                                             $("#email").css("border","1px solid red");
                                                                             return;
                                                   }
                                                   else if(jezik == 'engleski'){
                                                                       swal({
                                                                                 title: 'Incorrectly entered email',
                                                                                 icon: "warning",              //ALERT BOX
                                                                                 timer: 2000,
                                                                                 buttons: false,
                                                                                 closeOnClickOutside: false,
                                                                             });
                                                                             $("#email").css("border","1px solid red");
                                                                             return;
                                                   }
                              }
                              else if($("#lozinka").val() == "" || $("#lozinka").val() == null)
                              {
                                $( "#lozinka" ).effect( "shake" );
                              }
                              else if(!sifra.test($("#lozinka").val()))
                              {
                                                      if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                                                                          swal({
                                                                                    title: 'Radi vase bezbednosti lozinka koju sve uneli mora u sebi sadrzati minimum jedan broj,minimum jedno malo slovo,minimum jedno veliko slovo,minimum jedan specijalan karakter i ne sme biti kraca od 6 karaktera',
                                                                                    icon: "warning",              //ALERT BOX
                                                                                //    timer: 2000,
                                                                                //    buttons: false,
                                                                                    closeOnClickOutside: false,
                                                                                });
                                                                                $("#lozinka").css("border","1px solid red");
                                                                                return;
                                                      }
                                                      else if(jezik == 'engleski'){
                                                                          swal({
                                                                                    title: 'For your security password that must be entered all in itself contain a minimum number, minimum one lowercase letter, one uppercase letter minimum, minimum one special character and may not be shorter than 6 characters',
                                                                                    icon: "warning",              //ALERT BOX
                                                                                //    timer: 2000,
                                                                                //    buttons: false,
                                                                                    closeOnClickOutside: false,
                                                                                });
                                                                                $("#lozinka").css("border","1px solid red");
                                                                                return;
                                                      }
                              }
                              else if($("#ime_vlasnika").val() == "" || $("#ime_vlasnika").val() == null)
                              {
                                  $( "#ime_vlasnika" ).effect( "shake" );
                              }


                              else{
                              $("#korak-0").css("display","none");         //KORACI ZA NAPRED
                              $("#korak-1").css("display","block");           //PRVI NA DRUGI KORAK
                              $("#strelica1").css("background-color","rgb(121,255,193)");  //BLEDA BOJA
                              $("#strelica2").css("background-color","rgb(28,215,13)");  //FOKUS BOJA
                              }
                   }
//KORAK NULA NA JEDAN





//KORAK JEDAN NA DVA
                  else if($("#korak-1").is(':visible'))
                  {
                        if($("#ime_firme").val() == "" || $("#ime_firme").val() == null)
                        {
                          $( "#ime_firme" ).effect( "shake" );
                        }
                        else if($("#adresa_firme").val() == "" || $("#adresa_firme").val() == null)
                        {
                          $( "#adresa_firme" ).effect( "shake" );
                        }
                        else if($("#lokacija_firme").val() == "" || $("#lokacija_firme").val() == null)
                        {
                          $( "#lokacija_firme" ).effect( "shake" );
                        }
                        else{
                                  $("#korak-1").css("display","none");
                                  $("#korak-2").css("display","block");       //DRUGI NA TRECI KORAK
                                  $("#strelica2").css("background-color","rgb(121,255,193)");  //BLEDA BOJA
                                  $("#strelica3").css("background-color","rgb(28,215,13)");  //FOKUS BOJA
                            }
                  }
//KORAK JEDAN NA DVA







//KORAK DVA NA TRI
                  else if($("#korak-2").is(':visible'))
                  {

                    var jedino_broj = /^[0-9]*$/;

                    if($("#pib_firme").val() == "" || $("#pib_firme").val() == null)
                    {
                      $( "#pib_firme" ).effect( "shake" );
                    }

                              else if(!jedino_broj.test($("#pib_firme").val()) || $("#pib_firme").val().length < 9  || $("#pib_firme").val().length > 9 )
                              {
                                if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                                                    swal({
                                                              title: 'Pib moze sadrzati samo brojeve i mora imati 9 brojeva!!',
                                                              icon: "warning",              //ALERT BOX
                                                              timer: 2000,
                                                              buttons: false,
                                                              closeOnClickOutside: false,
                                                          });
                                                        $("#pib_firme").css("border","1px solid red");
                                                          return;
                                }
                                else if(jezik == 'engleski'){
                                                    swal({
                                                              title: 'PIB can contain only numbers and must have 9 numbers!!',
                                                              icon: "warning",              //ALERT BOX
                                                              timer: 2000,
                                                              buttons: false,
                                                              closeOnClickOutside: false,
                                                          });
                                                        $("#pib_firme").css("border","1px solid red");
                                                          return;
                                }
                              }

                    else if($("#maticni_br_firme").val() == "" || $("#maticni_br_firme").val() == null)
                    {
                      $( "#maticni_br_firme" ).effect( "shake" );
                    }

                              else if(!jedino_broj.test($("#maticni_br_firme").val()) || $("#maticni_br_firme").val().length < 8  || $("#maticni_br_firme").val().length > 8 )
                              {
                                if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                                                    swal({
                                                              title: 'Maticni broj firme moze sadrzati samo brojeve i mora imati 8 brojeva!!',
                                                              icon: "warning",              //ALERT BOX
                                                              timer: 2000,
                                                              buttons: false,
                                                              closeOnClickOutside: false,
                                                          });
                                                          $("#maticni_br_firme").css("border","1px solid red");
                                                          return;
                                }
                                else if(jezik == 'engleski'){
                                                    swal({
                                                              title: 'Identification number can contain only numbers and must have 8 numbers!!',
                                                              icon: "warning",              //ALERT BOX
                                                              timer: 2000,
                                                              buttons: false,
                                                              closeOnClickOutside: false,
                                                          });
                                                          $("#maticni_br_firme").css("border","1px solid red");
                                                          return;
                                }
                              }

                    // else if($("#opis_firme").val() == "" || $("#opis_firme").val() == null)
                    // {
                    //   $( "#opis_firme" ).effect( "shake" );
                    // }


                    else{
                                  $("#napred").attr('disabled','disabled');
                                  $("#napred").css("display","none");
                                  $("#korak-2").css("display","none");
                                  $("#korak-3").css("display","block");      //TRECI NA CETVRTI KORAKK
                                  $("#sacuvaj").css("display","block");
                                  $("#div_uslovi_koriscenja").css("display","block");
                                  $("#strelica3").css("background-color","rgb(121,255,193)");  //BLEDA BOJA
                                  $("#strelica4").css("background-color","rgb(28,215,13)");  //FOKUS BOJA

                        }



                  }
      //KORAK DVA NA TRI



                                   });


    $("#nazad").click(function(){

                  if($("#korak-1").is(':visible'))
                  {
                          $("#nazad").attr('disabled','disabled');
                          $("#korak-1").css("display","none");             //KORACI ZA NAZAD
                          $("#korak-0").css("display","block");        //DRUGI NA PRVI KORAK
                          $("#strelica2").css("background-color","rgb(121,255,193)");  //BLEDA BOJA
                          $("#strelica1").css("background-color","rgb(28,215,13)");  //FOKUS BOJA
                  }
                  else if($("#korak-2").is(':visible'))
                  {
                          $("#korak-2").css("display","none");
                          $("#korak-1").css("display","block");           //TRECI NA DRUGI KORAK
                          $("#strelica3").css("background-color","rgb(121,255,193)");  //BLEDA BOJA
                          $("#strelica2").css("background-color","rgb(28,215,13)");  //FOKUS BOJA
                  }
                  else if($("#korak-3").is(':visible'))
                  {
                          $("#napred").attr('disabled',false );
                           $("#napred").css("display","inline-block");
                          $("#sacuvaj").css("display","none");
                          $("#div_uslovi_koriscenja").css("display","none");
                          $("#korak-3").css("display","none");
                          $("#korak-2").css("display","block");         //CETVRTI NA TRECI KORAK
                          $("#strelica4").css("background-color","rgb(121,255,193)");  //BLEDA BOJA
                          $("#strelica3").css("background-color","rgb(28,215,13)");  //FOKUS BOJA
                  }
    });


                              $("#sacuvaj").on('click',function(){

                                            var ime_firme = $("#ime_firme").val();
                                            var adresa_firme = $("#adresa_firme").val();
                                            var lokacija_firme = $("#lokacija_firme").val();
                                            var pib_firme = $("#pib_firme").val();
                                            var maticni_br_firme = $("#maticni_br_firme").val();
                                            var opis_firme = $("#opis_firme").val();
                                            var ziro_racun = $("#ziro_racun").val();
                                            var ime_vlasnika = $("#ime_vlasnika").val();
                                            var broj_telefona = $("#broj_telefona").val();
                                            var fix_br_telefona = $("#fix_br_telefona").val();
                                            var email = $("#email").val();
                                            var lozinka = $("#lozinka").val();
                                            var uslovi_koriscenja = $("#uslovi_koriscenja").val();

              if(ziro_racun == "" || ziro_racun == null)
              {
                $( "#ziro_racun" ).effect( "shake" );
              }
              else if(broj_telefona == "" || broj_telefona == null)
              {
                $( "#broj_telefona" ).effect( "shake" );
              }
              else if(!$('#uslovi_koriscenja').is(":checked"))
              {
                if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                swal({
                          title: 'Za nastavak morate prihvatiti uslove koriscenja!!',
                          icon: "warning",              //ALERT BOX
                          timer: 2000,
                          buttons: false,
                          closeOnClickOutside: false,
                      });
                      return;
                    }
                 else if(jezik == 'engleski'){
                   swal({
                             title: 'To continue, you must accept the terms of use!!',
                             icon: "warning",              //ALERT BOX
                             timer: 2000,
                             buttons: false,
                             closeOnClickOutside: false,
                         });
                         return;
                 }
              }
              else{
                               var registracija_strana = "registracija_strana";    //ovo sluzi kao verifikacija koju funkciju da gadja
                                            $.post("php/index_php/handler_index.php",{
                                               ime_firme:ime_firme,
                                               adresa_firme:adresa_firme,
                                               lokacija_firme:lokacija_firme,
                                               pib_firme:pib_firme,
                                               maticni_br_firme:maticni_br_firme,
                                               opis_firme:opis_firme,
                                               ziro_racun:ziro_racun,
                                               ime_vlasnika:ime_vlasnika,
                                               broj_telefona:broj_telefona,
                                               fix_br_telefona:fix_br_telefona,
                                               email:email,
                                               lozinka:lozinka,
                                               registracija_strana:registracija_strana,
                                              },function(data,status){
                                                var data = jQuery.parseJSON(data);

                                                if(data == "Uspesna registracija")
                                                {
                                                  var login_strana = "login_strana";   //ovo sluzi kao verifikacija koju funkciju da gadja...ovo ponavljamo
                                                  $.post("php/index_php/handler_index.php",{        //AKO JE REGISTRACIJA USPESNA AUTOMACKI SALJE PODATKE
                                      												   email:email,     //NA LOGIN.PHP I KAO POVRATNU INFORMACIJU
                                      												   lozinka:lozinka,     //DIREKTNO ULOGUJE KORISNIKA
                                                                 login_strana:login_strana,
                                      														},function(data,status){
                                                                      var data = jQuery.parseJSON(data);
                                                                         if(data == 'Uspesno logovanje'){


                                      												            window.location.href = 'pocetna.php?jezik='+jezik;
                                                                        }
                                                                        else{alert("ERROR")}
                                      													}
                                      											)
                                                        return;
                                                }
                                               else if(data == "Email vec postoji")
                                                  {
                                                              if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                                                                                  swal({
                                                                                            title: 'Ovaj email je vec registrovan, nije moguce vise puta se registrovati sa jednom email adresom',
                                                                                            icon: "warning",              //ALERT BOX
                                                                                            timer: 3000,
                                                                                            buttons: false,
                                                                                            closeOnClickOutside: false,
                                                                                        });
                                                                                        $("#email").css("border","1px solid red");
                                                                                        return;
                                                                                 }
                                                              else if(jezik == 'engleski'){
                                                                                swal({
                                                                                          title: 'This email is already registered, it is not possible to register more than once with one email address',
                                                                                          icon: "warning",              //ALERT BOX
                                                                                          timer: 3000,
                                                                                          buttons: false,
                                                                                          closeOnClickOutside: false,
                                                                                      });
                                                                                      $("#email").css("border","1px solid red");
                                                                                      return;
                                                              }
                                                  }

                                              })
                                        }
                                             });

                            $("#cancel").click(function(){
                                             $("#ime_firme").val('');
                                             $("#adresa_firme").val('');
                                             $("#lokacija_firme").val('');
                                             $("#pib_firme").val('');
                                             $("#maticni_br_firme").val('');
                                             $("#opis_firme").val('');
                                             $("#ziro_racun").val('');
                                             $("#ime_vlasnika").val('');
                                             $("#broj_telefona").val('');
                                             $("#fix_br_telefona").val('');
                                             $("#email").val('');
                                             $("#lozinka").val('');
                                             $("#korak-0").show();
                                             $("#korak-1").hide();
                                             $("#korak-2").hide();
                                             $("#korak-3").hide();
                                             $("#strelica1").css("background-color","rgb(28,215,13)");  //FOKUS BOJA
                                             $("#strelica2").removeAttr('style');;  //FOKUS BOJA
                                             $("#strelica3").removeAttr('style');;  //FOKUS BOJA
                                             $("#strelica4").removeAttr('style');;  //FOKUS BOJA
                                             $("#sacuvaj").css("display","none");

});









//LOGOVANJE
//LOGOVANJE
//LOGOVANJE

var jezik = "Promeni_jezik";      //ovim bzv definisemo globalnu variablu jezik
  $("#engleski").click(function(){
       jezik = "engleski";                         //a zatim klikom na dugme  menjamo joj vrednost koja ce se kasnije slati na sve ostale stranice
     })
   $("#srpski").click(function(){             //ili joj menjamo vrednost u drugi izabrani jezik
       jezik = "srpski";
     })



  $("#posalji").click(function(){
  	var email = $("#email-login").val();
  	var lozinka = $("#password").val();
    var posalji = $("#posalji").val();
    if($("#zapamti_me").is(':checked'))           //PROVERAVAMO DA LI JE CEKIRANO POLJE ZA PAMCENJE EMAILA I LOZINKE
    {
      var zapamti_me ="1";   //AKO JESTE DODELJUJEMO NEKU BEZVEZE VREDNOST VARIJABLI KOJU SALJEMO NA LOGIN.PHP
    }
    else{
      var zapamti_me ="";  //A AKO NIJE CEKIRANO ONDA SALJEMO KAO PRAZNU VREDNOST NA LOGIN.PHP PA SA empty() OPCIJOM PROVERAVAMO DA LI JE
    }              //PRAZNO / CEKIRANO ILI NE



    if(email == "" && lozinka == ""){
		   $( "#email-login" ).effect( "shake" );     //U ZAVISNOSTI OD TOGA STA JE PRAZNO/NE POPUNJENO...TO VIBRIRA
		   $( "#password" ).effect( "shake" );     //ZA OVO JE OBAVEZNO UVEZTI JQUERY DODATAK
       return;  //PREKID KODA
	}
	else if(email == "" || email == null){
		   $( "#email-login" ).effect( "shake" );
       return;  //PREKID KODA
	}
	else if(lozinka == "" || lozinka == null){
		   $( "#password" ).effect( "shake" );
       return;  //PREKID KODA
	}
  var login_strana = "login_strana";
                          //ZA SVE OSTALO ISPISUJE GRESKU
  	$.post("php/index_php/handler_index.php",{
  		  email:email,
  		  lozinka:lozinka,
        zapamti_me:zapamti_me,
        posalji:posalji,
        login_strana:login_strana,
      },function(data,status){

  		             var data = jQuery.parseJSON(data);

  		               if(data === "Uspesno logovanje"){
                              window.location.href = 'pocetna.php?jezik='+jezik;
                              //prethodno definisana varijabla odabirom na dugme menja vrednost u zeljeni jezik ili je saljemo kao prvobitno definisanu {Promeni_jezik}
  					   }

                     else if(data === "Dobrodosao admine"){    //u slucaju da je admin onda sklanja sve sa index strane i prikazuje novi div sa adminsik funkcijama
                       window.location.href = 'pocetna.php?jezik='+jezik;
                      }
  		               else if(data === "Nismo pronasli vas EMAIL!"){

                           if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == ""){

                             swal({
                                       title: 'Nismo pronasli vas EMAIL!',
                                       icon: "warning",              //ALERT BOX
                                       timer: 2000,
                                       buttons: false,
                                       closeOnClickOutside: false,
                                   });
                                   return;
                           }
                           else if(jezik == 'engleski' || jezik == 'Promeni_jezik' || jezik == null || jezik == ""){

                             swal({
                                       title: 'We could not find your EMAIL!',
                                       icon: "warning",              //ALERT BOX
                                       timer: 2000,
                                       buttons: false,
                                       closeOnClickOutside: false,
                                   });
                                   return;
                           }
                         }
                           else if(data === "Pogresna lozinka"){

                                 if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == ""){

                                   swal({
                                             title: 'Pogresna lozinka!',
                                             icon: "warning",              //ALERT BOX
                                             timer: 2000,
                                             buttons: false,
                                             closeOnClickOutside: false,
                                         });
                                         return;
                                 }
                                 else if(jezik == 'engleski' || jezik == 'Promeni_jezik' || jezik == null || jezik == ""){

                                   swal({
                                             title: 'Wrong password!',
                                             icon: "warning",              //ALERT BOX
                                             timer: 2000,
                                             buttons: false,
                                             closeOnClickOutside: false,
                                         });
                                         return;
                                 }

  					    	}
  		     }
  	   );

});
       $("#link_zaboravljena_lozinka").click(function(){

         $("#logovanje_div").css("display","none");
         $("#ceo_div_zaboravljena_lozinka").slideToggle('fast');
       });

     $("#dugme_posalji_email_za_obnovu_lozinke").click(function(){

       var email_zaboravljena_lozinka = $("#email_zaboravljena_lozinka").val();

       $.post("php/index_php/handler_index.php",{
              email_zaboravljena_lozinka:email_zaboravljena_lozinka
       },function(data,status){
         var data = jQuery.parseJSON(data);

            if(data == "Nismo uspeli da pronadjemo vasu Email adresu!")
            {
                      $("#ispis_obavestenja_zaboravljena_lozinka").html('Nismo uspeli da pronadjemo vasu Email adresu!').css('display', 'block');
                      setTimeout(function(){ $("#ispis_obavestenja_zaboravljena_lozinka").css('display', 'none'); }, 3500);
            }

            else if(data == "Email je uspesno poslat!")
             {
                       $("#ispis_obavestenja_zaboravljena_lozinka").html('Email je uspesno poslat!').css('display', 'block');
                       setTimeout(function(){ $("#ispis_obavestenja_zaboravljena_lozinka").css('display', 'none'); }, 3500);
             }
            else if(data == "Doslo je do greske prilikom slanja Emaila-a!")
             {
                       $("#ispis_obavestenja_zaboravljena_lozinka").html('Doslo je do greske prilikom slanja Emaila-a!').css('display', 'block');
                       setTimeout(function(){ $("#ispis_obavestenja_zaboravljena_lozinka").css('display', 'none'); }, 3500);
             }

       })
     })


     $("#dugme_demo, #dugme_demo_pomocno").click(function(){
          var dugme_demo = "dugme_demo";
          $.post("php/index_php/handler_index.php",{
               dugme_demo:dugme_demo,
          },function(data,status){
                 var data = jQuery.parseJSON(data);

                 if(data == "Uspesno logovanje-demo")
                 {
                     window.location.href = 'pocetna.php?jezik='+jezik;
                 }
          })
     });





     $(window).scroll(function() {   //dugme je po defaultu nevidljivo
      $("#dugme_za_povratak_na_vrh").css("display","block"); //kad krene skrolovanje onda se pojavljuje
      if($(this).scrollTop() == 0)   //i kad je ponovo stranica na vrhu
      {
        $("#dugme_za_povratak_na_vrh").css("display","none"); //onda ga sklanja
      }

   });
$("#dugme_za_povratak_na_vrh").click(function() {

       $('html, body').animate({
         scrollTop: $("#naslov_sidro").offset() == 0   //a kada se klike na njega onda se stranica automacki skroluje ka vrhu
      }, 500);
       $("#dugme_za_povratak_na_vrh").css("display","none");  //i sklanja dugme
            });


	var klik = 0;
	$("#showPassword").click(function(){
	          if (klik == 0){
	                // prvi klik
	                $("#password").attr("type","text"); //PRIKAZ I SKRIVANJE PASSSWORD-a U INPUTU PRILIKOM LOGOVANJA
	                klik++;
	            } else{
	                // drugi klik
	                $("#password").attr("type","password");
	                klik--;
	            }

	});

	var klik1 = 0;
	$("#showPasswordInRegistration").click(function(){
						if (klik1 == 0){
									// prvi klik
									$("#lozinka").attr("type","text"); //PRIKAZ I SKRIVANJE PASSSWORD-a U INPUTU PRILIKOM LOGOVANJA
									klik1++;
							} else{
									// drugi klik
									$("#lozinka").attr("type","password");
									klik1--;
							}

	});


var clicks = 0;
$("#dugme_za_slanje_poruke_podrsci").click(function(){
          if (clicks == 0){                                  //dugme za prikaz i sklanjanje diva za slanje poruke adminu
                // first click
                $("#poruka_adminu").css("display","block"); //ova funkcija imitira toggle samo meni je trebala da bih znao kada je koji klik u pitanju
                $("#slicica_porukica_podrsci").attr("src","slika/cancel.png");
                clicks++;  //radi po principu kad je 0 pokazi i pomeri click na 1
            } else{
                // second click
                $("#poruka_adminu").css("display","none");   //kad je 1 i kad klikne vrati click na 0
                $("#slicica_porukica_podrsci").attr("src","slika/porukica_podrsci.png");
                // $("#dugme_za_slanje_poruke_podrsci").css({
                clicks--;
            }

});

 $("#dugme_posalji_korisnika_koji_mi_salje_poruke").click(function(){

    var email_korisnika_koji_mi_salje_poruke = $("#email_korisnika_koji_mi_salje_poruke").val();
    var poruka_korisnika_koji_mi_salje_poruke = $("#poruka_korisnika_koji_mi_salje_poruke").val();
    var verifikacija_slanje_poruke_adminu = "verifikacija_slanje_poruke_adminu";

    $.post("php/pocetna_php/handler_pocetna.php",{
      email_korisnika_koji_mi_salje_poruke:email_korisnika_koji_mi_salje_poruke,
      poruka_korisnika_koji_mi_salje_poruke:poruka_korisnika_koji_mi_salje_poruke,
      verifikacija_slanje_poruke_adminu:verifikacija_slanje_poruke_adminu,
    },function(data,status){
       var data = jQuery.parseJSON(data);
       if(data == "Email je uspesno poslat!"){
         $("#slikica_o_slanju_emaila_od_korisnika").css("display","block");
         setTimeout(function(){ $("#slikica_o_slanju_emaila_od_korisnika").css('display', 'none'); }, 3500);
       }
       else if(data == "Doslo je do greske prilikom slanja Emaila-a!"){
         $("#slikica_za_menjanje_pri_slanju_emaila").attr("src","slika/cancel.png");
         $("#slikica_o_slanju_emaila_od_korisnika").css("display","block");
         setTimeout(function(){ $("#slikica_o_slanju_emaila_od_korisnika").css('display', 'none'); }, 3500);
       }
    });
 });

$("#modal_uslovi_koriscenja").click(function(){
  $('#exampleModalScrollable').modal('show');
})
$("#dugme_prihvatam_uslove_koriscenja").click(function(){
  $('#dugme_zatvori_modal_uslove_koriscenja').click();
  $("#uslovi_koriscenja").prop('checked', true);
});
$('#dugme_zatvori_modal_uslove_koriscenja, #dugme_gornje_zatvori_modal_uslove_koriscenja').click(function(){
  $("#uslovi_koriscenja").prop('checked', false);
});



//PRIKAZ NAVIGACIJE BOCNO ZA PRIKAZ SA TELEFONA
$("#dugme_navigacije_sa_telefona").click(function(){
  $("#navbarNavDropdown").animate({width: 'toggle'});
  $('html').css("overflow-y","hidden");
  $('#bocni_facebook').css("display","none");
  $('#bocni_viber_osnova').css("display","none");
});
$("#zatvori_navigaciju_telefon").click(function(){
  $("#navbarNavDropdown").animate({width: 'toggle'},'fast',function(){
    $('#bocni_facebook').css("display","block");
    $('#bocni_viber_osnova').css("display","block");  //ovo je reseno ovako zato sto prolaze ikonice kroz animaciju nece ko zastave
  });   //ovako kad zavrsi animaciju vracanja navigacije onda prikaze ikonice fb i viber
  $('html').css("overflow-y","scroll");

});
//PRIKAZ NAVIGACIJE BOCNO ZA PRIKAZ SA TELEFONA



$('#povratak_na_vrh_logo, #dugme_pocetna_pomocno, #dugme_logovanje_pomocno').click(function(){  //imitacija SIDRA klikom na logo(link) u pomocnoj navigaciji vraca se automacki na pocetak top == 0

    $('html, body').animate({
        scrollTop: $( $('#povratak_na_vrh_logo, #dugme_pocetna_pomocno').attr('href') ).offset() == 0
    }, 500);
    return false;
});


//DUGMICI NAVIGACIJA POMOCNE I GLAVNE SETNAJA KA DIVOVIMA NA INDEX STRANI
$("#dugme_pocetna").click(function(){

	$("#logovanje_div").css("display","none");
	$("#okvir").css("display","none");

  if($(window).width() < 600)
  {
    $("#navbarNavDropdown").animate({width: 'toggle'});
    $('html, body').animate({
  		scrollTop: $("#sve_na_index_strani").offset().top  //ovo radi skrolovanje sa glavnog menija ka prvom divu samo za telefon
  	},1000);                                             //inace ako nije telefon nema funkciju
    $('html').css("overflow-y","scroll");
  }
});



	$("#dugme_o_nama").click(function(){
		$('html, body').animate({
			scrollTop: $("#drugi_kontejner").offset().top  //ovo radi skrolovanje sa glavnog menija ka divovima
		},1000);
		$("#logovanje_div").css("display","none");
		$("#okvir").css("display","none");
    $("#navbarNavDropdown").animate({width: 'toggle'});   //OVO ZATVARA NAVIGACIJU KADA JE SA TELEFONA POGLED
    if($(window).width() < 600)
    {
      $('html').css("overflow-y","scroll");
    }
	});
	$("#dugme_cena").click(function(){
		$('html, body').animate({
			scrollTop: $("#cetvrti_kontejner").offset().top
		},1000);
		$("#logovanje_div").css("display","none");
		$("#okvir").css("display","none");
    $("#navbarNavDropdown").animate({width: 'toggle'});
    if($(window).width() < 600)
    {
      $('html').css("overflow-y","scroll");
    }
	});
  $("#dugme_video_uputstva").click(function(){
		$('html, body').animate({
			scrollTop: $("#sedmi_kontejner").offset().top
		},1000);
		$("#logovanje_div").css("display","none");
		$("#okvir").css("display","none");
    $("#navbarNavDropdown").animate({width: 'toggle'});
    if($(window).width() < 600)
    {
      $('html').css("overflow-y","scroll");
    }
	});
	$("#dugme_kontakt").click(function(){
		$('html, body').animate({
			scrollTop: $("#sesti_kontejner").offset().top
		},1000);
		$("#logovanje_div").css("display","none");
		$("#okvir").css("display","none");
    $("#navbarNavDropdown").animate({width: 'toggle'});
    if($(window).width() < 600)
    {
      $('html').css("overflow-y","scroll");
    }
	});







  $("#dugme_o_nama_pomocno").click(function(){
    $('html, body').animate({
      scrollTop: $("#drugi_kontejner").offset().top  //ovo radi skrolovanje sa glavnog menija ka divovima
    },1000);
    $("#logovanje_div").css("display","none");
    $("#okvir").css("display","none");
    $("#navbarNavDropdown").animate({width: 'toggle'});   //OVO ZATVARA NAVIGACIJU KADA JE SA TELEFONA POGLED
  });
  $("#dugme_cena_pomocno").click(function(){
    $('html, body').animate({
      scrollTop: $("#cetvrti_kontejner").offset().top
    },1000);
    $("#logovanje_div").css("display","none");
    $("#okvir").css("display","none");
    $("#navbarNavDropdown").animate({width: 'toggle'});
  });
  $("#dugme_video_uputstva_pomocno").click(function(){
    $('html, body').animate({
      scrollTop: $("#sedmi_kontejner").offset().top
    },1000);
    $("#logovanje_div").css("display","none");
    $("#okvir").css("display","none");
    $("#navbarNavDropdown").animate({width: 'toggle'});
  });
  $("#dugme_kontakt_pomocno").click(function(){
    $('html, body').animate({
      scrollTop: $("#sesti_kontejner").offset().top
    },1000);
    $("#logovanje_div").css("display","none");
    $("#okvir").css("display","none");
    $("#navbarNavDropdown").animate({width: 'toggle'});
  });









	$("#ka_cenovniku_iz_texta").click(function(){     //iz texta
		$('html, body').animate({
			scrollTop: $("#cetvrti_kontejner").offset().top
		},1000);
		$("#logovanje_div").css("display","none");
		$("#okvir").css("display","none");
	});



	$("#footer_ka_pocetku").click(function(){     //IZ FOOTERA KA VRHU
		$('html, body').animate({
			scrollTop: $("#sve_na_index_strani").offset().top
		},1000);
		$("#logovanje_div").css("display","none");
		$("#okvir").css("display","none");
	});

	$("#footer_ka_o_nama").click(function(){     //IZ FOOTERA O NAMA
		$('html, body').animate({
			scrollTop: $("#drugi_kontejner").offset().top
		},1000);
		$("#logovanje_div").css("display","none");
		$("#okvir").css("display","none");
	});
	$("#footer_ka_cenovnik").click(function(){     //IZ FOOTERA KA CENOVNIKU
		$('html, body').animate({
			scrollTop: $("#cetvrti_kontejner").offset().top
		},1000);
		$("#logovanje_div").css("display","none");
		$("#okvir").css("display","none");
	});

	$("#footer_ka_kontakt").click(function(){     //IZ FOOTERA KA KONTAKT
		$('html, body').animate({
			scrollTop: $("#sesti_kontejner").offset().top
		},1000);
		$("#logovanje_div").css("display","none");
		$("#okvir").css("display","none");
	});
//DUGMICI NAVIGACIJA POMOCNE I GLAVNE SETNAJA KA DIVOVIMA NA INDEX STRANI

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};
$(window).on('resize scroll', function() {
    if ($('#sve_na_index_strani').isInViewport()) {
      $("#dugme_pocetna_pomocno").css("color","rgb(15, 255, 28)");  //prvi div sa slikama crousel
      $("#dugme_o_nama_pomocno").css("color","white");
      $("#dugme_cena_pomocno").css("color","white");
      $("#dugme_kontakt_pomocno").css("color","white");
      $("#dugme_video_uputstva_pomocno").css("color","white");
    }
    else if($('#drugi_kontejner_okvir_zbog_pozadine').isInViewport())
    {
      $("#dugme_o_nama_pomocno").css("color","rgb(15, 255, 28)");  //drugi div O NAMA
  		$("#dugme_cena_pomocno").css("color","white");
  		$("#dugme_kontakt_pomocno").css("color","white");
  		$("#dugme_pocetna_pomocno").css("color","white");
      $("#dugme_video_uputstva_pomocno").css("color","white");
    }
    else if($('#cetvrti_kontejner_okvir_zbog_pozadine').isInViewport())
    {
      $("#dugme_cena_pomocno").css("color","rgb(15, 255, 28)");  //cetvrti div sa cenovnikom
  		$("#dugme_o_nama_pomocno").css("color","white");
  		$("#dugme_kontakt_pomocno").css("color","white");
  		$("#dugme_pocetna_pomocno").css("color","white");
      $("#dugme_video_uputstva_pomocno").css("color","white");
    }
    else if($('#peti_kontejner_okvir_zbog_pozadine').isInViewport())
    {
      $("#dugme_kontakt_pomocno").css("color","white");  //peti dvi sa malom slicicom prelaznom
      $("#dugme_o_nama_pomocno").css("color","white");
      $("#dugme_cena_pomocno").css("color","white");
      $("#dugme_pocetna_pomocno").css("color","white");
      $("#dugme_video_uputstva_pomocno").css("color","white");
    }
    else if($('#sedmi_kontejner_okvir_zbog_pozadine').isInViewport())
    {
      $("#dugme_video_uputstva_pomocno").css("color","rgb(15, 255, 28)");  //sedmi div sa video uputstvima
  		$("#dugme_o_nama_pomocno").css("color","white");
  		$("#dugme_kontakt_pomocno").css("color","white");
  		$("#dugme_pocetna_pomocno").css("color","white");
    }
    else if($('#sesti_kontejner_okvir_zbog_pozadine').isInViewport())
    {
      $("#dugme_kontakt_pomocno").css("color","rgb(15, 255, 28)");  // div sa kontak formom
      $("#dugme_o_nama_pomocno").css("color","white");
      $("#dugme_cena_pomocno").css("color","white");
      $("#dugme_pocetna_pomocno").css("color","white");
      $("#dugme_video_uputstva_pomocno").css("color","white");
    }
    else {
      $("#dugme_o_nama_pomocno").css("color","white"); //ovo je uglavnom za div sa tabelom i slikom fakture kad ne prikazuje nista tj sve kao bele
      $("#dugme_cena_pomocno").css("color","white");
      $("#dugme_pocetna_pomocno").css("color","white");
      $("#dugme_video_uputstva_pomocno").css("color","white");
      $("#dugme_kontakt_pomocno").css("color","white");
    }
});


function smanjeni_ekran(){
		if($(window).width() < 600)
		{
			$("#prva_slika").attr("src","slika/prva_fon.jpg"); //ako je sa telefona onda zamenjuje one dve slike sa ove dve
			$("#druga_slika").attr("src","slika/druga_fon.jpg");
			$("#treca_slika").attr("src","slika/treca_fon.jpg");
			$("#meni_index").attr("class","navbar navbar-expand-lg navbar-light bg-ligh fixed-top"); //ovo definise da kad je pogled sa telefona da je fixiran meni za top
      $("#logo_u_navigaciji_za_telefon").css("display","block");
      $("#zatvori_navigaciju_telefon").css("display","block");
		}
		else if($(window).width() > 600)
		{
			$("#rezervna_navigacija").css("display","none");
			$("#prva_slika").attr("src","slika/prva.jpg"); //ako je sa telefona onda zamenjuje one dve slike sa ove dve
			$("#druga_slika").attr("src","slika/druga.jpg");
			$("#treca_slika").attr("src","slika/treca.jpg");
			$("#meni_index").attr("class","navbar navbar-expand-lg navbar-light bg-ligh");//ovo uklanja fixed meni sa topa kad je pogled sa monitora
      $("#zatvori_navigaciju_telefon").css("display","none");
      $("#logo_u_navigaciji_za_telefon").css("display","none");
		}

}

$(window).scroll(function() {   //PRIKAZ POMOCNOG MENIJA POSLE 170PX SKROLOVANJA
        if ($(document).scrollTop() > 170 && $(window).width() > 800)
        {
          $( "#rezervna_navigacija" ).slideDown( "fast", function() {

					}); //css-om je pomocna navigacija skrivena kad je ekran ispod 600 piksela-a
        }
        else if($(document).scrollTop() < 170 && $(window).width() > 800) {   //SKLANJANJE POMOCNOG MENIJA
          $( "#rezervna_navigacija" ).slideUp( "fast", function() {
              });

        }

    });

//ZABRANA ZUMIRANJA NA INDEX STRANICI
$(document).keydown(function(event) {
    if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  )) {

        event.preventDefault();
     }
     $(window).bind('mousewheel DOMMouseScroll', function (event) {
       if (event.ctrlKey == true) {
       event.preventDefault();
       }
     }
   )
});
//ZABRANA ZUMIRANJA NA INDEX STRANICI


//ZA SIRINE EKRANA ISPOD 600PX ZATVARANJE MODALA ZA LOGOVANJE,REGISTRACIJU ILI ZABORAVLJENU LOZINKU  KLIKOM NA OTVORI NAVIGACIJU
$("#dugme_navigacije_sa_telefona").click(function(){
  if($('#logovanje_div').is(":visible"))
  {
    $("#logovanje_div").slideToggle('fast');
  }
  else if($('#okvir').is(":visible"))   //OVO JE SAMO ZA TELEFONE
  {
    $("#okvir").slideToggle('fast');
  }
  else if($('#ceo_div_zaboravljena_lozinka').is(":visible"))
  {
    $("#ceo_div_zaboravljena_lozinka").slideToggle('fast');
  }
});
//ZA SIRINE EKRANA ISPOD 600PX ZATVARANJE MODALA ZA LOGOVANJE,REGISTRACIJU ILI ZABORAVLJENU LOZINKU  KLIKOM NA OTVORI NAVIGACIJU



// SLANJE EMAILA MENI OD KORISNIKA IZ DIVA KONTAKT ILI  PONISTAVANJE FORME
$("#posalji_email_kontakt_div").click(function(){
  var ime_posaljioca_iz_div_kontakt = $("#input_ime_iz_kontakt_diva").val();
  var email_posaljioca_iz_div_kontakt = $("#input_email_iz_kontakt_diva").val();
  var naslov_iz_div_kontakt = $("#input_naslov_iz_kontakt_diva").val();
  var poruka_iz_div_kontakt = $("#textarea_poruka_iz_kontakt_diva").val();
  var verifikacija_slanje_poruke_iz_kontakt_diva = "verifikacija_slanje_poruke_iz_kontakt_diva";

  $.post("php/index_php/handler_index.php",{
     ime_posaljioca_iz_div_kontakt:ime_posaljioca_iz_div_kontakt,
     email_posaljioca_iz_div_kontakt:email_posaljioca_iz_div_kontakt,
     naslov_iz_div_kontakt:naslov_iz_div_kontakt,
     poruka_iz_div_kontakt:poruka_iz_div_kontakt,
     verifikacija_slanje_poruke_iz_kontakt_diva:verifikacija_slanje_poruke_iz_kontakt_diva,
  },function(data,status){
   var data = jQuery.parseJSON(data);
    if(data == "Email je uspesno poslat!")
    {
                  if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                    $("#obavestenje_o_slanju_emaila").html('Uspesno poslat E-mail!').css('display', 'block');
                    setTimeout(function(){ $("#obavestenje_o_slanju_emaila").css('display', 'none'); }, 2500);
                    return;
                      }
                   else if(jezik == 'engleski'){
                     $("#obavestenje_o_slanju_emaila").html('Successfully send E-mail!').css('display', 'block');
                     setTimeout(function(){ $("#obavestenje_o_slanju_emaila").css('display', 'none'); }, 2500);
                     return;
                   }
    }
    else if(data == "Doslo je do greske prilikom slanja Emaila-a!")
    {
                if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                  $("#obavestenje_o_slanju_emaila").html('Doslo je do greske prilikom slanja Emaila-a!').css('display', 'block');
                  setTimeout(function(){ $("#obavestenje_o_slanju_emaila").css('display', 'none'); }, 2500);
                  return;
                    }
                 else if(jezik == 'engleski'){
                   $("#obavestenje_o_slanju_emaila").html('An error occurred while sending your email!').css('display', 'block');
                   setTimeout(function(){ $("#obavestenje_o_slanju_emaila").css('display', 'none'); }, 2500);
                   return;
                 }
    }


  })
})

$("#resetuj_email_kontakt_div").click(function(){
  $("#input_ime_iz_kontakt_diva").val('');
  $("#input_email_iz_kontakt_diva").val('');
  $("#input_naslov_iz_kontakt_diva").val('');
  $("#textarea_poruka_iz_kontakt_diva").val('');
})

// SLANJE EMAILA MENI OD KORISNIKA IZ DIVA KONTAKT  ILI  PONISTAVANJE FORME

//GIF ANIMACIJA DOK AJAX RADI NESTO
$(document).ajaxStart(function(){
  $("#wait").css("display", "block"); //pri ucitavanju ajax poziva on aktivira ovaj div za ucitavanje

  });
  $(document).ajaxComplete(function(){   //kad se ajax zavrsi on ga gasi i prikazuje ono sto ajax treba da prikaze
    $("#wait").css("display", "none");   //ovo je za ucitavanje prilikom slanja emaila treba ga namestiti za sve na body
  });
//GIF ANIMACIJA DOK AJAX RADI NESTO



//API
$.get("https://api.ipdata.co?api-key=test", function (response) {
  grad = response.time_zone.name;
  grad = grad.substring(7);       //PRVI API UZIMA PODATKE O LOKACIJI I TU IZDVAJA IME GRADA



$.ajax({
  url:"https://api.openweathermap.org/data/2.5/find?q="+grad+"&units=metric&APPID=1a662b04aa49c64b2a212ba6ed82c60a",
  type:"GET",
  dataType:"jsonp",                    //DRUGI API UZIMA PODATKE O VREMENSKOJ PROGNOZI ZA IZABRANI GRAD
  success:function(data){
     var trenutna_temperatura = data.list[0].main.temp;
     var ime_grada = data.list[0].name;
     var min_temperatura = data.list[0].main.temp_min;
     var max_temperatura = data.list[0].main.temp_max;
     var trenutno = data.list[0].weather[0].main;
     var ikonica = data.list[0].weather[0].icon;           //NAZIV SLIKE(ikonice)
     var iconurl = "http://openweathermap.org/img/w/" + ikonica + ".png";        //URL KA SLICICAMA I KONKRETNOS SLICICI


     $("#min").html('Min Temp&nbsp;'+min_temperatura);
     $("#max").html('Max Temp&nbsp;'+max_temperatura);
     $("#trenutna").html(trenutna_temperatura);       //ISPIS PODATAKA
     $("#opis").html(trenutno);
     $("#ime_grada").html(ime_grada);


    $("#trenutna").css("background-image",'url("' + iconurl + '")');     //PRIKAZ I SLICICE
    $("#trenutna").css("background-repeat",'no-repeat');

   }
});
}, "json");
//API
//LOGOVANJE
//LOGOVANJE
//LOGOVANJE

})

function prikaz_labela_u_kontakt_divu_na_index_strani()
{
  $("#input_ime_iz_kontakt_diva").focus(function(){
    $("#label_ime_iz_kontakt_diva").html("Vase Ime *");
    $("#input_ime_iz_kontakt_diva").attr("placeholder","");
  });
  $("#input_ime_iz_kontakt_diva").focusout(function(){
    $("#label_ime_iz_kontakt_diva").html("&nbsp;");
    $("#input_ime_iz_kontakt_diva").attr("placeholder","Vase Ime *");
  });

  $("#input_email_iz_kontakt_diva").focus(function(){
    $("#label_email_iz_kontakt_diva").html("Vase Email *");
    $("#input_email_iz_kontakt_diva").attr("placeholder","");
  });
  $("#input_email_iz_kontakt_diva").focusout(function(){
    $("#label_email_iz_kontakt_diva").html("&nbsp;");
    $("#input_email_iz_kontakt_diva").attr("placeholder","Vase Email *");
  });

  $("#input_naslov_iz_kontakt_diva").focus(function(){
    $("#label_naslov_iz_kontakt_diva").html("Naslov");
    $("#input_naslov_iz_kontakt_diva").attr("placeholder","");
  });
  $("#input_naslov_iz_kontakt_diva").focusout(function(){
    $("#label_naslov_iz_kontakt_diva").html("&nbsp;");
    $("#input_naslov_iz_kontakt_diva").attr("placeholder","Naslov");
  });

  $("#textarea_poruka_iz_kontakt_diva").focus(function(){
    $("#label_textarea_iz_kontakt_diva").html("Vasa poruka *");
    $("#textarea_poruka_iz_kontakt_diva").attr("placeholder","");
  });
  $("#textarea_poruka_iz_kontakt_diva").focusout(function(){
    $("#label_textarea_iz_kontakt_diva").html("&nbsp;");
    $("#textarea_poruka_iz_kontakt_diva").attr("placeholder","Vasa poruka *");
  });
}
