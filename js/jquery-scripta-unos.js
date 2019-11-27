$(document).ready(function(){
  jezik = getUrlParameter('jezik');
  ime = getUrlParameter('ime');

//  promena_ekrana_rezolucije(); //odmah kad se ucita document proveri koja rezolucija ekrana je u pitanju i na osnovu nje prikazuje zum koji treba i fiksira ga

  // $(window).resize(function() {
  // promena_ekrana_rezolucije();  //ako neko koristi dva monitora ili iz nekog drugog razloga smanji rezoluciju resajzuje brauzer odmah pozivamu ovu funkciju za proveru na
  // });          //koliko je samnjio/povecao i po tome odredjujemo novi zum ovo je na svakoj stranici isto


if(typeof ime !== 'undefined')         //funkcija ako dolazimo sa stranice PRIKAZ KLIJENTA onda odmah sklanjamo modal i ispisujemo podatke u inpute o trazenom klijentu
  {
                $('#exampleModal').remove();  //prvo zatvaramo modal
                var verifikacija_select_popuna_podataka = "verifikacija_select_popuna_podataka";
               $.post("php/unos_php/handler_unos_podataka.php",{     //za izabrano ime uzimamo podatke
                     ime:ime,
                     verifikacija_select_popuna_podataka:verifikacija_select_popuna_podataka,
               },function(data,status){
                 var data = jQuery.parseJSON(data);


                 if(data[0][1] == "Fizicko lice" || data[0][1] == "Individual")
                 {
                   data[0][1] = "";
                 }
                 $("#ime_primaoca").val(data[0][0]);   //ako je izabrano neko ime automacki popunjava inpute sa njegovim ostalim podacima i danasnjim datumom
                 $("#partnerov_PIB").val(data[0][1]);
                 $("#objekat").val(data[0][2]);
                 $("#partnerov_Email").val(data[0][3]);
                 Date.prototype.toDateInputValue = (function() {
                                var local = new Date(this);
                                local.setMinutes(this.getMinutes() - this.getTimezoneOffset()); //OVO DEFINISE DANASNJI DATUM
                                return local.toJSON().slice(0,10);
                                  });
                 $("#datum").val(new Date().toDateInputValue()); //OVIM DANASNJI DATUM ISPISUJEMO U INPUT DATUM



          });
  }



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



   var verifikacija_prikaz_broja_i_statusa_za_broj_fakture = "verifikacija_prikaz_broja_i_statusa_za_broj_fakture";
    $.post("php/unos_php/handler_unos_podataka.php",{
      verifikacija_prikaz_broja_i_statusa_za_broj_fakture:verifikacija_prikaz_broja_i_statusa_za_broj_fakture,
      },function(data,status){
        var data = jQuery.parseJSON(data);
        for(var i=0; i<data.length;i++){
            redni_broj_fakture = data[i][0];   //ovde formiramo podatak o rednom broju fakture
            trenutna_godina_iz_baze = data[i][1];//ovde formiramo podatak o godini unetoj u bazi vezanoj za fakturu
       }
    });



      var verifikacija_prikaz_sacuvanih_korisnikovih_artikala = "verifikacija_prikaz_sacuvanih_korisnikovih_artikala";
    $.post("php/unos_php/handler_unos_podataka.php",{
      verifikacija_prikaz_sacuvanih_korisnikovih_artikala:verifikacija_prikaz_sacuvanih_korisnikovih_artikala,
        },function(data,status){
        var data = jQuery.parseJSON(data);
        var item = $('<datalist id="lista_artikala"></datalist>');        //ovde se odmah kreira  datalist-a za input naziv artikala
            for(var i in data){
          item.append("<option>"+ data[i][0] +"</option>");       //ovde se puni podacima unetim prilikom prethodnih koriscenja
        }

        item.appendTo('.container');  //posto se ona ne vidi lepimo je bilo gde u glavni div kontejner   a svakim novim upisom je dopunjavamo

     })

var verifikacija_prikaz_podataka_okorisniku_na_pocetnoj = "verifikacija_prikaz_podataka_okorisniku_na_pocetnoj";
     $.post("php/pocetna_php/handler_pocetna.php",{
    verifikacija_prikaz_podataka_okorisniku_na_pocetnoj:verifikacija_prikaz_podataka_okorisniku_na_pocetnoj,
     },function(data,status){
        var data = jQuery.parseJSON(data);
        $("#modal_prikaz_imena_firme").html(data[0][0]);
        $("#ime_firme_naslov_na_unos_faktura_stranici").html(data[0][0]);
        $("#title").html(data[0][0]);
     })
    $("#osnovni_podaci").click(function(){
          var ime_primaoca = $("#ime_primaoca").val();
          ime_primaoca = ime_primaoca.substr(0,1).toUpperCase()+ime_primaoca.substr(1); //AUTOMACKI DEFINISE DA JE PRVO SLOVO VELIKO (samo u slucaju da su sva mala)
          var partnerov_PIB = $("#partnerov_PIB").val();
          var datum = $("#datum").val();
          var lokacija = $("#objekat").val();
          lokacija = lokacija.substr(0,1).toUpperCase()+lokacija.substr(1); //AUTOMACKI DEFINISE DA JE PRVO SLOVO VELIKO (samo u slucaju da su sva mala)
          var dugme_osnovni_podaci = $("#osnovni_podaci").val();
          var email_klijenta = $("#partnerov_Email").val();
          var valuta = $("#select_odabira_valute").val();

          var verifikacija_unos_osnovnih_podataka_klijenata = "verifikacija_unos_osnovnih_podataka_klijenata";
            $.post("php/unos_php/handler_unos_podataka.php",{  //unos_osnovnih_podataka_klijenata
               ime_primaoca:ime_primaoca,
               partnerov_PIB:partnerov_PIB,
               datum:datum,
               lokacija:lokacija,
               dugme_osnovni_podaci:dugme_osnovni_podaci,
               email_klijenta:email_klijenta,
               valuta:valuta,
               verifikacija_unos_osnovnih_podataka_klijenata:verifikacija_unos_osnovnih_podataka_klijenata,
             },function(data,status){
               var data = jQuery.parseJSON(data);
              novi_id = data;

                           if(data == "Popunite osnovne podatke")
                           {
                             if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                             swal({
                                       title: 'Polja ime,lokacija i datum su obavezna!!',
                                       icon: "warning",              //ALERT BOX
                                       timer: 2000,
                                       buttons: false,
                                       closeOnClickOutside: false,
                                   });
                                   return;
                                 }
                              else if(jezik == 'engleski'){
                                swal({
                                          title: 'Fields name, location and date are required!!',
                                          icon: "warning",              //ALERT BOX
                                          timer: 2000,
                                          buttons: false,
                                          closeOnClickOutside: false,
                                      });
                                      return;
                              }
               }
               else if(data == "Nije broj")
               {
                 if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                       swal({
                                 title: 'TIN moze sadrzati samo brojeve i mora imati 9 cifara ili ostati ne popunjeno polje!!',
                                 icon: "warning",              //ALERT BOX
                                 timer: 2000,
                                 buttons: false,
                                 closeOnClickOutside: false,
                             });
                             return;
                     }
                  else if(jezik == 'engleski'){
                      swal({
                                title: 'TIN can contain only numbers and must be 9 digits or left blank the box !!',
                                icon: "warning",              //ALERT BOX
                                timer: 2000,
                                buttons: false,
                                closeOnClickOutside: false,
                            });
                            return;
                  }
               }
               else if(data == "Nepravilno unet email")
               {
                 if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                       swal({
                                 title: 'Nepravilno unet email!!',
                                 icon: "warning",              //ALERT BOX
                                 timer: 2000,
                                 buttons: false,
                                 closeOnClickOutside: false,
                             });
                             return;
                     }
                  else if(jezik == 'engleski'){
                      swal({
                                title: 'Incorrectly entered email!!',
                                icon: "warning",              //ALERT BOX
                                timer: 2000,
                                buttons: false,
                                closeOnClickOutside: false,
                            });
                            return;
                  }
               }

             else{
       $("#podaci_iz_fakture").css("display","block");
       $("#osnovni_podaci").attr('disabled','disabled');
       $("#ime_primaoca").attr('disabled','disabled');
       $("#partnerov_PIB").attr('disabled','disabled');
       $("#objekat").attr('disabled','disabled');
       $("#datum").attr('disabled','disabled');
       $("#firme").attr('disabled','disabled');
       $("#partnerov_Email").attr('disabled','disabled');
       $("#select_odabira_valute").attr('disabled','disabled');
       $('table#moja_tabela tr:last input[name=pdv]').attr('disabled','disabled');  //odmah zamrzava polje PDV cim aktivira inpute za unos podataka
       $('table#moja_tabela tr:last input[name=redni_broj]').attr('disabled','disabled');   //odmah zamrzava polje redni_broj cim aktivira inpute za unos podataka
     }
       });
       racunanje_na_klik_cena_bez_pdv();
       racunanje_na_klik_rabat();
    });



   $('table#moja_tabela').on('click','tr:last input[name=plus]',function(){    //ovo definise da svako dugme u poslednjem redu skroz desno,polje name=plus radi

    var ime_primaoca = $("#ime_primaoca").val();
    ime_primaoca = ime_primaoca.substr(0,1).toUpperCase()+ime_primaoca.substr(1); //AUTOMACKI DEFINISE DA JE PRVO SLOVO VELIKO (samo u slucaju da su sva mala)
    var redni_broj = $('table#moja_tabela tr:last input[name=redni_broj]').val();
    var naziv_artikla = $('table#moja_tabela tr:last input[name=naziv_artikla]').val();
    naziv_artikla = naziv_artikla.substr(0,1).toUpperCase()+naziv_artikla.substr(1); //AUTOMACKI DEFINISE DA JE PRVO SLOVO VELIKO (samo u slucaju da su sva mala)
    var jedinica_mere = $('table#moja_tabela tr:last input[name=jedinica_mere]').val();
    var kolicina = $('table#moja_tabela tr:last input[name=kolicina]').val();
    var cena_bez_pdv = $('table#moja_tabela tr:last input[name=cena_bez_pdv]').val();
    var rabat = $('table#moja_tabela tr:last input[name=rabat]').val();
    var pdv = $('table#moja_tabela tr:last input[name=pdv]').val();
    var plus = $('table#moja_tabela tr:last input[name=plus]').val();
    var provera_da_li_je_broj = new RegExp(/^\+?[0-9(),.-]+$/);

if(naziv_artikla == null || naziv_artikla == "" || jedinica_mere == null || jedinica_mere == "" || kolicina == null || kolicina == "" || cena_bez_pdv == null || cena_bez_pdv == "" )
            {
              if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                  swal({
                            title: 'Popuni sva polja za nastavak ~ (rabat - opciono)!!',
                            icon: "warning",              //ALERT BOX
                            timer: 2000,
                            buttons: false,
                            closeOnClickOutside: false,
                        });
                  }
               else if(jezik == 'engleski'){
                 swal({
                           title: 'Fill all fields to continue ~ (rabat - optional)!!',
                           icon: "warning",              //ALERT BOX
                           timer: 2000,
                           buttons: false,
                           closeOnClickOutside: false,
                       });
               }
            }
else if(!kolicina.match(provera_da_li_je_broj))
{
            if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
              swal({
                        title: 'Polje KOLICINA mora biti popunjeno brojevima!!',
                        icon: "warning",              //ALERT BOX
                        timer: 2000,
                        buttons: false,
                        closeOnClickOutside: false,
            });
          }
          else if(jezik == 'engleski'){
            swal({
                      title: 'AMOUNT field must be filled with numbers !!',
                      icon: "warning",              //ALERT BOX
                      timer: 2000,
                      buttons: false,
                      closeOnClickOutside: false,
          });
          }
}
else if(!cena_bez_pdv.match(provera_da_li_je_broj))
{
          if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
              swal({
                        title: 'Polje CENA BEZ PDV-a mora biti popunjeno brojevima!!',
                        icon: "warning",              //ALERT BOX
                        timer: 2000,
                        buttons: false,
                        closeOnClickOutside: false,
            });
          }
          else if(jezik == 'engleski'){
            swal({
                      title: 'Field PRICE WITHOUT PDV must be filled with numbers !!',
                      icon: "warning",              //ALERT BOX
                      timer: 2000,
                      buttons: false,
                      closeOnClickOutside: false,
          });
          }
}
else if(!rabat.match(provera_da_li_je_broj) && rabat != "")
{
          if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
              swal({
                        title: 'Polje RABAT mora biti popunjeno brojevima ili ostati ne popunjeno!!',
                        icon: "warning",              //ALERT BOX
                        timer: 3000,
                        buttons: false,
                        closeOnClickOutside: false,
            });
          }
          else if(jezik == 'engleski'){
              swal({
                        title: 'RABAT field must be filled with numbers in or left blank !!',
                        icon: "warning",              //ALERT BOX
                        timer: 3000,
                        buttons: false,
                        closeOnClickOutside: false,
            });
          }
}
else{

var verifikacija_racunanje = "verifikacija_racunanje";
$.post("php/unos_php/handler_unos_podataka.php",{
             novi_id:novi_id, //OVO JE GLOBALNA VARIABLA NAPRAVLJENA U PREDHODNOJ FUNKCIJI
             redni_broj:redni_broj,
             naziv_artikla:naziv_artikla,
             jedinica_mere:jedinica_mere,
             kolicina:kolicina,
             cena_bez_pdv:cena_bez_pdv,    //KAD ZAVRSIMO OVO UNOSENJE PODATAKA ZAMRZAVAMO INPUTE I ISPISUJEMO REZULTATE RACUNICE U POSLEDNJE DVE KOLONE
             rabat:rabat,
             pdv:pdv,
             plus:plus,
             verifikacija_racunanje:verifikacija_racunanje,
           },function(data,status){



                var data = jQuery.parseJSON(data);

                var data_iznos_pdv = parseFloat(Math.round(data[0] * 100) / 100).toFixed(2)
                var data_vrednost_sa_pdv = parseFloat(Math.round(data[1] * 100) / 100).toFixed(2)


                var total = $("table#moja_tabela").find("tr").length;    //prebrojava redove koliko ih ima
                $("table#moja_tabela").find("tr:nth-child("+(total-2)+")").find("input[name=iznos_pdv]").val(data_iznos_pdv);       //u tabeli trazi predposlednji red i u njemu input sa imenom iznos_pdv i tu ispisuje vrednost
                $("table#moja_tabela").find("tr:nth-child("+(total-2)+")").find("input[name=vrednost_sa_pdv]").val(data_vrednost_sa_pdv);   //u tabeli trazi predposlednji red i u njemu input sa imenom vrednost_sa_pdv i tu ispisuje vrednost

                if(data[2] == 0)
                {          //u tabeli trazi predposlednji red i u njemu input sa imenom rabat i tu ako je polje bilo prazno ispisuje nulu automacki
                $("table#moja_tabela").find("tr:nth-child("+(total-2)+")").find("input[name=rabat]").val(data[2]);
                }

                $("table#moja_tabela").find("tr:nth-child("+(total-2)+")").find("input[name=redni_broj]").attr('disabled','disabled');
                $("table#moja_tabela").find("tr:nth-child("+(total-2)+")").find("input[name=sifra]").attr('disabled','disabled');
                $("table#moja_tabela").find("tr:nth-child("+(total-2)+")").find("input[name=naziv_artikla]").attr('disabled','disabled');      //zatim gasi sva polja disejbluje ih
                $("table#moja_tabela").find("tr:nth-child("+(total-2)+")").find("input[name=jedinica_mere]").attr('disabled','disabled');
                $("table#moja_tabela").find("tr:nth-child("+(total-2)+")").find("input[name=kolicina]").attr('disabled','disabled');
                $("table#moja_tabela").find("tr:nth-child("+(total-2)+")").find("input[name=cena_bez_pdv]").attr('disabled','disabled');
                $("table#moja_tabela").find("tr:nth-child("+(total-2)+")").find("input[name=rabat]").attr('disabled','disabled');
                $("table#moja_tabela").find("tr:nth-child("+(total-2)+")").find("input[name=pdv]").attr('disabled','disabled');
                $("table#moja_tabela").find("tr:nth-child("+(total-2)+")").find("input[name=iznos_pdv]").attr('disabled','disabled');
                $("table#moja_tabela").find("tr:nth-child("+(total-2)+")").find("input[name=plus]").attr('disabled','disabled');

                 if(data === "Ne potpun red")
                 {
                    if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){
                                 swal({
                                           title: 'Ne potpun red!!',
                                           icon: "warning",              //ALERT BOX
                                           timer: 2000,
                                           buttons: false,
                                           closeOnClickOutside: false,
                               });
                             }
                  else if(jezik == 'engleski'){
                                  swal({
                                            title: 'Not a complete row !!',
                                            icon: "warning",              //ALERT BOX
                                            timer: 2000,
                                            buttons: false,
                                            closeOnClickOutside: false,
                                });
                  }
                 }



                //I PRVO PRIKAZUJEMO FOOTER SA UKUPNIM REZULTATIMA
                var verifikacija_footer_zbir_cifara = "verifikacija_footer_zbir_cifara";
                $.post("php/pocetna_php/handler_pocetna.php",{  //OVIM SABIRAMO UKUPAN PDV,UKUPNU VREDNOST I CENU OSNOVNU I TO PRIKAZUJEMO U FOOTERU
                novi_id:novi_id,  //OVDE OPET KORISTIMO GLOBALNU VARIABLU NAPRAVLJENU PRILIKOM UNOSENJA OSNOVNIH PODATAKA
                verifikacija_footer_zbir_cifara:verifikacija_footer_zbir_cifara,
                },function(data,status){

                var data = jQuery.parseJSON(data);
                $("#ukupne_cifre").css("display","block");

                var data1 = data[0];
                var data1 = parseFloat(Math.round(data1 * 100) / 100).toFixed(2);
                $("#ukupaa_cena_bez_pdv").html(data1);


                var data2 = data[1];
                var data2 = parseFloat(Math.round(data2 * 100) / 100).toFixed(2);
                $("#ukupan_iznos_pdv").html(data2);


                var data3 = data[2];
                var data3 = parseFloat(Math.round(data3 * 100) / 100).toFixed(2);
                $("#ukupna_ukupna_vrednost").html(data3);


                var data4 = data[3];
                var data4 = parseFloat(Math.round(data4 * 100) / 100).toFixed(2);
                $("#ukupan_rabat").html(data4);
                });

});


                 var row = $('#moja_tabela tbody tr:last').clone(); //klonira poslednji red

                 row.find('input[name=sifra]').val('');  //ponisti im vrednosti
                 row.find('input[name=naziv_artikla]').val('');  //ponisti im vrednosti
                 row.find('input[name=jedinica_mere]').val('');  //ponisti im vrednosti
                 row.find('input[name=kolicina]').val(1);    //ponisti im vrednosti
                 row.find('input[name=cena_bez_pdv]').val('');   //ponisti im vrednosti
                 row.find('input[name=rabat]').val('');    //ponisti im vrednosti
                 row.find('input[name=iznos_pdv]').val('');   //ponisti im vrednosti
                 row.find('input[name=vrednost_sa_pdv]').val('');   //ponisti im vrednosti



                 row.find('input[name = pdv]').val('20').attr('disabled','disabled');   //samo redu sa PDV dodeli vrednost 20


                 row.find('input[name = redni_broj]').val( +row.find('input[name = redni_broj]').val()+1 ); //ovo automatski prvom polju dodaje broj jedan tj.broji za nas stavke...posto je ovom polju pocetna vrednost 1


                 $('#moja_tabela tbody').append(row);  //nalepi novi red


          }

          $("#dugme_za_slanje_poruke_podrsci").css({
            position: "relative",          //ovim samo vracamo dugmice u prvobitan polozaj
            top: "-60px"
          });
          $("#dugme_za_povratak_na_vrh").css({
            position: "relative",
            top: "-60px"
          });
          $("#odbaci_fakturu").css("display","inline-block");
          $("#sacuvaj_fakturu").css("display","inline-block");
