<?php
session_start();
if(isset($_SESSION['id'])){
?>
<!DOCTYPE html>
<html lang="sr" dir="ltr">
  <head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-133771125-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-133771125-1');
</script>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Izrada faktura brzo lako i jednostavno">
<meta name="keywords" content="Izrada,pravljenje,faktura,besplatna,brza,laka">
<meta name="author" content="Filip Ginder">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">  <!--  modal -->

<script src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.4.2/chosen.jquery.min.js"></script>  <!-- select dodatak CHOSEN odmah pri ucitavanju unos_fakture stranice -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.4.2/chosen.min.css">

<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>    <!-- alert-->


 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>  <!-- modal  -->

 <link rel="stylesheet" href="css/unos-style.css"> <!-- moj style -->


<!--<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>   DODATAK ZA VIBRACIJU INPUTA PRILIKOM PRAZNOG POLJA-->
<script src="js/jquery-scripta-unos.js"></script>
<script type="text/javascript" src="js/prevodi/jquery-scripta-unos_faktura-za-prevodjenje.js"></script>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="slika/favicon.ico">
    <link rel="apple-touch-icon" href="slika/favicon.png">
    <link rel="icon" sizes="192x192" href="slika/favicon.png">
    <title id="title"></title>
  </head>
  <body>

    <div class="container">
      <div class="row" id="red_osnovni_podaci">
                <div class="col-md-3" style="background-color:lightcyan;">
                       <h1 style="text-shadow: 2px 2px #FF0000;" id="ime_firme_naslov_na_unos_faktura_stranici"></h1>
                          <label for="ime_primaoca" id="label_ime_primaoca">Unesite ime za koga je faktura:</label>
                          <br>
                          <input type="text" id="ime_primaoca" placeholder="Ime primaoca">
                          <br><br>
                          <label for="partnerov_PIB" id="label_partnerov_PIB">Unesite PIB kupca:</label>
                          <br>
                          <input type="text" id="partnerov_PIB" placeholder="Partnerov PIB">
                              <br><br>
                          <!-- <input type="button" id="povratak_na_pocetnu" class="glyphicon glyphicon-remove-circle" value=""> -->

                </div>
                <div class="col-md-3" style="background-color:lightcyan;">
                         <label for="partnerov_Email" id="label_partnerov_Email">Unesite Email kupca:</label>
                         <br>
                         <input type="text" id="partnerov_Email" placeholder="Partnerov Email">
                         <br>
                         <br>
                         <label for="objekat" id="label_objekat">Lokacija partnerove firme:</label>
                         <br>
                         <input type="text" id="objekat" placeholder="Objekat">
                         <br>
                         <br>
                         <label for="datum" id="label_datum">Datum pravljenja fakture:</label>
                         <br>
                         <input type="date" timezone="[[timezone]]" id="datum">


                </div>
                <div class="col-md-3" style="background-color:lightcyan;">

                  <label for="select_odabira_valute" id="select_odabira_valute_label">Odabir valute/opciono</label>
                  <br>
                  <select id="select_odabira_valute">
                    <option value="RSD">RSD</option>
                    <option value="EUR">EUR</option>
                  </select>
                  <br>
                  <br>
                         <abbr title='Proveri podatke pre cuvanja'><button type="button" id="osnovni_podaci" class="btn btn-success">Sacuvaj osnovne podatke</button></abbr>

                </div>
                <div class="col-md-3">
                  <input type="image" src="slika/icon.png" id="povratak_na_pocetnu" style="float:right;">
                  <img src="slika/logo prava.png" id="logo_unos_faktura" height="60" width="250" alt="Logo">
                </div>
      </div>


  <div class="row" id="podaci_iz_fakture">
          <div class="col-md-12" style="background-color:orange;">
            <div class="table-responsive">
              <table class="table" id="moja_tabela">
                <thead>
                  <tr>
                    <th id="naslov_kolona1">R.B</th>
                    <!-- <th>Sifra</th> -->
                    <th id="naslov_kolona2">Naziv artikla</th>
                    <th id="naslov_kolona3">JM</th>
                    <th id="naslov_kolona4">Kolicina</th>
                    <th id="naslov_kolona5">Cena bez<br>PDV</th>
                    <th id="naslov_kolona6">&nbsp;&nbsp;&nbsp;%<br>Rabat</th>
                    <th id="naslov_kolona7">PDV</th>
                    <th id="naslov_kolona8">Iznos<br>PDV</th>
                    <th id="naslov_kolona9">Vrednost sa<br>PDV</th>
                    </tr>
                </thead>
                <tbody>
                  <tr>
                      <td><input type="text" class="polja" name="redni_broj" value="1"></td>
                      <!-- <td><abbr title='Nije obavezno popuniti'><input type="text" class="polja" name="sifra"></abbr></td> -->
                      <td><input type="text" class="polja" name="naziv_artikla" list="lista_artikala">
                        <!-- <datalist id="lista_artikala"> -->
                            <!-- <option value="Kupatilski prozor 5 komora">
                            <option value="PVC prozor jednokrilni 5 komora">
                            <option value="PVC prozor dvokrilni 5 komora">
                            <option value="PVC prozor trokrilni 5 komora">
                            <option value="PVC balkonska vrata 5 komora">
                            <option value="PVC balkonska dvokrilna vrata 5 komora">
                            <option value="PVC ulazna vrata staklo 5 komora">
                            <option value="PVC ulazna vrata PVC panel 5 komora">
                            <option value="PVC ulazna vrata AL panel 5 komora">
                            <option value="PVC ulazna vrata 2 krila staklo 5 komora">
                            <option value="PVC ulazna vrata 2 krila pvc panel 5 komora">
                            <option value="PVC ulazna vrata 2 krila al panel 5 komora">
                            <option value="PVC svetlarnik 5 komora">
                            <option value="PVC kupatilski prozor 6 komora">
                            <option value="PVC prozor jednokrilni 6 komora">
                            <option value="PVC prozor dvokrilni 6 komora">
                            <option value="PVC prozor trokrilni 6 komora">
                            <option value="PVC balkonska vrata 6 komora">
                            <option value="PVC balkonska vrata dvokrilna 6 komora">
                            <option value="PVC prozor jednokrilni 8 komora">
                            <option value="PVC prozor dvokrilni 8 komora">
                            <option value="PVC prozor trokrilni 8 komora">
                            <option value="PVC klupica 15cm">
                            <option value="PVC klupica 20cm">
                            <option value="PVC klupica 25cm">
                            <option value="PVC klupica 30cm">
                            <option value="PVC klupica 40cm">
                            <option value="PVC roletna">
                            <option value="PVC spoljna roletna">
                            <option value="AL roletna">
                            <option value="PVC fiksni komarnik">
                            <option value="AL fiksni komarnik">
                            <option value="AL rolo komarnik">
                            <option value="AL plise komarnik vrata">
                            <option value="AL ulazna vrata (termo)">
                            <option value="AL ulazna vrata dva krila">
                            <option value="AL prozor termo">
                            <option value="PVC sobna vrata">
                            <option value="Ugradnja stolarije">
                            <option value="Popravka stolarije">
                            <option value="Opsivanje stolarije">
                            <option value="PVC prozor imitacija drveta">
                            <option value="PVC vrata imitacija drveta">
                            <option value="Venecijaneri">
                            <option value="Trakaste zavese">
                            <option value="Ugradnja drvenih vrata"> -->
                        <!-- </datalist> -->
                     </td>
                      <td>
                          <input type="text" class="polja" name="jedinica_mere" list="lista">
                              <datalist id="lista">
                                  <option value="m2">
                                  <option value="Kom">
                                  <option value="/">
                              </datalist>
                      </td>
                      <td><abbr title='Kolicinu mozete promeniti'><input type="text" class="polja" name="kolicina" value="1"></abbr></td>
                      <td><input type="text" class="polja" name="cena_bez_pdv"></td>
                      <td><abbr title='Polje rabat nije obavezno popuniti'><input type="text" class="polja" name="rabat"></abbr></td>
                      <td><input type="text" class="polja" name="pdv" value="20"></td>
                      <td><input type="text" id="polje_iznos_pdv" name="iznos_pdv" disabled></td>
                      <td><input type="text" id="polje_vrednost_sa_pdv" name="vrednost_sa_pdv" disabled></td>
                      <td><input type="image" src="slika/check-mark.png" name="plus" id="plus" value="Sacuvaj"></td>
                      <!-- <td><button type="button" class="close" aria-label="Close"  name="minus"><span name="minus" aria-hidden="true">&times;</span></button></td> -->
                </tr>
                </tbody>

              </table>



         </div>
      </div>
  </div>
               <div class="row" id="ukupne_cifre">
                      <!-- <div class="col-md-3"> -->
                        <nav class="navbar-fixed-bottom navbar-light bg-light" id="donja_navigacija">
                          <ul class="nav navbar-nav">
                            <li>
                              <div>
                                  <p id="text_ukupaa_cena_bez_pdv"><b>Cena bez PDV:</b></p><p id="ukupaa_cena_bez_pdv"></p>

                                  <p id="text_ukupan_iznos_pdv"><b>Iznos PDV:</b></p><p id="ukupan_iznos_pdv"></p>

                                  <p id="text_ukupan_rabat"><b>Ukupan Rabat:</b></p><p id="ukupan_rabat"></p>

                                  <p id="text_ukupna_ukupna_vrednost"><b>Vrednost sa PDV:</b></p><p id="ukupna_ukupna_vrednost"></p>
                             </div>
                        </li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                          <li>
                            <input type="button" id="odbaci_fakturu" class="btn btn-danger" title="Obrisi sve podatke do sad unesene ali ostavi osnovne podatke o fakturi" value="Odbaci Fakturu">
                            <input type="button" id="sacuvaj_fakturu" class="btn btn-success" value="Sacuvaj Fakturu">
                        </li>
                        </ul>

                        </nav>
                      <!-- </div>
                      <div class="col-md-5"></div>
                          <div class="col-md-4"> -->


                          <!-- </div> -->
               </div>



    </div>
<?php
include("modal_unos_faktura.php");
 ?>

  </body>
</html>
<?php
}
else{
	header('location: index.php');
}
 ?>
