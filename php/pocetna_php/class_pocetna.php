<?php
//OVDE IMAMO FUNKCIJE logout, prikaz_podataka_o_korisniku, promena_statusa_fakture_neplaceno_placeno, prvo_logovanje_promena, slanje_fakture_emailom, upload_logo
use PHPMailer\PHPMailer\PHPMailer;              //ovde ispred klase uvozimo phpMailer koji nam treba za funkciju zaboravljena lozinka
include_once "../../PHPMailer/PHPMailer.php";
include_once "../../PHPMailer/Exception.php";
include_once "../../PHPMailer/SMTP.php";
session_start();
class class_pocetna
{
  function logout()
  {
              //ZA DEMO VERZIJU KAD UDJE MOZE DA RADI SVE STO I NORMALAN KORISNIK OSIM DA OBRISE NALOG
              //ALI KAD IZADJE BRISE SE NJEGOVA SLIKA IZ FOLDERA (ako je ubacio) ZATIM SE BRISU SVE FAKTURE KOJE JE NAPRAVIO...I SVI LICNI PODACI O UNOSU ZA DATALIST
              //ZA SVE OSTALO RADI NORMALNO

              if($_SESSION['id'] == 183){
                                        $dir = opendir("../../folder-logo/Ime firme TESTIRANJE");      //OVO PRVO OTVARA FOLDER koji je uvek tu definisan
                                        while (($file = readdir($dir)) !== false){                //OVO CITA STA SVE IMA U FOLDERU I PAKUJE TE INFORMACIJE $file

                                           if(isset($file))
                                           {
                                              unlink("../../folder-logo/Ime firme TESTIRANJE/".$file);      //ZATIM BRISE SVE U TOM FOLDERU TJ ONO STO JE NAVEDENO $file
                                           }

                                        }
                                        include ('../../konekcija.php');
                                          $upit = "UPDATE korisnici SET slika = '' WHERE id = 183";      //ZATIM BRISE SVE IZ BAZE VEZANO ZA KORISNICKI ID u ovom slucaju za id za testiranje
                                          $rezultat = $konekcija->prepare($upit);                       //koji je uvek 183..tako zapalo :)
                                          $rezultat->execute();
                                          $konekcija->close();


                                        include ('../../konekcija.php');
                                            $upit1 = "DELETE FROM fakture WHERE id_korisnika = 183";      //ZATIM BRISE SVE ISPOROBANE FAKTURE VEZANE ZA TAJ ID
                                            $rezultat1 = $konekcija->prepare($upit1);
                                            $rezultat1->execute();
                                            $konekcija->close();

                                        include ('../../konekcija.php');
                                            $upit1 = "DELETE FROM podaci_o_artiklima WHERE id_korisnika = 183";      //ZATIM BRISE SVE ISPOROBANE SACUVANE PODATKE ZA DATALIST
                                            $rezultat1 = $konekcija->prepare($upit1);
                                            $rezultat1->execute();
                                            $konekcija->close();


                                        unset($_SESSION['id']);                                  //zatim brise sesiju
                                        header('location:../../index.php');                     //i vraca na pocetnu
                                       }

              else{
                unset($_SESSION['id']);                     //a ako je obican korisnik u pitanju tj nije uso preko DEMO varijante onda samo brise njegovu sesiju
                header('location:../../index.php');            //i vraca na pocetnu
                //Reset sesije i slanje na pocetnu...na ponovno logovanje
              }

  }

  function prikaz_podataka_o_korisniku()
  {
                                include ('../../konekcija.php');
                                $id = $_SESSION['id'];
                                $upit = "SELECT ime_firme,lokacija_firme,adresa_firme,pib_firme,maticni_br_firme,ziro_racun,opis_firme,ime_vlasnika,broj_telefona,fix_br_telefona,email,lozinka,poslednje_logovanje,slika FROM korisnici WHERE id = $id";
                                $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
                                $rezultat->execute();
                                $rezultat->bind_result($ime_firme,$lokacija_firme,$adresa_firme,$pib_firme,$maticni_br_firme,$ziro_racun,$opis_firme,$ime_vlasnika,$broj_telefona,$fix_br_telefona,$email,$lozinka,$poslednje_logovanje,$slika);


                                $rezultat_niz = array();

                                      while ($rezultat->fetch())
                                      {
                                       $rezultat_niz[]=array($ime_firme,$lokacija_firme,$adresa_firme,$pib_firme,$maticni_br_firme,$ziro_racun,$opis_firme,$ime_vlasnika,$broj_telefona,$fix_br_telefona,$email,$lozinka,$poslednje_logovanje,$slika);
                                      }
                                      $konekcija->close();
                                  exit(json_encode($rezultat_niz));
  }

  function promena_statusa_fakture_neplaceno_placeno()
  {
                              include ('../../konekcija.php');
                              $izabrani_status = mysqli_real_escape_string($konekcija,$_POST['izabrani_status']);
                              $izabrani_status = htmlspecialchars($izabrani_status);

                              $fakture_id = mysqli_real_escape_string($konekcija,$_POST['fakture_id']);
                              $fakture_id = htmlspecialchars($fakture_id);


                              $upit = "UPDATE fakture SET status_fakture = '$izabrani_status' WHERE id_fakture = '$fakture_id'";
                              $rezultat = $konekcija->prepare($upit);
                              $rezultat->execute();
                              $konekcija->close();
                              exit(json_encode('uspesno promenjen status'));
                            }

  function prvo_logovanje_promena()
  {
                              include ('../../konekcija.php');
                              $id = $_SESSION['id'];


                              $upit = "UPDATE korisnici SET poslednje_logovanje = 'nije prvo logovanje' WHERE id = '$id'";
                              $rezultat = $konekcija->prepare($upit);
                              $rezultat->execute();
                              $konekcija->close();
                              exit(json_encode('uspesno'));
  }

