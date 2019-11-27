<!-- Modal Logo Promena -->
<div class="modal fade" id="ceo_modal_promena_logoa" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content" id="samo_modal_promena_logoa">
      <div class="modal-header">
        <h5 class="modal-title" id="naslov_modala_za_logo">Promeni logo firme klikom ili prevlacenjem</h5>
        <button type="button" class="close" data-dismiss="modal" id="zatvori_modal_logo" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="php/pocetna_php/handler_pocetna.php" method="post" class="dropzone" id="forma_za_upload_logoa">
                 <input type="hidden" name="verifikacija_promena_logoa">
      </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="cela_slika_logo" data-dismiss="modal">Prikazi sliku</button>
        <button type="button" class="btn btn-primary" id="sacuvaj_novi_logo" data-dismiss="modal">Sacuvaj</button>
      </div>
    </div>
  </div>
</div>
