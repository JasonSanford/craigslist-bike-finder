(function() {

    $('.city-select').on('click', function(event) {
        event.preventDefault();
        var $this = $(this);
        if ($this.hasClass('label-info')) {
            return;
        }
        $('.label-info').removeClass('label-info')
        $this.addClass('label-info');
        formChanged();
    });

    function formChanged() {
        console.log('recreating URL ...');
    }

}())