  function upload_logo()
  {
                              include ('../../konekcija.php');
                              $id = $_SESSION['id'];

                              $upit = "SELECT ime_firme,slika FROM korisnici WHERE id = $id";   //PRVO UZIMAMO IME FIRME
                              $rezultat = $konekcija->prepare($upit);
                              $rezultat->execute();
                              $rezultat->bind_result($ime_firme,$slika);

                              $rezultat->fetch();
                              $konekcija->close();




                              $directory = "../../folder-logo/$ime_firme/";   //putanja do foldera
                              $filecount = 0;
                              $files = glob($directory . "*");
                              if ($files){
                               $filecount = count($files);  //prebrojava sve u folderu i u ovu variablu pakuje broj koliko ima slika,fajlova
                              }


                              if($filecount = 0)    //AKO JE BROJ SLIKA/FAJLOVA NULA ONDA DOPUSTA NOV UNOS SLIKE
                              {
                                            $file = $_FILES['file'];

                                            $fileIME = $_FILES['file']['name'];
                                            $fileLokacija = $_FILES['file']['tmp_name'];
                                            $fileVelicina = $_FILES['file']['size'];
                                            $fileGreska = $_FILES['file']['error'];
                                            $fileTip = $_FILES['file']['type'];


                                            $filedeljenje = explode('.',$fileIME);
                                            $filemalaslova = strtolower(end($filedeljenje));

                                            $formati = array('jpg', 'jpeg', 'png');
                                            if (in_array($filemalaslova,$formati))
                                            {
                                                            if($fileGreska === 0)
                                                            {
                                                                 $novoime = uniqid('', true).".".$filemalaslova;
                                                                 $odrediste = "../../folder-logo/$ime_firme/".$novoime;    //OVDE JE DEFINISANA PUTANJA KA FOLDERU KORISNIKA POD NJEGOVIM
                                                                 move_uploaded_file($fileLokacija,$odrediste);       //IMENOM


                                                          //		       //UPLOAD U BAZU
                                                                   include ('../../konekcija.php');
                                                                     $upit="UPDATE korisnici SET slika = '$novoime' WHERE id = $id";
                                                                     $rezultat=$konekcija->prepare($upit);
                                                                     $rezultat->execute();                     //OBAVEZNO JE ZATVORITI PRVU KONEKCIJU I OTVORITI DRUGU
                                                                     $konekcija->close();
                                                                     exit(json_encode("uspesno ste promenili svoj logo"));
                                          //<script>window.location.href = 'profil.php';</script>


                                                          //		       //UPLOAD U BAZU

                                                            }
                                                            else
                                                            {
                                                              exit(json_encode("Doslo je do greske pri otpremanju datoteke"));
                                                            }
                                            }
                                          else
                                          {
                                            exit(json_encode("Format tog tipa nije podrzan"));
                                          }
                              }
                              else if($filecount = 1)  //AKO JE BROJ SLIKA/FAJLOVA JEDAN ONDA PRVO BRISE STARU SLIKU IZ BAZE PA TEK ONDA DOPUSTA NOVI UNOS SLIKE
                              {
                                                unlink("../../folder-logo/$ime_firme/".$slika);  //prvo brise postojecu sliku

                                                $file = $_FILES['file'];                        //a zatim unosi novu

                                                $fileIME = $_FILES['file']['name'];
                                                $fileLokacija = $_FILES['file']['tmp_name'];
                                                $fileVelicina = $_FILES['file']['size'];
                                                $fileGreska = $_FILES['file']['error'];
                                                $fileTip = $_FILES['file']['type'];


                                                $filedeljenje = explode('.',$fileIME);
                                                $filemalaslova = strtolower(end($filedeljenje));

                                                $formati = array('jpg', 'jpeg', 'png');
                                                if (in_array($filemalaslova,$formati))
                                                {
                                                                if($fileGreska === 0)
                                                                {
                                                                     $novoime = uniqid('', true).".".$filemalaslova;
                                                                     $odrediste = "../../folder-logo/$ime_firme/".$novoime;    //OVDE JE DEFINISANA PUTANJA KA FOLDERU KORISNIKA POD NJEGOVIM
                                                                     move_uploaded_file($fileLokacija,$odrediste);       //IMENOM


                                                              //		       //UPLOAD U BAZU
                                                                       include ('../../konekcija.php');
                                                                         $upit="UPDATE korisnici SET slika = '$novoime' WHERE id = $id";
                                                                         $rezultat=$konekcija->prepare($upit);
                                                                         $rezultat->execute();                     //OBAVEZNO JE ZATVORITI PRVU KONEKCIJU I OTVORITI DRUGU
                                                                         $konekcija->close();
                                                                         exit(json_encode("uspesno ste promenili svoj logo"));
                                              //<script>window.location.href = 'profil.php';</script>


                                                              //		       //UPLOAD U BAZU

                                                                }
                                                                else
                                                                {
                                                                  exit(json_encode("Doslo je do greske pri otpremanju datoteke"));
                                                                }
                                                }
                                              else
                                              {
                                                exit(json_encode("Format tog tipa nije podrzan"));
                                              }
                              }
                              else if($filecount > 1)  //AKO JE BROJ SLIKA/FAJLOVA VECI OD JEDAN (sto ne bi trebalo nikad da bude) ONDA JAVLJA GRESKU ERROR
                              {
                                exit(json_encode("ERROR"));
                              }
  }

 function stampanje_osnovni_podaci()
 {
                         include ('../../konekcija.php');
                         $id_fakture = mysqli_real_escape_string($konekcija,$_POST['id_fakture']);
                         $upit = "SELECT ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,lokacija_partnerske_firme,email_klijenta,status_fakture,redni_broj_fakture,trenutna_godina,valuta_fakture FROM fakture WHERE id_fakture = $id_fakture";
                         $rezultat = $konekcija->prepare($upit);
                         $rezultat->execute();
                         $rezultat->bind_result($ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$lokacija_partnerske_firme,$email_klijenta,$status_fakture,$redni_broj_fakture,$trenutna_godina,$valuta_fakture);

                         $rezultat_niz = array();

                               while ($rezultat->fetch())
                               {
                                $rezultat_niz[]=array($ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$lokacija_partnerske_firme,$email_klijenta,$status_fakture,$redni_broj_fakture,$trenutna_godina,$valuta_fakture);
                               }
                                $konekcija->close();
                           exit(json_encode($rezultat_niz));
 }

