<?php
session_start();
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
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <!-- <meta http-equiv="refresh" content="12;url=php/pocetna_php/logout.php" /> -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


<script src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.4.2/chosen.jquery.min.js"></script>  <!-- select dodatak CHOSEN odmah pri ucitavanju unos_fakture stranice -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.4.2/chosen.min.css">

<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="Izrada faktura brzo lako i jednostavno">
<meta name="keywords" content="Izrada,pravljenje,faktura,besplatna,brza,laka">
<meta name="author" content="Filip Ginder">

<link href="https://fonts.googleapis.com/css?family=Patua+One" rel="stylesheet">


<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>


<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<!-- <link rel="stylesheet" media="screen and (min-width: 900px)" href="widescreen.css">
<link rel="stylesheet" media="screen and (max-width: 600px)" href="smallscreen.css"> -->

<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/update.css">
<link rel="stylesheet" id="css_za_menjanje" href="css/fakture/osnovni_prikaz_fakture.css">

<script src="js/jquery-scripta-pocetna.js"></script>
<script src="js/jquery-scripta-update.js"></script>
<script type="text/javascript" src="js/prevodi/jquery-scripta-pocetna-za-prevodjenje.js"></script>
<script type="text/javascript" src="js/prevodi/promena_jezika_iz_podesavanja.js"></script> <!--   TREBA PROVERITI -->

<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>    <!-- alert-->

<script src="dodaci/dropzone.js"></script>
<link rel="stylesheet" href="dodaci/dropzone.css">
<script src="js\jQuery.print.js"></script>
<link rel="shortcut icon" href="slika/favicon.ico">
<link rel="apple-touch-icon" href="slika/favicon.png">
<link rel="icon" sizes="192x192" href="slika/favicon.png">
    <meta charset="utf-8">
    <title>Izrada Faktura</title>
  </head>
  <body>

    <?php
    if(isset($_SESSION['id'])){
      ini_set('session.gc_maxlifetime', 10);
    ?>
    <?php
      include('views/pomocne_stranice_index_strane/dugmici_go-top_i_poruka_adminu.php'); //ovo su dugmici za povratak na vrh i za poruku adminu
     ?>
    <div id="wait"><img src='slika/loading.gif' width="100" height="100" /></div>
    <div class="container" id="gore">
         <div class="row">
            <div class="col-md-12">
              <!-- <input type="image" src="slika/logout.png" id="logout" value="Zatvori program" style="float:right;"> -->
              <button type="button" style="float:right; background: none;border: none;" id="logout">Izadji <img src="slika/logout.png"></button>
              <input type="image" src="slika/gear.png" id="podesavanja"  style="float:right; margin-right:10px;">
              <div id="slikica_logo"></div>

              <!-- <img src="slika/pvc-prozor-dupli.jpg" alt="slicica" id="slika"> -->
                  <h1 id="ime_firme_na_pocetnoj"></h1>
                         <p><span id="lokacija_firme_na_pocetnoj"></span>&nbsp;<span id="adresa_firme_na_pocetnoj"></span></p>
                        <p id="treci_red_za_prevod">PIB: <span id="pib_firme_na_pocetnoj"></span>&nbsp;&nbsp;&nbsp;MATICNI BROJ: <span id="maticni_br_firme_na_pocetnoj"></span></p>
                        <p id="cetvrti_red_za_prevod">ZIRO RACUN: <span id="ziro_racun_na_pocetnoj"></span></p>  <!-- SVE OVO ISTO JE NAPRAVLJENO U PREVODIMA OVE STRANICE I ONO SE KORISI ALI NEKA GA I OVO -->
                        <p id="peti_red_za_prevod">EMAIL: <span id="email_na_pocetnoj"></span></p>


                      <abbr title='Kreiranje nove fakture'><input type="button" class="btn btn-success" name="datum" id="kreiraj_fakturu" value="Napravi novu fakturu"></abbr>
                      <!-- <abbr title='Stampanje papira sa skicom za opis proizvoda'><input type="button" class="btn btn-success" name="datum" id="stampaj_skice" value="Stampaj skice"></abbr> -->

                 </div>
            </div>
            <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-3">
                              <div id="div_izbor_firme_select">
                                    <select  class="js-example-basic-single" id="izbor_firme_select" data-placeholder="">
                                         <option></option>
                                    </select>
                             </div>
                  </div>
                    <div class="col-md-3">
                             <div id="div_izbor_statusa_select">
                                <select  class="js-example-basic-single" id="izbor_statusa_select" data-placeholder="">
                                     <option value="sve_fakture"></option>
                                </select>
                           </div>
                     </div>
                    <div class="col-md-3">
                        <div id="div_izbor_godine">
                                  <select class="js-example-basic-single" id="izbor_godine" data-placeholder="">
                                      <option value="sve_fakture"></option>
                                  </select>
                      </div>
                  </div>
                    <div class="col-md-2"></div>
            </div>







          <div class="row">
             <div class="col-md-12 col-md-offset-2">
                    <div class="table-responsive">



                    <table class="table table-bordered" id="tabla">
                           <thead>
                                 <tr>
                                   <td id="naslov_kolona1"><b>R.B</b></td>
                                   <td id="naslov_kolona2"><b>Ime Firme</b></td>
                                   <td id="naslov_kolona3"><b>PIB</b></td>
                                   <td id="naslov_kolona4"><b>Datum</b></td>
                                   <td id="naslov_kolona5"><b>Vrednost fakture</b></td>
                                   <td id="naslov_kolona8"><b>Status</b></td>
                                   <td id="naslov_kolona6"><b>Pregled</b></td>
                                   <td id="naslov_kolona7"><b>izbrisati</b></td>
                                 </tr>
                           </thead>
                           <tbody>

                           </tbody>
                   </table>

                  </div>

             </div>

          </div>
    </div>
<?php
include("views/pomocne_stranice_pocetne_strane/za_stampanje.php");
include("php/pocetna_php/pdf.php");
include("views/pomocne_stranice_pocetne_strane/crtezi.php");
include("views/pomocne_stranice_pocetne_strane/podesavanje.php");
include("views/pomocne_stranice_pocetne_strane/modal-logo-promena.php");
include("views/pomocne_stranice_pocetne_strane/prikaz_klijenta.php");
include("views/pomocne_stranice_pocetne_strane/modal_dobrodoslice.php");


}
else if(isset($_SESSION['admin']))
{
include("views/pomocne_stranice_pocetne_strane/admin.php");
}
else{
	header('location: index.php');
}
 ?>
</body>
</html>
