<?php
session_start();
//OVDE IMAMO FUNKCIJE obrisi_nalog, promena_licnih_podataka_bez_lozinke, promena_licnih_podataka_sa_lozinkom, provera_lozinke
class class_update
{
  function obrisi_nalog()
  {
                          $id = $_SESSION['id'];

                          include ('../../konekcija.php');
                          $upit = "SELECT ime_firme FROM korisnici WHERE id = $id";   //PRVO UZIMAMO IME FIRME
                          $rezultat = $konekcija->prepare($upit);
                          $rezultat->execute();
                          $rezultat->bind_result($ime_firme);

                          $rezultat->fetch();
                          $konekcija->close();

                          $dir = opendir("../../folder-logo/".$ime_firme);      //OVO PRVO OTVARA FOLDER
                          while (($file = readdir($dir)) !== false){                //OVO CITA STA SVE IMA U FOLDERU I PAKUJE TE INFORMACIJE $file

                             if (( $file != '.' ) && ( $file != '..' )) {

                                    unlink("../../folder-logo/$ime_firme/".$file);      //ZATIM BRISE SVE U TOM FOLDERU TJ ONO STO JE NAVEDENO $file
                          }
                        }
                            rmdir("../../folder-logo/".$ime_firme);	//OVO BRISE I NJEGOV FOLDER  KOJI SE ZOVE PO NJEGOVOM USERNAME-u AKO JE PRAZAN!!!

                          include ('../../konekcija.php');
                            $upit = "DELETE FROM korisnici WHERE id = '$id'";      //ZATIM BRISE SVE IZ BAZE VEZANO ZA KORISNICKI ID
                            $rezultat = $konekcija->prepare($upit);
                            $rezultat->execute();
                            $konekcija->close();

                          include ('../../konekcija.php');
                              $upit = "DELETE FROM podaci_o_artiklima WHERE id_korisnika = '$id'";      //ZATIM BRISE SVE IZ BAZE,TABELE PODACI_O_ARTIKLIMA VEZANO ZA KORISNICKI ID
                              $rezultat = $konekcija->prepare($upit);
                              $rezultat->execute();
                              $konekcija->close();

                          exit(json_encode("Nalog je uspesno obrisan"));
  }

  function promena_licnih_podataka_bez_lozinke()
  {
                          include ('../../konekcija.php');
                          $id = $_SESSION['id'];


                          $promeni_email = mysqli_real_escape_string($konekcija,$_POST['promeni_email']);
                          $promeni_email = htmlspecialchars($promeni_email);
                          $promeni_ime_i_prezime = mysqli_real_escape_string($konekcija,$_POST['promeni_ime_i_prezime']);
                          $promeni_ime_i_prezime = htmlspecialchars($promeni_ime_i_prezime);
                          $promeni_ime_firme = mysqli_real_escape_string($konekcija,$_POST['promeni_ime_firme']);
                          $promeni_ime_firme = htmlspecialchars($promeni_ime_firme);
                          $promeni_adresu_firme = mysqli_real_escape_string($konekcija,$_POST['promeni_adresu_firme']);
                          $promeni_adresu_firme = htmlspecialchars($promeni_adresu_firme);
                          $promeni_lokaciju = mysqli_real_escape_string($konekcija,$_POST['promeni_lokaciju']);
                          $promeni_lokaciju = htmlspecialchars($promeni_lokaciju);
                          $promeni_pib = mysqli_real_escape_string($konekcija,$_POST['promeni_pib']);
                          $promeni_pib = htmlspecialchars($promeni_pib);
                          $promeni_maticni_broj = mysqli_real_escape_string($konekcija,$_POST['promeni_maticni_broj']);
                          $promeni_maticni_broj = htmlspecialchars($promeni_maticni_broj);
                          $promeni_opis = mysqli_real_escape_string($konekcija,$_POST['promeni_opis']);
                          $promeni_opis = htmlspecialchars($promeni_opis);
                          $promeni_ziro_racun = mysqli_real_escape_string($konekcija,$_POST['promeni_ziro_racun']);
                          $promeni_ziro_racun = htmlspecialchars($promeni_ziro_racun);
                          $promeni_broj_telefona = mysqli_real_escape_string($konekcija,$_POST['promeni_broj_telefona']);
                          $promeni_broj_telefona = htmlspecialchars($promeni_broj_telefona);
                          $promeni_broj_fix_telefona = mysqli_real_escape_string($konekcija,$_POST['promeni_broj_fix_telefona']);
                          $promeni_broj_fix_telefona = htmlspecialchars($promeni_broj_fix_telefona);

                          $upit = "UPDATE korisnici SET ime_firme = '$promeni_ime_firme',lokacija_firme = '$promeni_lokaciju',adresa_firme = '$promeni_adresu_firme',pib_firme = '$promeni_pib',maticni_br_firme = '$promeni_maticni_broj',ziro_racun = '$promeni_ziro_racun',opis_firme = '$promeni_opis',ime_vlasnika = '$promeni_ime_i_prezime',
                          broj_telefona = '$promeni_broj_telefona',fix_br_telefona = '$promeni_broj_fix_telefona',email = '$promeni_email' WHERE id = '$id'";
                          $rezultat = $konekcija->prepare($upit);
                          $rezultat->execute();
                          $konekcija->close();
                          exit(json_encode('uspesno'));
  }

