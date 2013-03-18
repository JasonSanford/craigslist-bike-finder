(function() {

    $('.city-select').on('click', function(event) {
        event.preventDefault();
        var $this = $(this);
        if ($this.hasClass('label-info')) {
            return;
        }
        $('.label-info').removeClass('label-info');
        $this.addClass('label-info');
        generateUrl();
    });

    $('#keywords,#exclude').on('keyup', generateUrl);

    $('.refine').on('change', generateUrl);

    function generateUrl() {
        var url,
            params = {},
            city = $('#city').val().length > 0 ? $('#city').val() : $('.label-info').data('cl-subdomain');

        if ($('#keywords').val().trim().length < 1) {
            error('Enter at least one keyword');
            return;
        }

        params.query = $('#keywords').val().trim();

        $('.refine').each(function(i, o) {
            if ($(o).is(':checked')) {
                params.query += ' ' + $(o).data('exclude-string');
            }
        });

        if ($('#photos').is(':checked')) {
            params.hasPic = 1;
        }

        if ($('#title').is(':checked')) {
            params.srchType = 'T';
        }

        if ($('#exclude').val().trim().length > 0) {
            params.query += ' ' + (function() {
                var i,
                    splits = $('#exclude').val().trim().split(' '),
                    len = splits.length;
                for (i = 0; i < len; i++) {
                    splits[i] = '-' + splits[i];
                }
                return splits.join(' ');
            }());
        }

        if ($('#price-min').val().trim().length > 0) {
            params.minAsk = $('#price-min').val().trim();
        }

        if ($('#price-max').val().trim().length > 0) {
            params.maxAsk = $('#price-max').val().trim();
        }

        url = 'http://' + city + '.craigslist.org/search/bia?' + $.param(params);
        success(url);
    }

    function success(url) {
        $('#output')
            .removeClass('error')
            .addClass('success');

        $('#output-url').val(url);

        $('#output-link')
            .show()
            .attr('href', url);

        $('#output-help').html(' or click ');

        $('#output-label').text('Copy this link');
    }

    function error(message) {
        $('#output')
            .removeClass('success')
            .addClass('error');

        $('#output-url').val('Need more input to create URL ...');

        $('#output-help').html(message);

        $('#output-label').text('Needs input ...');

        $('#output-link').hide();
    }

    generateUrl();

}());