racunanje_na_klik_cena_bez_pdv();
racunanje_na_klik_rabat();
      });


// $('table#moja_tabela').on('click','tr:last button[name=minus]',function(){
//   var redni_broj = $('table#moja_tabela tr:last input[name=redni_broj]').val();
//
//   alert(redni_broj);
// });


//PRIKAZ IMENA KLIJENATA U SELECTU I AUTOMACKA POPUNA PODATAKA
     $('#exampleModal').modal('show'); //PRVO POZIVAMO MODAL
     $("#firme").chosen({no_results_text: "Oops, nema pronadjenih rezultata!"}); //odmah cim UCITAMO DOCUMENT oblikujemo select uz pomoc CHOSEN dodatka

 var verifikacija_prikaz_imena_za_select = "verifikacija_prikaz_imena_za_select";
      $.post("php/unos_php/handler_unos_podataka.php",{
         verifikacija_prikaz_imena_za_select:verifikacija_prikaz_imena_za_select,
      },function(data,status){
        var rezultat = "";
         var data = jQuery.parseJSON(data);

         for(var i=0; i<data.length;i++){

              rezultat+="<option>"+data[i][0]+"</option>";
         }

         $("#firme").append(rezultat).trigger("chosen:updated"); //ZATIM UPDATUJEMO,ISPISUJEMO PODATKE U NOVI CHOSEN OBLIKOVANI SELECT (imena firmi)
                                                                 //ovim ispisujemo podatke u chosen select
      });

                  $("#firme").change(function(){   //zatim reagujemo na promenu u selectu
                    $('#exampleModal').modal('hide');  //prvo zatvaramo modal

                       var ime = $("#firme").val();
                      var verifikacija_select_popuna_podataka = "verifikacija_select_popuna_podataka";
                     $.post("php/unos_php/handler_unos_podataka.php",{     //za izabrano ime uzimamo podatke
                           ime:ime,
                           verifikacija_select_popuna_podataka:verifikacija_select_popuna_podataka,
                     },function(data,status){
                       var data = jQuery.parseJSON(data);
                       if($("#firme").val() ==  'Izaberi_klijenta')  //ako je izabrano prazno polje  brise vrednosti inputa
                       {
                         $("#ime_primaoca").val('');
                         $("#partnerov_PIB").val('');
                         $("#objekat").val('');
                         $("#datum").val('');
                       }

                       if(data[0][1] == "Fizicko lice" || data[0][1] == "Individual")
                       {
                         data[0][1] = "";
                       }
                       $("#ime_primaoca").val(data[0][0]);   //ako je izabrano neko ime automacki popunjava inpute sa njegovim ostalim podacima i danasnjim datumom
                       $("#partnerov_PIB").val(data[0][1]);
                       $("#objekat").val(data[0][2]);
                       $("#partnerov_Email").val(data[0][3]);
                       Date.prototype.toDateInputValue = (function() {
                                      var local = new Date(this);
                                      local.setMinutes(this.getMinutes() - this.getTimezoneOffset()); //OVO DEFINISE DANASNJI DATUM
                                      return local.toJSON().slice(0,10);
                                        });
                       $("#datum").val(new Date().toDateInputValue()); //OVIM DANASNJI DATUM ISPISUJEMO U INPUT DATUM



         });
      });