  function promena_licnih_podataka_sa_lozinkom()
  {
                          include ('../../konekcija.php');
                          $id = $_SESSION['id'];


                          $promeni_email = mysqli_real_escape_string($konekcija,$_POST['promeni_email']);
                          $promeni_email = htmlspecialchars($promeni_email);

                          $promeni_lozinku = mysqli_real_escape_string($konekcija,$_POST['promeni_lozinku']);
                          $promeni_lozinku = htmlspecialchars($promeni_lozinku);
                          $passwordhash = base64_encode($promeni_lozinku);

                          $promeni_ime_i_prezime = mysqli_real_escape_string($konekcija,$_POST['promeni_ime_i_prezime']);
                          $promeni_ime_i_prezime = htmlspecialchars($promeni_ime_i_prezime);
                          $promeni_ime_firme = mysqli_real_escape_string($konekcija,$_POST['promeni_ime_firme']);
                          $promeni_ime_firme = htmlspecialchars($promeni_ime_firme);
                          $promeni_adresu_firme = mysqli_real_escape_string($konekcija,$_POST['promeni_adresu_firme']);
                          $promeni_adresu_firme = htmlspecialchars($promeni_adresu_firme);
                          $promeni_lokaciju = mysqli_real_escape_string($konekcija,$_POST['promeni_lokaciju']);
                          $promeni_lokaciju = htmlspecialchars($promeni_lokaciju);
                          $promeni_pib = mysqli_real_escape_string($konekcija,$_POST['promeni_pib']);
                          $promeni_pib = htmlspecialchars($promeni_pib);
                          $promeni_maticni_broj = mysqli_real_escape_string($konekcija,$_POST['promeni_maticni_broj']);
                          $promeni_maticni_broj = htmlspecialchars($promeni_maticni_broj);
                          $promeni_opis = mysqli_real_escape_string($konekcija,$_POST['promeni_opis']);
                          $promeni_opis = htmlspecialchars($promeni_opis);
                          $promeni_ziro_racun = mysqli_real_escape_string($konekcija,$_POST['promeni_ziro_racun']);
                          $promeni_ziro_racun = htmlspecialchars($promeni_ziro_racun);
                          $promeni_broj_telefona = mysqli_real_escape_string($konekcija,$_POST['promeni_broj_telefona']);
                          $promeni_broj_telefona = htmlspecialchars($promeni_broj_telefona);
                          $promeni_broj_fix_telefona = mysqli_real_escape_string($konekcija,$_POST['promeni_broj_fix_telefona']);
                          $promeni_broj_fix_telefona = htmlspecialchars($promeni_broj_fix_telefona);

                          $upit = "UPDATE korisnici SET ime_firme = '$promeni_ime_firme',lokacija_firme = '$promeni_lokaciju',adresa_firme = '$promeni_adresu_firme',pib_firme = '$promeni_pib',maticni_br_firme = '$promeni_maticni_broj',ziro_racun = '$promeni_ziro_racun',
                          opis_firme = '$promeni_opis',ime_vlasnika = '$promeni_ime_i_prezime',broj_telefona = '$promeni_broj_telefona',fix_br_telefona = '$promeni_broj_fix_telefona',email = '$promeni_email',lozinka = '$passwordhash' WHERE id = '$id'";
                          $rezultat = $konekcija->prepare($upit);
                          $rezultat->execute();
                          $konekcija->close();
                          exit(json_encode('uspesno'));

  }

  function provera_lozinke()
  {
                          include ('../../konekcija.php');
                          $id = $_SESSION['id'];
                          $value = mysqli_real_escape_string($konekcija,$_POST['value']);  //uneta vrednost u input
                          $value1 = base64_encode($value);

                          $upit = "SELECT lozinka FROM korisnici WHERE id = $id";
                          $rezultat = $konekcija->prepare($upit);  //KLASICAN UPIT + BROJI REDOVE I DODELJUJE IM BROJEVNU VREDNOST ....1,2,3,4,5....
                          $rezultat->execute();
                          $rezultat->bind_result($lozinka);  //lozinka iz baze
                          $rezultat->fetch();




                          if($value === $lozinka || $value1 === $lozinka)
                          {
                            $konekcija->close();
                             exit(json_encode("lozinke se podudaraju"));
                          }
                          else{
                            $konekcija->close();
                            exit(json_encode("lozinke se ne podudaraju"));
                          }
  }
}

 ?>
