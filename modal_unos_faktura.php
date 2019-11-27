<!-- Modal                                                           ovde sa poslednje dve opcije definisemo da se modal moze zatvoriti samo na dugme -->
<div class="modal fide" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
<div class="modal-dialog" role="document">
<div class="modal-content">
  <div class="modal-header">
    <h4 class="modal-title" id="exampleModalLabel">Izaberi postojeceg klijenta ili dodaj novu fakturu!</h4>
  
  </div>
  <div class="modal-body">
    <select  class="js-example-basic-single" id="firme" style="width:200px;" data-placeholder="Izaberi postojeceg klijenta">
                <option></option>
    </select>
    <button type="button" id="save" style="float:right" class="btn btn-success">Napravi novu fakturu</button>
  </div>
  <div class="modal-footer">
  <span style="margin:auto; text-shadow: 2px 2px #FF0000; font-size:20px;"><i><b id="modal_prikaz_imena_firme"></b></i></span>

  </div>
</div>
</div>
</div>
<!-- Modal -->