//PRIKAZ IMENA KLIJENATA U SELECTU I AUTOMACKA POPUNA PODATAKA
 $("#save").click(function(){
   $('#exampleModal').modal('hide');

 })
//PRIKAZ IMENA KLIJENATA U SELECTU I AUTOMACKA POPUNA PODATAKA

$("#odbaci_fakturu").click(function(){
   $.post("php/unos_php/handler_unos_podataka.php",{
     id_fakture:novi_id
   },function(data,status){
               $("#moja_tabela").find("tr:gt(1)").remove();
               $("#ukupne_cifre").css("display","none");
               $("table#moja_tabela").find('tr:nth-child(1)').find("input[name=redni_broj]").val(1);
               $("table#moja_tabela").find('tr:nth-child(1)').find("input[name=sifra]").attr('disabled','disabled');
               $("table#moja_tabela").find('tr:nth-child(1)').find("input[name=naziv_artikla]").val('').attr('disabled',false);      //zatim gasi sva polja disejbluje ih
               $("table#moja_tabela").find('tr:nth-child(1)').find("input[name=jedinica_mere]").val('').attr('disabled',false);;
               $("table#moja_tabela").find('tr:nth-child(1)').find("input[name=kolicina]").val(1).attr('disabled',false);;
               $("table#moja_tabela").find('tr:nth-child(1)').find("input[name=cena_bez_pdv]").val('').attr('disabled',false);;
               $("table#moja_tabela").find('tr:nth-child(1)').find("input[name=rabat]").val('').attr('disabled',false);;
               $("table#moja_tabela").find('tr:nth-child(1)').find("input[name=pdv]").attr('disabled','disabled').val(20);
               $("table#moja_tabela").find('tr:nth-child(1)').find("input[name=iznos_pdv]").attr('disabled','disabled').val('');
               $("table#moja_tabela").find('tr:nth-child(1)').find("input[name=vrednost_sa_pdv]").val('').attr('disabled','disabled');
               $("table#moja_tabela").find('tr:nth-child(1)').find("input[name=plus]").attr('disabled',false);



   })
   $("#dugme_za_slanje_poruke_podrsci").css({
     position: "relative",          //ovim samo vracamo dugmice u prvobitan polozaj
     top: "-10px"
   });
   $("#dugme_za_povratak_na_vrh").css({
     position: "relative",
     top: "-10px"
   });
})
$("#povratak_na_pocetnu").click(function(){  //nova_id JE ID FAKTURE I ONA SE KREIRA TEK KADA SE KLIKNE NA DUGME sacuvaj osnovne podatke

    if(typeof novi_id === 'undefined') //OVIM PROVERAVAMO DA LI JE GLOBALNA VARIABLA novi_id DEFINISANA,DA LI POSTOJI
    {
    window.location.href = 'pocetna.php?jezik='+jezik; //AKO NE POSTOJI DIREKTNO SALJEMO NA POCETNU STRANICU sa globalnom variablom o informaciji o jeziku
    }
else{
             if(confirm("Vasa faktura nece biti sacuvana!!") == true){    //A AKO POSTOJI BRISEMO SVE VEZANO ZA TU VARIABLU IZ BAZE I VRACAMO NA POCETNU
               var verifikacija_obrisi_fakturu = "verifikacija_obrisi_fakturu";
            $.post("php/pocetna_php/handler_pocetna.php",{
                 id_fakture:novi_id,
                 verifikacija_obrisi_fakturu:verifikacija_obrisi_fakturu,
            },function(){
              window.location.href = 'pocetna.php?jezik='+jezik;
            })
           }
    }
});
// window.onbeforeunload = function(event) {
//   var verifikacija_obrisi_fakturu = "verifikacija_obrisi_fakturu";
// event.returnValue =  $.post("php/pocetna_php/handler_pocetna.php",{
//     id_fakture:novi_id,
//     verifikacija_obrisi_fakturu:verifikacija_obrisi_fakturu,
// },function(){
//  window.location.href = 'pocetna.php?jezik='+jezik;
// })
//
// };

