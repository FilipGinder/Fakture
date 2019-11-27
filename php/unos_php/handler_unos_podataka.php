<?php
require_once 'class_unos_podataka.php';

if(isset($_POST['id_fakture']))
{
  $objekat = new class_unos_podataka();
  $rezultat = $objekat->brisanje_ponistavanje_tabele_pre_cuvanja();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_broja_i_statusa_za_broj_fakture']))
{
  $objekat = new class_unos_podataka();
  $rezultat = $objekat->prikaz_broja_i_statusa_za_broj_fakture();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_sacuvanih_korisnikovih_artikala']))
{
  $objekat = new class_unos_podataka();
  $rezultat = $objekat->prikaz_sacuvanih_korisnikovih_artikala();
  exit(json_encode($rezultat));
}

if(isset($_POST['danasnja_godina']))
{
  $objekat = new class_unos_podataka();
  $rezultat = $objekat->unos_broja_fakture_i_godine_u_bazu();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_unos_osnovnih_podataka_klijenata']))
{
  $objekat = new class_unos_podataka();
  $rezultat = $objekat->unos_osnovnih_podataka_klijenata();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_imena_za_select']))
{
  $objekat = new class_unos_podataka();
  $rezultat = $objekat->prikaz_imena_za_select();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_racunanje']))
{
  $objekat = new class_unos_podataka();
  $rezultat = $objekat->racunanje();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_select_popuna_podataka']))
{
  $objekat = new class_unos_podataka();
  $rezultat = $objekat->select_popuna_podataka();
  exit(json_encode($rezultat));
}
 ?>
