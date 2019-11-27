$(document).ready(function(){
  prikaz_podataka_o_korisniku_na_pocetnoj();
  prikaz_svih_faktura_na_pocetnoj_strani();
  prikaz_imena_za_select_na_pocetnoj_strani();
  status_za_select_na_pocetnoj_strani();
  godina_za_select_na_pocetnoj_strani();
  obrisi_nedefinisane_fakture();  //ako nema nedefinisanih faktura onda vraca null (nedefinisane nsataju kad se zatvori brauzer u sred pravljenja fakture)
  if($('#lg').is(':visible')) //za admin stranu
  {
    za_kontrolu();
  }



jezik = window.location.search.substring(7); //uzimamo vrednost GET-a iz URL-a (o jeziku) i smestamo ga u GLOBALNU variablu i na osnovu toga odedjujemo jezik na ovoj strani
provera_sa_koje_stranice_je_faktura_otvorena_sa_glavne_ili_sa_prikaz_klijenta = 'stranica_gore';


//document.body.style.zoom = 1.1 //OVIM DEFINISEMO KOLIKI SE ZUM UCITAVA ODMAH  full hd
$(document).keydown(function(event) {  //A OVIM ZABRANA ZUMIRANJA NA INDEX STRANICI DA BIH OSTALO FIX-NO ZUMIRANO NA TOLIKO OVO JE ODGOVARAJUCE ZA FULL HD
  //TREBA DEFINISATI I ZA TELEFON I ZA MANJE I VECE REZOLUCIJE ZOOM
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

$("#zatvori_div_dobrodoslice").click(function(){
  $('#dobrodoslica').css("display","none");
  clearInterval(vremenski_interval);
});

$(document).ajaxStart(function(){
  $("#wait").css("display", "block"); //pri ucitavanju ajax poziva on aktivira ovaj div za ucitavanje

  });
  $(document).ajaxComplete(function(){   //kad se ajax zavrsi on ga gasi i prikazuje ono sto ajax treba da prikaze
    $("#wait").css("display", "none");   //ovo je za ucitavanje prilikom slanja emaila treba ga namestiti za sve na body
  });


$("#sacuvaj_novi_logo").click(function(){                 //dugme sacuvaj u modalu za sliku logo
  prikaz_podataka_o_korisniku_na_pocetnoj();               //pri kliku na dugme ucitava funkciju za ispis podatako o korisniku na ekranu
  $('div.dz-success').hide();                            //sklanja sliku iz dropzone
  $('#div_pocetna_poruka_dropzone').show();              //i pokazuje text opet   tj  vraca sve u prvobitno stanje
});
$("#zatvori_modal_logo").click(function(){               //iksic na modalu radi sve isto sto i dugme sacuvaj
  prikaz_podataka_o_korisniku_na_pocetnoj();
  $('div.dz-success').hide();
  $('#div_pocetna_poruka_dropzone').show();
});

$("#cela_slika_logo").click(function(){               //dugme prikazi sliku salje na url ka slici
window.location.href = "folder-logo/"+firma_folder+"/"+slika_u_folderu;
});

  $("#stampaj_skice").click(function(){
        $("#gore").css("display","none");
        $("#crtezi").css("display","block");
        $("#crtezi").print();
        $("#crtezi").css("display","none");
        $("#gore").css("display","block");
      });






      $(window).scroll(function() {   //dugme je po defaultu nevidljivo
        if(!$('#dole').is(":visible")){  //ono ne dozvoljava pokazivanje dugmica na stranici kad se otvori faktura
       $("#dugme_za_povratak_na_vrh").css("display","block"); //kad krene skrolovanje onda se pojavljuje
       if($(this).scrollTop() == 0)   //i kad je ponovo stranica na vrhu
       {
         $("#dugme_za_povratak_na_vrh").css("display","none"); //onda ga sklanja
       }
     }
    });
    $("#dugme_za_povratak_na_vrh").click(function() {

        $('html, body').animate({
          scrollTop: $("#naslov_sidro").offset() == 0   //a kada se klike na njega onda se stranica automacki skroluje ka vrhu
       }, 500);
        $("#dugme_za_povratak_na_vrh").css("display","none");  //i sklanja dugme
             });

             var clicks = 0;
             $("#dugme_za_slanje_poruke_podrsci").click(function(){
                       if (clicks == 0){                                  //dugme za prikaz i sklanjanje diva za slanje poruke adminu
                             // first click
                             $("#poruka_adminu").css("display","block"); //ova funkcija imitira toggle samo meni je trebala da bih znao kada je koji klik u pitanju
                             $("#slicica_porukica_podrsci").attr("src","slika/cancel.png");
                             $("#donja_navigacija").css("height","64px");
                             clicks++;  //radi po principu kad je 0 pokazi i pomeri click na 1
                         } else{
                             // second click
                             $("#poruka_adminu").css("display","none");   //kad je 1 i kad klikne vrati click na 0
                             $("#slicica_porukica_podrsci").attr("src","slika/porukica_podrsci.png");
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






          $("#kreiraj_fakturu").click(function(){

          provera_duzine_pretplate_manualnog_iskljuci_ukljuci();
         //ovim prosledjujemo dalje informacije o tome koji je jezik globalna variabla jezik je kreirana na stranici pocetna.php (sve je to zajedno)

          });
          $("#logout").click(function(){
            var verifikacija_za_handler_logout = "verifikacija_za_handler_logout";
            $.post("php/pocetna_php/handler_pocetna.php",{
                 verifikacija_za_handler_logout:verifikacija_za_handler_logout,
            },function(data,status){
              window.location.href = 'index.php?jezik='+jezik;
            })
          })



          $("#napravi_novu_fakturu_dugme_prikaz_klijenta").click(function(){
            var verifikacija_provera_duzine_pretplate_manualnog_iskljuci_ukljuci = "verifikacija_provera_duzine_pretplate_manualnog_iskljuci_ukljuci";
            $.post("php/pocetna_php/handler_pocetna.php",{
                 verifikacija_provera_duzine_pretplate_manualnog_iskljuci_ukljuci:verifikacija_provera_duzine_pretplate_manualnog_iskljuci_ukljuci,
            },function(data,status){
             var data = jQuery.parseJSON(data);
              if(data == "Sve je u redu mozete nastaviti sa koriscenjem programa")
              {
                ime = $("#prikaz_korisnika_ime_firme").html();
                 window.location.href = 'unos_faktura.php?jezik='+jezik+'&ime='+ime;
              }
              else if(data == "Vase obaveze nisu izmirene")
              {

                                if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == ""){

                                  swal({
                                            title: 'Pravljenje novih faktura vam je trenutno onemoguceno, Vase obaveze nisu izmirene ili je doslo do tehnickih problema u tom slucaju kontaktirajte nasu korisnicku sluzbu!',
                                            icon: "error",              //ALERT BOX
                                            closeOnClickOutside: false,
                                        });
                                        return;
                                }
                                else if(jezik == 'engleski' || jezik == 'Promeni_jezik' || jezik == null || jezik == ""){

                                  swal({
                                            title: 'Creating a new invoice to you is disabled, Your obligations are not met or there is a technical problem in this case, please contact our Customer Service!',
                                            icon: "error",              //ALERT BOX
                                            closeOnClickOutside: false,
                                        });
                                        return;
                                }

              }


            })

          });

          $("#dugme_za_nazad_sa_pregleda").click(function(){

            if(provera_sa_koje_stranice_je_faktura_otvorena_sa_glavne_ili_sa_prikaz_klijenta == 'stranica_prikaz_klijenta')
            {
              $("#gore").css("display", "none");
              $("#dole").css("display", "none");
              $("#forma_za_slanje_emaila").css("display","none");
              $("#ceo_div_na_stanici_prikaz_klijenta").css("display","block");
              $("#donji_red_prikaz_korisnikovih_faktura_u_tabeli").css("display","block");
              $("#div_gornji_deo_na_stanici_prikaz_klijenta").css("display","block");
              $("body").css("background-color","white");

              $("#dugme_za_slanje_poruke_podrsci").css("display","block");
            //  $("#slicica_porukica_podrsci").attr("src","slika/porukica_podrsci.png");

              // $("#dugme_za_povratak_na_vrh").css({
              //   position: "relative",
              //   top: "0px"
              // });
              ispis_onovnih_podataka_o_izabranom_klijentu();
              ispis_u_tabeli_o_izabranom_klijentu();
            }
           else if(provera_sa_koje_stranice_je_faktura_otvorena_sa_glavne_ili_sa_prikaz_klijenta == 'stranica_gore'){


             $("#donji_red_prikaz_korisnikovih_faktura_u_tabeli").css("display","none");
             $("#div_gornji_deo_na_stanici_prikaz_klijenta").css("display","none");
             $("#dole").css("display", "none");     //povratak sa pogleda na fakturu  NA pocetnu stranicu
             $("#forma_za_slanje_emaila").css("display","none");   //zatvaranje diva za email
             $("#gore").css("display", "block");              //prikaz pocetne strane
             $("body").css("background-color","white");           //vracanje boje u prvobitno stanje tj u belu

             $("#dugme_za_slanje_poruke_podrsci").css("display","block");
          //   $("#slicica_porukica_podrsci").attr("src","slika/porukica_podrsci.png");

             // $("#dugme_za_povratak_na_vrh").css({
             //   position: "relative",
             //   top: "0px"
             // });
             prikaz_podataka_o_korisniku_na_pocetnoj();
             prikaz_svih_faktura_na_pocetnoj_strani();
           }
          });



          $("#zatvaranje_forma_za_slanje_emaila").on('click',function(){
            $("#forma_za_slanje_emaila").css("display","none");
          })





         $("#select_placeno-nije_placeno").change(function(){

          var izabrani_status = $("#select_placeno-nije_placeno").val();

                $.post("php/pocetna_php/handler_pocetna.php",{
                        izabrani_status:izabrani_status,
                        fakture_id:broj_fakture,          //uzimamo id trenutno izabrane fakture  koji je kreiran u globalnoj variabli prilikom prikaza svih faktura u 150 redu
                },function(data,status){
                    var data = jQuery.parseJSON(data);
                    if(data == "uspesno promenjen status")
                    {
                      if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
                      {
                        if(izabrani_status == "Nije placena"){izabrani_status = "Nije placena"}
                        else if(izabrani_status == "Placena"){izabrani_status = "Placena"};
                        $("#ispis_o_trenutnom_statusu").html(izabrani_status);
                        $("#ispis_o_uspesno_promenjenom_statusu").html('Uspesno promenjen status u&nbsp;<b>'+izabrani_status+'</b>').css('display', 'block');
                        setTimeout(function(){ $("#ispis_o_uspesno_promenjenom_statusu").css('display', 'none'); }, 2000);
                      }
                      else if(jezik == 'engleski')
                      {
                        if(izabrani_status == "Nije placena"){izabrani_status = "Not Paid"}
                        else if(izabrani_status == "Placena"){izabrani_status = "Paid"};
                        $("#ispis_o_uspesno_promenjenom_statusu").html('Successfully changed status to&nbsp;<b>'+izabrani_status+'</b>').css('display', 'block');
                        setTimeout(function(){ $("#ispis_o_uspesno_promenjenom_statusu").css('display', 'none'); }, 2000);
                        $("#ispis_o_trenutnom_statusu").html(izabrani_status);
                      }
                     status_za_select_na_pocetnoj_strani();
                    }

                })
         });

         if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
         {
           $("#izbor_godine").chosen({no_results_text: "Oops, nema pronadjenih rezultata!"}); //odmah cim UCITAMO DOCUMENT oblikujemo select uz pomoc CHOSEN dodatka
           $("#izbor_statusa_select").chosen({no_results_text: "Oops, nema pronadjenih rezultata!"});
           $("#izbor_firme_select").chosen({no_results_text: "Oops, nema pronadjenih rezultata!"}); //odmah cim UCITAMO DOCUMENT oblikujemo select uz pomoc CHOSEN dodatka
         }
         else if(jezik == 'engleski')
         {
           $("#izbor_godine").chosen({no_results_text: "Oops, no results found!"}); //odmah cim UCITAMO DOCUMENT oblikujemo select uz pomoc CHOSEN dodatka
           $("#izbor_statusa_select").chosen({no_results_text: "Oops, no results found!"});
           $("#izbor_firme_select").chosen({no_results_text: "Oops, no results found!"}); //odmah cim UCITAMO DOCUMENT oblikujemo select uz pomoc CHOSEN dodatka
         }







          $("#izbor_statusa_select").change(function(){  //ako dodje do promene u selectu onda ucitava ove funkcije

           prikaz_svih_faktura_na_pocetnoj_strani();
         });


          $("#izbor_godine").change(function(){  //ako dodje do promene u selectu onda ucitava ove funkcije

           prikaz_svih_faktura_na_pocetnoj_strani();
         });



        $("#izbor_firme_select").change(function(){
          provera_sa_koje_stranice_je_faktura_otvorena_sa_glavne_ili_sa_prikaz_klijenta = 'stranica_prikaz_klijenta';
          ime_izabranog_komintenta = $("#izbor_firme_select").val();
          ispis_onovnih_podataka_o_izabranom_klijentu();
          ispis_u_tabeli_o_izabranom_klijentu();
          prikaz_svih_faktura_na_pocetnoj_strani();
           })




           $("#nazad_sa_stanice_prikaz_klijenta").click(function(){
             provera_sa_koje_stranice_je_faktura_otvorena_sa_glavne_ili_sa_prikaz_klijenta = 'stranica_gore';
             $("#ceo_div_na_stanici_prikaz_klijenta").css("display","none");

             $("#donji_red_prikaz_korisnikovih_faktura_u_tabeli").css("display","none");
             $("#div_gornji_deo_na_stanici_prikaz_klijenta").css("display","none");
             $("#promeni_osnovne_podatke_o_klijentu").val('Promeni osnovne podatke o klijentu');
             $("#gore").css("display","block");
             $("#izbor_godine_prikaz_klijenta_stranica").val('sve_fakture'); //kad izadjemo sa pregleda vracamo select u prvobitni polozaj da ne bih sledece otvaranje pamtio godinu
             $("#izbor_statusa_prikaz_klijenta_stranica").val('sve_fakture'); //kad izadjemo sa pregleda vracamo select u prvobitni polozaj da ne bih sledece otvaranje pamtio godinu
             $("#prikaz_klijenta_promena_imena").val(''); //kad se vracamo sa stranice obavezno ponistavamo staro ime da ne bih posle iz php-a query vracao fakture i za
             //prethodnog korisnika vec samo za novog  jer query radi po principu OR
             prikaz_svih_faktura_na_pocetnoj_strani();
             prikaz_imena_za_select_na_pocetnoj_strani();
           });



        $("#promeni_osnovne_podatke_o_klijentu").click(function(){

          $("#prikaz_klijenta_promena_imena, #prikaz_klijenta_promena_piba, #prikaz_klijenta_promena_lokacije, #prikaz_klijenta_promena_emaila").css("display","block");
          //ovim iznad prikazujemo sve inpute od jednom na stranici za prikaz klijenata a inputi su za promenu podataka o promeni_osnovne_podatke_o_klijentu
          $("#promeni_osnovne_podatke_o_klijentu").css('display','none');
          $("#promeni_osnovne_podatke_o_klijentu_dugme_sacuvaj").css('display','block');
          $("#prikaz_klijenta_promena_piba").attr('disabled','disabled');



  });


         $("#promeni_osnovne_podatke_o_klijentu_dugme_sacuvaj").click(function(){

           var prikaz_klijenta_promena_imena = $("#prikaz_klijenta_promena_imena").val();//AUTOMACKI DEFINISE DA JE PRVO SLOVO VELIKO (samo u slucaju da su sva mala)
           prikaz_klijenta_promena_imena = prikaz_klijenta_promena_imena.substr(0,1).toUpperCase()+prikaz_klijenta_promena_imena.substr(1);
           var prikaz_klijenta_promena_piba = $("#prikaz_klijenta_promena_piba").val();
           var prikaz_klijenta_promena_lokacije = $("#prikaz_klijenta_promena_lokacije").val();
           prikaz_klijenta_promena_lokacije = prikaz_klijenta_promena_lokacije.substr(0,1).toUpperCase()+prikaz_klijenta_promena_lokacije.substr(1);
           var prikaz_klijenta_promena_emaila = $("#prikaz_klijenta_promena_emaila").val();


            var verifikacija_promena_osnovnih_podataka_o_klijentu_sa_stranice_prikaz_klijenta = "verifikacija_promena_osnovnih_podataka_o_klijentu_sa_stranice_prikaz_klijenta";
           $.post("php/pocetna_php/handler_pocetna.php",{
             verifikacija_promena_osnovnih_podataka_o_klijentu_sa_stranice_prikaz_klijenta:verifikacija_promena_osnovnih_podataka_o_klijentu_sa_stranice_prikaz_klijenta,
             ime_izabranog_klijenta_na_osnovu_kojeg_menjamo_njegove_podatke_u_bazi:ime_izabranog_klijenta_na_osnovu_kojeg_menjamo_njegove_podatke_u_bazi,
             prikaz_klijenta_promena_imena:prikaz_klijenta_promena_imena,
             prikaz_klijenta_promena_piba:prikaz_klijenta_promena_piba,
             prikaz_klijenta_promena_lokacije:prikaz_klijenta_promena_lokacije,
             prikaz_klijenta_promena_emaila:prikaz_klijenta_promena_emaila,
           },function(data,status){

           $("#prikaz_klijenta_promena_imena, #prikaz_klijenta_promena_piba, #prikaz_klijenta_promena_lokacije, #prikaz_klijenta_promena_emaila").css("display","none");
           $("#promeni_osnovne_podatke_o_klijentu_dugme_sacuvaj").css("display","none");
           $("#promeni_osnovne_podatke_o_klijentu").css('display','block');
           ispis_onovnih_podataka_o_izabranom_klijentu();
           ispis_u_tabeli_o_izabranom_klijentu();
           //OVA FUNKCIJA RADI KAD PROMENIMIO PODATKE U BAZI (dugme sacuvaj) funkcija  ispis_onovnih_podataka_o_izabranom_klijentu() uzima dodatnu vrednost novo ime klijenata
           // i to prosledjuje php a tamo query po principu ako je setovano novo ime ISPISUJE OVE PODATKE ISTA TA   FUNKCIJA U php-u dobija ime i promenom u selectu na POCETNOJ
           //strani...AKO JE POSLATO IME IZ SELECTA RADI NORMALNO I ISPISUJE ILI AKO JE PROMENJENO IME UZIMA OPET STARO IME I PRIKAZUJE ODMAH NOVE PODATKE I MENJA SVE TO U FAKTURAMA
           })
         });




         $("#izbor_godine_prikaz_klijenta_stranica").change(function(){
            var nova_izabrana_godina_za_prikaz_faktura_na_prikaz_klijenta = $("#izbor_godine_prikaz_klijenta_stranica").val();

            if(nova_izabrana_godina_za_prikaz_faktura_na_prikaz_klijenta == "sve_fakture")
            {
              ispis_u_tabeli_o_izabranom_klijentu();
            }
            else if(nova_izabrana_godina_za_prikaz_faktura_na_prikaz_klijenta !== "sve_fakture"){
              ispis_u_tabeli_o_izabranom_klijentu();
            }


         })

        $("#izbor_statusa_prikaz_klijenta_stranica").change(function(){
          var nov_izabran_status_za_prikaz_faktura_na_prikaz_klijenta = $("#izbor_statusa_prikaz_klijenta_stranica").val();

          if(nov_izabran_status_za_prikaz_faktura_na_prikaz_klijenta == "sve_fakture")
          {
            ispis_u_tabeli_o_izabranom_klijentu();
          }
          else if(nov_izabran_status_za_prikaz_faktura_na_prikaz_klijenta !== "sve_fakture")
          {
            ispis_u_tabeli_o_izabranom_klijentu();
          }
        })

      $("#izadji_ad").click(function(){
        var verifikacija_izadji_ad = "verifikacija_izadji_ad";
        $.post("php/pocetna_php/handler_pocetna.php",{
          verifikacija_izadji_ad:verifikacija_izadji_ad
        },function(data,status){
             var data = jQuery.parseJSON(data);
             if(data == "ponistena sesija")
             {
               window.location.href = 'index.php';
             }
        })
      })



});

function provera_duzine_pretplate_manualnog_iskljuci_ukljuci()
{
  var verifikacija_provera_duzine_pretplate_manualnog_iskljuci_ukljuci = "verifikacija_provera_duzine_pretplate_manualnog_iskljuci_ukljuci";
  $.post("php/pocetna_php/handler_pocetna.php",{
       verifikacija_provera_duzine_pretplate_manualnog_iskljuci_ukljuci:verifikacija_provera_duzine_pretplate_manualnog_iskljuci_ukljuci,
  },function(data,status){
   var data = jQuery.parseJSON(data);
    if(data == "Sve je u redu mozete nastaviti sa koriscenjem programa")
    {
        window.location.href = 'unos_faktura.php?jezik='+jezik;
    }
    else if(data == "Vase obaveze nisu izmirene")
    {

                      if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == ""){

                        swal({
                                  title: 'Pravljenje novih faktura vam je trenutno onemoguceno, Vase obaveze nisu izmirene ili je doslo do tehnickih problema u tom slucaju kontaktirajte nasu korisnicku sluzbu!',
                                  icon: "error",              //ALERT BOX
                                  closeOnClickOutside: false,
                              });
                              return;
                      }
                      else if(jezik == 'engleski' || jezik == 'Promeni_jezik' || jezik == null || jezik == ""){

                        swal({
                                  title: 'Creating a new invoice to you is disabled, Your obligations are not met or there is a technical problem in this case, please contact our Customer Service!',
                                  icon: "error",              //ALERT BOX
                                  closeOnClickOutside: false,
                              });
                              return;
                      }

    }


  })
}



function godina_za_select_na_pocetnoj_strani()
{
  //godina za select na pocetnoj strani
 var verifikacija_godina_za_select_na_pocetnoj = "verifikacija_godina_za_select_na_pocetnoj";


          $.post("php/pocetna_php/handler_pocetna.php",{
            verifikacija_godina_za_select_na_pocetnoj:verifikacija_godina_za_select_na_pocetnoj
          },function(data,status){
            var rezultat = "";
              var data = jQuery.parseJSON(data);
              for(var i=0; i<data.length;i++){

                   rezultat+="<option>"+data[i][0]+"</option>";
              }

               if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
               {
                 $("#izbor_godine").html(rezultat).prepend('<option value="sve_fakture" id="select_obelezeni_odabir_godine_pocetna_strana" selected>Sve fakture po godinama</option>').trigger("chosen:updated"); //ovim dodajemo u select na pocetnoj sve godine iz kojih imamo fakture
               }
               else if(jezik == 'engleski')
               {
                 $("#izbor_godine").html(rezultat).prepend('<option value="sve_fakture" id="select_obelezeni_odabir_godine_pocetna_strana" selected>All invoices per year</option>').trigger("chosen:updated");
               }
          }); //trigger sluzi da dodamo nove podatke u select ... bez toga ne radi
}

function status_za_select_na_pocetnoj_strani()
{
  //status za select na pocetnoj strani
 var verifikacija_status_faktura_za_select_na_pocetnoj = "verifikacija_status_faktura_za_select_na_pocetnoj";


          $.post("php/pocetna_php/handler_pocetna.php",{
            verifikacija_status_faktura_za_select_na_pocetnoj:verifikacija_status_faktura_za_select_na_pocetnoj
          },function(data,status){
            var rezultat = "";
              var data = jQuery.parseJSON(data);
              for(var i=0; i<data.length;i++){

                   rezultat+="<option>"+data[i][0]+"</option>";
              }

             if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
             {
               $("#izbor_statusa_select").html(rezultat).prepend('<option value="sve_fakture" id="select_obelezeni_status_fakture_pocetna_strana" selected>Sve fakture po statusu</option>').trigger("chosen:updated"); //ovim dodajemo u select na pocetnoj sve godine iz kojih imamo fakture
             }
             else if(jezik == 'engleski')
             {
               $("#izbor_statusa_select").html(rezultat).prepend('<option value="sve_fakture" id="select_obelezeni_status_fakture_pocetna_strana" selected>All invoices by status</option>').trigger("chosen:updated");
             }
          });     //trigger sluzi da dodamo nove podatke u select ... bez toga ne radi
}

function prikaz_imena_za_select_na_pocetnoj_strani(){
     var verifikacija_prikaz_imena_za_select = "verifikacija_prikaz_imena_za_select";
          $.post("php/unos_php/handler_unos_podataka.php",{
             verifikacija_prikaz_imena_za_select:verifikacija_prikaz_imena_za_select,
          },function(data,status){
            var rezultat = "";
             var data = jQuery.parseJSON(data);

             for(var i=0; i<data.length;i++){


                 rezultat+="<option>"+data[i][0]+"</option>";
             }

           if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
           {
             $("#izbor_firme_select").html(rezultat).prepend('<option selected disabled id="prikazi_postojeceg_klijenta">Prikazi postojeceg klijenta</option>').trigger("chosen:updated"); //ZATIM UPDATUJEMO,ISPISUJEMO PODATKE U NOVI CHOSEN OBLIKOVANI SELECT (imena firmi)
           }
           else if(jezik == 'engleski')
           {
             $("#izbor_firme_select").html(rezultat).prepend('<option selected disabled id="prikazi_postojeceg_klijenta">Displays existing client</option>').trigger("chosen:updated");
           }

                                                                     //ovim ispisujemo podatke u chosen select
          //  $("#izbor_firme_select").prepend('<option selected disabled>Prikazi postojeceg klijenta</option>').trigger("chosen:updated");
          });
}


function ispis_onovnih_podataka_o_izabranom_klijentu(){
           izabrani_klijent = $("#izbor_firme_select").val();
           novo_ime_klijenta = $("#prikaz_klijenta_promena_imena").val();
          $("#gore").css("display","none");
          $("#ceo_div_na_stanici_prikaz_klijenta").css("display","block");
          $("#donji_red_prikaz_korisnikovih_faktura_u_tabeli").css("display","block");
          $("#div_gornji_deo_na_stanici_prikaz_klijenta").css("display","block");
          var verifikacija_ispis_onovnih_podataka_o_izabranom_klijentu = "verifikacija_ispis_onovnih_podataka_o_izabranom_klijentu";
               $.post("php/pocetna_php/handler_pocetna.php",{
                 izabrani_klijent:izabrani_klijent,
                 novo_ime_klijenta:novo_ime_klijenta,
                 verifikacija_ispis_onovnih_podataka_o_izabranom_klijentu:verifikacija_ispis_onovnih_podataka_o_izabranom_klijentu,
               },function(data,status){


                 var rezultat = "";
                 var data = jQuery.parseJSON(data);
                 if(data[0][1] == "" || data[0][1] == null){
                           if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
                           {
                              data[0][1] = "Fizicko lice";            //PRVI POST IDE PO OSNOVNE PODATKE O KORISNIKU
                           }
                           else if(jezik == 'engleski')
                           {
                             data[0][1] = "Individual";
                           }
                 }
                 ime_izabranog_klijenta_na_osnovu_kojeg_menjamo_njegove_podatke_u_bazi = data[0][0];
                $("#prikaz_korisnika_ime_firme").html(data[0][0]);
                $("#prikaz_klijenta_promena_imena").val(data[0][0]);

                $("#prikaz_korisnika_pib").html(data[0][1]);
                $("#prikaz_klijenta_promena_piba").val(data[0][1]);

                $("#prikaz_korisnika_lokacija").html(data[0][2]);
                $("#prikaz_klijenta_promena_lokacije").val(data[0][2]);

                $("#prikaz_korisnika_email").html(data[0][3]);
                $("#prikaz_klijenta_promena_emaila").val(data[0][3]);
              });




              //godina za select na pocetnoj strani
              var verifikacija_godina_za_select_na_prikaz_klijenta = "verifikacija_godina_za_select_na_prikaz_klijenta";
              $("#izbor_godine_prikaz_klijenta_stranica").chosen({no_results_text: "Oops, nema pronadjenih rezultata!"}); //odmah cim UCITAMO DOCUMENT oblikujemo select uz pomoc CHOSEN dodatka

                      $.post("php/pocetna_php/handler_pocetna.php",{
                        izabrani_klijent:izabrani_klijent,
                        novo_ime_klijenta:novo_ime_klijenta,
                        verifikacija_godina_za_select_na_prikaz_klijenta:verifikacija_godina_za_select_na_prikaz_klijenta
                      },function(data,status){
                        var rezultat = "";
                          var data = jQuery.parseJSON(data);
                          for(var i=0; i<data.length;i++){

                               rezultat+="<option>"+data[i][0]+"</option>";
                          }

                          if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
                          {
                            $("#izbor_godine_prikaz_klijenta_stranica").html(rezultat).prepend('<option value="sve_fakture" id="select_obelezeni_odabir_godine_klijentska_strana" selected>Sve fakture po godinama</option>').trigger("chosen:updated"); //ovim dodajemo u select na prrikaz klijenata sve godine iz kojih imamo fakture
                          }
                          else if(jezik == 'engleski')
                          {
                            $("#izbor_godine_prikaz_klijenta_stranica").html(rezultat).prepend('<option value="sve_fakture" id="select_obelezeni_odabir_godine_klijentska_strana" selected>All invoices per year</option>').trigger("chosen:updated");
                          }

                      });                                //trigger sluzi da dodamo nove podatke u select ... bez toga ne radi
                                                        //zatim posle html() funkcije ispred njenih rezultata lepimo jos jednu opciju


              // //godina za select na pocetnoj strani


              //status za select na prikaz klijenata strani
              var verifikacija_status_za_select_na_prikaz_klijenta = "verifikacija_status_za_select_na_prikaz_klijenta";
              $("#izbor_statusa_prikaz_klijenta_stranica").chosen({no_results_text: "Oops, nema pronadjenih rezultata!"}); //odmah cim UCITAMO DOCUMENT oblikujemo select uz pomoc CHOSEN dodatka

                      $.post("php/pocetna_php/handler_pocetna.php",{
                        izabrani_klijent:izabrani_klijent,
                        novo_ime_klijenta:novo_ime_klijenta,
                        verifikacija_status_za_select_na_prikaz_klijenta:verifikacija_status_za_select_na_prikaz_klijenta
                      },function(data,status){
                        var rezultat = "";
                          var data = jQuery.parseJSON(data);
                          for(var i=0; i<data.length;i++){

                               rezultat+="<option>"+data[i][0]+"</option>";
                          }
                          if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
                          {
                            $("#izbor_statusa_prikaz_klijenta_stranica").html(rezultat).prepend('<option value="sve_fakture" id="select_obelezeni_odabir_statusa_klijentska_strana" selected>Sve fakture po statusu</option>').trigger("chosen:updated"); //ovim dodajemo u select na prrikaz klijenata sve godine iz kojih imamo fakture
                          }
                          else if(jezik == 'engleski')
                          {
                            $("#izbor_statusa_prikaz_klijenta_stranica").html(rezultat).prepend('<option value="sve_fakture" id="select_obelezeni_odabir_statusa_klijentska_strana" selected>All invoices by status</option>').trigger("chosen:updated");
                          }

                      });

             //status za select na prikaz klijenata strani

  }
jQuery.fn.center = function ()
  {
      this.css("position","fixed");
      this.css("top", ($(window).height() / 2) - (this.outerHeight() / 2));
      this.css("left", ($(window).width() / 2) - (this.outerWidth() / 2));
      return this;
  }


function ispis_u_tabeli_o_izabranom_klijentu(){
            var izbor_godine_za_stranicu_prikaz_klijenta = $("#izbor_godine_prikaz_klijenta_stranica").val();
            var izbor_statusa_za_stranicu_prikaz_klijenta = $("#izbor_statusa_prikaz_klijenta_stranica").val();
            var verifikacija_ispis_svih_faktura_o_izabranom_klijentu = "verifikacija_ispis_svih_faktura_o_izabranom_klijentu";
              $.post("php/pocetna_php/handler_pocetna.php",{
                izabrani_klijent:izabrani_klijent,
                novo_ime_klijenta:novo_ime_klijenta,
                izbor_godine_za_stranicu_prikaz_klijenta:izbor_godine_za_stranicu_prikaz_klijenta,
                izbor_statusa_za_stranicu_prikaz_klijenta:izbor_statusa_za_stranicu_prikaz_klijenta,
                verifikacija_ispis_svih_faktura_o_izabranom_klijentu:verifikacija_ispis_svih_faktura_o_izabranom_klijentu,
              },function(data,status){
                var data = jQuery.parseJSON(data);

                var rezultat = "";
                for(var i=0; i<data.length;i++){     //SKINUTI DECIMALE SA UKUPNE VREDNOSTI

                  if(data[i][3] == "" && data[i][6] == "Placena" && data[i][7] == "RSD") //PROVERA DA LI JE PIB DEFINISAN U OVOM SLUAJU NIJE
                  {

                               if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                                 data[i][3] = "Fizicko lice";    //ONDA DEFINISEMO DA JE REC O FIZICKOM LICU I AKO JE JEZIK SRPSKI ONDA ISPISUJE OVO
                                 rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Fizicko lice</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                               }

                              else if(jezik == 'engleski'){
                                data[i][3] = "Individual";    //AKO JE ENGLESKI ONDA OVO
                                rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Individual</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                              }
                  }
                  else if(data[i][3] == "" && data[i][6] == "Placena" && data[i][7] == "EUR") //PROVERA DA LI JE PIB DEFINISAN U OVOM SLUAJU NIJE
                  {

                               if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                                 data[i][3] = "Fizicko lice";    //ONDA DEFINISEMO DA JE REC O FIZICKOM LICU I AKO JE JEZIK SRPSKI ONDA ISPISUJE OVO
                                 rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Fizicko lice</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                               }

                              else if(jezik == 'engleski'){
                                data[i][3] = "Individual";    //AKO JE ENGLESKI ONDA OVO
                                rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Individual</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                              }
                  }
                  else if(data[i][3] == "" && data[i][6] == "Nije placena" && data[i][7] == "RSD")
                  {
                              if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                                data[i][3] = "Fizicko lice";    //ONDA DEFINISEMO DA JE REC O FIZICKOM LICU I AKO JE JEZIK SRPSKI ONDA ISPISUJE OVO
                                rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Fizicko lice</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Nije placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                              }

                             else if(jezik == 'engleski'){
                               data[i][3] = "Individual";    //AKO JE ENGLESKI ONDA OVO
                               rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Individual</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Not paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                             }
                  }
                  else if(data[i][3] == "" && data[i][6] == "Nije placena" && data[i][7] == "EUR")
                  {
                              if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                                data[i][3] = "Fizicko lice";    //ONDA DEFINISEMO DA JE REC O FIZICKOM LICU I AKO JE JEZIK SRPSKI ONDA ISPISUJE OVO
                                rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Fizicko lice</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Nije placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                              }

                             else if(jezik == 'engleski'){
                               data[i][3] = "Individual";    //AKO JE ENGLESKI ONDA OVO
                               rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Individual</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Not paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                             }
                  }
                  else if(data[i][3] == "" && data[i][6] == "Storno" && data[i][7] == "RSD")
                  {
                              if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                                data[i][3] = "Fizicko lice";    //ONDA DEFINISEMO DA JE REC O FIZICKOM LICU I AKO JE JEZIK SRPSKI ONDA ISPISUJE OVO
                                rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Fizicko lice</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Storno</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Obrisi</b></button></td></tr>';
                              }

                             else if(jezik == 'engleski'){
                               data[i][3] = "Individual";    //AKO JE ENGLESKI ONDA OVO
                               rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Individual</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Cancellation</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Delete</b></button></td></tr>';
                             }
                  }
                  else if(data[i][3] == "" && data[i][6] == "Storno" && data[i][7] == "EUR")
                  {
                              if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                                data[i][3] = "Fizicko lice";    //ONDA DEFINISEMO DA JE REC O FIZICKOM LICU I AKO JE JEZIK SRPSKI ONDA ISPISUJE OVO
                                rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Fizicko lice</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Storno</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Obrisi</b></button></td></tr>';
                              }

                             else if(jezik == 'engleski'){
                               data[i][3] = "Individual";    //AKO JE ENGLESKI ONDA OVO
                               rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Individual</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Cancellation</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Delete</b></button></td></tr>';
                             }
                  }
                  else if(data[i][3] !== "" && data[i][6] == "Placena" && data[i][7] == "RSD")
                  {
                     //U SLUCAJU DA JE PIB DEFINISAN
                              if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){  //PROVERAVAMO KOJI JE JEZIK AKTIVAN  AKO JE SRPSKI ISPISUJEMO OVO
                                rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                              }

                              else if(jezik == 'engleski'){    //A AKO JE ENGLESKI AKTIVAN ISPISUJEMO OVO
                                rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                              }
                      }
                      else if(data[i][3] !== "" && data[i][6] == "Placena" && data[i][7] == "EUR")
                      {
                         //U SLUCAJU DA JE PIB DEFINISAN
                                  if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){  //PROVERAVAMO KOJI JE JEZIK AKTIVAN  AKO JE SRPSKI ISPISUJEMO OVO
                                    rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                                  }

                                  else if(jezik == 'engleski'){    //A AKO JE ENGLESKI AKTIVAN ISPISUJEMO OVO
                                    rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                                  }
                          }
                      else if(data[i][3] !== "" && data[i][6] == "Nije placena" && data[i][7] == "RSD")
                      {
                         //U SLUCAJU DA JE PIB DEFINISAN
                                  if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){  //PROVERAVAMO KOJI JE JEZIK AKTIVAN  AKO JE SRPSKI ISPISUJEMO OVO
                                    rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Nije placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                                  }

                                  else if(jezik == 'engleski'){    //A AKO JE ENGLESKI AKTIVAN ISPISUJEMO OVO
                                    rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Not paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                                  }
                          }
                          else if(data[i][3] !== "" && data[i][6] == "Nije placena" && data[i][7] == "EUR")
                          {
                             //U SLUCAJU DA JE PIB DEFINISAN
                                      if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){  //PROVERAVAMO KOJI JE JEZIK AKTIVAN  AKO JE SRPSKI ISPISUJEMO OVO
                                        rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Nije placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                                      }

                                      else if(jezik == 'engleski'){    //A AKO JE ENGLESKI AKTIVAN ISPISUJEMO OVO
                                        rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Not paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                                      }
                              }
                          else if(data[i][3] !== "" && data[i][6] == "Storno" && data[i][7] == "RSD")
                          {
                             //U SLUCAJU DA JE PIB DEFINISAN
                                      if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){  //PROVERAVAMO KOJI JE JEZIK AKTIVAN  AKO JE SRPSKI ISPISUJEMO OVO
                                        rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Storno</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Obrisi</b></button></td></tr>';
                                      }

                                      else if(jezik == 'engleski'){    //A AKO JE ENGLESKI AKTIVAN ISPISUJEMO OVO
                                        rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Cancellation</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Delete</b></button></td></tr>';
                                      }
                              }
                              else if(data[i][3] !== "" && data[i][6] == "Storno" && data[i][7] == "EUR")
                              {
                                 //U SLUCAJU DA JE PIB DEFINISAN
                                          if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){  //PROVERAVAMO KOJI JE JEZIK AKTIVAN  AKO JE SRPSKI ISPISUJEMO OVO
                                            rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Storno</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Obrisi</b></button></td></tr>';
                                          }

                                          else if(jezik == 'engleski'){    //A AKO JE ENGLESKI AKTIVAN ISPISUJEMO OVO
                                            rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Cancellation</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Delete</b></button></td></tr>';
                                          }
                                  }



                };


              $("#prikaz_korisnikovih_faktura_u_tabeli tbody").html(rezultat);
  //    $("#prikaz_korisnikovih_faktura_u_tabeli").DataTable();
      if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
          $("#prikaz_korisnikovih_faktura_u_tabeli").DataTable({      //OVIM DEFINISEMO DODATAK ZA TABELU
                               "language": {
                                   "lengthMenu": "Prikazi _MENU_",
                                   "zeroRecords": "Nema rezultata pretrage",
                                   "info": "Stranica _PAGE_ od ukupno _PAGES_",    //OVIM DEFINISEMO SRPSKI JEZIK U DODATKU
                                   "infoEmpty": "Nema rezultata",
                                   "infoFiltered": "(od ukupno _MAX_ faktura)",    //OVA DVA PREVODA SU MORALA OVDE DA STOJE JER MORAJU BITI TU ODMAH ISPOD UCITAVANJA
                                   "search":         "Pronadji Fakt:",
                                   "paginate": {
                                               "first":      "Prva",
                                               "last":       "Poslednja",
                                               "next":       "Sledeca",
                                               "previous":   "Predhodna"
                                             },
                                         "loadingRecords": "Ucitavanje...",
                                         "loadingRecords": "Obrada..."
                                     },
                                     "pagingType": "full_numbers",  //POKAZUJE SVE BROJEVE PAGINACIJE
                                     "scrollY":        "350px", //SKROLOVANJE
                                     "scrollCollapse": true,
                                     "retrieve": true, //OVA LINIJA JE OBAVEZNA DA BIH MOGLO DA RADI POVRATAK SA PREGLEDA FAKTURE I PROMENA STATUSA U ISTO VREME NA POCETNU STRANU
                                     "paging":         true,
                                     "search": {
                                                  "search": " "
                                                }

                          });

                     }
       else if(jezik == 'engleski'){
         $("#prikaz_korisnikovih_faktura_u_tabeli").DataTable({      //OVIM DEFINISEMO DODATAK ZA TABELU
                              "language": {
                                  "lengthMenu": "Review _MENU_",
                                  "zeroRecords": "Nothing found - sorry",
                                  "info": "Showing page _PAGE_ of _PAGES_",    //OVIM DEFINISEMO ENGLESKI JEZIK U DODATKU
                                  "infoEmpty": "No records available",
                                  "infoFiltered": "(filtered from _MAX_ total invoice)",       //OVA DVA PREVODA SU MORALA OVDE DA STOJE JER MORAJU BITI TU ODMAH ISPOD UCITAVANJA
                                  "search":         "Search Invo:",
                                  "paginate": {
                                              "first":      "First",
                                              "last":       "Last",
                                              "next":       "Next",
                                              "previous":   "Previous"
                                            },
                                        "loadingRecords": "Load...",
                                        "loadingRecords": "Processing..."
                                    },
                                    "pagingType": "full_numbers",  //POKAZUJE SVE BROJEVE PAGINACIJE
                                    "scrollY":        "350px", //SKROLOVANJE
                                    "scrollCollapse": true,
                                    "retrieve": true, //OVA LINIJA JE OBAVEZNA DA BIH MOGLO DA RADI POVRATAK SA PREGLEDA FAKTURE I PROMENA STATUSA U ISTO VREME NA POCETNU STRANU
                                    "paging":         true,
                                    "search": {
                                                 "search": " "
                                               }

                         });
       }
     })

  }

  jQuery.fn.center = function ()  //FUNKCIJA ZA CENTRIRANJE DIV-a U CENTAR EKRANA
    {
        this.css("position","fixed");
        this.css("top", ($(window).height() / 2) - (this.outerHeight() / 2));
        this.css("left", ($(window).width() / 2) - (this.outerWidth() / 2));
        return this;
    }