 function obrisi_fakturu()
 {
                         include ('../../konekcija.php');

                         $id_fakture = mysqli_real_escape_string($konekcija,$_POST['id_fakture']);

                         $upit = "DELETE FROM fakture WHERE id_fakture = '$id_fakture'";
                         $rezultat = $konekcija->prepare($upit);
                         $rezultat->execute();
                         $konekcija->close();
                         exit();
 }

 function footer_zbir_cifara()
 {
                         include ('../../konekcija.php');
                         $novi_id = mysqli_real_escape_string($konekcija,$_POST['novi_id']);


                         $upit = "SELECT SUM(cena_puta_kolicina) AS 'cena_puta_kolicina',SUM(iznos_pdv) AS 'iznos_pdv',SUM(ukupna_vrednost) AS 'ukupna_vrednost',SUM(ukupan_rabat) AS 'ukupan_rabat' FROM artikli_fakture WHERE id_vlasnika_fakture = '$novi_id'";
                         $rezultat = mysqli_query($konekcija,$upit);
                         $data = mysqli_fetch_array($rezultat);


                         $ukupna_cifra = $data[2];
                         $ukupna_cifra = round($ukupna_cifra, 2);   //SVODI NA DVE DECIMALE

                         $upit1 = "UPDATE fakture SET vrednost_fakture = $ukupna_cifra WHERE id_fakture = '$novi_id'";
                         $rezultat1 = $konekcija->prepare($upit1);
                         $rezultat1->execute();
                         $konekcija->close();

                           exit(json_encode($data));
 }

 function stampanje()
 {
                         include ('../../konekcija.php');
                         $id_fakture = mysqli_real_escape_string($konekcija,$_POST['id_fakture']);

                         $upit = "SELECT DISTINCT * FROM artikli_fakture WHERE id_vlasnika_fakture = '$id_fakture'";
                         $rezultat = $konekcija->prepare($upit);
                         $rezultat->execute();
                         $rezultat->bind_result($id,$id_vlasnika,$redni_br,$naziv_artikla,$jedinica_mere,$kolicina,$cena_bez_pdv,$cena_puta_kolicina,$rabat,$ukupan_rabat,$pdv,$iznos_pdv,$ukupna_vrednost);

                         $rezultat_niz = array();

                               while ($rezultat->fetch())
                               {
                                $rezultat_niz[]=array($id_vlasnika,$redni_br,$naziv_artikla,$jedinica_mere,$kolicina,$cena_bez_pdv,$rabat,$pdv,$iznos_pdv,$ukupna_vrednost,$id);
                              };
                         $konekcija->close();
                              exit(json_encode($rezultat_niz));
 }

 function slanje_poruke_adminu()
 {
                                 include ('../../konekcija.php');
                                 $email_korisnika_koji_mi_salje_poruke = mysqli_real_escape_string($konekcija,$_POST['email_korisnika_koji_mi_salje_poruke']);
                                 $email_korisnika_koji_mi_salje_poruke = htmlspecialchars($email_korisnika_koji_mi_salje_poruke);
                                 $poruka_korisnika_koji_mi_salje_poruke = mysqli_real_escape_string($konekcija,$_POST['poruka_korisnika_koji_mi_salje_poruke']);
                                 $poruka_korisnika_koji_mi_salje_poruke = htmlspecialchars($poruka_korisnika_koji_mi_salje_poruke);

                                 $mail = new PHPMailer();
                                 $mail->Host = "smtp.gmail.com";
                                 //$mail->IsSMTP();
                                 $mail->SMPTAuth = true;
                                 $mail->Username = "slanjefakture@gmail.com";
                                 $mail->Password = "8!slanjefakture!8";
                                 $mail->SMTPSecure = "tls";
                                 $mail->Port = 587;
                                 $mail->addAddress('ginderfilip@gmail.com'); //ovde definisemo da uvek poruke salju na moj email
                                 $mail->setFrom($email_korisnika_koji_mi_salje_poruke);   //ovde definisemo da meni u emailu pise ko mi je poslao poruku
                                 $mail->Subject = 'Korisnicko Pitanje';   //ovde samo da je naslov Korisnicko Pitanje - da znam o kojoj puruci je rec
                                 $mail->isHTML(true);
                                 $mail->Body = $poruka_korisnika_koji_mi_salje_poruke;  // poruka

                                 if($mail->send()){
                                   exit(json_encode('Email je uspesno poslat!'));
                                 }
                                 else{
                                   exit(json_encode('Doslo je do greske prilikom slanja Emaila-a!'));
                                 }
 }

 function godina_za_select_na_pocetnoj()
 {
               include ('../../konekcija.php');
               $id = $_SESSION['id'];
               $upit = "SELECT DISTINCT trenutna_godina FROM fakture WHERE id_korisnika = $id";
               $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
               $rezultat->execute();
               $rezultat->bind_result($trenutna_godina);

               $rezultat_niz = array();

                     while ($rezultat->fetch())
                     {
                      $rezultat_niz[]=array($trenutna_godina);
                     }
                     $konekcija->close();
                 exit(json_encode($rezultat_niz));
 }

