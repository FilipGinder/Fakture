
<?php
use PHPMailer\PHPMailer\PHPMailer;
include_once "PHPMailer/PHPMailer.php";
include_once "PHPMailer/Exception.php";
include_once "PHPMailer/SMTP.php";

session_start();

function prikaz_za_stampu_podaci_vlasnika()
{
 include('konekcija.php');
  $id = $_SESSION['id'];
  $upit = "SELECT ime_firme,lokacija_firme,adresa_firme,pib_firme,maticni_br_firme,ziro_racun,opis_firme,ime_vlasnika,broj_telefona,fix_br_telefona,email,slika FROM korisnici WHERE id = $id";
  $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
  $rezultat->execute();
  $rezultat->bind_result($ime_firme,$lokacija_firme,$adresa_firme,$pib_firme,$maticni_br_firme,$ziro_racun,$opis_firme,$ime_vlasnika,$broj_telefona,$fix_br_telefona,$email,$slika);

 while ($rezultat->fetch()) {
  $jezik = $_GET['jezik'];
  $prikaz_kao_faktura_ili_kao_predracun = $_GET['prikaz_kao_faktura_ili_kao_predracun'];
    $output = '
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
         <meta charset="utf-8">
         <title>Faktura</title>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
         <script src="js\jquery-scripta-stranica-za-stampanje.js"></script>
        <link rel="stylesheet" id="css_za_menjanje" href="css/fakture/osnovni_prikaz_fakture_za_email.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <script src="js\jQuery.print.js"></script>
      </head>
      <body>
    <div>
       <div id="papir">';
    if($prikaz_kao_faktura_ili_kao_predracun == "predracun")                               //ako je predracun u pitanju onda prikazuje ovaj <nav> tag i ispis PREDRACUN
    {
       $output .='<nav class="navbar" id="predracun_naslov" style="display:block;">
  PREDRACUN
      </nav>';
    }
    if($prikaz_kao_faktura_ili_kao_predracun == "faktura")                              //ako je faktura onda prikazuje ovaj <nav> koji je css-om uklonjen to jes prikazuje samo fakturu
    {
       $output .='<nav class="navbar" id="predracun_naslov" style="display:none;">
  PREDRACUN
      </nav>';
    }



        if(isset($slika) || $slika !== "" || $slika !== null ){            //ako ime slike postoji onda pronalazi sliku u folderu i prikazuje ceo ovaj html block
          $output .='
          <div id="slikica_logo_za_email">
               <img src="folder-logo/'.$ime_firme.'/'.$slika.'" height="180" width="180" alt="problem" id="slika_logo_pocetna_email">
          </div>

          <h1 id="ime_firme_za_stampanje">'.$ime_firme.'</h1>
          <p><b><span id="opis_firme_za_stampanje">'.$opis_firme.'</span></b></p>
          <p><b><span id="lokacija_firme_za_stampanje">'.$lokacija_firme.'</span> &nbsp;<span id="adresa_firme_za_stampanje">'.$adresa_firme.'</span></b></p>
          <p id="treci_red_za_stampanje_prevod"><b>PIB:&nbsp; <span id="pib_firme_za_stampanje">'.$pib_firme.'</span> &nbsp; MATICNI &nbsp;BROJ: &nbsp; <span id="maticni_br_firme_za_stampanje">'.$maticni_br_firme.'</span></b></p>
          <p id="cetvrti_red_za_stampanje_prevod"><b>ZIRO &nbsp; RACUN: &nbsp; <span id="ziro_racun_za_stampanje">'.$ziro_racun.'</span></b></p>
          <p id="peti_red_za_stampanje_prevod"><b>VLASNIK: &nbsp;<span id="ime_vlasnika_za_stampanje">'.$ime_vlasnika.'</span> </b></p>
          <p id="sesti_red_za_stampanje_prevod"><b>MOB. TEL: &nbsp;<span id="broj_telefona_za_stampanje">'.$broj_telefona.'</span> </b></p>
          <p id="sedmi_red_za_stampanje_prevod"><b>FIX TEL: &nbsp;<span id="fix_br_telefona_za_stampanje"'.$fix_br_telefona.'></span> </b></p>
          <p><b>EMAIL: &nbsp;<span id="email_za_stampanje">'.$email.'</span> </b></p>
          ';
        }
        else{                                     //a ako slika ne postoji onda prikazuje isti html blok samo bez <img> taga
        $output .='

            <h1 id="ime_firme_za_stampanje">'.$ime_firme.'</h1>
            <p><b><span id="opis_firme_za_stampanje">'.$opis_firme.'</span></b></p>
            <p><b><span id="lokacija_firme_za_stampanje">'.$lokacija_firme.'</span> &nbsp;<span id="adresa_firme_za_stampanje">'.$adresa_firme.'</span></b></p>
            <p id="treci_red_za_stampanje_prevod"><b>PIB:&nbsp; <span id="pib_firme_za_stampanje">'.$pib_firme.'</span> &nbsp; MATICNI &nbsp;BROJ: &nbsp; <span id="maticni_br_firme_za_stampanje">'.$maticni_br_firme.'</span></b></p>
            <p id="cetvrti_red_za_stampanje_prevod"><b>ZIRO &nbsp; RACUN: &nbsp; <span id="ziro_racun_za_stampanje">'.$ziro_racun.'</span></b></p>
            <p id="peti_red_za_stampanje_prevod"><b>VLASNIK: &nbsp;<span id="ime_vlasnika_za_stampanje">'.$ime_vlasnika.'</span> </b></p>
            <p id="sesti_red_za_stampanje_prevod"><b>MOB. TEL: &nbsp;<span id="broj_telefona_za_stampanje">'.$broj_telefona.'</span> </b></p>
            <p id="sedmi_red_za_stampanje_prevod"><b>FIX TEL: &nbsp;<span id="fix_br_telefona_za_stampanje"'.$fix_br_telefona.'></span> </b></p>
            <p><b>EMAIL: &nbsp;<span id="email_za_stampanje">'.$email.'</span> </b></p>
    ';
    }
  }

return $output;

}

