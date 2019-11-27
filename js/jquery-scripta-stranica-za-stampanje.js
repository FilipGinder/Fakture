$(document).ready(function(){
jezik = window.location.search.substring(22);


$("#dugme_za_nazad_sa_pregleda").click(function(){

 window.location.href = 'pocetna.php?jezik='+jezik;

});

$("#dugme_stampaj").click(function(){

          $("#nav").css("display","none");
          $("#dole").print();
          $("#nav").css("display","block");

});

$("#posalji_emailom_fakturu").click(function(){

           $("#forma_za_slanje_emaila").css("display","block");

});
$("#zatvaranje_forma_za_slanje_emaila").click(function(){

           $("#forma_za_slanje_emaila").css("display","none");
});

$("#posalji_fakturu_emailom").click(function(){

          $("#nav").css("display","none");
          $("#forma_za_slanje_emaila").css("display","none");

});



function prikazi_kao_predracun(){ alert(jezik);

        if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
        {
          $("#css_za_menjanje").attr("href","css/fakture/css_predracun.css");
          $("#oznaka_dokumenta").html("<b>PREDRACUN</b>");
          $("#prikazi_kao_predracun").html("Prikazi kao faktura").attr("onclick","prikazi_kao_racun()");  //PRIKAZ PREDRACUNA
        }
        else if(jezik == 'engleski')
        {
          $("#css_za_menjanje").attr("href","css/fakture/css_predracun.css");
          $("#oznaka_dokumenta").html("<b>ESTIMATE</b>");
          $("#prikazi_kao_predracun").html("Views as an invoice").attr("onclick","prikazi_kao_racun()");  //PRIKAZ PREDRACUNA
        }

}
function prikazi_kao_racun(){

        if(jezik == 'srpski' || jezik == 'Promeni_jezik' || jezik == null || jezik == "" || jezik == "undefined")
        {
          $("#css_za_menjanje").attr("href","css/fakture/osnovni_prikaz_fakture.css");
          $("#oznaka_dokumenta").html("<b>FAKTURA</b>");
          $("#prikazi_kao_predracun").html("Prikazi kao predracun").attr("onclick","prikazi_kao_predracun()");  //PRIKAZ FAKTURE
        }
        else if(jezik == 'engleski')
        {
          $("#css_za_menjanje").attr("href","css/fakture/osnovni_prikaz_fakture.css");
          $("#oznaka_dokumenta").html("<b>INVOICE</b>");
          $("#prikazi_kao_predracun").html("View as a pro forma invoice").attr("onclick","prikazi_kao_predracun()");  //PRIKAZ FAKTURE
        }
}

})
