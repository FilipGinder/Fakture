<?php
require_once 'class_pocetna.php';

if(isset($_POST['verifikacija_za_handler_logout']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->logout();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_podataka_okorisniku_na_pocetnoj']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_podataka_o_korisniku();
  exit(json_encode($rezultat));
}

if(isset($_POST['izabrani_status']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->promena_statusa_fakture_neplaceno_placeno();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prvo_logovanje']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prvo_logovanje_promena();
  exit(json_encode($rezultat));
}


if(isset($_POST['verifikacija_promena_logoa']))
{ //ova verifikacija se poziva direktno iz modala/forme za uploada slika i poslana je verifikaciju iz pomoc skrivenog inputa
  $objekat = new class_pocetna();
  $rezultat = $objekat->upload_logo();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_stampanje_osnovni_podaci']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->stampanje_osnovni_podaci();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_obrisi_fakturu']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->obrisi_fakturu();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_footer_zbir_cifara']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->footer_zbir_cifara();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_stampanje']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->stampanje();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_slanje_poruke_adminu']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->slanje_poruke_adminu();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_godina_za_select_na_pocetnoj']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->godina_za_select_na_pocetnoj();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_svih_faktura_na_pocetnoj_strani']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_svih_faktura_na_pocetnoj_strani();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_ispis_onovnih_podataka_o_izabranom_klijentu']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->ispis_onovnih_podataka_o_izabranom_klijentu();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_ispis_svih_faktura_o_izabranom_klijentu']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->ispis_svih_faktura_o_izabranom_klijentu();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_promena_osnovnih_podataka_o_klijentu_sa_stranice_prikaz_klijenta']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->promena_osnovnih_podataka_o_klijentu_sa_stranice_prikaz_klijenta();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_godina_za_select_na_prikaz_klijenta']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->odabir_prikaz_po_godinama_za_select_na_prikaz_klijenta();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_status_faktura_za_select_na_pocetnoj']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->status_faktura_za_select_na_pocetnoj();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_status_za_select_na_prikaz_klijenta']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->status_za_select_na_prikaz_klijenta();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_obrisi_nedefinisane_fakture']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->obrisi_nedefinisane_fakture();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_provera_duzine_pretplate_manualnog_iskljuci_ukljuci']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->provera_duzine_pretplate_manualnog_iskljuci_ukljuci();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_kontrola']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->kontrola();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_on_off']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->on_off();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_dodati_vreme_koriscenja']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->dodati_vreme_koriscenja();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_izadji_ad']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->izadji_admine();
  exit(json_encode($rezultat));
}
 ?>