window.prikaz_podataka_o_korisniku_na_pocetnoj = function(){
      var verifikacija_prikaz_podataka_okorisniku_na_pocetnoj = "verifikacija_prikaz_podataka_okorisniku_na_pocetnoj";
        $.post("php/pocetna_php/handler_pocetna.php",{
          verifikacija_prikaz_podataka_okorisniku_na_pocetnoj:verifikacija_prikaz_podataka_okorisniku_na_pocetnoj,
        },function(data,status){
           var data = jQuery.parseJSON(data);

          firma_folder = data[0][0];
          slika_u_folderu = data[0][13];

           $("#ime_firme_na_pocetnoj").html(data[0][0]);
           $("#title").html(data[0][0]);
           var lokacija = data[0][1];
           var lokacija = lokacija.toUpperCase();  //AUTOMACKI VELIKA SLOVA
           $("#lokacija_firme_na_pocetnoj").html(lokacija);   //PRIKAZ PODATAKA O KORISNIKU ODMAH NA POCETNOJ U PROGRAMU
           var adresa = data[0][2];
           var adresa = adresa.toUpperCase();   //AUTOMACKI VELIKA SLOVA
           $("#adresa_firme_na_pocetnoj").html(adresa);
           $("#pib_firme_na_pocetnoj").html(data[0][3]);
           $("#maticni_br_firme_na_pocetnoj").html(data[0][4]);
           $("#ziro_racun_na_pocetnoj").html(data[0][5]);
           $("#email_na_pocetnoj").html(data[0][10]);
           $("#ime_za_dobrodoslicu").html(data[0][7]);
           $("#email_za_dobrodoslicu").html(data[0][10]);
           if(data[0][13] == null || data[0][13] == ""){
             $("#slikica_logo").html('<img src="slika/Logo-genericki.png" height="180" width="180" alt="sipak" data-toggle="modal" data-target="#ceo_modal_promena_logoa" data-backdrop="false" id="slika_logo_pocetna">');
           }                 //ovim prikazuje genericku sliku na mestu logoa u samom programu/aplikaciji a ovim ispod logo ako postoji
           else{
              $("#slikica_logo").html('<img src="folder-logo/'+data[0][0]+'/'+data[0][13]+'" height="180" width="180" alt="problem" data-toggle="modal" data-target="#ceo_modal_promena_logoa" data-backdrop="false" id="slika_logo_pocetna">');
           }





           $("#ime_firme_za_stampanje").html(data[0][0]);
           var opis_firme_za_stampanje = data[0][6];
           var opis_firme_za_stampanje = opis_firme_za_stampanje.toUpperCase();   //OVOM FUNKCIJOM PRETVARAMO CEO STRING U VELIKA SLOVA TAMO GDE TO TREBA
           $("#opis_firme_za_stampanje").html(opis_firme_za_stampanje);
           var lokacija_firme_za_stampanje = data[0][1];
           var lokacija_firme_za_stampanje = lokacija_firme_za_stampanje.toUpperCase();
           $("#lokacija_firme_za_stampanje").html(lokacija_firme_za_stampanje);
           var adresa_firme_za_stampanje = data[0][2];
           var adresa_firme_za_stampanje = adresa_firme_za_stampanje.toUpperCase();
           $("#adresa_firme_za_stampanje").html(adresa_firme_za_stampanje);
           $("#pib_firme_za_stampanje").html(data[0][3]);
           $("#maticni_br_firme_za_stampanje").html(data[0][4]);    //PRIKAZ PODATAKA O KORISNIKU KAD SE OTVORI FAKTURA I PRI STAMPANJU
           $("#ziro_racun_za_stampanje").html(data[0][5]);
           var ime_vlasnika_za_stampanje = data[0][7];
           var ime_vlasnika_za_stampanje = ime_vlasnika_za_stampanje.toUpperCase();
           $("#ime_vlasnika_za_stampanje").html(ime_vlasnika_za_stampanje);
           $("#broj_telefona_za_stampanje").html(data[0][8]);
           $("#fix_br_telefona_za_stampanje").html(data[0][9]);
           $("#email_za_stampanje").html(data[0][10]);
           if(data[0][13] == null || data[0][13] == ""){
             $("#slikica_logo_za_stampanje").html('');   //ako nema logoa onda kad se otvori stranica ne prikazuje nista  a ovim ispod prikazuje logo ako postoji
           }
           else{
             $("#slikica_logo_za_stampanje").html('<img src="folder-logo/'+data[0][0]+'/'+data[0][13]+'" height="180" width="180" alt="problem" id="slika_logo">');
           }


           //dobrodoslica za novog korisnika pri registraciji odmah u bazi u polje poslednje_logovanje ispisujemo
           //prvo logovanje i odmah prilikom ucitavanja stranice PROVERAVAMO DA LI TU PISE PRVO LOGOVANJE i ako pise pozelimo mu dobrodoslicu i ponudimo pitanje da popuni
           //zatim u bazi odmah menjamo u tom polju text na NIJE PRVO LOGOVANJE  da prilikom svakog drugog ucitavanja ne bih mu pozeleli ponovo dobrodoslicu


                       if(data[0][12] == "prvo logovanje")
                    {
                     vremenski_interval = setInterval(function(){    //ovim definisemo da posle 3 sekunde od prvog logovanja pozeli dobrodoslicu korisniku
                                    $('#dobrodoslica').css("display","block");
                                    $('#dobrodoslica').center();
                                    $(window).resize(function(){
                                       $('#dobrodoslica').center();
                                    });
                     }, 3000);
                     var verifikacija_prvo_logovanje = "verifikacija_prvo_logovanje";
                      $.post("php/pocetna_php/handler_pocetna.php",{verifikacija_prvo_logovanje:verifikacija_prvo_logovanje,},function(data,status){});
                                            //promeni status u nije prvo logovave  a dugmetom kojim zatvatamo div prekidamo vremenski interval da ga ne bih ponavljao

                     }



        });
}
//ovo je globalna funkcija ovde kreirana OBAVEZNO izvan $(document).ready() koju koristimo odmah pri ucitavanju stranice,posle brisanja
//i pozivamo je na stranici jquery-scripta-update na toj stranici treba da bih ucitala podatke posle povratka sa te na pocetnu
//ZATO JE NAJVISE I KREIRANA KAO GLOBALNA FUNKCIJA da ne bih morali tamo sve iznova da pisemo
window.prikaz_svih_faktura_na_pocetnoj_strani = function()
{
  var izabrana_godina = $("#izbor_godine").val();
  var izabran_status = $("#izbor_statusa_select").val();
  var verifikacija_prikaz_svih_faktura_na_pocetnoj_strani = "verifikacija_prikaz_svih_faktura_na_pocetnoj_strani";

  $.post("php/pocetna_php/handler_pocetna.php",{
    izabrana_godina:izabrana_godina,
    izabran_status:izabran_status,
    verifikacija_prikaz_svih_faktura_na_pocetnoj_strani:verifikacija_prikaz_svih_faktura_na_pocetnoj_strani,
  },function(data,status){

    var rezultat = "";
     var data = jQuery.parseJSON(data);

     for(var i=0; i<data.length;i++){     //SKINUTI DECIMALE SA UKUPNE VREDNOSTI

       if(data[i][3] == "" && data[i][6] == "Placena" && data[i][7] == "RSD") //PROVERA DA LI JE PIB DEFINISAN U OVOM SLUAJU NIJE
       {

                    if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                      data[i][3] = "Fizicko lice";    //ONDA DEFINISEMO DA JE REC O FIZICKOM LICU I AKO JE JEZIK SRPSKI ONDA ISPISUJE OVO
                      rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Fizicko lice</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                    }

                   else if(jezik == 'engleski'){
                     data[i][3] = "Individual";    //AKO JE ENGLESKI ONDA OVO
                     rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Individual</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                   }
       }
       else if(data[i][3] == "" && data[i][6] == "Placena" && data[i][7] == "EUR") //PROVERA DA LI JE PIB DEFINISAN U OVOM SLUAJU NIJE
       {

                    if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                      data[i][3] = "Fizicko lice";    //ONDA DEFINISEMO DA JE REC O FIZICKOM LICU I AKO JE JEZIK SRPSKI ONDA ISPISUJE OVO
                      rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Fizicko lice</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                    }

                   else if(jezik == 'engleski'){
                     data[i][3] = "Individual";    //AKO JE ENGLESKI ONDA OVO
                     rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Individual</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                   }
       }
       else if(data[i][3] == "" && data[i][6] == "Nije placena" && data[i][7] == "RSD")
       {
                   if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                     data[i][3] = "Fizicko lice";    //ONDA DEFINISEMO DA JE REC O FIZICKOM LICU I AKO JE JEZIK SRPSKI ONDA ISPISUJE OVO
                     rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Fizicko lice</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Nije placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                   }

                  else if(jezik == 'engleski'){
                    data[i][3] = "Individual";    //AKO JE ENGLESKI ONDA OVO
                    rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Individual</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Not paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                  }
       }
       else if(data[i][3] == "" && data[i][6] == "Nije placena" && data[i][7] == "EUR")
       {
                   if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                     data[i][3] = "Fizicko lice";    //ONDA DEFINISEMO DA JE REC O FIZICKOM LICU I AKO JE JEZIK SRPSKI ONDA ISPISUJE OVO
                     rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Fizicko lice</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Nije placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                   }

                  else if(jezik == 'engleski'){
                    data[i][3] = "Individual";    //AKO JE ENGLESKI ONDA OVO
                    rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Individual</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Not paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                  }
       }
       else if(data[i][3] == "" && data[i][6] == "Storno" && data[i][7] == "RSD")
       {
                   if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                     data[i][3] = "Fizicko lice";    //ONDA DEFINISEMO DA JE REC O FIZICKOM LICU I AKO JE JEZIK SRPSKI ONDA ISPISUJE OVO
                     rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Fizicko lice</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Storno</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Obrisi</b></button></td></tr>';
                   }

                  else if(jezik == 'engleski'){
                    data[i][3] = "Individual";    //AKO JE ENGLESKI ONDA OVO
                    rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Individual</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Cancellation</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Delete</b></button></td></tr>';
                  }
       }
       else if(data[i][3] == "" && data[i][6] == "Storno" && data[i][7] == "EUR")
       {
                   if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                     data[i][3] = "Fizicko lice";    //ONDA DEFINISEMO DA JE REC O FIZICKOM LICU I AKO JE JEZIK SRPSKI ONDA ISPISUJE OVO
                     rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Fizicko lice</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Storno</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Obrisi</b></button></td></tr>';
                   }

                  else if(jezik == 'engleski'){
                    data[i][3] = "Individual";    //AKO JE ENGLESKI ONDA OVO
                    rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">Individual</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Cancellation</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Delete</b></button></td></tr>';
                  }
       }



       else if(data[i][3] !== "" && data[i][6] == "Placena" && data[i][7] == "RSD")
       {
          //U SLUCAJU DA JE PIB DEFINISAN
                   if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){  //PROVERAVAMO KOJI JE JEZIK AKTIVAN  AKO JE SRPSKI ISPISUJEMO OVO
                     rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                   }

                   else if(jezik == 'engleski'){    //A AKO JE ENGLESKI AKTIVAN ISPISUJEMO OVO
                     rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                   }
           }
           else if(data[i][3] !== "" && data[i][6] == "Placena" && data[i][7] == "EUR")
           {
              //U SLUCAJU DA JE PIB DEFINISAN
                       if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){  //PROVERAVAMO KOJI JE JEZIK AKTIVAN  AKO JE SRPSKI ISPISUJEMO OVO
                         rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                       }

                       else if(jezik == 'engleski'){    //A AKO JE ENGLESKI AKTIVAN ISPISUJEMO OVO
                         rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                       }
               }

           else if(data[i][3] !== "" && data[i][6] == "Nije placena" && data[i][7] == "RSD")
           {
              //U SLUCAJU DA JE PIB DEFINISAN
                       if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){  //PROVERAVAMO KOJI JE JEZIK AKTIVAN  AKO JE SRPSKI ISPISUJEMO OVO
                         rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Nije placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                       }

                       else if(jezik == 'engleski'){    //A AKO JE ENGLESKI AKTIVAN ISPISUJEMO OVO
                         rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Not paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                       }
               }
               else if(data[i][3] !== "" && data[i][6] == "Nije placena" && data[i][7] == "EUR")
               {
                  //U SLUCAJU DA JE PIB DEFINISAN
                           if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){  //PROVERAVAMO KOJI JE JEZIK AKTIVAN  AKO JE SRPSKI ISPISUJEMO OVO
                             rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Nije placena</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td></td></tr>';
                           }

                           else if(jezik == 'engleski'){    //A AKO JE ENGLESKI AKTIVAN ISPISUJEMO OVO
                             rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Not paid</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td></td></tr>';
                           }
                   }
               else if(data[i][3] !== "" && data[i][6] == "Storno" && data[i][7] == "RSD")
               {
                  //U SLUCAJU DA JE PIB DEFINISAN
                           if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){  //PROVERAVAMO KOJI JE JEZIK AKTIVAN  AKO JE SRPSKI ISPISUJEMO OVO
                             rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Storno</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Obrisi</b></button></td></tr>';
                           }

                           else if(jezik == 'engleski'){    //A AKO JE ENGLESKI AKTIVAN ISPISUJEMO OVO
                             rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;RSD</td><td id="polje_status_u_tabeli">Cancellation</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Delete</b></button></td></tr>';
                           }
                   }
                   else if(data[i][3] !== "" && data[i][6] == "Storno" && data[i][7] == "EUR")
                   {
                      //U SLUCAJU DA JE PIB DEFINISAN
                               if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){  //PROVERAVAMO KOJI JE JEZIK AKTIVAN  AKO JE SRPSKI ISPISUJEMO OVO
                                 rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Storno</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Otvori</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Obrisi</b></button></td></tr>';
                               }

                               else if(jezik == 'engleski'){    //A AKO JE ENGLESKI AKTIVAN ISPISUJEMO OVO
                                 rezultat +='<tr id="donji_red_tabele_index"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td id="polje_pib_klijenta">'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'&nbsp;EUR</td><td id="polje_status_u_tabeli">Cancellation</td><td><button class="dugmici_otvori_pocetna" name="otvori_fakturu" id="otvori" onClick="otvori('+data[i][1]+')"><b>Open</b></button></td><td><button class="dugmici_otvori_pocetna" onClick="obrisi('+data[i][1]+')"><b>Delete</b></button></td></tr>';
                               }
                       }



     };
      $("#tabla tbody").html(rezultat);
      if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
          $("#tabla").DataTable({      //OVIM DEFINISEMO DODATAK ZA TABELU
                               "language": {
                                   "lengthMenu": "Prikazi _MENU_",
                                   "zeroRecords": "Nema rezultata pretrage",
                                   "info": "Stranica _PAGE_ od ukupno _PAGES_",    //OVIM DEFINISEMO SRPSKI JEZIK U DODATKU
                                   "infoEmpty": "Nema rezultata",
                                   "infoFiltered": "(od ukupno _MAX_ faktura)",    //OVA DVA PREVODA SU MORALA OVDE DA STOJE JER MORAJU BITI TU ODMAH ISPOD UCITAVANJA
                                   "search":         "Pronadji Fakt:",
                                   "paginate": {
                                               "first":      "Prva",
                                               "last":       "Poslednja",
                                               "next":       "Sledeca",
                                               "previous":   "Predhodna"
                                             },
                                         "loadingRecords": "Ucitavanje...",
                                         "loadingRecords": "Obrada..."
                                     },
                                     "pagingType": "full_numbers",  //POKAZUJE SVE BROJEVE PAGINACIJE
                                     "scrollY":        "350px", //SKROLOVANJE
                                     "scrollCollapse": true,
                                     "retrieve": true, //OVA LINIJA JE OBAVEZNA DA BIH MOGLO DA RADI POVRATAK SA PREGLEDA FAKTURE I PROMENA STATUSA U ISTO VREME NA POCETNU STRANU
                                     "paging":         true,
                                     "search": {
                                                  "search": ' ' //ovim definisemo da u polju search pri ucitavanju jedno prazno polje uneto da svaki sledeci klik trazi
                                                }    //trazi po tabeli po tom polju...OVO JE URADJENO ZBOG GOOGLE CHROMA I OSTALIH BRAUZERA KAD SE DEFINISE DA BRAUZER CUVA LOZINKU
                          });                     //I EMAIL...BRAUZER JE AUTOMACKI U TOM POLJU ISPISIVAO EMAIL ADRESU A DATATABLE JE VRSILO PRETRAGU PO EMAILU (koji ne postoji u tabeli)
                                                 //zato nije prikazivao nista OVO FAKTICKI NE DA BRAUZERU DA U TAJ INPUT ISPISE NESTO (email)
                     }
       else if(jezik == 'engleski'){
         $("#tabla").DataTable({      //OVIM DEFINISEMO DODATAK ZA TABELU
                              "language": {
                                  "lengthMenu": "Review _MENU_",
                                  "zeroRecords": "Nothing found - sorry",
                                  "info": "Showing page _PAGE_ of _PAGES_",    //OVIM DEFINISEMO ENGLESKI JEZIK U DODATKU
                                  "infoEmpty": "No records available",
                                  "infoFiltered": "(filtered from _MAX_ total invoice)",       //OVA DVA PREVODA SU MORALA OVDE DA STOJE JER MORAJU BITI TU ODMAH ISPOD UCITAVANJA
                                  "search":         "Search Invo:",
                                  "paginate": {
                                              "first":      "First",
                                              "last":       "Last",
                                              "next":       "Next",
                                              "previous":   "Previous"
                                            },
                                        "loadingRecords": "Load...",
                                        "loadingRecords": "Processing..."
                                    },
                                    "pagingType": "full_numbers",  //POKAZUJE SVE BROJEVE PAGINACIJE
                                    "scrollY":        "350px", //SKROLOVANJE
                                    "scrollCollapse": true,
                                    "retrieve": true, //OVA LINIJA JE OBAVEZNA DA BIH MOGLO DA RADI POVRATAK SA PREGLEDA FAKTURE I PROMENA STATUSA U ISTO VREME NA POCETNU STRANU
                                    "paging":         true,
                                    "search": {
                                                 "search": " "
                                               }

                         });
       }

  })
}