$("#sacuvaj_fakturu").click(function(){

        var izabrani_status = "Nije placena";
        $.post("php/pocetna_php/handler_pocetna.php",{
                izabrani_status:izabrani_status,   //SALJEMO STATUS AUTOMACKI DEFINISAN KAO "Nije placena"
                fakture_id:novi_id,          //uzimamo id trenutno izabrane fakture  koji je kreiran u globalnoj variabli prilikom prikaza svih faktura
        },function(data,status){

        });





//UNOSENJE BROJA I GODINE U FAKTURU
                              var datum = new Date();   //danasnji datum kompletan
                              var danasnja_godina = datum.getFullYear();   //sadasnja godina
                                          //OVIM DEFINISEMO DA JE FAKTURA ODMAH U STARTU NE PLACENA TJ DA JE TAKO PRIKAZUJE
                         if(typeof redni_broj_fakture === 'undefined' || trenutna_godina_iz_baze === 'undefined')  //ako ne postoji u bazi tj nov je korisnik
                         {
                                 redni_broj_fakture = 1;                                             //onda unosimo vrednost fakture jedan
                                 $.post("php/unos_php/handler_unos_podataka.php",{     //i trenutnu godinu
                                   redni_broj_fakture:redni_broj_fakture,
                                   danasnja_godina:danasnja_godina,
                                   novi_id:novi_id,
                                 },function(data,status){});
                         }
                         else if(trenutna_godina_iz_baze == danasnja_godina)                          //sve dok se godine podudaraju on povecava vrednost
                         {
                                redni_broj_fakture = parseInt(redni_broj_fakture) + 1; //ovim ga pretvaramo u intidzer         //brojeve faktura unapred
                                $.post("php/unos_php/handler_unos_podataka.php",{
                                  redni_broj_fakture:redni_broj_fakture,
                                  danasnja_godina:danasnja_godina,
                                  novi_id:novi_id,
                                },function(data,status){});
                         }
                         else if(trenutna_godina_iz_baze !== danasnja_godina)                    //e kad se godina promeni onda samo jednom aktivira ovaj else if
                         {
                                redni_broj_fakture = 1;                                          //i opet dodeljuje vrednost jedan
                                $.post("php/unos_php/handler_unos_podataka.php",{     //zatim koristi samo srednji else if  za povecavanje po jedan
                                  redni_broj_fakture:redni_broj_fakture,                          //prvi if koristi samo pri pravljenju prve fakture a treci
                                  danasnja_godina:danasnja_godina,                               //samo kad prebacuje godinu tj prvi put u godini
                                  novi_id:novi_id,
                                },function(data,status){});
                         }
//UNOSENJE BROJA I GODINE U FAKTURU

      window.location.href = 'pocetna.php?jezik='+jezik; //AKO KLIKNEMO NA SACUVAJ FAKTURU SAMO SALJEMO NA POCETNU STRANICU,ZATVARAMO OVAJ PROZOR JER JE VEC SVE SACUVANO U BAZI
    });
});