 function odabir_prikaz_po_godinama_za_select_na_prikaz_klijenta()
 {
               include ('../../konekcija.php');
               $id = $_SESSION['id'];
               $izabrani_klijent = mysqli_real_escape_string($konekcija,$_POST['izabrani_klijent']);
               $izabrani_klijent = htmlspecialchars($izabrani_klijent);
               $novo_ime_klijenta = mysqli_real_escape_string($konekcija,$_POST['novo_ime_klijenta']);
               $novo_ime_klijenta = htmlspecialchars($novo_ime_klijenta);
               $upit = "SELECT DISTINCT trenutna_godina FROM fakture WHERE id_korisnika = $id AND ime_na_koga_je_faktura = '$izabrani_klijent' OR ime_na_koga_je_faktura = '$novo_ime_klijenta'";
               $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
               $rezultat->execute();
               $rezultat->bind_result($trenutna_godina);

               $rezultat_niz = array();

                     while ($rezultat->fetch())
                     {
                      $rezultat_niz[]=array($trenutna_godina);
                     }
                     $konekcija->close();
                 exit(json_encode($rezultat_niz));
 }

 function prikaz_svih_faktura_na_pocetnoj_strani()
 {
                         include ('../../konekcija.php');
                         $izabrana_godina = mysqli_real_escape_string($konekcija,$_POST['izabrana_godina']);
                         $izabrana_godina = htmlspecialchars($izabrana_godina);
                         $izabran_status = mysqli_real_escape_string($konekcija,$_POST['izabran_status']);
                         $izabran_status = htmlspecialchars($izabran_status);

                         $id = $_SESSION['id'];
                         if($izabrana_godina == "sve_fakture" && $izabran_status == "sve_fakture"){

                                     include ('../../konekcija.php');
                                     $id = $_SESSION['id'];
                                     $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = $id";
                                     $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
                                     $rezultat->execute();
                                     $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                                     $rezultat_niz = array();

                                           while ($rezultat->fetch())
                                           {
                                            $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                                           }
                                           $konekcija->close();
                                       exit(json_encode($rezultat_niz));
                         }

                         else if($izabrana_godina == "sve_fakture" && $izabran_status == "Placena"){

                                   include ('../../konekcija.php');
                                   $id = $_SESSION['id'];
                                   $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = $id AND status_fakture = '$izabran_status'";
                                   $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
                                   $rezultat->execute();
                                   $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                                   $rezultat_niz = array();

                                         while ($rezultat->fetch())
                                         {
                                          $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                                         }
                                         $konekcija->close();
                                     exit(json_encode($rezultat_niz));
                         }

                         else if($izabrana_godina == "sve_fakture" && $izabran_status == "Nije placena"){

                                   include ('../../konekcija.php');
                                   $id = $_SESSION['id'];
                                   $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = $id AND status_fakture = '$izabran_status'";
                                   $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
                                   $rezultat->execute();
                                   $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                                   $rezultat_niz = array();

                                         while ($rezultat->fetch())
                                         {
                                          $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                                         }
                                         $konekcija->close();
                                     exit(json_encode($rezultat_niz));
                         }

                         else if($izabrana_godina == "sve_fakture" && $izabran_status == "Storno"){

                                   include ('../../konekcija.php');
                                   $id = $_SESSION['id'];
                                   $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = $id AND status_fakture = '$izabran_status'";
                                   $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
                                   $rezultat->execute();
                                   $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                                   $rezultat_niz = array();

                                         while ($rezultat->fetch())
                                         {
                                          $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                                         }
                                         $konekcija->close();
                                     exit(json_encode($rezultat_niz));
                         }

                         else if($izabrana_godina !== "sve_fakture" && $izabran_status == "sve_fakture"){

                                   include ('../../konekcija.php');
                                   $id = $_SESSION['id'];
                                   $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = $id AND trenutna_godina = '$izabrana_godina'";
                                   $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
                                   $rezultat->execute();
                                   $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                                   $rezultat_niz = array();

                                         while ($rezultat->fetch())
                                         {
                                          $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                                         }
                                         $konekcija->close();
                                     exit(json_encode($rezultat_niz));
                         }

                         else if($izabrana_godina !== "sve_fakture" && $izabran_status == "Placena"){

                                   include ('../../konekcija.php');
                                   $id = $_SESSION['id'];
                                   $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = $id AND trenutna_godina = '$izabrana_godina' AND status_fakture = '$izabran_status'";
                                   $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
                                   $rezultat->execute();
                                   $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                                   $rezultat_niz = array();

                                         while ($rezultat->fetch())
                                         {
                                          $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                                         }
                                         $konekcija->close();
                                     exit(json_encode($rezultat_niz));
                         }

                         else if($izabrana_godina !== "sve_fakture" && $izabran_status == "Nije placena"){

                                   include ('../../konekcija.php');
                                   $id = $_SESSION['id'];
                                   $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = $id AND trenutna_godina = '$izabrana_godina' AND status_fakture = '$izabran_status'";
                                   $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
                                   $rezultat->execute();
                                   $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                                   $rezultat_niz = array();

                                         while ($rezultat->fetch())
                                         {
                                          $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                                         }
                                         $konekcija->close();
                                     exit(json_encode($rezultat_niz));
                         }

                         else if($izabrana_godina !== "sve_fakture" && $izabran_status == "Storno"){

                                   include ('../../konekcija.php');
                                   $id = $_SESSION['id'];
                                   $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = $id AND trenutna_godina = '$izabrana_godina' AND status_fakture = '$izabran_status'";
                                   $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
                                   $rezultat->execute();
                                   $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                                   $rezultat_niz = array();

                                         while ($rezultat->fetch())
                                         {
                                          $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                                         }
                                         $konekcija->close();
                                     exit(json_encode($rezultat_niz));
                         }
                         // else{
                         // $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = $id AND trenutna_godina = '$izabrana_godina'";
                         // $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
                         // $rezultat->execute();
                         // $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture);
                         //
                         // $rezultat_niz = array();
                         //
                         //       while ($rezultat->fetch())
                         //       {
                         //        $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture);
                         //       }
                         //       $konekcija->close();
                         //   exit(json_encode($rezultat_niz));
                         // }
 }

function ispis_svih_faktura_o_izabranom_klijentu()  //OVDE DODATI SVE VARIJANTE ZA KOMBINOVANJE DVA SELECTA I IMENA NOVO STARO
{
                      include ('../../konekcija.php');
                      $izabrani_klijent = mysqli_real_escape_string($konekcija,$_POST['izabrani_klijent']);
                      $novo_ime_klijenta = mysqli_real_escape_string($konekcija,$_POST['novo_ime_klijenta']);
                      $izbor_godine_za_stranicu_prikaz_klijenta = mysqli_real_escape_string($konekcija,$_POST['izbor_godine_za_stranicu_prikaz_klijenta']);
                      $izbor_godine_za_stranicu_prikaz_klijenta = htmlspecialchars($izbor_godine_za_stranicu_prikaz_klijenta);

                      $izbor_statusa_za_stranicu_prikaz_klijenta = mysqli_real_escape_string($konekcija,$_POST['izbor_statusa_za_stranicu_prikaz_klijenta']);
                      $izbor_statusa_za_stranicu_prikaz_klijenta = htmlspecialchars($izbor_statusa_za_stranicu_prikaz_klijenta);

                      if($izbor_godine_za_stranicu_prikaz_klijenta == "sve_fakture" && $izbor_statusa_za_stranicu_prikaz_klijenta == "sve_fakture")
                      {
                        include ('../../konekcija.php');
                        $id = $_SESSION['id'];
                        $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$izabrani_klijent' OR ime_na_koga_je_faktura = '$novo_ime_klijenta'";
                        $rezultat = $konekcija->prepare($upit);
                        $rezultat->execute();
                        $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                        $rezultat_niz = array();

                              while ($rezultat->fetch())
                              {
                               $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                              }
                               $konekcija->close();
                          exit(json_encode($rezultat_niz));
                      }
                      else if($izbor_godine_za_stranicu_prikaz_klijenta == "sve_fakture" && $izbor_statusa_za_stranicu_prikaz_klijenta == "Placena" && !empty($izabrani_klijent) && empty($novo_ime_klijenta))
                      {
                        include ('../../konekcija.php');
                        $id = $_SESSION['id'];
                        $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$izabrani_klijent' AND status_fakture = '$izbor_statusa_za_stranicu_prikaz_klijenta'";
                        $rezultat = $konekcija->prepare($upit);
                        $rezultat->execute();
                        $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                        $rezultat_niz = array();

                              while ($rezultat->fetch())
                              {
                               $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                              }
                               $konekcija->close();
                          exit(json_encode($rezultat_niz));
                      }
                      else if($izbor_godine_za_stranicu_prikaz_klijenta == "sve_fakture" && $izbor_statusa_za_stranicu_prikaz_klijenta == "Nije placena" && !empty($izabrani_klijent) && empty($novo_ime_klijenta))
                      {
                        include ('../../konekcija.php');
                        $id = $_SESSION['id'];
                        $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$izabrani_klijent' AND status_fakture = '$izbor_statusa_za_stranicu_prikaz_klijenta'";
                        $rezultat = $konekcija->prepare($upit);
                        $rezultat->execute();
                        $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                        $rezultat_niz = array();

                              while ($rezultat->fetch())
                              {
                               $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                              }
                               $konekcija->close();
                          exit(json_encode($rezultat_niz));
                      }
                      else if($izbor_godine_za_stranicu_prikaz_klijenta == "sve_fakture" && $izbor_statusa_za_stranicu_prikaz_klijenta == "Storno" && !empty($izabrani_klijent) && empty($novo_ime_klijenta))
                      {
                        include ('../../konekcija.php');
                        $id = $_SESSION['id'];
                        $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$izabrani_klijent' AND status_fakture = '$izbor_statusa_za_stranicu_prikaz_klijenta'";
                        $rezultat = $konekcija->prepare($upit);
                        $rezultat->execute();
                        $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                        $rezultat_niz = array();

                              while ($rezultat->fetch())
                              {
                               $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                              }
                               $konekcija->close();
                          exit(json_encode($rezultat_niz));
                      }
                      else if($izbor_godine_za_stranicu_prikaz_klijenta == "sve_fakture" && $izbor_statusa_za_stranicu_prikaz_klijenta == "Placena" && !empty($izabrani_klijent) && !empty($novo_ime_klijenta))
                      {
                        include ('../../konekcija.php');
                        $id = $_SESSION['id'];
                        $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$novo_ime_klijenta' AND status_fakture = '$izbor_statusa_za_stranicu_prikaz_klijenta'";
                        $rezultat = $konekcija->prepare($upit);
                        $rezultat->execute();
                        $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                        $rezultat_niz = array();

                              while ($rezultat->fetch())
                              {
                               $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                              }
                               $konekcija->close();
                          exit(json_encode($rezultat_niz));
                      }
                      else if($izbor_godine_za_stranicu_prikaz_klijenta == "sve_fakture" && $izbor_statusa_za_stranicu_prikaz_klijenta == "Nije placena" && !empty($izabrani_klijent) && !empty($novo_ime_klijenta))
                      {
                        include ('../../konekcija.php');
                        $id = $_SESSION['id'];
                        $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$novo_ime_klijenta' AND status_fakture = '$izbor_statusa_za_stranicu_prikaz_klijenta'";
                        $rezultat = $konekcija->prepare($upit);
                        $rezultat->execute();
                        $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                        $rezultat_niz = array();

                              while ($rezultat->fetch())
                              {
                               $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                              }
                               $konekcija->close();
                          exit(json_encode($rezultat_niz));
                      }
                      else if($izbor_godine_za_stranicu_prikaz_klijenta == "sve_fakture" && $izbor_statusa_za_stranicu_prikaz_klijenta == "Storno" && !empty($izabrani_klijent) && !empty($novo_ime_klijenta))
                      {
                        include ('../../konekcija.php');
                        $id = $_SESSION['id'];
                        $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$novo_ime_klijenta' AND status_fakture = '$izbor_statusa_za_stranicu_prikaz_klijenta'";
                        $rezultat = $konekcija->prepare($upit);
                        $rezultat->execute();
                        $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                        $rezultat_niz = array();

                              while ($rezultat->fetch())
                              {
                               $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                              }
                               $konekcija->close();
                          exit(json_encode($rezultat_niz));
                      }
                     else if($izbor_godine_za_stranicu_prikaz_klijenta !== "sve_fakture" && $izbor_statusa_za_stranicu_prikaz_klijenta == "sve_fakture")
                      {
                                      include ('../../konekcija.php');
                                      $id = $_SESSION['id'];
                                      $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$izabrani_klijent' AND trenutna_godina = '$izbor_godine_za_stranicu_prikaz_klijenta'";
                                      $rezultat = $konekcija->prepare($upit);
                                      $rezultat->execute();
                                      $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                                      $rezultat_niz = array();

                                            while ($rezultat->fetch())
                                            {
                                             $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                                            }
                                             $konekcija->close();
                                        exit(json_encode($rezultat_niz));
                      }
                      else if($izbor_godine_za_stranicu_prikaz_klijenta !== "sve_fakture" && $izbor_statusa_za_stranicu_prikaz_klijenta == "Placena" && !empty($izabrani_klijent) && empty($novo_ime_klijenta))
                      {
                                      include ('../../konekcija.php');
                                      $id = $_SESSION['id'];
                                      $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$izabrani_klijent' AND trenutna_godina = '$izbor_godine_za_stranicu_prikaz_klijenta' AND status_fakture = '$izbor_statusa_za_stranicu_prikaz_klijenta'";
                                      $rezultat = $konekcija->prepare($upit);
                                      $rezultat->execute();
                                      $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                                      $rezultat_niz = array();

                                            while ($rezultat->fetch())
                                            {
                                             $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                                            }
                                             $konekcija->close();
                                        exit(json_encode($rezultat_niz));
                      }
                      else if($izbor_godine_za_stranicu_prikaz_klijenta !== "sve_fakture" && $izbor_statusa_za_stranicu_prikaz_klijenta == "Nije placena" && !empty($izabrani_klijent) && empty($novo_ime_klijenta))
                      {
                                      include ('../../konekcija.php');
                                      $id = $_SESSION['id'];
                                      $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$izabrani_klijent' AND trenutna_godina = '$izbor_godine_za_stranicu_prikaz_klijenta' AND status_fakture = '$izbor_statusa_za_stranicu_prikaz_klijenta'";
                                      $rezultat = $konekcija->prepare($upit);
                                      $rezultat->execute();
                                      $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                                      $rezultat_niz = array();

                                            while ($rezultat->fetch())
                                            {
                                             $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                                            }
                                             $konekcija->close();
                                        exit(json_encode($rezultat_niz));
                      }
                      else if($izbor_godine_za_stranicu_prikaz_klijenta !== "sve_fakture" && $izbor_statusa_za_stranicu_prikaz_klijenta == "Storno" && !empty($izabrani_klijent) && empty($novo_ime_klijenta))
                      {
                                      include ('../../konekcija.php');
                                      $id = $_SESSION['id'];
                                      $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$izabrani_klijent' AND trenutna_godina = '$izbor_godine_za_stranicu_prikaz_klijenta' AND status_fakture = '$izbor_statusa_za_stranicu_prikaz_klijenta'";
                                      $rezultat = $konekcija->prepare($upit);
                                      $rezultat->execute();
                                      $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                                      $rezultat_niz = array();

                                            while ($rezultat->fetch())
                                            {
                                             $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                                            }
                                             $konekcija->close();
                                        exit(json_encode($rezultat_niz));
                      }




                      else if($izbor_godine_za_stranicu_prikaz_klijenta !== "sve_fakture" && $izbor_statusa_za_stranicu_prikaz_klijenta == "Placena" && !empty($izabrani_klijent) && !empty($novo_ime_klijenta))
                      {
                                      include ('../../konekcija.php');
                                      $id = $_SESSION['id'];
                                      $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$novo_ime_klijenta' AND trenutna_godina = '$izbor_godine_za_stranicu_prikaz_klijenta' AND status_fakture = '$izbor_statusa_za_stranicu_prikaz_klijenta'";
                                      $rezultat = $konekcija->prepare($upit);
                                      $rezultat->execute();
                                      $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                                      $rezultat_niz = array();

                                            while ($rezultat->fetch())
                                            {
                                             $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                                            }
                                             $konekcija->close();
                                        exit(json_encode($rezultat_niz));
                      }
                      else if($izbor_godine_za_stranicu_prikaz_klijenta !== "sve_fakture" && $izbor_statusa_za_stranicu_prikaz_klijenta == "Nije placena" && !empty($izabrani_klijent) && !empty($novo_ime_klijenta))
                      {
                                      include ('../../konekcija.php');
                                      $id = $_SESSION['id'];
                                      $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$novo_ime_klijenta' AND trenutna_godina = '$izbor_godine_za_stranicu_prikaz_klijenta' AND status_fakture = '$izbor_statusa_za_stranicu_prikaz_klijenta'";
                                      $rezultat = $konekcija->prepare($upit);
                                      $rezultat->execute();
                                      $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                                      $rezultat_niz = array();

                                            while ($rezultat->fetch())
                                            {
                                             $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                                            }
                                             $konekcija->close();
                                        exit(json_encode($rezultat_niz));
                      }
                      else if($izbor_godine_za_stranicu_prikaz_klijenta !== "sve_fakture" && $izbor_statusa_za_stranicu_prikaz_klijenta == "Storno" && !empty($izabrani_klijent) && !empty($novo_ime_klijenta))
                      {
                                      include ('../../konekcija.php');
                                      $id = $_SESSION['id'];
                                      $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,vrednost_fakture,status_fakture,valuta_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$novo_ime_klijenta' AND trenutna_godina = '$izbor_godine_za_stranicu_prikaz_klijenta' AND status_fakture = '$izbor_statusa_za_stranicu_prikaz_klijenta'";
                                      $rezultat = $konekcija->prepare($upit);
                                      $rezultat->execute();
                                      $rezultat->bind_result($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);

                                      $rezultat_niz = array();

                                            while ($rezultat->fetch())
                                            {
                                             $rezultat_niz[]=array($broj,$id_fakture,$ime_na_koga_je_faktura,$partnerov_pib,$datum_pravljenja_fakture,$vrednost_fakture,$status_fakture,$valuta_fakture);
                                            }
                                             $konekcija->close();
                                        exit(json_encode($rezultat_niz));
                      }
}


function status_faktura_za_select_na_pocetnoj()
{
  include ('../../konekcija.php');
  $id = $_SESSION['id'];
  $upit = "SELECT DISTINCT status_fakture FROM fakture WHERE id_korisnika = $id";
  $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
  $rezultat->execute();
  $rezultat->bind_result($status_fakture);

  $rezultat_niz = array();

        while ($rezultat->fetch())
        {
         $rezultat_niz[]=array($status_fakture);
        }
        $konekcija->close();
    exit(json_encode($rezultat_niz));
}


function status_za_select_na_prikaz_klijenta()
{
              include ('../../konekcija.php');
              $id = $_SESSION['id'];
              $izabrani_klijent = mysqli_real_escape_string($konekcija,$_POST['izabrani_klijent']);
              $izabrani_klijent = htmlspecialchars($izabrani_klijent);
              $novo_ime_klijenta = mysqli_real_escape_string($konekcija,$_POST['novo_ime_klijenta']);
              $novo_ime_klijenta = htmlspecialchars($novo_ime_klijenta);
              $upit = "SELECT DISTINCT status_fakture FROM fakture WHERE id_korisnika = $id AND ime_na_koga_je_faktura = '$izabrani_klijent' OR ime_na_koga_je_faktura = '$novo_ime_klijenta'";
              $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
              $rezultat->execute();
              $rezultat->bind_result($status_fakture);

              $rezultat_niz = array();

                    while ($rezultat->fetch())
                    {
                     $rezultat_niz[]=array($status_fakture);
                    }
                    $konekcija->close();
                exit(json_encode($rezultat_niz));
}

function ispis_onovnih_podataka_o_izabranom_klijentu()
{
                      include ('../../konekcija.php');
                      $izabrani_klijent = mysqli_real_escape_string($konekcija,$_POST['izabrani_klijent']);
                      $novo_ime_klijenta = mysqli_real_escape_string($konekcija,$_POST['novo_ime_klijenta']);
                      $id = $_SESSION['id'];
                      $upit = "SELECT ime_na_koga_je_faktura,partnerov_pib,lokacija_partnerske_firme,email_klijenta,vrednost_fakture FROM fakture WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$izabrani_klijent' OR ime_na_koga_je_faktura = '$novo_ime_klijenta'";
                      $rezultat = $konekcija->prepare($upit);
                      $rezultat->execute();
                      $rezultat->bind_result($ime_na_koga_je_faktura,$partnerov_pib,$lokacija_partnerske_firme,$email_klijenta,$vrednost_fakture);

                      $rezultat_niz = array();

                            while ($rezultat->fetch())
                            {
                             $rezultat_niz[]=array($ime_na_koga_je_faktura,$partnerov_pib,$lokacija_partnerske_firme,$email_klijenta,$vrednost_fakture);
                            }
                             $konekcija->close();
                        exit(json_encode($rezultat_niz));
}
 //SELECT ime_na_koga_je_faktura,partnerov_pib,datum_pravljenja_fakture,lokacija_partnerske_firme,vrednost_fakture,email_klijenta,status_fakture,redni_broj_fakture,trenutna_godina FROM fakture WHERE id_korisnika = '$id' AND ime_na_koga_je_faktura = '$izabrani_klijent'


