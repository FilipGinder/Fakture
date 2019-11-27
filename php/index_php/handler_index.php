<?php
require_once 'class_index.php';

if(isset($_POST['dugme_demo']))
{
  $objekat = new class_index();
  $rezultat = $objekat->login_demo();
  exit(json_encode($rezultat));
}

if(isset($_POST['login_strana']))
{
  $objekat = new class_index();
  $rezultat = $objekat->login();
  exit(json_encode($rezultat));
}

if(isset($_POST['registracija_strana']))
{
  $objekat = new class_index();
  $rezultat = $objekat->unos_podataka_korisnika();
  exit(json_encode($rezultat));
}

if(isset($_POST['email_zaboravljena_lozinka']))
{
  $objekat = new class_index();
  $rezultat = $objekat->zaboravljena_lozinka();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_slanje_poruke_iz_kontakt_diva']))
{
  $objekat = new class_index();
  $rezultat = $objekat->slanje_poruke_iz_kontakt_diva();
  exit(json_encode($rezultat));
}

 ?>
