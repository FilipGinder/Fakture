$(document).ready(function (){
//jezik = window.location.search.substring(7);
jezik = window.getUrlParameter('jezik');
if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined"){

  $("#exampleModalLabel").html('Izaberi postojeceg klijenta ili dodaj novu fakturu!');
  $("#save").html('Napravi novu fakturu');
  $("#firme").attr("data-placeholder", "Izaberi postojeceg klijenta");

  $("#label_ime_primaoca").html('Unesite ime klijenta:');
  $("#ime_primaoca").attr("placeholder", "Ime primaoca");
  $("#label_partnerov_PIB").html('Unesite PIB kupca:');
  $("#partnerov_PIB").attr("placeholder", "Partnerov PIB");
  $("#label_datum").html('Datum pravljenja fakture:');
  $("#label_partnerov_Email").html('Unesite Email kupca:');
  $("#label_objekat").html('Lokacija klientske firme:');
  $("#objekat").attr("placeholder", "Objekat");
  $("#osnovni_podaci").html('Sacuvaj osnovne podatke');

  $("#naslov_kolona1").html('R.B');
  $("#naslov_kolona2").html('Naziv artikla');
  $("#naslov_kolona3").html('JM');
  $("#naslov_kolona4").html('Kolicina');
  $("#naslov_kolona5").html('Cena bez PDV');
  $("#naslov_kolona6").html('&nbsp;&nbsp;&nbsp;%<br>Rabat');
  $("#naslov_kolona7").html('PDV');
  $("#naslov_kolona8").html('Iznos PDV');
  $("#naslov_kolona9").html('Vrednost sa PDV');

  $("#text_ukupaa_cena_bez_pdv").html('Cena bez PDV:');
  $("#text_ukupan_iznos_pdv").html('Iznos PDV:');
  $("#text_ukupan_rabat").html('Ukupan Rabat:');
  $("#text_ukupna_ukupna_vrednost").html('Vrednost sa PDV:');

  $("#odbaci_fakturu").html('Odbaci Fakturu');
  $("#sacuvaj_fakturu").html('Sacuvaj Fakturu');

}
else if(jezik = 'engleski'){

  $("#exampleModalLabel").html('Choose an existing client or add new invoice! ');
  $("#save").html('Create a new invoice');
  $("#firme").attr("data-placeholder", "Select an existing client");

  $("#label_ime_primaoca").html('Enter a client name:');
  $("#ime_primaoca").attr("placeholder", "Name of recipient");
  $("#label_partnerov_PIB").html('Enter PIB customer:');
  $("#partnerov_PIB").attr("placeholder", "Partner PIB");
  $("#label_datum").html('Creation date of invoice:');
  $("#label_partnerov_Email").html('Enter Email customer:');
  $("#label_objekat").html('Location of the clients company:');
  $("#objekat").attr("placeholder", "Object");
  $("#osnovni_podaci").html('Save the basic data');

  $("#naslov_kolona1").html('S.N');
  $("#naslov_kolona2").html('Product name');
  $("#naslov_kolona3").html('Unit of measure');
  $("#naslov_kolona4").html('Quantity');
  $("#naslov_kolona5").html('Price without PDV');
  $("#naslov_kolona6").html('&nbsp;&nbsp;&nbsp;%<br>Rabat');
  $("#naslov_kolona7").html('PDV');
  $("#naslov_kolona8").html('Amount PDV');
  $("#naslov_kolona9").html('The value of the PDV');

  $("#text_ukupaa_cena_bez_pdv").html('Price without PDV:');
  $("#text_ukupan_iznos_pdv").html('Amount PDV:');
  $("#text_ukupan_rabat").html('Total Rabat:');
  $("#text_ukupna_ukupna_vrednost").html('The value of the PDV:');

  $("#odbaci_fakturu").val('Discard invoice');
  $("#sacuvaj_fakturu").val('Save invoice');
}
});