  function promena_osnovnih_podataka_o_klijentu_sa_stranice_prikaz_klijenta()
    {
      include ('../../konekcija.php');
      $staro_ime_klijenta = mysqli_real_escape_string($konekcija,$_POST['ime_izabranog_klijenta_na_osnovu_kojeg_menjamo_njegove_podatke_u_bazi']);
      $prikaz_klijenta_promena_imena = mysqli_real_escape_string($konekcija,$_POST['prikaz_klijenta_promena_imena']);  //novo ime
      $prikaz_klijenta_promena_piba = mysqli_real_escape_string($konekcija,$_POST['prikaz_klijenta_promena_piba']);
      $prikaz_klijenta_promena_lokacije = mysqli_real_escape_string($konekcija,$_POST['prikaz_klijenta_promena_lokacije']);
      $prikaz_klijenta_promena_emaila = mysqli_real_escape_string($konekcija,$_POST['prikaz_klijenta_promena_emaila']);
      $id = $_SESSION['id'];


      $upit = "UPDATE fakture SET ime_na_koga_je_faktura = '$prikaz_klijenta_promena_imena', partnerov_pib = '$prikaz_klijenta_promena_piba', lokacija_partnerske_firme = '$prikaz_klijenta_promena_lokacije',email_klijenta = '$prikaz_klijenta_promena_emaila' WHERE ime_na_koga_je_faktura = '$staro_ime_klijenta' AND id_korisnika = $id";
      $rezultat = $konekcija->prepare($upit);
      $rezultat->execute();
      $konekcija->close();
      exit(json_encode('uspesno'));
    }