//ZA SADA RADI ALI BAGUJE PRI MNOGO UBRZANIH KOMANDI
// $(document).ready(function timer(){ //KAD UCITAMO STRANICU
//    var interval;
// interval = setInterval(function(){  //KRECE TAJMER DA BROJI  I AKO NEMA AKTIVNOSTI 10 SEKUNDI
//   window.location.href = 'php/pocetna_php/logout.php';   //SALJE NA BRISAJE SESIJE I NA POCETNU STRANICU
// }, 120000);
//
// $(document).on('keydown', function(e) {  //SVAKIM KLIKOM ILI PRITISKOM NA TASTATURU NA POCETNOJ STRANICI
//
//           clearInterval(interval);  //RESETUJEMO TAJMER
//           timer();   //I POCINJE DA BROJI OD POCETKA
//      })
// });
//ZA SADA RADI ALI BAGUJE PRI MNOGO UBRZANIH KOMANDI

function obrisi_nedefinisane_fakture() //u slucaju da je korisnik poceo da pravi fakturu i nije je zavrsio nego je zatvorio brauzer ona je sacuvana u bazi
{                                      //a ova funkcija odmah brise takve ne dovrsene fakture da kasnije ne bih bio problem sa dodeljivanjem broja fakturi jer ako ostane polje prazno uve krece od broja jedan
  var verifikacija_obrisi_nedefinisane_fakture = "verifikacija_obrisi_nedefinisane_fakture";   //ovako ih odmah obrisemo i mirna Backa :)

  $.post("php/pocetna_php/handler_pocetna.php",{
    verifikacija_obrisi_nedefinisane_fakture:verifikacija_obrisi_nedefinisane_fakture
  },function(data,status){

  })
}