function prikaz_za_stampu_podaci_o_klijentu(){
  include ('konekcija.php');
    $id_fakture = $_GET['id_fakture'];
    $upit = "SELECT ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,lokacija_partnerske_firme,email_klijenta,redni_broj_fakture,trenutna_godina FROM fakture WHERE id_fakture = $id_fakture";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();
    $rezultat->bind_result($ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$lokacija_partnerske_firme,$email_klijenta,$redni_broj_fakture,$trenutna_godina);

    $output = '
       <div id="broj_fakture"><b>FAKTURA:&nbsp;&nbsp;'.$redni_broj_fakture.'&nbsp;/&nbsp;'.$trenutna_godina.'</b></div>';

    while ($rezultat->fetch()){

    if($partnerov_pib !== ""){

    $output .= '
       <div id="podaci_kupca"><div id="podaci_kupca_gornji_deo"><div id="div_pasus_naslov"><h3 id="pasus_naslov">'.$ime_na_koga_je_faktura.'</h3></div><div id="div_pasus_email"><strong id="pasus_email">'.$email_klijenta.'</strong></div></div><div id="podaci_kupca_donji_deo"><div id="div_pasus_pib"><p id="pasus_pib"><b>Pib:&nbsp;'.$partnerov_pib.'</b></p></div><div id="div_pasus_datum"><p id="pasus_datum"><b>Datum:&nbsp;'.$datum_pravljenja_fakture.'</b></p></div><div id="div_pasus_lokacija"><p id="pasus_lokacija"><b>Objekat:&nbsp;'.$lokacija_partnerske_firme.'</b></p></div></div></div>
   ';
 }
 else{
   $output .= '
      <div id="podaci_kupca"><div id="podaci_kupca_gornji_deo"><div id="div_pasus_naslov"><h3 id="pasus_naslov">'.$ime_na_koga_je_faktura.'</h3></div><div id="div_pasus_email"><strong id="pasus_email">'.$email_klijenta.'</strong></div></div><div id="podaci_kupca_donji_deo"><div id="div_pasus_pib"><p id="pasus_pib"><b>Pib:&nbsp;'.'Fizicko lice'.'</b></p></div><div id="div_pasus_datum"><p id="pasus_datum"><b>Datum:&nbsp;'.$datum_pravljenja_fakture.'</b></p></div><div id="div_pasus_lokacija"><p id="pasus_lokacija"><b>Objekat:&nbsp;'.$lokacija_partnerske_firme.'</b></p></div></div></div>
  ';
 }
      }
    return $output;
}