 function obrisi_nedefinisane_fakture()
 {
       include ('../../konekcija.php');
       $id = $_SESSION['id'];
       $upit = "DELETE FROM fakture WHERE id_korisnika = $id AND vrednost_fakture = '' OR status_fakture = '' OR trenutna_godina = ''";      //ZATIM BRISE SVE NEDEFINISANE FAKTURE VEZANE ZA TAJ ID
       $rezultat = $konekcija->prepare($upit);
       $rezultat->execute();
       $konekcija->close();
 }

 function provera_duzine_pretplate_manualnog_iskljuci_ukljuci()
 {
         include ('../../konekcija.php');
         $id = $_SESSION['id'];
         $upit="SELECT vreme_trajanja_koriscenja_programa,manualno_ukljuci_iskljuci FROM korisnici WHERE id='$id'";
         $rezultat=$konekcija->prepare($upit);
         $rezultat->execute();
         $rezultat->bind_result($status_o_placenosti,$manualno_ukljuci_iskljuci);
         $rezultat->fetch();

         if($status_o_placenosti > date("Y-m-d H:i:s") && $manualno_ukljuci_iskljuci === 0)  //KAD JE  NULA ONDA JE U REDU ONDA MOZE DA PISTUPA NOVOM PRAVLJENJU FAKTURA TJ STRANICI
         {
           $konekcija->close();                                                                                //UNOS FAKTURA
           exit(json_encode("Sve je u redu mozete nastaviti sa koriscenjem programa"));
         }
         else{
           $konekcija->close();
              exit(json_encode("Vase obaveze nisu izmirene"));         //KAD NIJE NULA ONDA NE MOZE DA PRISTUPA STRANICI UNOS FAKTURA  NARAVNO I DATUM DA NIJE PREMASIO ROK
             }
 }