function stampaj(id_fakture)
{
   var verifikacija_stampanje = "verifikacija_stampanje";
    $.post("php/pocetna_php/handler_pocetna.php",{
      id_fakture:id_fakture,
      verifikacija_stampanje:verifikacija_stampanje
    },function(data,status){

          var rezultat1 = "";
          var data = jQuery.parseJSON(data);

          for(var i=0; i<data.length;i++)
          {
            rezultat1+='<tr><td>'+data[i][1]+'</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'</td><td>'+data[i][6]+'</td><td>'+data[i][7]+'</td><td>'+data[i][8]+'</td><td>'+data[i][9]+'</td></tr>';
          };
          $("#tabla_za_stampanje tbody").html(rezultat1);   //ISPISUJEMO REZULTATE IZ TABELE

                 var verifikacija_stampanje_osnovni_podaci = "verifikacija_stampanje_osnovni_podaci";
                      $.post("php/pocetna_php/handler_pocetna.php",{
                        id_fakture:id_fakture,
                        verifikacija_stampanje_osnovni_podaci:verifikacija_stampanje_osnovni_podaci,
                      },function(data,status){


                        var rezultat2 = "";
                        var data = jQuery.parseJSON(data);

                        for(var i=0; i<data.length;i++)
                        {
                          if(data[i][1] == "")
                          {

                            if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
                             {
                               var fizicko_lice = "Fizicko lice";  //AKO PIB NIJE DEFINISAN ISPISACE DA JE REC O FIZICKOM LICU KADA SE SAMO POGLEDA FAKTURA
                               rezultat2 +='<div id="podaci_kupca_gornji_deo"><div id="div_pasus_naslov"><h3 id="pasus_naslov">'+data[i][0]+'</h3></div><div id="div_pasus_email"><strong id="pasus_email">'+data[i][4]+'</strong></div></div><div id="podaci_kupca_donji_deo"><div id="div_pasus_pib"><p id="pasus_pib"><b>Pib:&nbsp;'+fizicko_lice+'</b></p></div><div id="div_pasus_datum"><p id="pasus_datum"><b>Datum:&nbsp;'+data[i][2]+'</b></p></div><div id="div_pasus_lokacija"><p id="pasus_lokacija"><b>Objekat:&nbsp;'+data[i][3]+'</b></p></div></div>';
                              }
                             else if(jezik == 'engleski')
                             {
                               individual = "Individual";  //AKO PIB NIJE DEFINISAN ISPISACE DA JE REC O FIZICKOM LICU KADA SE SAMO POGLEDA FAKTURA
                               rezultat2 +='<div id="podaci_kupca_gornji_deo"><div id="div_pasus_naslov"><h3 id="pasus_naslov">'+data[i][0]+'</h3></div><div id="div_pasus_email"><strong id="pasus_email">'+data[i][4]+'</strong></div></div><div id="podaci_kupca_donji_deo"><div id="div_pasus_pib"><p id="pasus_pib"><b>Pib:&nbsp;'+individual+'</b></p></div><div id="div_pasus_datum"><p id="pasus_datum"><b>Date:&nbsp;'+data[i][2]+'</b></p></div><div id="div_pasus_lokacija"><p id="pasus_lokacija"><b>Citi:&nbsp;'+data[i][3]+'</b></p></div></div>';
                              }

                          }
                          else{
                            if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
                            {
                              rezultat2 +='<div id="podaci_kupca_gornji_deo"><div id="div_pasus_naslov"><h3 id="pasus_naslov">'+data[i][0]+'</h3></div><div id="div_pasus_email"><strong id="pasus_email">'+data[i][4]+'</strong></div></div><div id="podaci_kupca_donji_deo"><div id="div_pasus_pib"><p id="pasus_pib"><b>Pib:&nbsp;'+data[i][1]+'</b></p></div><div id="div_pasus_datum"><p id="pasus_datum"><b>Datum:&nbsp;'+data[i][2]+'</b></p></div><div id="div_pasus_lokacija"><p id="pasus_lokacija"><b>Objekat:&nbsp;'+data[i][3]+'</b></p></div></div>';
                              }
                            else if(jezik == 'engleski')
                            {
                              rezultat2 +='<div id="podaci_kupca_gornji_deo"><div id="div_pasus_naslov"><h3 id="pasus_naslov">'+data[i][0]+'</h3></div><div id="div_pasus_email"><strong id="pasus_email">'+data[i][4]+'</strong></div></div><div id="podaci_kupca_donji_deo"><div id="div_pasus_pib"><p id="pasus_pib"><b>Pib:&nbsp;'+data[i][1]+'</b></p></div><div id="div_pasus_datum"><p id="pasus_datum"><b>Date:&nbsp;'+data[i][2]+'</b></p></div><div id="div_pasus_lokacija"><p id="pasus_lokacija"><b>Citi:&nbsp;'+data[i][3]+'</b></p></div></div>';
                              }
                      }



                        if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
                         {
                         ispis_o_broju_fakture = '<b>FAKTURA:&nbsp;&nbsp;'+data[i][6]+'&nbsp;/&nbsp;'+data[i][7]+'</b>';
                         }
                         else if(jezik == 'engleski')
                         {
                           ispis_o_broju_fakture = '<b>INVOICE:&nbsp;&nbsp;'+data[i][6]+'&nbsp;/&nbsp;'+data[i][7]+'</b>';  //ispis godine i broja fakture
                         }
                        };






                          $("#broj_fakture").html(ispis_o_broju_fakture);  //ispis godine i broja fakture





                        $("#podaci_kupca").html(rezultat2); //  ZATIM ISPISUJEMO REZULTATE OSNOVNE O PARTNERU
                        $("#nav").css("display","none");      //ZATIM SKLANJAMO DUGMICE PRE STAMPANJA
                        $("#forma_za_slanje_emaila").css("display","none");

                                   $("#dole").print(/*{append : "<span><br/>&copy;Izrada sajtova i aplikacija Filip 069/709-284</span>"}*/); //POMOCU OVOG STAMPAMO
                              //     $("#dole").css("display","none");    //ZATIM SKLANJAMO  FAKTURU
                              //     $("#gore").css("display","block");   //I VRACAMO POCETNU STRANICU
                                   $("#nav").css("display","block");   //I VRACAMO DUGMICE
                                   $("#css_za_menjanje").attr("href","css/fakture/osnovni_prikaz_fakture.css"); //POSLE STAMPANJA VRACAMO PRVOBITNI CSS

                      });
         });
};




