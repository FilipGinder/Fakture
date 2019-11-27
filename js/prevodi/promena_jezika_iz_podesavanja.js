$(document).ready(function(){
jezik = window.location.search.substring(7);

$("#odabir_jezika").change(function(){
  if($("#odabir_jezika").val() == "srpski"){  //OVO JE ZA PROMENU JEZIKA U PODESAVANJIMA

              jezik = "srpski"; //PRVO PROMENIMO VARIJABLU U JEZIK KOJI ZELIMO RADI DALJEG PROSLEDJIVANJA NA SLEDECU STRANU I POVRATAK NA POCETNU ZATIM MENJAMO SVE U ZELJENI JEZIK
              //  STRANICA GORE
              $("#logout").html('<b>Izadji</b> <img src="slika/logout.png">');
              $("#treci_red_za_prevod").html('<b>PIB:</b> <span id="pib_firme_na_pocetnoj"></span>&nbsp;&nbsp;&nbsp; <b>MATICNI BROJ:</b> <span id="maticni_br_firme_na_pocetnoj"></span>');
              $("#cetvrti_red_za_prevod").html('<b>ZIRO RACUN:</b> <span id="ziro_racun_na_pocetnoj"></span>');
              $("#peti_red_za_prevod").html('<b>Email:</b> <span id="email_na_pocetnoj"></span>');
              $("#kreiraj_fakturu").val('Napravi novu fakturu');
              $("#stampaj_skice").val('Stampaj skice');
              $("#naslov_kolona1").html('<b>R.B</b>');
              $("#naslov_kolona2").html('<b>Ime Firme</b>');
              $("#naslov_kolona3").html('<b>PIB</b>');
              $("#naslov_kolona4").html('<b>Datum</b>');
              $("#naslov_kolona5").html('<b>Vrednost faktura</b>');
              $("#naslov_kolona6").html('<b>Pregled</b>');
              $("#naslov_kolona7").html('<b>Izbrisati</b>');
              $("#naslov_modala_za_logo").html('Promeni logo firme klikom ili prevlacenjem');
              $("#sacuvaj_novi_logo").html('Sacuvaj');
              $("#poruka_u_dropzone_failu").html('Kliknite ili prevucite vas logo ovde!');
              if($("#polje_pib_klijenta").html() == "Individual"){$("#polje_pib_klijenta").html('Fizicko lice')};
              $("#naslov_korisnika_koji_mi_salje_poruke").html("Sve vase sugestije i pitanja mozete nam proslediti ovde");
              $("#dugme_posalji_korisnika_koji_mi_salje_poruke").val("Posalji");
              $("#email_korisnika_koji_mi_salje_poruke").attr("placeholder", "Vas e-mail");
              $("#poruka_korisnika_koji_mi_salje_poruke").attr("placeholder", "Poruka");
              $("#select_obelezeni_odabir_godine_pocetna_strana").html('Sve fakture po godinama');
              // if($("#polje_status_u_tabeli").html() == "Paid" && $("#polje_pib_klijenta").html() == "Individual"){$("#polje_status_u_tabeli").html('Placena')}
              // else if($("#polje_status_u_tabeli").html() == "Paid" && $("#polje_pib_klijenta").html() == ""){$("#polje_status_u_tabeli").html('Placena')}
              // else if($("#polje_status_u_tabeli").html() == "Not paid" && $("#polje_pib_klijenta").html() == "Individual"){$("#polje_status_u_tabeli").html('Nije placena')}
              // else if($("#polje_status_u_tabeli").html() == "Not paid" && $("#polje_pib_klijenta").html() == ""){$("#polje_status_u_tabeli").html('Nije placena')};



              //STRANICA DOLE
              $("#treci_red_za_stampanje_prevod").html('<b>PIB:&nbsp; <span id="pib_firme_za_stampanje"></span> &nbsp; MATICNI BROJ: &nbsp; <span id="maticni_br_firme_za_stampanje"></span></b>');
              $("#cetvrti_red_za_stampanje_prevod").html('<b>ZIRO &nbsp; RACUN: &nbsp; <span id="ziro_racun_za_stampanje"></span></b>');
              $("#peti_red_za_stampanje_prevod").html('<b>VLASNIK: &nbsp;<span id="ime_vlasnika_za_stampanje"></span> </b>');
              $("#sesti_red_za_stampanje_prevod").html('<b>BROJ TELEFONA: &nbsp;<span id="broj_telefona_za_stampanje"></span> </b>');
              $("#sedmi_red_za_stampanje_prevod").html('<b>FIX BROJ TELEFONA: &nbsp;<span id="fix_br_telefona_za_stampanje"></span> </b>');
              $("#naslov_kolona_za_stampanje1").html('<b>R.B</b>');
              $("#naslov_kolona_za_stampanje2").html('<b>Naziv artikla</b>');
              $("#naslov_kolona_za_stampanje3").html('<b>JM</b>');
              $("#naslov_kolona_za_stampanje4").html('<b>Kolicina</b>');
              $("#naslov_kolona_za_stampanje5").html('<b>Cena bez PDV</b>');
              $("#naslov_kolona_za_stampanje6").html('<b>Rabat</b>');
              $("#naslov_kolona_za_stampanje7").html('<b>PDV</b>');
              $("#naslov_kolona_za_stampanje8").html('<b>Iznos PDV</b>');
              $("#naslov_kolona_za_stampanje9").html('<b>Ukupna vrednost</b>');
              $("#paragraf_za_placanje").html('UKUPAN&nbsp;IZNOS&nbsp;ZA&nbsp;UPLATU:&nbsp;&nbsp;<span id="za_placanje"></span>');
              $("#levi_potpis").html('RACUN&nbsp;KREIRAO');
              $("#pecat").html('M.P');
              $("#desni_potpis").html('RACUN&nbsp;PRIMIO');
              $("#paragraf_cena").html('Cena bez PDV:&nbsp;&nbsp;<strong id="ukupaa_cena_bez_pdv"></strong>');
              $("#paragraf_pdv").html('Iznos PDV:&nbsp;&nbsp;<strong id="ukupan_iznos_pdv"></strong>');
              $("#paragraf_ukupno").html('Vrednost sa PDV:&nbsp;&nbsp;<strong id="ukupna_ukupna_vrednost"></strong>');
              $("#paragraf_rabat").html('Rabat:&nbsp;&nbsp;<strong id="ukupan_rabat"></strong>');
              $("#predracun_naslov").html('PREDRACUN');
              $("#dugme_za_nazad_sa_pregleda").html('Nazad');
              $("#oznaka_dokumenta").html('<b>FAKTURA</b>');
              $("#forma_emaila_naslov").html('Posalji fakturu');
              $("#forma_emaila_obavestenje").html('Slanjem faktura postaje zvanicna.');
              $("#primalac_email_fakture").html('Primalac:&nbsp;<br><input id="ime_primaoca_emaila" type="text" value="" placeholder="Unesite ime primaoca">');
              $("#forma_emaila_naslov_label").html('Naslov');
              $("#forma_emaila_textarea").html('Poruka');
              $("#naslov_status_fakture_na_otvorenoj_fakturi").html('STATUS FAKTURE:');
              $("#promeni_status_text").html('Promeni status u');
              $("#skrivena_opcija_status").html('Izaberi status');
              $("#Nije_placeno").html('Nije placena');
              $("#Placeno").html('Placena');
              $("#Storno").html('Storno');


              //STRANICA PODESAVANJE
              $("#naslov_update").html('Izmeni licne podatke');
              $("#Promeni_boju").html('Promeni temu');
              $("#default_boja").html('Podrazumevano');
              $("#svetlo_siva_boja").html('Svetlo siva');
              $("#srednje_siva_boja").html('Srednje siva');
              $("#tamno_siva_boja").html('Tamno siva');
              $("#Promeni_jezik").html('Promeni jezik');
              $("#obrisi_nalog").val('Obrisi nalog');
              $("#label_email_update").html('Promeni email:');
              $("#label_lozinka_update").html('Unesi novu lozinku / nije obavezno:');
              $("#label_ime_i_prezime_update").html('Promeni ime i prezime:');
              $("#label_ime_firme_update").html('Promeni ime firme:');
              $("#label_adresa_firme_update").html('Promeni adresu firme:');
              $("#label_lokacija_firme_update").html('Promeni lokaciju:');
              $("#label_pib_firme_update").html('Promeni pib:');
              $("#label_maticni_br_firme_update").html('Promeni maticni broj:');
              $("#label_opis_firme_update").html('Promeni opis:');
              $("#label_ziro_racun_update").html('Promeni ziro racun:');
              $("#label_broj_telefona_update").html('Promeni broj telefona:');
              $("#label_fix_br_telefona_update").html('Promeni broj fix telefona:');
              $("#sacuvaj_promene").val('Sacuvaj promene');



              //STRANICA PRIKAZ KLIJENTA
              $("#prikaz_korisnika_naslov").html('Prikaz klijenta');
              $("#label_ime_komintenta_prikaz_klijenta").html('Ime klijenta:');
              $("#label_pib_komintenta_prikaz_klijenta").html('Pib klijenta:');
              $("#label_predstavnistvo_komintenta_prikaz_klijenta").html('Predstavnistvo klijenta:');
              $("#label_email_komintenta_prikaz_klijenta").html('E-mail klijenta:');
              $("#promeni_osnovne_podatke_o_klijentu").val('Promeni osnovne podatke o klijentu');
              $("#promeni_osnovne_podatke_o_klijentu_dugme_sacuvaj").val('Sacuvaj');
              $("#napravi_novu_fakturu_dugme_prikaz_klijenta").val('Napravi novu fakturu za klijenta');
              $("#prikaz_klijenta_naslov_kolona1").html('<b>R.B</b>');
              $("#prikaz_klijenta_naslov_kolona2").html('<b>Ime Firme</b>');
              $("#prikaz_klijenta_naslov_kolona3").html('<b>PIB</b>');
              $("#prikaz_klijenta_naslov_kolona4").html('<b>Datum</b>');
              $("#prikaz_klijenta_naslov_kolona5").html('<b>Vrednost faktura</b>');
              $("#prikaz_klijenta_naslov_kolona6").html('<b>Pregled</b>');
              $("#prikaz_klijenta_naslov_kolona7").html('<b>Izbrisati</b>');

              //STRANICA PRIKAZ KLIJENTA
  }
  else if($("#odabir_jezika").val() == "engleski"){

              jezik = "engleski";   //PRVO PROMENIMO VARIJABLU U JEZIK KOJI ZELIMO RADI DALJEG PROSLEDJIVANJA NA SLEDECU STRANU I POVRATAK NA POCETNU ZATIM MENJAMO SVE U ZELJENI JEZIK
              //  STRANICA GORE
                $("#logout").html('<b>Logout</b> <img src="slika/logout.png">');
                $("#treci_red_za_prevod").html('<b>PIB:</b> <span id="pib_firme_na_pocetnoj"></span>&nbsp;&nbsp;&nbsp; <b>IDENTIFICATION NUMBER:</b> <span id="maticni_br_firme_na_pocetnoj"></span>');
                $("#cetvrti_red_za_prevod").html('<b>BANK ACCOUNT:</b> <span id="ziro_racun_na_pocetnoj"></span>');
                $("#peti_red_za_prevod").html('<b>Email:</b> <span id="email_na_pocetnoj"></span>');
                $("#kreiraj_fakturu").val('Create new invoice');
                $("#stampaj_skice").val('Print sketches');
                $("#naslov_kolona1").html('<b>S.N</b>');
                $("#naslov_kolona2").html('<b>Company name</b>');
                $("#naslov_kolona3").html('<b>PIB</b>');
                $("#naslov_kolona4").html('<b>DATE</b>');
                $("#naslov_kolona5").html('<b>Value of invoices</b>');
                $("#naslov_kolona6").html('<b>Review</b>');
                $("#naslov_kolona7").html('<b>Delete</b>');
                $("#naslov_modala_za_logo").html('Change of company logo by clicking or dragging');
                $("#sacuvaj_novi_logo").html('Save');
                $("#poruka_u_dropzone_failu").html('Click or drag your logo here!');
                if($("#polje_pib_klijenta").html() == "Fizicko lice"){$("#polje_pib_klijenta").html('Individual')};
                $("#naslov_korisnika_koji_mi_salje_poruke").html("All your suggestions and questions can be forwarded to us here");
                $("#dugme_posalji_korisnika_koji_mi_salje_poruke").val("Send");
                $("#email_korisnika_koji_mi_salje_poruke").attr("placeholder", "Your e-mail");
                $("#poruka_korisnika_koji_mi_salje_poruke").attr("placeholder", "Message");
                $("#select_obelezeni_odabir_godine_pocetna_strana").html('All invoices per year');
                // if($("#polje_status_u_tabeli").html() == "Placena" && $("#polje_pib_klijenta").html() == "Fizicko lice"){$("#polje_status_u_tabeli").html('Paid')}
                // else if($("#polje_status_u_tabeli").html() == "Placena" && $("#polje_pib_klijenta").html() == ""){$("#polje_status_u_tabeli").html('Paid')}
                // else if($("#polje_status_u_tabeli").html() == "Nije placena" && $("#polje_pib_klijenta").html() == "Fizicko lice"){$("#polje_status_u_tabeli").html('Not paid')}
                // else if($("#polje_status_u_tabeli").html() == "Nije placena" && $("#polje_pib_klijenta").html() == ""){$("#polje_status_u_tabeli").html('Not paid')};


              //STRANICA DOLE
                $("#treci_red_za_stampanje_prevod").html('<b>PIB:&nbsp; <span id="pib_firme_za_stampanje"></span> &nbsp; IDENTIFICATION NUMBER: &nbsp; <span id="maticni_br_firme_za_stampanje"></span></b>');
                $("#cetvrti_red_za_stampanje_prevod").html('<b>BANK &nbsp; ACCOUNT: &nbsp; <span id="ziro_racun_za_stampanje"></span></b>');
                $("#peti_red_za_stampanje_prevod").html('<b>OWNER: &nbsp;<span id="ime_vlasnika_za_stampanje"></span> </b>');
                $("#sesti_red_za_stampanje_prevod").html('<b>PHONE NUMBER: &nbsp;<span id="broj_telefona_za_stampanje"></span> </b>');
                $("#sedmi_red_za_stampanje_prevod").html('<b>TEL FIXED: &nbsp;<span id="fix_br_telefona_za_stampanje"></span> </b>');
                $("#naslov_kolona_za_stampanje1").html('<b>S.N</b>');
                $("#naslov_kolona_za_stampanje2").html('<b>Product name</b>');
                $("#naslov_kolona_za_stampanje3").html('<b>Unit of measure</b>');
                $("#naslov_kolona_za_stampanje4").html('<b>Quantity</b>');
                $("#naslov_kolona_za_stampanje5").html('<b>Price without PDV</b>');
                $("#naslov_kolona_za_stampanje6").html('<b>Rabat</b>');
                $("#naslov_kolona_za_stampanje7").html('<b>PDV</b>');
                $("#naslov_kolona_za_stampanje8").html('<b>Amount PDV</b>');
                $("#naslov_kolona_za_stampanje9").html('<b>Total value</b>');
                $("#paragraf_za_placanje").html('THE&nbsp;TOTAL&nbsp;AMOUNT&nbsp;TO&nbsp;BE&nbsp;PAID:&nbsp;<span id="za_placanje"></span>');
                $("#levi_potpis").html('ACCOUNT&nbsp;CREATED');
                $("#pecat").html('P.S');
                $("#desni_potpis").html('ACCOUNT&nbsp;RECEIVED');
                $("#paragraf_cena").html('Price without PDV:<strong id="ukupaa_cena_bez_pdv"></strong>');
                $("#paragraf_pdv").html('Amount PDV:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong id="ukupan_iznos_pdv"></strong>').css("margin-left","52px");
                $("#paragraf_ukupno").html('Value with PDV:<strong id="ukupna_ukupna_vrednost"></strong>').css("margin-left","36px");
                $("#paragraf_rabat").html('Rabat:<strong id="ukupan_rabat"></strong>').css("margin-left","102px");
                $("#predracun_naslov").html('ESTIMATE');
                $("#dugme_za_nazad_sa_pregleda").html('Back');
                $("#oznaka_dokumenta").html('<b>INVOICE</b>');
                $("#forma_emaila_naslov").html('Send Invoice');
                $("#forma_emaila_obavestenje").html('By submitting invoices becomes official.');
                $("#primalac_email_fakture").html('Recipient:&nbsp;<br><input id="ime_primaoca_emaila" type="text" value="" placeholder="Enter the recipient name">');
                $("#forma_emaila_naslov_label").html('Subject');
                $("#forma_emaila_textarea").html('Message');
                $("#naslov_status_fakture_na_otvorenoj_fakturi").html('STATUS OF INVOICE:');
                $("#promeni_status_text").html('Change status to');
                $("#skrivena_opcija_status").html('Select status');
                $("#Nije_placeno").html('Not paid');
                $("#Placeno").html('Paid');
                $("#Storno").html('Cancellation');


                //STRANICA PODESAVANJE
                $("#naslov_update").html('Edit personal information');
                $("#Promeni_boju").html('Change theme');
                $("#default_boja").html('Default');
                $("#svetlo_siva_boja").html('Light gray');
                $("#srednje_siva_boja").html('Medium gray');
                $("#tamno_siva_boja").html('Dark gray');
                $("#Promeni_jezik").html('Change language');
                $("#obrisi_nalog").val('Delete account');
                $("#label_email_update").html('Change email:');
                $("#label_lozinka_update").html('Change password / Not required');
                $("#label_ime_i_prezime_update").html('Change name and last name:');
                $("#label_ime_firme_update").html('Change of company name: ');
                $("#label_adresa_firme_update").html('Change of company address: ');
                $("#label_lokacija_firme_update").html('Change location:');
                $("#label_pib_firme_update").html('Change PIB:');
                $("#label_maticni_br_firme_update").html('Change the identification number:');
                $("#label_opis_firme_update").html('Change description:');
                $("#label_ziro_racun_update").html('Change bank account:');
                $("#label_broj_telefona_update").html('Change phone number:');
                $("#label_fix_br_telefona_update").html('Change phone number landline:');
                $("#sacuvaj_promene").val('Save changes');



                //STRANICA PRIKAZ KLIJENTA
                $("#prikaz_korisnika_naslov").html('Views client');
                $("#label_ime_komintenta_prikaz_klijenta").html('Name of client:');
                $("#label_pib_komintenta_prikaz_klijenta").html('Pib of client::');
                $("#label_predstavnistvo_komintenta_prikaz_klijenta").html('The office client:');
                $("#label_email_komintenta_prikaz_klijenta").html('E-mail client:');
                $("#promeni_osnovne_podatke_o_klijentu").val('Change basic information about the client');
                $("#promeni_osnovne_podatke_o_klijentu_dugme_sacuvaj").val('Save');
                $("#napravi_novu_fakturu_dugme_prikaz_klijenta").val('Create a new invoice for the customer');
                $("#prikaz_klijenta_naslov_kolona1").html('<b>S.N</b>');
                $("#prikaz_klijenta_naslov_kolona2").html('<b>Company name</b>');
                $("#prikaz_klijenta_naslov_kolona3").html('<b>PIB</b>');
                $("#prikaz_klijenta_naslov_kolona4").html('<b>DATE</b>');
                $("#prikaz_klijenta_naslov_kolona5").html('<b>Value of invoices</b>');
                $("#prikaz_klijenta_naslov_kolona6").html('<b>Review</b>');
                $("#prikaz_klijenta_naslov_kolona7").html('<b>Delete</b>');

                //STRANICA PRIKAZ KLIJENTA
  }
});

        $("#odabir_boje_pozadine").change(function(){

              if( $("#odabir_boje_pozadine").val() == 'podrazumevano'){

                      $('body').css("background-color","#FFFFFF");
                      $('body').css("color","black");
                      $('#dole').css("background-color","#FFFFFF");
                      $('#dole').css("color","black");
                    }
              else if( $("#odabir_boje_pozadine").val() == 'svetlo_siva'){
                      $('body').css("background-color","#caccce");
                      $('body').css("color","black");
                      $('#dole').css("background-color","#FFFFFF");
                      $('#dole').css("color","black");
              }
              else if( $("#odabir_boje_pozadine").val() == 'srednje_siva'){
                      $('body').css("background-color","#86888a");
                      $('body').css("color","white");
                      $('#dole').css("background-color","#FFFFFF");
                      $('#dole').css("color","black");
              }
              else if( $("#odabir_boje_pozadine").val() == 'tamno_siva'){
                     $('body').css("background-color","#313335");
                     $('body').css("color","white");
                     $('#dole').css("background-color","#FFFFFF");
                     $('#dole').css("color","black");
              }
        });
});