 function kontrola()
 {
     include ('../../konekcija.php');
     if(isset($_SESSION['admin']))
     {
       $upit="SELECT ime_firme,pib_firme,ime_vlasnika,broj_telefona,email,vreme_trajanja_koriscenja_programa,manualno_ukljuci_iskljuci,id FROM korisnici";
       $rezultat=$konekcija->prepare($upit);
       $rezultat->execute();
       $rezultat->bind_result($ime_firme,$pib_firme,$ime_vlasnika,$broj_telefona,$email,$vreme_trajanja_koriscenja_programa,$manualno_ukljuci_iskljuci,$id);
       $rezultat->fetch();

       $rezultat_niz = array();

             while ($rezultat->fetch())
             {
              $rezultat_niz[]=array($ime_firme,$pib_firme,$ime_vlasnika,$broj_telefona,$email,$vreme_trajanja_koriscenja_programa,$manualno_ukljuci_iskljuci,$id);
             }
              $konekcija->close();
         exit(json_encode($rezultat_niz));
     }
 }
 function on_off()
 {
   include ('../../konekcija.php');
   $id = mysqli_real_escape_string($konekcija,$_POST['id']);
   $vrednost_selekta = mysqli_real_escape_string($konekcija,$_POST['vrednost_selekta']);  // 0/1
   $upit = "UPDATE korisnici SET manualno_ukljuci_iskljuci = '$vrednost_selekta' WHERE id = '$id'";
   $rezultat = $konekcija->prepare($upit);
   $rezultat->execute();
   $konekcija->close();
   if($vrednost_selekta == 1)
   {
     exit(json_encode('Uspesno ISKLJUCEN korisnik'));
   }
   else if($vrednost_selekta == 0)
   {
     exit(json_encode('Uspesno UKLJUCEN korisnik'));
   }

 }
function dodati_vreme_koriscenja()
{
  include ('../../konekcija.php');
  $id = mysqli_real_escape_string($konekcija,$_POST['id']);
  $vrednost_selekta = mysqli_real_escape_string($konekcija,$_POST['vrednost_selekta']);
  $upit="SELECT vreme_trajanja_koriscenja_programa FROM korisnici WHERE id = '$id'";
  $rezultat=$konekcija->prepare($upit);
  $rezultat->execute();
  $rezultat->bind_result($vreme_trajanja_koriscenja_programa);
  $rezultat->fetch();
  $konekcija->close();

  if($vrednost_selekta == "1_mesec")
  {
    include ('../../konekcija.php');
    $upit = "UPDATE korisnici SET vreme_trajanja_koriscenja_programa = '$vreme_trajanja_koriscenja_programa' + INTERVAL 1 MONTH WHERE id = '$id'";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();
    $konekcija->close();
    exit(json_encode('USPESNO DODAT JOS 1 MESEC KORISCENJA'));
  }
  else if($vrednost_selekta == "3_meseca")
  {
    include ('../../konekcija.php');
    $upit = "UPDATE korisnici SET vreme_trajanja_koriscenja_programa = '$vreme_trajanja_koriscenja_programa' + INTERVAL 3 MONTH WHERE id = '$id'";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();
    $konekcija->close();
    exit(json_encode('USPESNO DODATO JOS 3 MESECA KORISCENJA'));
  }
  else if($vrednost_selekta == "6_meseci")
  {
    include ('../../konekcija.php');
    $upit = "UPDATE korisnici SET vreme_trajanja_koriscenja_programa = '$vreme_trajanja_koriscenja_programa' + INTERVAL 6 MONTH WHERE id = '$id'";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();
    $konekcija->close();
    exit(json_encode('USPESNO DODATO JOS 6 MESECI KORISCENJA'));
  }
  else if($vrednost_selekta == "1_godina")
  {
    include ('../../konekcija.php');
    $upit = "UPDATE korisnici SET vreme_trajanja_koriscenja_programa = '$vreme_trajanja_koriscenja_programa' + INTERVAL 1 YEAR WHERE id = '$id'";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();
    $konekcija->close();
    exit(json_encode('USPESNO DODATA JOS 1 GODINA KORISCENJA'));
  }


}
function izadji_admine()
{
  unset($_SESSION['admin']);                                  //zatim brise sesiju
  exit(json_encode('ponistena sesija'));
}


}




 ?>