function otvori(id_fakture)
{


$("#ceo_div_na_stanici_prikaz_klijenta").css("display","none");
$("#predracun_naslov").css("display","none");
$(".potpisi").css("display","block");              //ova dva reda definisu da uvek prikazuje kao fakturu....to kasnije menjamo u prikazi kao fakturu/predracun


novi_id = id_fakture;
  $('#select_placeno-nije_placeno').val($(this).find('option:first').val());  //ovo definise da select uvek pri otvaranju fakture prikazuje prvu opciju selektovanu tj skrivenu
  broj_fakture = id_fakture;  //jedinstveni broj bas otvorene izabrane fakture .... ova variabla nam treba za promenu statusa placeno/ne placeno bas toj fakturi

var verifikacija_stampanje = "verifikacija_stampanje";
  $.post("php/pocetna_php/handler_pocetna.php",{
      id_fakture:id_fakture,            //NA OSNOVU GLOBALNE id_fakture UZIMAMO SVE IZ BAZE I STAVLJAMO PRVO REDOVE KOOLONE
      verifikacija_stampanje:verifikacija_stampanje,
  },function(data,status){
    $("#gore").css("display","none");     //PROMENIMO STRANICU KOJA SE VIDI
      $("#dole").css("display","block");            //stranica prikaz fakture
      $("body").css("background-color","lightgray");   //promena pozadine na novoj stranici tj na stranici gde se vidi faktura
      $("#papir").css("background-color","white");     //sama faktura ima belu pozadinu

   var rezultat1 = "";
    var rezultat2 = "";
    var data = jQuery.parseJSON(data);

    for(var i=0; i<data.length;i++)
    {

      rezultat2+='<tr><td>'+data[i][1]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'</td><td>'+data[i][6]+'</td><td>'+data[i][7]+'</td><td>'+data[i][8]+'</td><td>'+data[i][9]+'</td></tr>';
    };

    // $("#gore").css("display","none");     //PROMENIMO STRANICU KOJA SE VIDI
    // $("#dole").css("display","block");

      if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined") //PVDE FORMIRAMO SVE DUGMICE KAD OTVORIMO FAKTURU
      {
      $("#dugme_posalji_email").html('<input type="button" id="posalji_fakturu_emailom" onClick="posalji_fakturu_emailom('+id_fakture+')" class="btn btn-danger" value="Posalji">');
      $("#navic").html('<button class="btn btn-danger btn-sm" id="dugme_stampaj" onClick="stampaj('+id_fakture+')">Stampaj</button><button class="btn btn-danger btn-sm" onClick="prikazi_kao_predracun()" id="prikazi_kao_predracun">Prikazi kao predracun</button><button class="btn btn-danger btn-sm" id="posalji_emailom_fakturu" onClick="posalji_emailom_fakturu('+id_fakture+')">Posalji emailom</button>');
      }
      else if(jezik == 'engleski')
      {
        $("#dugme_posalji_email").html('<input type="button" id="posalji_fakturu_emailom" onClick="posalji_fakturu_emailom('+id_fakture+')" class="btn btn-danger" value="Send">');
      $("#navic").html('<button class="btn btn-danger btn-sm" id="dugme_stampaj" onClick="stampaj('+id_fakture+')">Print</button><button class="btn btn-danger btn-sm" onClick="prikazi_kao_predracun()" id="prikazi_kao_predracun">View as a pro forma invoice</button><button class="btn btn-danger btn-sm" id="posalji_emailom_fakturu" onClick="posalji_emailom_fakturu('+id_fakture+')">Send an email</button>');
      }




    $("#tabla_za_stampanje tbody").html(rezultat2);  //ISPISUJEMO REZULTATE IZ BAZE
    // $('#tabla_za_stampanje').DataTable( {
    //   "processing": true,
    //   "serverSide": true,
    //
    //     "ajax":{
    //       "url": "php/edit.php",
    //       "type": "POST",
    //       },
    //       "columns": [
    //           { "data": "RB" },
    //           { "data": "sifra" },
    //           { "data": "naziv_artikla" },
    //           { "data": "jedinica_mere" },
    //           { "data": "kolicina" },
    //           { "data": "cena_bez_pdv" },
    //           { "data": "rabat" },
    //           { "data": "pdv" },
    //           { "data": "iznos_pdv" },
    //           { "data": "ukupna_vrednost" }
    //       ]
    // } );





    // function days_of_a_year(year)
    // {
    //
    //   return isLeapYear(year) ? 366 : 365;
    // }
    //
    // function isLeapYear(year) {
    //      return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    // }
    //
    // console.log(days_of_a_year(2019));
    // console.log(days_of_a_year(2020));





 });

              var verifikacija_stampanje_osnovni_podaci = "verifikacija_stampanje_osnovni_podaci";
                $.post("php/pocetna_php/handler_pocetna.php",{   //ZATIM IDEMO PO LICNE PODATKE VEZANE ZA IME FIRME
                  id_fakture:id_fakture,
                  verifikacija_stampanje_osnovni_podaci:verifikacija_stampanje_osnovni_podaci,
                },function(data,status){


                  var rezultat3 = "";
                  var data = jQuery.parseJSON(data);

                  for(var i=0; i<data.length;i++)
                  {
                    var samo_email_za_prikaz_kome_saljemo = data[i][4];
                    if(data[i][1] == "")
                    {
                              if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
                               {
                                 var fizicko_lice = "Fizicko lice";  //AKO PIB NIJE DEFINISAN ISPISACE DA JE REC O FIZICKOM LICU KADA SE SAMO POGLEDA FAKTURA
                                 rezultat3 +='<div id="podaci_kupca_gornji_deo"><div id="div_pasus_naslov"><h3 id="pasus_naslov">'+data[i][0]+'</h3></div><div id="div_pasus_email"><strong id="pasus_email">'+data[i][4]+'</strong></div></div><div id="podaci_kupca_donji_deo"><div id="div_pasus_pib"><p id="pasus_pib"><b>Pib:&nbsp;'+fizicko_lice+'</b></p></div><div id="div_pasus_datum"><p id="pasus_datum"><b>Datum:&nbsp;'+data[i][2]+'</b></p></div><div id="div_pasus_lokacija"><pid="pasus_lokacija"><b>Objekat:&nbsp;'+data[i][3]+'</b></p></div></div>';
                                }
                               else if(jezik == 'engleski')
                               {
                                 individual = "Individual";  //AKO PIB NIJE DEFINISAN ISPISACE DA JE REC O FIZICKOM LICU KADA SE SAMO POGLEDA FAKTURA
                                 rezultat3 +='<div id="podaci_kupca_gornji_deo"><div id="div_pasus_naslov"><h3 id="pasus_naslov">'+data[i][0]+'</h3></div><div id="div_pasus_email"><strong id="pasus_email">'+data[i][4]+'</strong></div></div><div id="podaci_kupca_donji_deo"><div id="div_pasus_pib"><p id="pasus_pib"><b>Pib:&nbsp;'+individual+'</b></p></div><div id="div_pasus_datum"><p id="pasus_datum"><b>Date:&nbsp;'+data[i][2]+'</b></p></div><div id="div_pasus_lokacija"><p id="pasus_lokacija"><b>Citi:&nbsp;'+data[i][3]+'</b></p></div></div>';
                                }
}
else{

                              if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
                              {
                                rezultat3 +='<div id="podaci_kupca_gornji_deo"><div id="div_pasus_naslov"><h3 id="pasus_naslov">'+data[i][0]+'</h3></div><div id="div_pasus_email"><strong id="pasus_email">'+data[i][4]+'</strong></div></div><div id="podaci_kupca_donji_deo"><div id="div_pasus_pib"><p id="pasus_pib"><b>Pib:&nbsp;'+data[i][1]+'</b></p></div><div id="div_pasus_datum"><p id="pasus_datum"><b>Datum:&nbsp;'+data[i][2]+'</b></p></div><div id="div_pasus_lokacija"><p id="pasus_lokacija"><b>Objekat:&nbsp;'+data[i][3]+'</b></p></div></div>';
                                }
                              else if(jezik == 'engleski')
                              {
                                rezultat3 +='<div id="podaci_kupca_gornji_deo"><div id="div_pasus_naslov"><h3 id="pasus_naslov">'+data[i][0]+'</h3></div><div id="div_pasus_email"><strong id="pasus_email">'+data[i][4]+'</strong></div></div><div id="podaci_kupca_donji_deo"><div id="div_pasus_pib"><p id="pasus_pib"><b>Pib:&nbsp;'+data[i][1]+'</b></p></div><div id="div_pasus_datum"><p id="pasus_datum"><b>Date:&nbsp;'+data[i][2]+'</b></p></div><div id="div_pasus_lokacija"><p id="pasus_lokacija"><b>Citi:&nbsp;'+data[i][3]+'</b></p></div></div>';
                                }
                    }




                                  if(data[i][5] == "Nije placena")
                                  {
                                              $("#select_placeno-nije_placeno").css("display","inline-block");
                                              $("#promeni_status_text").css("display","inline-block");

                                                            if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
                                                            {
                                                              trenutni_status_o_izmirenosti_fakture = "Nije placena";       //ako je rezultat iz baze da nije placena onda to prikazuje i
                                                              $('#select_placeno-nije_placeno').prop('disabled', false);     //prikazuje select kao normalan...za dalji odabir    placena/ne placena/storno
                                                            }
                                                            else if(jezik == 'engleski')
                                                            {
                                                              trenutni_status_o_izmirenosti_fakture = "Not paid";
                                                              $('#select_placeno-nije_placeno').prop('disabled', false);
                                                            }
                                  }
                                  else if(data[i][5] == "Placena")
                                  {
                                              $("#promeni_status_text").css("display","none");
                                              $("#select_placeno-nije_placeno").css("display","none");
                                                if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
                                                            {
                                                              trenutni_status_o_izmirenosti_fakture = "<abbr style='text-decoration: none;' title='Ovaj status nije moguce promeniti'>Placena</abbr>";        //a ako je status placena onda to prikazuje i
                                                            }
                                                            else if(jezik == 'engleski')
                                                            {
                                                              trenutni_status_o_izmirenosti_fakture = "<abbr style='text-decoration: none;' title='This status can not be changed'>Paid</abbr>";
                                                            }
                                   }
                                  else if(data[i][5] == "Storno")
                                  {
                                              $("#select_placeno-nije_placeno").css("display","inline-block");
                                              $("#promeni_status_text").css("display","inline-block");

                                                            if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
                                                            {
                                                              trenutni_status_o_izmirenosti_fakture = "Storno";        //a ako je status storno onda to prikazuje i
                                                              $('#select_placeno-nije_placeno').prop('disabled', false);   //prikazuje select kao normalan...za dalji odabir    placena/ne placena/storno
                                                            }
                                                            else if(jezik == 'engleski')
                                                            {
                                                              trenutni_status_o_izmirenosti_fakture = "Cancellation";
                                                              $('#select_placeno-nije_placeno').prop('disabled', false);
                                                            }
                                  }




                 if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
                 {
                      ispis_o_broju_fakture = '<b>FAKTURA:&nbsp;&nbsp;'+data[i][6]+'&nbsp;/&nbsp;'+data[i][7]+'</b>';
                 }
                 else if(jezik == 'engleski')
                 {
                     ispis_o_broju_fakture = '<b>INVOICE:&nbsp;&nbsp;'+data[i][6]+'&nbsp;/&nbsp;'+data[i][7]+'</b>';  //ispis godine i broja fakture
                 }

                 if(data[i][8] == "RSD")
                 {
                   $("#valuta").html(data[i][8]);
                 }
                 else if(data[i][8] == "EUR")
                 {
                   $("#valuta").html(data[i][8]);
                 }

                };        //ISPISUJEMO LICEN PODATKE I FORMIRAMO DUGME ZA NAZAD
                  $("#broj_fakture").html(ispis_o_broju_fakture);  //ispis godine i broja fakture
                  $("#ime_primaoca_emaila").val(samo_email_za_prikaz_kome_saljemo);
                  $("#podaci_kupca").html(rezultat3);
                  $("#ispis_o_trenutnom_statusu").html(trenutni_status_o_izmirenosti_fakture);


                                                    });



                              var verifikacija_footer_zbir_cifara = "verifikacija_footer_zbir_cifara";
                         //ovako je bilo lakse pokupimo vednost globalne variable i prosledimo je  posto php ocekuje (noviappend
                              $.post("php/pocetna_php/handler_pocetna.php",{  //OVIM SABIRAMO UKUPAN PDV,UKUPNU VREDNOST I CENU OSNOVNU I TO PRIKAZUJEMO U FOOTERU
                                    novi_id:novi_id,  //OVDE OPET KORISTIMO GLOBALNU VARIABLU NAPRAVLJENU PRILIKOM UNOSENJA OSNOVNIH PODATAKA
                                    verifikacija_footer_zbir_cifara:verifikacija_footer_zbir_cifara,
                                    },function(data,status){

                                     var data = jQuery.parseJSON(data);
                                    $("#ukupne_cifre").css("display","block");

                                    var data1 = data[0];
                                    var data1 = parseFloat(Math.round(data1 * 100) / 100).toFixed(2);
                                    $("#ukupaa_cena_bez_pdv").html(data1);
                           //u ovom slucaju pri stampanju i samo jednom prikazu ide append() a na stranici unos_faktura mora html()posto je dinamicno

                                    var data2 = data[1];
                                    var data2 = parseFloat(Math.round(data2 * 100) / 100).toFixed(2);
                                    $("#ukupan_iznos_pdv").html(data2);


                                    var data3 = data[2];
                                    var data3 = parseFloat(Math.round(data3 * 100) / 100).toFixed(2);
                                    $("#ukupna_ukupna_vrednost").html(data3);
                                    $("#za_placanje").html(data3);


                                    var data4 = data[3];
                                    var data4 = parseFloat(Math.round(data4 * 100) / 100).toFixed(2);
                                    $("#ukupan_rabat").html(data4);
                                });



         $("#dugme_za_slanje_poruke_podrsci").css("display","none");
         $("#poruka_adminu").css("display","none");
         $("#dugme_za_povratak_na_vrh").css("display","none");
        // $("#dugme_za_povratak_na_vrh").css({
        //   position: "relative",
        //   top: "40px"
        // });
        // $("#dugme_za_slanje_poruke_podrsci").css({
        //   position: "relative",
        //   top: "-0px"
        // });



  };