window.getUrlParameter = function (sParam) {   //OVA FUNKCIJA SLUZI DA VRACA VREDNOST GETA IZ URL-a
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};


// function promena_ekrana_rezolucije()
// {
//   if($(window).width() > 1015 && $(window).width() < 1030 && $(window).height() > 615 && $(window).height() < 630) //ovim odredjujemo rezoluciju klijentovog monitora
//   {
//     document.body.style.zoom = 1; //a ovim zum koji je potreban za tu rezoluciju
//   }
//   else if($(window).width() > 1915 && $(window).width() < 1925 && $(window).height() > 930 && $(window).height() < 1085)
//   {
//     document.body.style.zoom = 1.7;
//   }
//   //OVDE TREBA DODATI I OSTALE REZOLUCIJE EKRANA I ZUMOVE
// }


function racunanje_na_klik_cena_bez_pdv(){

$('table#moja_tabela tr:last input[name=cena_bez_pdv]').keyup(function(){ //nZADNJE DVE DECIMALE USKLADITI PHP I JQUERY


//   $("#ukupne_cifre").css("display","block");
   var jedino_broj = /^[0-9]*$/;
   if(!jedino_broj.test($('table#moja_tabela tr:last input[name=cena_bez_pdv]').val()))
   {
     var total = $("table#moja_tabela").find("tr").length;    //prebrojava redove koliko ih ima
     $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=iznos_pdv]").val('');       //u tabeli trazi predposlednji red i u njemu input sa imenom iznos_pdv i tu ispisuje vrednost
     $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=vrednost_sa_pdv]").val('');
//     $("#ukupne_cifre").css("display","none");
   }
   else if($('table#moja_tabela tr:last input[name=cena_bez_pdv]').val() == "")
   {
  //   $("#ukupne_cifre").css("display","none");
     var total = $("table#moja_tabela").find("tr").length;    //prebrojava redove koliko ih ima
     $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=iznos_pdv]").val('');       //u tabeli trazi predposlednji red i u njemu input sa imenom iznos_pdv i tu ispisuje vrednost
     $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=vrednost_sa_pdv]").val('');
   }
  // else if($('table#moja_tabela tr:last input[name=iznos_pdv]') == "" $('table#moja_tabela tr:last input[name=vrednost_sa_pdv]') == ""){}
   else
   {
             var odmah_racunanje_cena_bez_pdv = $('table#moja_tabela tr:last input[name=cena_bez_pdv]').val();
             var odmah_racunanje_kolicina = $('table#moja_tabela tr:last input[name=kolicina]').val();
             var odmah_racunanje_pdv = $('table#moja_tabela tr:last input[name=pdv]').val();
             var odmah_racunanje_rabat = $('table#moja_tabela tr:last input[name=rabat]').val();
             if(odmah_racunanje_rabat == "" || odmah_racunanje_rabat == null)
             {
                      odmah_racunanje_rabat = 0;

                      odmah_racunanje_iznos_pdv = odmah_racunanje_kolicina * (odmah_racunanje_cena_bez_pdv - ((odmah_racunanje_rabat/100) * odmah_racunanje_cena_bez_pdv))
                      odmah_racunanje_iznos_pdv = parseFloat((odmah_racunanje_iznos_pdv / 100) * odmah_racunanje_pdv);

                      odmah_racunanje_vrednost_sa_pdv = parseFloat(odmah_racunanje_kolicina * (odmah_racunanje_cena_bez_pdv - ((odmah_racunanje_rabat/100) * odmah_racunanje_cena_bez_pdv)));
                      odmah_racunanje_vrednost_sa_pdv = ((odmah_racunanje_vrednost_sa_pdv) + (odmah_racunanje_iznos_pdv));
                      odmah_racunanje_vrednost_sa_pdv = parseFloat(Math.round(odmah_racunanje_vrednost_sa_pdv * 100) / 100).toFixed(2);
                      odmah_racunanje_iznos_pdv = parseFloat(Math.round(odmah_racunanje_iznos_pdv * 100) / 100).toFixed(2);

                      odmah_racunanje_ukupan_rabat = odmah_racunanje_kolicina * (odmah_racunanje_rabat/100) * odmah_racunanje_cena_bez_pdv;  //UKUPAN RABAT
                      odmah_racunanje_ukupan_rabat = parseFloat(Math.round(odmah_racunanje_ukupan_rabat * 100) / 100).toFixed(2);

                      odmah_cena_puta_kolicina = odmah_racunanje_kolicina * odmah_racunanje_cena_bez_pdv; //OSNOVNA CENA PUTA KOLICINA
                      odmah_cena_puta_kolicina = parseFloat(Math.round(odmah_cena_puta_kolicina * 100) / 100).toFixed(2);

                      var total = $("table#moja_tabela").find("tr").length;    //prebrojava redove koliko ih ima
                      $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=iznos_pdv]").val(odmah_racunanje_iznos_pdv);       //u tabeli trazi predposlednji red i u njemu input sa imenom iznos_pdv i tu ispisuje vrednost
                      $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=vrednost_sa_pdv]").val(odmah_racunanje_vrednost_sa_pdv);

                    //   var sum_iznos_pdv = 0;
                    //   $("table#moja_tabela").find("input[name=iznos_pdv]").each(function(){   //funkcijom EACH uzimamo sve inpute sa ovim name
                    //     sum_iznos_pdv += parseFloat($(this).val());//i ovim ih sabiramo  i  dobijamo ukupan rezultat
                    //
                    // });
                    // var sum_vrednost_sa_pdv = 0;
                    // $("table#moja_tabela").find("input[name=vrednost_sa_pdv]").each(function(){
                    //   sum_vrednost_sa_pdv += parseFloat($(this).val());
                    // });
                    //
                    // var sum_cena_puta_kolicina = 0;
                    // $("table#moja_tabela").find("input[name=cena_bez_pdv]").each(function(){
                    //   sum_cena_puta_kolicina += parseFloat($(this).val());
                    // });
                    // var sum_racunanje_ukupan_rabat = 0;
                    // $("table#moja_tabela").find("input[name=rabat]").each(function(){
                    //   sum_racunanje_ukupan_rabat += parseFloat($(this).val());
                    // });
                    //
                    //   $("#ukupaa_cena_bez_pdv").html(sum_cena_puta_kolicina);
                    //   $("#ukupan_iznos_pdv").html(sum_iznos_pdv);
                    //   $("#ukupan_rabat").html(sum_racunanje_ukupan_rabat);
                    //   $("#ukupna_ukupna_vrednost").html(sum_vrednost_sa_pdv);

             }
             else if(odmah_racunanje_rabat != "" || odmah_racunanje_rabat != null)
             {

               odmah_racunanje_iznos_pdv = odmah_racunanje_kolicina * (odmah_racunanje_cena_bez_pdv - ((odmah_racunanje_rabat/100) * odmah_racunanje_cena_bez_pdv))
               odmah_racunanje_iznos_pdv = parseFloat((odmah_racunanje_iznos_pdv / 100) * odmah_racunanje_pdv);

               odmah_racunanje_vrednost_sa_pdv = parseFloat(odmah_racunanje_kolicina * (odmah_racunanje_cena_bez_pdv - ((odmah_racunanje_rabat/100) * odmah_racunanje_cena_bez_pdv)));
               odmah_racunanje_vrednost_sa_pdv = ((odmah_racunanje_vrednost_sa_pdv) + (odmah_racunanje_iznos_pdv));
               odmah_racunanje_vrednost_sa_pdv = parseFloat(Math.round(odmah_racunanje_vrednost_sa_pdv * 100) / 100).toFixed(2);
               odmah_racunanje_iznos_pdv = parseFloat(Math.round(odmah_racunanje_iznos_pdv * 100) / 100).toFixed(2);

               odmah_racunanje_ukupan_rabat = odmah_racunanje_kolicina * (odmah_racunanje_rabat/100) * odmah_racunanje_cena_bez_pdv;  //UKUPAN RABAT
               odmah_racunanje_ukupan_rabat = parseFloat(Math.round(odmah_racunanje_ukupan_rabat * 100) / 100).toFixed(2);

               odmah_cena_puta_kolicina = odmah_racunanje_kolicina * odmah_racunanje_cena_bez_pdv; //OSNOVNA CENA PUTA KOLICINA
               odmah_cena_puta_kolicina = parseFloat(Math.round(odmah_cena_puta_kolicina * 100) / 100).toFixed(2);

                      var total = $("table#moja_tabela").find("tr").length;
                      $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=iznos_pdv]").val(odmah_racunanje_iznos_pdv);
                      $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=vrednost_sa_pdv]").val(odmah_racunanje_vrednost_sa_pdv);

                    //   var sum_iznos_pdv = 0;
                    //   $("table#moja_tabela").find("input[name=iznos_pdv]").each(function(){
                    //     sum_iznos_pdv += parseFloat($(this).val());
                    // });
                    // var sum_vrednost_sa_pdv = 0;
                    // $("table#moja_tabela").find("input[name=vrednost_sa_pdv]").each(function(){
                    //   sum_vrednost_sa_pdv += parseFloat($(this).val());
                    // });
                    //
                    // var sum_cena_puta_kolicina = 0;
                    // $("table#moja_tabela").find("input[name=cena_bez_pdv]").each(function(){
                    //   sum_cena_puta_kolicina += parseFloat($(this).val());
                    // });
                    // var sum_racunanje_ukupan_rabat = 0;
                    // $("table#moja_tabela").find("input[name=rabat]").each(function(){
                    //   sum_racunanje_ukupan_rabat += parseFloat($(this).val());
                    // });
                    //
                    //   $("#ukupaa_cena_bez_pdv").html(sum_cena_puta_kolicina);
                    //   $("#ukupan_iznos_pdv").html(sum_iznos_pdv);
                    //   $("#ukupan_rabat").html(sum_racunanje_ukupan_rabat);
                    //   $("#ukupna_ukupna_vrednost").html(sum_vrednost_sa_pdv);
             }
   }



 })
}

