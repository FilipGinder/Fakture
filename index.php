<!DOCTYPE html>
<html lang="sr" dir="ltr">
  <head>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">  <!-- dodatak za ikonice drustvenih mreza u footeru fa fa-facebook i ostale -->
<link rel="stylesheet" href="css/pocetna.css">
<link rel="shortcut icon" href="slika/favicon.ico">
<link rel="apple-touch-icon" href="slika/favicon.png">
<link rel="icon" sizes="192x192" href="slika/favicon.png">
<link rel="stylesheet" href="dodaci/video-galerija/svvg-styles.css">  <!-- dodatak za video galeriju -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script> -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>    <!-- alert-->
<script src="dodaci/video-galerija/speedvault.js"></script>  <!-- dodatak za video galeriju -->
<!-- <script src="//code.jquery.com/jquery.min.js"></script> -->
<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script> <!--  DODATAK ZA VIBRACIJU INPUTA PRILIKOM PRAZNOG POLJA-->
<script type="text/javascript" src="js/jquery-scripta-index-registracija.js"></script>
<!-- <script type="text/javascript" src="js/jquery-scripta-index-logovanje.js"></script> -->
<script type="text/javascript" src="js/prevodi/jquery-scripta-index-za-prevodjenje.js"></script>
<meta charset="utf-8">

<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="Aplikacija za brzo i jednostavno pravljenje faktura u par koraka">
<meta name="keywords" content="Izrada,pravljenje,faktura,besplatna,brza,laka">
<meta name="author" content="Filip Ginder">
<meta charset="utf-8">
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-133771125-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-133771125-1');
</script>
    <title>Trikorijum Fakturisanje lako moze svako</title>
  </head>
  <body>
    <?php
    session_start();
//    unset($_SESSION['id']);
?>
<?php
         include('views/pomocne_stranice_index_strane/setajuce_slike.php');  //ovo su setajuce slike koje su z-index -1
        ?>
<div id="wait"><img src='slika/loading.gif' width="100" height="100" /></div>
    <div class="container" id="sve_na_index_strani">   <!-- prvi div sa slikama -->
      <?php
        include('views/pomocne_stranice_index_strane/dugmici_go-top_i_poruka_adminu.php'); //ovo su dugmici za povratak na vrh i za poruku adminu
       ?>

    <div id="header">
      <img src="slika/logo prava.png" height="60" width="350" alt="Logo" id="prvi_logo_na_stranici">

    </div>

    <nav class="navbar navbar-expand-lg navbar-light bg-ligh" id="meni_index">
      <div id="bocne_ikonice">
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://onlineshopfast.000webhostapp.com/" target="_blank" rel="noopener">
            <img src="slika/facebook-bocno.jpg" id="bocni_facebook" alt="facebook"></a>
        <a href="viber://chat?number=+38169709284" id="bocni_viber_osnova"><img src="slika/viber-bocno.png" id="bocni_viber" alt="viber"></a>
      </div>
      <!-- OVA DVA DIVA MORAJU OVDE DA BIH MOGLI DA SE ZA TELEFON PREBACE U NAVIGACIJU -->
      <div id="jezici">
            <a href="#" id="engleski"><img id="engleski_slika" src="slika/flag_EN.png" alt="engleski" height="50" width="50"></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="#" id="srpski"><img id="srpski_slika" src="slika/serbian.png" alt="srpski" height="50" width="50"></a>
       </div>
            <button class="navbar-toggler" id="dugme_navigacije_sa_telefona" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <div id="logo_u_navigaciji_za_telefon">
                <img src="slika/logo prava.png" width="220px" height="90px" alt="logo">
              </div>
              <img src="slika/icon.png" alt="iks" id="zatvori_navigaciju_telefon">
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <a class="navbar-brand" href="#"><i id="dugme_pocetna">Pocetna</i></a>
                </li>
                <li class="nav-item">
                  <a class="navbar-brand" href="#"><i id="dugme_o_nama">O nama</i></a>
                </li>
                <li class="nav-item">
                  <a class="navbar-brand" href="#"><i id="dugme_logovanje">Prijavi se</i></a>
                </li>
                <li class="nav-item">
                  <a class="navbar-brand" href="#"><i id="dugme_cena">Cena</i></a>
                </li>
                <li class="nav-item">
                  <a class="navbar-brand" href="#"><i id="dugme_video_uputstva">Video uputstva</i></a>
                </li>
                <li class="nav-item">
                  <a class="navbar-brand" href="#"><i id="dugme_kontakt">Kontakt</i></a>
                </li>
                <li class="nav-item">
                  <a class="navbar-brand" href="#"><i id="dugme_demo">Demo</i></a>
                </li>
              </ul>
            </div>
    </nav>
    <?php
    include('views/pomocne_stranice_index_strane/logovanje.php');
    include('views/pomocne_stranice_index_strane/registracija.php');
    include('views/pomocne_stranice_index_strane/zaboravljena_lozinka.php');
    include("views/pomocne_stranice_index_strane/modal_uslovi_koriscenja.php");
     ?>
    <img src="slika/logo prava.png" id="rotirajuci_logo" alt="logo">
</div>
<?php
 include('views/pomocne_stranice_index_strane/div_o_nama.php');
 include('views/pomocne_stranice_index_strane/div_sa_fakturom_i_tabelom.php');
 include('views/pomocne_stranice_index_strane/div_sa_cenovnikom.php');
 include("views/pomocne_stranice_index_strane/div_sa_slikom_malom.php");
 include("views/pomocne_stranice_index_strane/div_video_uputstva.php");
 include("views/pomocne_stranice_index_strane/div_kontakt.php");

 ?>







<?php
include('views/pomocne_stranice_index_strane/footer.php');

include('views/pomocne_stranice_index_strane/pomocna_navigacija.php');
 ?>
 <!-- REGISTRACIJA   -->

<!-- <a download="slika/Milan-Grb.JPG" href="slika/Milan-Grb.JPG">skini</a> -->

  </body>
</html>