prikaz_kao_faktura_ili_kao_predracun = "faktura";
//kreiramo globalnu variablu koja je po u startu faktura kao i prikaz odmah kad otvorimo fakturu
//a klikom na dugme PRIKAZI KAO PREDRACUN/PRIKAZI KAO FAKTURA  nju menjamo pre prosledjivanja stranici za slanje emaila



function prikazi_kao_predracun(){
        prikaz_kao_faktura_ili_kao_predracun = "predracun";
        $("#predracun_naslov").css("display","block");
        $(".potpisi").css("display","none");
        if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
        {
          $("#css_za_menjanje").attr("href","css/fakture/css_predracun.css");
          $("#oznaka_dokumenta").html("<b>PREDRACUN</b>");
          $("#prikazi_kao_predracun").html("Prikazi kao faktura").attr("onclick","prikazi_kao_racun()");  //PRIKAZ PREDRACUNA
        }
        else if(jezik == 'engleski')
        {
          $("#css_za_menjanje").attr("href","css/fakture/css_predracun.css");
          $("#oznaka_dokumenta").html("<b>ESTIMATE</b>");
          $("#prikazi_kao_predracun").html("Views as an invoice").attr("onclick","prikazi_kao_racun()");  //PRIKAZ PREDRACUNA
        }
}
function prikazi_kao_racun(){
        prikaz_kao_faktura_ili_kao_predracun = "faktura";
        $("#predracun_naslov").css("display","none");
        $(".potpisi").css("display","block");
        if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
        {
          $("#css_za_menjanje").attr("href","css/fakture/osnovni_prikaz_fakture.css");
          $("#oznaka_dokumenta").html("<b>FAKTURA</b>");
          $("#prikazi_kao_predracun").html("Prikazi kao predracun").attr("onclick","prikazi_kao_predracun()");  //PRIKAZ FAKTURE
        }
        else if(jezik == 'engleski')
        {
          $("#css_za_menjanje").attr("href","css/fakture/osnovni_prikaz_fakture.css");
          $("#oznaka_dokumenta").html("<b>INVOICE</b>");
          $("#prikazi_kao_predracun").html("View as a pro forma invoice").attr("onclick","prikazi_kao_predracun()");  //PRIKAZ FAKTURE
        }
}







