horizon.addInitFunction(function () {
  // Disable multiple submissions when launching a form.
  $("form").submit(function () {
    $(this).submit(function () {
        return false;
    });
    $('input:submit').removeClass('primary').addClass('disabled');
    $('input:submit').attr('disabled', 'disabled');
    return true;
  });

  // TODO (tres): WTF?
  $(document).on("submit", ".modal #create_keypair_form", function (e) {
    var $this = $(this);
    $this.closest(".modal").modal("hide");
    $('.topbar').after('<div class="alert alert-block alert-info">'
      + '<p><strong>Info: </strong>The data on this page may have changed, '
      + '<a href=".">click here to refresh it</a>.</p>'
      + '</div>');
    return true;
  });

  // Alert confirmation dialog modal
  $(document).on('click', "button[name='action']", function(e){
    e.preventDefault();
    var self = $(this);
    var clickedBtnValue = self.val();
    var currentForm = self.closest("form");
    var modalPopover = $('<div class="modal" />');
    var modalPopoverContent = "<div class='modal-header'>" 
    + "<a class='close' data-dismiss='modal'>×</a>"
    +"<h3>Confirm Action</h3>"
    +"</div>"
    +"<div class='modal-body'>"
    +"<p>Are you sure you want to "+self.html()+"?</p>"
    +"</div>"
    +"<div class='modal-footer'>"
    +"<a href='#' class='btn primary'>Proceed with Action</a>"
    +"<a href='#' class='btn' data-dismiss='modal'>Close</a>"
    +"</div>";
    $(modalPopover).html(modalPopoverContent);
    $(modalPopover).modal();
    $('body').append(modalPopover);
    $(modalPopover).on('hidden', function () {
      $(modalPopover).remove();
    });
    $(modalPopover).on('click', '.btn.primary', function(){
      currentForm.append("<input type='hidden' name='action' value='"+clickedBtnValue+"'/>");
      currentForm.submit();
    });
  });

  /* Twipsy tooltips */

  function getTwipsyTitle() {
    return $(this).closest('div.form-field').children('.help-block').text();
  }

  // Standard handler for everything but checkboxes
  $(document).tooltip({
    selector: "div.form-field input:not(:checkbox), div.form-field textarea, div.form-field select",
    placement: 'right',
    trigger: 'focus',
    title: getTwipsyTitle
  });

  // Hide the text for js-capable browsers
  $('span.help-block').hide();
});
