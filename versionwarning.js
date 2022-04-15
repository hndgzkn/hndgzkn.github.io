(function() {
    // adapted from https://github.com/mne-tools/mne-tools.github.io/blob/main/versionwarning.js (2022-04)
    const urlParts = location.pathname.split('/');
    const version = urlParts[1];

    // see if filePath exists in the stable version of the docs
    var filePath = urlParts.slice(2).join('/');
    console.log(filePath);
    console.log(version);

    $.ajax({
        type: 'HEAD',
        url: '/stable/${filePath}',
        error: function() {
            filePath = '';
        },
        complete: function() {
            if (version !== 'stable') {
                // parse version to figure out which website theme classes to use
                var pre = '<div class="container-fluid alert-danger devbar"><div class="row no-gutters"><div class="col-12 text-center">';
                var post = '</div></div></div>';
                var anchor = 'class="btn btn-danger font-weight-bold ml-3 my-3 align-baseline"';

                if (parseFloat(version) < 0.4) {  // 'dev' → NaN → false (which is what we want)
                    pre = '<div class="d-block devbar alert alert-danger">';
                    post = '</div>';
                    anchor = 'class="btn btn-danger" style="font-weight: bold; vertical-align: baseline; margin: 0.5rem; border-style: solid; border-color: white;"';
                }
                // triage message
                var verText = `an <strong>old version (${version})</strong>`;
                if (version == 'dev') {
                    verText = 'the <strong>unstable development version</strong>';
                }

                $("body").prepend(`${pre}This is documentation for ${verText} of alphaCSC. <a ${anchor} href="/stable/${filePath}">Switch to stable version</a>${post}`);
                }
            }
        });
})()