function posalji_emailom_fakturu(id_fakture)
{
   $('#forma_za_slanje_emaila').slideToggle('fast');  //ovo otvara bocni div za slanje emaila
};

function posalji_fakturu_emailom(id_fakture){
  if($("#ime_firme_na_pocetnoj").html() == "Ime firme TESTIRANJE"){
    if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
    swal({
              title: 'Nije moguce slati email prilikom koriscenja DEMO verzije!!',
              icon: "error",              //ALERT BOX
              timer: 2000,
              buttons: false,
              closeOnClickOutside: false,
          });
          return;
        }
     else if(jezik == 'engleski'){
       swal({
                 title: 'It is not possible to send email when using DEMO version!!',
                 icon: "error",              //ALERT BOX
                 timer: 2000,
                 buttons: false,
                 closeOnClickOutside: false,
             });
             return;
     }
    return;
  }


    var ime_primaoca_emaila = $("#ime_primaoca_emaila").val();
    var naslov_emaila = $("#naslov_emaila").val();
    var poruka_emaila = $("#textarea_emaila").val();
    var ime_primaoca_emaila = $("#ime_primaoca_emaila").val();

      $.get("prikaz-stampanje-fakture.php",{
        id_fakture:id_fakture,
        jezik:jezik,
        naslov_emaila:naslov_emaila,
        poruka_emaila:poruka_emaila,
        ime_primaoca_emaila:ime_primaoca_emaila,
        prikaz_kao_faktura_ili_kao_predracun:prikaz_kao_faktura_ili_kao_predracun,
      },function(data,status){
           var data = jQuery.parseJSON(data);
           if(data == "uspesno poslat email"){

               if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
               {
                 $("#informacija_o_statusu_slanja_emaila").html('<p id="obavestenje_o_slanju_emaila" class="alert alert-success">Email je uspesno poslat!</p>').css('display', 'block');
                 setTimeout(function(){ $("#informacija_o_statusu_slanja_emaila").css('display', 'none'); }, 3500);
               }
               else if(jezik == 'engleski')
               {
                 $("#informacija_o_statusu_slanja_emaila").html('<p id="obavestenje_o_slanju_emaila" class="alert alert-success">Email has been successfully sent!</p>').css('display', 'block');
                 setTimeout(function(){ $("#informacija_o_statusu_slanja_emaila").css('display', 'none'); }, 3500);
               }

           }
           else if(data == "Nije poslat email"){

              if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
              {
                $("#informacija_o_statusu_slanja_emaila").html('<p id="obavestenje_o_slanju_emaila" class="alert alert-danger">Greska prilikom slanje Emaila!</p>').css('display', 'block');
                setTimeout(function(){ $("#informacija_o_statusu_slanja_emaila").css('display', 'none'); }, 3500);
              }
              else if(jezik == 'engleski')
              {
                $("#informacija_o_statusu_slanja_emaila").html('<p id="obavestenje_o_slanju_emaila" class="alert alert-danger"">Error when sending email!</p>').css('display', 'block');
                setTimeout(function(){ $("#informacija_o_statusu_slanja_emaila").css('display', 'none'); }, 3500);
              }


           }
      })

}



  function obrisi(id_fakture)
  {
    var verifikacija_obrisi_fakturu = "verifikacija_obrisi_fakturu";
     $.post("php/pocetna_php/handler_pocetna.php",{
         id_fakture:id_fakture,
         verifikacija_obrisi_fakturu:verifikacija_obrisi_fakturu,
     },function(data,status){


      if(provera_sa_koje_stranice_je_faktura_otvorena_sa_glavne_ili_sa_prikaz_klijenta == 'stranica_gore')
      {
        prikaz_svih_faktura_na_pocetnoj_strani();
      }
      else if(provera_sa_koje_stranice_je_faktura_otvorena_sa_glavne_ili_sa_prikaz_klijenta == 'stranica_prikaz_klijenta')
      {
        ispis_u_tabeli_o_izabranom_klijentu();
      }

        //ovo azurira podatke u tabeli pri korisnikovim fakturama
         //ova funkcija da bih ovde radila morala je biti kreirana van $(document).ready() funkcije
});    //pa je onda kao takvu mozemo pozivati ovde i u okviru $(document).ready()    na pocetku ucitavanje    OVO VAZI ZA SVE FUNKCIJE...DA TREBAJU VAN
             //BITI NAPRAVLJENE PA SAMO POZIVANE
  };