function prikaz_za_stampu_podaci_iz_tabele(){
  include ('konekcija.php');
    $id_fakture = $_GET['id_fakture'];
    $upit = "SELECT DISTINCT * FROM artikli_fakture WHERE id_vlasnika_fakture = '$id_fakture'";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();

    $rezultat->bind_result($id,$id_vlasnika,$redni_br,$naziv_artikla,$jedinica_mere,$kolicina,$cena_bez_pdv,$cena_puta_kolicina,$rabat,$ukupan_rabat,$pdv,$iznos_pdv,$ukupna_vrednost);

      $output = '

      <table class="table table-bordered table-hovered" id="tabla_za_stampanje">
             <thead>
                   <tr id="naslov_tabele_za_stampanje">
                     <td id="naslov_kolona_za_stampanje1"><b>R.B</b></td>
                     <td id="naslov_kolona_za_stampanje2"><b>Naziv artikla</b></td>
                     <td id="naslov_kolona_za_stampanje3"><b>JM</b></td>
                     <td id="naslov_kolona_za_stampanje4"><b>Kolicina</b></td>
                     <td id="naslov_kolona_za_stampanje5"><b>Cena bez PDV</b></td>
                     <td id="naslov_kolona_za_stampanje6"><b>Rabat</b></td>
                     <td id="naslov_kolona_za_stampanje7"><b>PDV</b></td>
                     <td id="naslov_kolona_za_stampanje8"><b>Iznos PDV</b></td>
                     <td id="naslov_kolona_za_stampanje9"><b>Ukupna vrednost</b></td>
                   </tr>
             </thead>
             <tbody>
      ';
      while ($rezultat->fetch())
      {
        $output .= '
        <tr id="stavke_u_tabeli">
          <td><b>'.$redni_br.'</b></td>
          <td><b>'.$naziv_artikla.'</b></td>
          <td><b>'.$jedinica_mere.'</b></td>
          <td><b>'.$kolicina.'</b></td>
          <td><b>'.$cena_bez_pdv.'</b></td>
          <td><b>'.$rabat.'</b></td>
          <td><b>'.$pdv.'</b></td>
          <td><b>'.$iznos_pdv.'</b></td>
          <td><b>'.$ukupna_vrednost.'</b></td>
        </tr>
          ';
      }
      $output .= '
          </tbody>
          </table>

      ';
     return $output;
}
function prikaz_za_stampu_podaci_o_ukupnim_citrama(){
  include ('konekcija.php');
    $id_fakture = $_GET['id_fakture'];

    $upit = "SELECT SUM(cena_puta_kolicina) AS 'cena_puta_kolicina',SUM(iznos_pdv) AS 'iznos_pdv',SUM(ukupna_vrednost) AS 'ukupna_vrednost',SUM(ukupan_rabat) AS 'ukupan_rabat' FROM artikli_fakture WHERE id_vlasnika_fakture = '$id_fakture'";
    $rezultat = mysqli_query($konekcija,$upit);
    $data = mysqli_fetch_array($rezultat,MYSQLI_NUM);
    $data0 = number_format($data[0],2);
    $data1 = number_format($data[1],2);
    $data2 = number_format($data[2],2);
    $data3 = number_format($data[3],2);

    $ukupna_cifra = $data[2];
    $ukupna_cifra = round($ukupna_cifra, 2);   //SVODI NA DVE DECIMALE

    $upit1 = "UPDATE fakture SET vrednost_fakture = $ukupna_cifra WHERE id_fakture = '$id_fakture'";
    $rezultat1 = $konekcija->prepare($upit1);
    $rezultat1->execute();

    $output = '
    <strong id="paragraf_za_placanje">UKUPAN&nbsp;IZNOS&nbsp;ZA&nbsp;UPLATU:&nbsp;&nbsp;<span id="za_placanje">'.$data2.'</span></strong>
                  <div class="ukupne_cifre">

                    <p id="paragraf_cena">Cena bez PDV:&nbsp;&nbsp;<strong id="ukupaa_cena_bez_pdv">'.$data0.'</strong></p>

                    <p id="paragraf_pdv">Iznos PDV:&nbsp;&nbsp;<strong id="ukupan_iznos_pdv">'.$data1.'</strong></p>

                    <p id="paragraf_ukupno">Vrednost sa PDV:&nbsp;&nbsp;<strong id="ukupna_ukupna_vrednost">'.$data2.'</strong></p>

                    <p id="paragraf_rabat">Rabat:&nbsp;&nbsp;<strong id="ukupan_rabat">'.$data3.'</strong></p>

                   </div>

                   <div class="potpisi">
                     <div id="levi_potpis">RACUN&nbsp;KREIRAO</div>
                     <div id="pecat">M.P</div>
                     <div id="desni_potpis">RACUN&nbsp;PRIMIO</div>
                   </div>

    </body>
  </html>

    ';
    return $output;
  }

   if(isset($_GET['id_fakture']))
   {
      $naslov = $_GET['naslov_emaila'];
      $poruka = $_GET['poruka_emaila'];
      $ime_primaoca_emaila = $_GET['ime_primaoca_emaila'];

      include('php/pocetna_php/pdf.php');
      $file_name = md5(rand()) . '.pdf';
      $html_code = '<link rel="stylesheet" id="css_za_menjanje" href="css/fakture/osnovni_prikaz_fakture.css">';
      $html_code .= '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">';
      $html_code .= prikaz_za_stampu_podaci_vlasnika();
      $html_code .= prikaz_za_stampu_podaci_o_klijentu();
      $html_code .= prikaz_za_stampu_podaci_iz_tabele();
      $html_code .= prikaz_za_stampu_podaci_o_ukupnim_citrama();
      $pdf = new Pdf();
      $pdf->load_html($html_code);
      $pdf->setPaper('A4', 'portrait');
      $pdf->render();
      $file = $pdf->output();
      file_put_contents($file_name, $file);
    //  $pdf->stream("dompdf_outFRK.pdf", array("Attachment" => 0));


      $mail = new PHPMailer();
      $mail->Host = "smtp.gmail.com";
      //$mail->IsSMTP();
      $mail->SMPTAuth = true;
      $mail->Username = "slanjefakture@gmail.com";
      $mail->Password = "8!slanjefakture!8";
      $mail->SMTPSecure = "tls";
      $mail->Port = 587;
      $mail->addAddress($ime_primaoca_emaila);
      $mail->setFrom('Besplatnaizradafaktura@gmail.com');
      $mail->Subject = $naslov;
      $mail->isHTML(true);
      $mail->AddAttachment($file_name);
      $mail->Body = $poruka;



      if($mail->send()){
        unlink($file_name);
        exit(json_encode('uspesno poslat email'));
      }
      else{
        unlink($file_name);
        exit(json_encode('Nije poslat email'));
      }

}


echo prikaz_za_stampu_podaci_vlasnika();
echo prikaz_za_stampu_podaci_o_klijentu();
echo prikaz_za_stampu_podaci_iz_tabele();
echo prikaz_za_stampu_podaci_o_ukupnim_citrama();

?>
