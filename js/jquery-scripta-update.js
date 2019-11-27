$(document).ready(function(){
  prikaz_podataka_u_inputima();  //odmah pozivamo funkciju koja ispisuje podatke u inputima
  jezik = window.location.search.substring(7); //uzimamo vrednost GET-a iz URL-a (o jeziku) i smestamo ga u GLOBALNU variablu i na osnovu toga odedjujemo jezik na ovoj strani

    $("#podesavanja").click(function(){

      $("#gore").css("display","none");
      $("#podesavanje").css("display","block");
      prikaz_podataka_u_inputima();
    });

    $("#povratak_na_pocetnu_update").click(function(){

      //DUGME ZA NAZAD FUNKCIONISE PO PRINCIPU  PRVO PRIKAZE NA POCETNOJ STRANI SVE OSNOVNE PODATKE PONOVO IH IZCITA JQUERY
      //ZATIM ISTO NA POCETNOJ STRANI UCITA PONOVO TABELU..OVO JE BITNO ZBOG PROMENE JEZIKA...DA MENJA JEZIKE U TABELI
      //INACE JE CELA FUNKCIJA PREPISANA SA JQUERY-POCETNE-STRANE.JS
      //ZATIM PRIKAZUJE POCETNU STRANU I SKLANJA TRENUTNU(stranica podesavanje)

            window.prikaz_podataka_o_korisniku_na_pocetnoj();
            window.prikaz_svih_faktura_na_pocetnoj_strani();

                $("#gore").css("display","block");
                $("#podesavanje").css("display","none");

    });

    $("#obrisi_nalog").click(function(){
    var verifikacija_obrisi_nalog = "verifikacija_obrisi_nalog";
                  if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                    poruka_alert = "Da li ste sigurni da zelite da obrisete svoj nalog? OVU FUNKCIJU NIJE MOGUCE OPOZVATI!!";
                  }
                  else if(jezik == 'engleski'){
                    poruka_alert = "Are you sure you want to delete your account? THIS FUNCTION CAN NOT BE CANCELED !!"
                  }
       if(confirm(poruka_alert) == true){
      $.post("php/update_settings_php/handler_update.php",{
            verifikacija_obrisi_nalog:verifikacija_obrisi_nalog,
      },function(data,status){
               var data = jQuery.parseJSON(data);
               if(data == "Nalog je uspesno obrisan")
               {
                window.location.href = 'index.php?jezik='+jezik;
               }
               else if(data == "Nalog za testiranje nije moguce obrisati")
               {
                 if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                 swal({
                           title: 'Nalog za testiranje nije moguce obrisati!!',
                           icon: "warning",              //ALERT BOX
                           timer: 2000,
                           buttons: false,
                           closeOnClickOutside: false,
                       });
                       return;
                     }
                  else if(jezik == 'engleski'){
                    swal({
                              title: 'The order of testing can not be deleted !!',
                              icon: "warning",              //ALERT BOX
                              timer: 2000,
                              buttons: false,
                              closeOnClickOutside: false,
                          });
                          return;
                  }
               }
      })
    }
  });



       function prikaz_podataka_u_inputima(){
         var verifikacija_prikaz_podataka_okorisniku_na_pocetnoj = "verifikacija_prikaz_podataka_okorisniku_na_pocetnoj";
          $.post("php/pocetna_php/handler_pocetna.php",{
            verifikacija_prikaz_podataka_okorisniku_na_pocetnoj:verifikacija_prikaz_podataka_okorisniku_na_pocetnoj
          },function(data,status){
                       var data = jQuery.parseJSON(data);
                       $("#email_update").val(data[0][10]);
         lozinka_iz_baze = data[0][11];
                       $("#ime_i_prezime_update").val(data[0][7]);
                       $("#ime_firme_update").val(data[0][0]);
                       $("#adresa_firme_update").val(data[0][2]);
                       $("#lokacija_firme_update").val(data[0][1]);               //prikaz vrednosti u inputima
                       $("#pib_firme_update").val(data[0][3]);
                       $("#maticni_br_firme_update").val(data[0][4]);
                       var opis_firme = data[0][6];
                       var opis_firme = opis_firme.toUpperCase();   //AUTOMACKI VELIKA SLOVA
                       $("#opis_firme_update").val(opis_firme);
                       $("#ziro_racun_update").val(data[0][5]);
                       $("#broj_telefona_update").val(data[0][8]);
                       $("#fix_br_telefona_update").val(data[0][9]); //alert(lozinka_iz_baze);
          });
        }

        $("#email_update").on( 'keyup keypress',function(){
          var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

          if(!email_regex.test($("#email_update").val())){
            $("#email_update").css("border","2px solid red");
          }
          else{
            $("#email_update").removeAttr('style');
          }
        })

        $("#lozinka_update").on( 'keyup keypress',function(){
          var sifra = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/;

          if(!sifra.test($("#lozinka_update").val())){
            $("#lozinka_update").css("border","1px solid red");
          }
          else{
            $("#lozinka_update").removeAttr('style');
          }
        })

        $("#ziro_racun_update").on( 'keyup keypress',function(){
          if($("#ziro_racun_update").val().length == 3){
            $("#ziro_racun_update").val($("#ziro_racun_update").val()+'-');
          }
         else if($("#ziro_racun_update").val().length == 17){
           $("#ziro_racun_update").val($("#ziro_racun_update").val()+'-');
         }


        })

        $("#pib_firme_update").on( 'keyup keypress',function(){
               var jedino_broj = /^[0-9]*$/;
          if($("#pib_firme_update").val().length !== 9 || !jedino_broj.test($("#pib_firme_update").val())){

            $("#pib_firme_update").css("border","2px solid red");
          }
         else if($("#pib_firme_update").val().length == 9){
           $("#pib_firme_update").removeAttr('style');
         }

        })

        $("#maticni_br_firme_update").on( 'keyup keypress',function(){
              var jedino_broj = /^[0-9]*$/;
          if($("#maticni_br_firme_update").val().length !== 8 || !jedino_broj.test($("#maticni_br_firme_update").val())){
            $("#maticni_br_firme_update").css("border","2px solid red");
          }
         else if($("#maticni_br_firme_update").val().length == 8){
           $("#maticni_br_firme_update").removeAttr('style');
         }

        })

        $("#broj_telefona_update").on( 'keyup keypress',function(){

          if($("#broj_telefona_update").val().length == 3){
            $("#broj_telefona_update").val($("#broj_telefona_update").val()+'/');
          }
         else if($("#broj_telefona_update").val().length == 7){
           $("#broj_telefona_update").val($("#broj_telefona_update").val()+'-');
         }

        })

        $("#fix_br_telefona_update").on( 'keyup keypress',function(){

          if($("#fix_br_telefona_update").val().length == 3){
            $("#fix_br_telefona_update").val($("#fix_br_telefona_update").val()+'/');
          }
         else if($("#fix_br_telefona_update").val().length == 7){
           $("#fix_br_telefona_update").val($("#fix_br_telefona_update").val()+'-');
         }

        })


     $("#sacuvaj_promene").click(function(){

              if($("#ime_firme_na_pocetnoj").html() == "Ime firme TESTIRANJE"){
                if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                swal({
                          title: 'Nije moguce menjati ove podatke u DEMO verziji!!',
                          icon: "error",              //ALERT BOX
                          timer: 2000,
                          buttons: false,
                          closeOnClickOutside: false,
                      });
                      return;
                    }
                 else if(jezik == 'engleski'){
                   swal({
                             title: 'It is not possible to change this data in the DEMO version!!',
                             icon: "error",              //ALERT BOX
                             timer: 2000,
                             buttons: false,
                             closeOnClickOutside: false,
                         });
                         return;
                 }
                return;
              }
                var promeni_email = $("#email_update").val();
                var promeni_lozinku = $("#lozinka_update").val();
                var promeni_ime_i_prezime = $("#ime_i_prezime_update").val();
                var promeni_ime_firme = $("#ime_firme_update").val();
                var promeni_adresu_firme = $("#adresa_firme_update").val();
                var promeni_lokaciju = $("#lokacija_firme_update").val();
                var promeni_pib = $("#pib_firme_update").val();
                var promeni_maticni_broj = $("#maticni_br_firme_update").val();
                var promeni_opis = $("#opis_firme_update").val();
                var promeni_ziro_racun = $("#ziro_racun_update").val();
                var promeni_broj_telefona = $("#broj_telefona_update").val();
                var promeni_broj_fix_telefona = $("#fix_br_telefona_update").val();


           if($("#email_update").css('border-width') === '2px' || $("#pib_firme_update").css('border-width') === '2px' || $("#maticni_br_firme_update").css('border-width') === '2px'){
             if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
             swal({
                       title: 'Unesite ispravne podatke u oznacenim poljima!!',
                       icon: "warning",              //ALERT BOX
                       timer: 2000,
                       buttons: false,
                       closeOnClickOutside: false,
                   });
                 }
              else if(jezik == 'engleski'){
                swal({
                          title: 'Enter the correct information into the required fields!!',
                          icon: "warning",              //ALERT BOX
                          timer: 2000,
                          buttons: false,
                          closeOnClickOutside: false,
                      });
              }
             return;
           }



            if(promeni_lozinku == "" || promeni_lozinku == null)                  //PRVA varijanta ako nije uneta nova lozinka....u tom slucaju dve opcije (SRPSKI i ENGLESKI)
             {
               if(jezik == 'srpski' || jezik == 'Promeni_jezik'){
                     swal("Unesite trenutnu lozinku za potvrdu:", {
                       content: {
                                   element: "input",
                                   attributes: {
                                   placeholder: "Unesite vasu lozinku",
                                   type: "password",
                                }
                              }

                              })
                            .then((value) => {


                                         $.post("php/update_settings_php/handler_update.php",{    //prvo provera lozinke
                                           value:value
                                         },function(data,status){
                                                  var data = jQuery.parseJSON(data);

                                                  if(data == "lozinke se ne podudaraju")
                                                  {
                                                          swal(`${value}`,{
                                                                    title: 'Pogresno uneta lozinka',
                                                                    icon: "error",              //ALERT BOX
                                                                    timer: 2000,
                                                                    buttons: false,
                                                                    closeOnClickOutside: false,
                                                                });
                                                                return;
                                                  }
                                                  else if(data == "lozinke se podudaraju")
                                                  {
                                                    var verifikacija_promena_licnih_podataka_bez_lozinke = "promena_licnih_podataka_bez_lozinke";
                                                            $.post("php/update_settings_php/handler_update.php",{
                                                                       promeni_email:promeni_email,
                                                                       promeni_ime_i_prezime:promeni_ime_i_prezime,
                                                                       promeni_ime_firme:promeni_ime_firme,
                                                                       promeni_adresu_firme:promeni_adresu_firme,
                                                                       promeni_lokaciju:promeni_lokaciju,
                                                                       promeni_pib:promeni_pib,
                                                                       promeni_maticni_broj:promeni_maticni_broj,
                                                                       promeni_opis:promeni_opis,
                                                                       promeni_ziro_racun:promeni_ziro_racun,
                                                                       promeni_broj_telefona:promeni_broj_telefona,
                                                                       promeni_broj_fix_telefona:promeni_broj_fix_telefona,
                                                                       verifikacija_promena_licnih_podataka_bez_lozinke:verifikacija_promena_licnih_podataka_bez_lozinke,
                                                            },function(data,status){
                                                                      var data = jQuery.parseJSON(data);


                                                                 if(data == "uspesno"){
                                                                          prikaz_podataka_u_inputima();
                                                                          window.location.href = 'pocetna.php?jezik='+jezik;   //ovo ovde i nije bas neko resenje
                                                                 }
                                                            });
                                                  }
                                         })


                             });
                           }
                         else if(jezik == 'engleski'){
                           swal("Enter your current password to confirm: ", {
                             content: {
                                         element: "input",
                                         attributes: {
                                         placeholder: "Enter your password ",
                                         type: "password",
                                      }
                                    }

                                    })
                                  .then((value) => {

                                               $.post("php/update_settings_php/handler_update.php",{    //prvo provera lozinke
                                                 value:value
                                               },function(data,status){
                                                        var data = jQuery.parseJSON(data);

                                                        if(data == "lozinke se ne podudaraju")
                                                        {
                                                                swal(`${value}`,{
                                                                          title: 'Incorrect password ',
                                                                          icon: "error",              //ALERT BOX
                                                                          timer: 2000,
                                                                          buttons: false,
                                                                          closeOnClickOutside: false,
                                                                      });
                                                                      return;
                                                        }
                                                        else if(data == "lozinke se podudaraju")
                                                        {
                                                          var verifikacija_promena_licnih_podataka_sa_lozinkom = "promena_licnih_podataka_sa_lozinkom";
                                                                  $.post("php/update_settings_php/handler_update.php",{
                                                                             promeni_email:promeni_email,
                                                                             promeni_ime_i_prezime:promeni_ime_i_prezime,
                                                                             promeni_ime_firme:promeni_ime_firme,
                                                                             promeni_adresu_firme:promeni_adresu_firme,
                                                                             promeni_lokaciju:promeni_lokaciju,
                                                                             promeni_pib:promeni_pib,
                                                                             promeni_maticni_broj:promeni_maticni_broj,
                                                                             promeni_opis:promeni_opis,
                                                                             promeni_ziro_racun:promeni_ziro_racun,
                                                                             promeni_broj_telefona:promeni_broj_telefona,
                                                                             promeni_broj_fix_telefona:promeni_broj_fix_telefona,
                                                                             verifikacija_promena_licnih_podataka_sa_lozinkom:verifikacija_promena_licnih_podataka_sa_lozinkom,
                                                                  },function(data,status){
                                                                            var data = jQuery.parseJSON(data);


                                                                       if(data == "uspesno"){
                                                                                prikaz_podataka_u_inputima();
                                                                                window.location.href = 'pocetna.php?jezik='+jezik;   //ovo ovde i nije bas neko resenje
                                                                       }
                                                                  });
                                                        }
                                               })


                                   });
                         }


            }
            else{                                                            //DRUGA varijanta ako nije uneta nova lozinka....u tom slucaju dve opcije (SRPSKI i ENGLESKI)
                   if(jezik == 'srpski' || jezik == 'Promeni_jezik'){
                    swal("Unesite staru lozinku za potvrdu:", {
                      content: {
                                  element: "input",
                                  attributes: {
                                  placeholder: "Unesite vasu lozinku",  // Type your password
                                  type: "password",
                               }
                             }

                           })
                           .then((value) => {

                             $.post("php/update_settings_php/handler_update.php",{  //prvo provera lozinke
                               value:value
                             },function(data,status){
                                      var data = jQuery.parseJSON(data);

                                      if(data == "lozinke se ne podudaraju")
                                      {
                                              swal(`${value}`,{
                                                        title: 'Pogresno uneta lozinka',
                                                        icon: "error",              //ALERT BOX
                                                        timer: 2000,
                                                        buttons: false,
                                                        closeOnClickOutside: false,
                                                    });
                                                    return;
                                      }
                                      else if(data == "lozinke se podudaraju"){
                                  var verifikacija_promena_licnih_podataka_sa_lozinkom = "promena_licnih_podataka_sa_lozinkom";
                                        $.post("php/update_settings_php/handler_update.php",{
                                                   promeni_email:promeni_email,
                                                   promeni_lozinku:promeni_lozinku,
                                                   promeni_ime_i_prezime:promeni_ime_i_prezime,
                                                   promeni_ime_firme:promeni_ime_firme,
                                                   promeni_adresu_firme:promeni_adresu_firme,
                                                   promeni_lokaciju:promeni_lokaciju,
                                                   promeni_pib:promeni_pib,
                                                   promeni_maticni_broj:promeni_maticni_broj,
                                                   promeni_opis:promeni_opis,
                                                   promeni_ziro_racun:promeni_ziro_racun,
                                                   promeni_broj_telefona:promeni_broj_telefona,
                                                   promeni_broj_fix_telefona:promeni_broj_fix_telefona,
                                                   verifikacija_promena_licnih_podataka_sa_lozinkom:verifikacija_promena_licnih_podataka_sa_lozinkom,
                                        },function(data,status){
                                                  var data = jQuery.parseJSON(data);


                                             if(data == "uspesno"){
                                                      prikaz_podataka_u_inputima();
                                                      window.location.href = 'pocetna.php?jezik='+jezik;   //ovo ovde i nije bas neko resenje
                                             }
                                        });


                                      }




                             })
                    });
                  }
                  else if(jezik == 'engleski'){
                    swal("Enter your current password to confirm:", {
                      content: {
                                  element: "input",
                                  attributes: {
                                  placeholder: "Enter your password ",  // Type your password
                                  type: "password",
                               }
                             }

                           })
                           .then((value) => {

                             $.post("php/update_settings_php/handler_update.php",{    //prvo provera lozinke
                               value:value
                             },function(data,status){
                                      var data = jQuery.parseJSON(data);

                                      if(data == "lozinke se ne podudaraju")
                                      {
                                              swal(`${value}`,{
                                                        title: 'Incorrect password ',
                                                        icon: "error",              //ALERT BOX
                                                        timer: 2000,
                                                        buttons: false,
                                                        closeOnClickOutside: false,
                                                    });
                                                    return;
                                      }
                                      else if(data == "lozinke se podudaraju"){
                                 var verifikacija_promena_licnih_podataka_sa_lozinkom = "promena_licnih_podataka_sa_lozinkom";
                                        $.post("php/update_settings_php/handler_update.php",{
                                                   promeni_email:promeni_email,
                                                   promeni_lozinku:promeni_lozinku,
                                                   promeni_ime_i_prezime:promeni_ime_i_prezime,
                                                   promeni_ime_firme:promeni_ime_firme,
                                                   promeni_adresu_firme:promeni_adresu_firme,
                                                   promeni_lokaciju:promeni_lokaciju,
                                                   promeni_pib:promeni_pib,
                                                   promeni_maticni_broj:promeni_maticni_broj,
                                                   promeni_opis:promeni_opis,
                                                   promeni_ziro_racun:promeni_ziro_racun,
                                                   promeni_broj_telefona:promeni_broj_telefona,
                                                   promeni_broj_fix_telefona:promeni_broj_fix_telefona,
                                                   verifikacija_promena_licnih_podataka_sa_lozinkom:verifikacija_promena_licnih_podataka_sa_lozinkom,
                                        },function(data,status){
                                                  var data = jQuery.parseJSON(data);


                                             if(data == "uspesno"){
                                                      prikaz_podataka_u_inputima();
                                                      window.location.href = 'pocetna.php?jezik='+jezik;   //ovo ovde i nije bas neko resenje
                                             }
                                        });


                                      }




                             })
                    });
                  }





            }









     });

})