function on_off(id, thiss)
{
  var vrednost_selekta = thiss.value;  //OVO JE VREDNOS IZABRANOG SELEKTA
  var verifikacija_on_off = "verifikacija_on_off";
  $.post("php/pocetna_php/handler_pocetna.php",{
      verifikacija_on_off:verifikacija_on_off,
      vrednost_selekta:vrednost_selekta,
      id:id
  },function(data,status){
      // var data = jQuery.parseJSON(data);
      // swal({
      //           title: data,
      //           icon: "success",              //ALERT BOX
      //           timer: 2000,
      //           buttons: false,
      //           closeOnClickOutside: false,
      //       });
            za_kontrolu();
            return;

   });
}

function dodati_vreme_koriscenja(id, vrednost)
{
  if(confirm("Ovu funkciju nije moguce ponistiti!!") == true)
  {
  var vrednost_selekta = vrednost.value;  //OVO JE VREDNOS IZABRANOG SELEKTA
  var verifikacija_dodati_vreme_koriscenja = "verifikacija_dodati_vreme_koriscenja";
  $.post("php/pocetna_php/handler_pocetna.php",{
      verifikacija_dodati_vreme_koriscenja:verifikacija_dodati_vreme_koriscenja,
      vrednost_selekta:vrednost_selekta,
      id:id
  },function(data,status){
          var data = jQuery.parseJSON(data);
          swal({
                    title: data,
                    icon: "success",              //ALERT BOX
                    timer: 3500,
                    buttons: false,
                    closeOnClickOutside: false,
                });
            za_kontrolu();
            return;

   });
 }
}

function za_kontrolu()  //ispis rezultata u tabeli
{
        var verifikacija_kontrola = "verifikacija_kontrola";
        $.post("php/pocetna_php/handler_pocetna.php",{
            verifikacija_kontrola:verifikacija_kontrola,
        },function(data,status){

          var rezultat = "";
           var data = jQuery.parseJSON(data);

           for(var i=0; i<data.length;i++){
              if(data[i][6] == 0)   //ako je rezultat 0 onda prikazujemo varijantu za sve ukljucene kao zelene
              {                                                                                                                                                                                                                                                                                                                                                                    //UZIMAMO DVA PARAMETRA ZA PROSLEDITI PRVI JE ID KORISNIKA A DRUGI JE IZBOR U SELEKTU
                rezultat +=
                '<tr>'+
                      '<td style="background-color:green;">'+data[i][0]+'</td>'+
                      '<td style="background-color:green;">'+data[i][1]+'</td>'+
                      '<td style="background-color:green;">'+data[i][2]+'</td>'+
                      '<td style="background-color:green;">'+data[i][3]+'</td>'+
                      '<td style="background-color:green;">'+data[i][4]+'</td>'+
                      '<td style="background-color:green;">'+data[i][5]+'</td>'+
                      '<td style="background-color:green;">'+
                          '<select id="dodati_vreme_koriscenja" onchange="dodati_vreme_koriscenja('+data[i][7]+',this);">'+
                          '<option disabled hidden selected>Dodati</option>'+
                          '<option value="1_mesec">1 mesec</option>'+
                          '<option value="3_meseca">3 mesec</option>'+
                          '<option value="6_meseci">6 mesec</option>'+
                          '<option value="1_godina">1 godina</option>'+
                          '</select>'+
                      '</td>'+
                      '<td style="background-color:green;">'+
                          '<select id="on_off" onchange="on_off('+data[i][7]+',this);">'+
                              '<option disabled hidden selected>ON/OFF</option>'+
                              '<option value="0" disabled>Ukljuci</option>'+
                              '<option value="1">Iskljuci</option>'+
                          '</select>'+
                      '</td>'+
                '</tr>';
              }
              else if(data[i][6] == 1)    //ako je rezultat 1 onda prikazujemo varijantu za sve ukljucene kao crvene
              {  //UZIMAMO DVA PARAMETRA ZA PROSLEDITI PRVI JE ID KORISNIKA A DRUGI JE IZBOR U SELEKTU
                rezultat +=
                '<tr>'+
                      '<td style="background-color:red;">'+data[i][0]+'</td>'+
                      '<td style="background-color:red;">'+data[i][1]+'</td>'+
                      '<td style="background-color:red;">'+data[i][2]+'</td>'+
                      '<td style="background-color:red;">'+data[i][3]+'</td>'+
                      '<td style="background-color:red;">'+data[i][4]+'</td>'+
                      '<td style="background-color:red;">'+data[i][5]+'</td>'+
                      '<td style="background-color:red;">'+
                          '<select id="dodati_vreme_koriscenja" onchange="dodati_vreme_koriscenja('+data[i][7]+',this);">'+
                              '<option disabled hidden selected>Dodati</option>'+
                              '<option value="1_mesec">1 mesec</option>'+
                              '<option value="3_meseca">3 mesec</option>'+
                              '<option value="6_meseci">6 mesec</option>'+
                              '<option value="1_godina">1 godina</option>'+
                          '</select>'+
                      '</td>'+
                      '<td style="background-color:red;">'+
                          '<select id="on_off" onchange="on_off('+data[i][7]+',this);">'+
                              '<option disabled hidden selected>ON/OFF</option>'+
                              '<option value="0">Ukljuci</option>'+
                              '<option value="1" disabled>Iskljuci</option>'+
                          '</select>'+
                      '</td>'+
                '</tr>';
              }


              }
              $("#tabela_kon tbody").html(rezultat);
                  $("#tabela_kon").DataTable({      //OVIM DEFINISEMO DODATAK ZA TABELU
                                       "language": {
                                           "lengthMenu": "Prikazi _MENU_",
                                           "zeroRecords": "Nema rezultata pretrage",
                                           "info": "Stranica _PAGE_ od ukupno _PAGES_",
                                           "infoEmpty": "Nema rezultata",
                                           "infoFiltered": "(od ukupno _MAX_ faktura)",
                                           "search":         "Pronadji Korisnika:",
                                           "paginate": {
                                                       "first":      "Prva",
                                                       "last":       "Poslednja",
                                                       "next":       "Sledeca",
                                                       "previous":   "Predhodna"
                                                     },
                                                 "loadingRecords": "Ucitavanje...",
                                                 "loadingRecords": "Obrada..."
                                             },
                                             "order": [[ 3, "desc" ]],
                                             "pagingType": "full_numbers",
                                             "scrollY":        "350px",
                                             "scrollCollapse": true,
                                             "retrieve": true,
                                             "paging":         true,
                                             "search": {
                                                          "search": " "
                                                        }
                                  });

      });
}




$(document).on('click','#posalji_emailom_fakturu',function(){

 });              //OVAKO MOZEMO DA SE POZIVAMO NA KLIK DINAMICKIH STVORENIH DUGMICA