function racunanje_na_klik_rabat(){

$('table#moja_tabela tr:last input[name=rabat]').keyup(function(){ //nece da reaguje na drugi input...tj input u drugom,trecem redu


  // $("#ukupne_cifre").css("display","block");
   var jedino_broj = /^[0-9]*$/;
   if(!jedino_broj.test($('table#moja_tabela tr:last input[name=cena_bez_pdv]').val()))
   {
     var total = $("table#moja_tabela").find("tr").length;    //prebrojava redove koliko ih ima
     $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=iznos_pdv]").val('');       //u tabeli trazi predposlednji red i u njemu input sa imenom iznos_pdv i tu ispisuje vrednost
     $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=vrednost_sa_pdv]").val('');
//     $("#ukupne_cifre").css("display","none");
   }
   else if($('table#moja_tabela tr:last input[name=cena_bez_pdv]').val() == "")
   {
//     $("#ukupne_cifre").css("display","none");
     var total = $("table#moja_tabela").find("tr").length;    //prebrojava redove koliko ih ima
     $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=iznos_pdv]").val('');       //u tabeli trazi predposlednji red i u njemu input sa imenom iznos_pdv i tu ispisuje vrednost
     $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=vrednost_sa_pdv]").val('');
   }
   else
   {
             var odmah_racunanje_cena_bez_pdv = $('table#moja_tabela tr:last input[name=cena_bez_pdv]').val();
             var odmah_racunanje_kolicina = $('table#moja_tabela tr:last input[name=kolicina]').val();
             var odmah_racunanje_pdv = $('table#moja_tabela tr:last input[name=pdv]').val();
             var odmah_racunanje_rabat = $('table#moja_tabela tr:last input[name=rabat]').val();
             if(odmah_racunanje_rabat == "" || odmah_racunanje_rabat == null)
             {
               odmah_racunanje_rabat = 0;

               odmah_racunanje_iznos_pdv = odmah_racunanje_kolicina * (odmah_racunanje_cena_bez_pdv - ((odmah_racunanje_rabat/100) * odmah_racunanje_cena_bez_pdv))
               odmah_racunanje_iznos_pdv = parseFloat((odmah_racunanje_iznos_pdv / 100) * odmah_racunanje_pdv);

               odmah_racunanje_vrednost_sa_pdv = parseFloat(odmah_racunanje_kolicina * (odmah_racunanje_cena_bez_pdv - ((odmah_racunanje_rabat/100) * odmah_racunanje_cena_bez_pdv)));
               odmah_racunanje_vrednost_sa_pdv = ((odmah_racunanje_vrednost_sa_pdv) + (odmah_racunanje_iznos_pdv));
               odmah_racunanje_vrednost_sa_pdv = parseFloat(Math.round(odmah_racunanje_vrednost_sa_pdv * 100) / 100).toFixed(2);
               odmah_racunanje_iznos_pdv = parseFloat(Math.round(odmah_racunanje_iznos_pdv * 100) / 100).toFixed(2);

               odmah_racunanje_ukupan_rabat = odmah_racunanje_kolicina * (odmah_racunanje_rabat/100) * odmah_racunanje_cena_bez_pdv;  //UKUPAN RABAT
               odmah_racunanje_ukupan_rabat = parseFloat(Math.round(odmah_racunanje_ukupan_rabat * 100) / 100).toFixed(2);

               odmah_cena_puta_kolicina = odmah_racunanje_kolicina * odmah_racunanje_cena_bez_pdv; //OSNOVNA CENA PUTA KOLICINA
               odmah_cena_puta_kolicina = parseFloat(Math.round(odmah_cena_puta_kolicina * 100) / 100).toFixed(2);

                      var total = $("table#moja_tabela").find("tr").length;    //prebrojava redove koliko ih ima
                      $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=iznos_pdv]").val(odmah_racunanje_iznos_pdv);       //u tabeli trazi predposlednji red i u njemu input sa imenom iznos_pdv i tu ispisuje vrednost
                      $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=vrednost_sa_pdv]").val(odmah_racunanje_vrednost_sa_pdv);

                    //   var sum_iznos_pdv = 0;
                    //   $("table#moja_tabela").find("input[name=iznos_pdv]").each(function(){
                    //     sum_iznos_pdv += parseFloat($(this).val());
                    // });
                    // var sum_vrednost_sa_pdv = 0;
                    // $("table#moja_tabela").find("input[name=vrednost_sa_pdv]").each(function(){
                    //   sum_vrednost_sa_pdv += parseFloat($(this).val());
                    // });
                    //
                    // var sum_cena_puta_kolicina = 0;
                    // $("table#moja_tabela").find("input[name=cena_bez_pdv]").each(function(){
                    //   sum_cena_puta_kolicina += parseFloat($(this).val());
                    // });
                    // var sum_racunanje_ukupan_rabat = 0;
                    // $("table#moja_tabela").find("input[name=rabat]").each(function(){
                    //   sum_racunanje_ukupan_rabat += parseFloat($(this).val());
                    // });
                    //
                    //   $("#ukupaa_cena_bez_pdv").html(sum_cena_puta_kolicina);
                    //   $("#ukupan_iznos_pdv").html(sum_iznos_pdv);
                    //   $("#ukupan_rabat").html(sum_racunanje_ukupan_rabat);
                    //   $("#ukupna_ukupna_vrednost").html(sum_vrednost_sa_pdv);

             }
             else if(odmah_racunanje_rabat != "" || odmah_racunanje_rabat != null)
             {

               odmah_racunanje_iznos_pdv = odmah_racunanje_kolicina * (odmah_racunanje_cena_bez_pdv - ((odmah_racunanje_rabat/100) * odmah_racunanje_cena_bez_pdv))
               odmah_racunanje_iznos_pdv = parseFloat((odmah_racunanje_iznos_pdv / 100) * odmah_racunanje_pdv);

               odmah_racunanje_vrednost_sa_pdv = parseFloat(odmah_racunanje_kolicina * (odmah_racunanje_cena_bez_pdv - ((odmah_racunanje_rabat/100) * odmah_racunanje_cena_bez_pdv)));
               odmah_racunanje_vrednost_sa_pdv = ((odmah_racunanje_vrednost_sa_pdv) + (odmah_racunanje_iznos_pdv));
               odmah_racunanje_vrednost_sa_pdv = parseFloat(Math.round(odmah_racunanje_vrednost_sa_pdv * 100) / 100).toFixed(2);
               odmah_racunanje_iznos_pdv = parseFloat(Math.round(odmah_racunanje_iznos_pdv * 100) / 100).toFixed(2);

               odmah_racunanje_ukupan_rabat = odmah_racunanje_kolicina * (odmah_racunanje_rabat/100) * odmah_racunanje_cena_bez_pdv;  //UKUPAN RABAT
               odmah_racunanje_ukupan_rabat = parseFloat(Math.round(odmah_racunanje_ukupan_rabat * 100) / 100).toFixed(2);

               odmah_cena_puta_kolicina = odmah_racunanje_kolicina * odmah_racunanje_cena_bez_pdv; //OSNOVNA CENA PUTA KOLICINA
               odmah_cena_puta_kolicina = parseFloat(Math.round(odmah_cena_puta_kolicina * 100) / 100).toFixed(2);

                      var total = $("table#moja_tabela").find("tr").length;
                      $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=iznos_pdv]").val(odmah_racunanje_iznos_pdv);
                      $("table#moja_tabela").find("tr:nth-child("+(total-1)+")").find("input[name=vrednost_sa_pdv]").val(odmah_racunanje_vrednost_sa_pdv);

                    //   var sum_iznos_pdv = 0;
                    //   $("table#moja_tabela").find("input[name=iznos_pdv]").each(function(){
                    //     sum_iznos_pdv += parseFloat($(this).val());
                    // });
                    // var sum_vrednost_sa_pdv = 0;
                    // $("table#moja_tabela").find("input[name=vrednost_sa_pdv]").each(function(){
                    //   sum_vrednost_sa_pdv += parseFloat($(this).val());
                    // });
                    //
                    // var sum_cena_puta_kolicina = 0;
                    // $("table#moja_tabela").find("input[name=cena_bez_pdv]").each(function(){
                    //   sum_cena_puta_kolicina += parseFloat($(this).val());
                    // });
                    // var sum_racunanje_ukupan_rabat = 0;
                    // $("table#moja_tabela").find("input[name=rabat]").each(function(){
                    //   sum_racunanje_ukupan_rabat += parseFloat($(this).val());
                    // });
                    //
                    //   $("#ukupaa_cena_bez_pdv").html(sum_cena_puta_kolicina);
                    //   $("#ukupan_iznos_pdv").html(sum_iznos_pdv);
                    //   $("#ukupan_rabat").html(sum_racunanje_ukupan_rabat);
                    //   $("#ukupna_ukupna_vrednost").html(sum_vrednost_sa_pdv);
             }
   }



 })
}
