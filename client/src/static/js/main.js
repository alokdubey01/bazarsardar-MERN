// hide bottom nav on scroll
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("side_nav").style.display = "none";
        document.getElementById("mySidenav").style.display = "inline";
    } else {
        document.getElementById("side_nav").style.display = "inline";
    }
}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementsByClassName("container").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementsByClassName("container").style.marginLeft = "0";
}

$(function () {
    // hide comments
    $('.hideComments').on('click', function () {
        var $btn = $(this),
            $parent = $btn.closest('.panel-body'),
            $comments = $parent.find('.comment');
        if (!$btn.hasClass('showComments')) {
            $comments.fadeOut(250);
            $btn.addClass('showComments').text('Show Comments');
        } else if ($btn.hasClass('showComments')) {
            $comments.fadeIn(250);
            $btn.removeClass('showComments').text('Hide Comments');
        }
    });

    // css panels
    $('.css-row').on('click', 'button[data-toggle="collapse"]', function () {
        var $btn = $(this),
            $attr = $btn.attr('data-target'),
            $target = $($attr);
        if ($target.hasClass('in')) {
            $target.collapse('toggle');
            $btn.text($btn.text().replace('Hide', 'Show'));
        } else {
            $('.css-row').find('.collapse.in').removeClass('in');
            $btn.text($btn.text().replace('Show', 'Hide'));
            $btn.siblings('.btn').each(function () {
                var $newBtn = $(this);
                $newBtn.text($newBtn.text().replace('Hide', 'Show'));
            });
        }
    });


});

//cart
$('a.remove').click(function () {
    event.preventDefault();
    $(this).parent().parent().parent().hide(400);

})

// Just for testing, show all items
$('a.btn.continue').click(function () {
    $('li.items').show(400);
})

// var countDownDate = new Date("Oct 20, 2021 15:37:25").getTime();

// var x = setInterval(function () {

//     var now = new Date().getTime();

//     var distance = countDownDate - now;

//     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     document.getElementById("time").innerHTML = days + "d " + hours + "h "
//         + minutes + "m " + seconds + "s ";

//     if (distance < 0) {
//         clearInterval(x);
//         document.getElementById("time").innerHTML = "EXPIRED";
//     }
// }, 1000);




function ekUpload() {
    function Init() {

        console.log("Upload Initialised");

        var fileSelect = document.getElementById('file-upload'),
            fileDrag = document.getElementById('file-drag'),
            submitButton = document.getElementById('submit-button');

        fileSelect.addEventListener('change', fileSelectHandler, false);

        // Is XHR2 available?
        var xhr = new XMLHttpRequest();
        if (xhr.upload) {
            // File Drop
            fileDrag.addEventListener('dragover', fileDragHover, false);
            fileDrag.addEventListener('dragleave', fileDragHover, false);
            fileDrag.addEventListener('drop', fileSelectHandler, false);
        }
    }

    function fileDragHover(e) {
        var fileDrag = document.getElementById('file-drag');

        e.stopPropagation();
        e.preventDefault();

        fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
    }

    function fileSelectHandler(e) {
        // Fetch FileList object
        var files = e.target.files || e.dataTransfer.files;
        fileDragHover(e);

        for (var i = 0, f; f = files[i]; i++) {
            parseFile(f);
            uploadFile(f);
        }
    }

    // Output
    function output(msg) {
        // Response
        var m = document.getElementById('messages');
        m.innerHTML = msg;
    }

    function parseFile(file) {

        console.log(file.name);
        output(
            '<strong>' + encodeURI(file.name) + '</strong>'
        );

        var imageName = file.name;

        var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
        if (isGood) {
            document.getElementById('start').classList.add("hidden");
            document.getElementById('response').classList.remove("hidden");
            document.getElementById('notimage').classList.add("hidden");
            // Thumbnail Preview
            document.getElementById('file-image').classList.remove("hidden");
            document.getElementById('file-image').src = URL.createObjectURL(file);
        }
        else {
            document.getElementById('file-image').classList.add("hidden");
            document.getElementById('notimage').classList.remove("hidden");
            document.getElementById('start').classList.remove("hidden");
            document.getElementById('response').classList.add("hidden");
            document.getElementById("file-upload-form").reset();
        }
    }

    function setProgressMaxValue(e) {
        var pBar = document.getElementById('file-progress');

        if (e.lengthComputable) {
            pBar.max = e.total;
        }
    }

    function updateFileProgress(e) {
        var pBar = document.getElementById('file-progress');

        if (e.lengthComputable) {
            pBar.value = e.loaded;
        }
    }
    // for api 
    function uploadFile(file) {

        var xhr = new XMLHttpRequest(),
            fileInput = document.getElementById('class-roster-file'),
            pBar = document.getElementById('file-progress'),
            fileSizeLimit = 1024; // In MB
        if (xhr.upload) {
            if (file.size <= fileSizeLimit * 1024 * 1024) {
                // Progress bar
                pBar.style.display = 'inline';
                xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
                xhr.upload.addEventListener('progress', updateFileProgress, false);
                document.getElementById("upload_img").style.display = 'block';

                // File received / failed
                xhr.onreadystatechange = function (e) {
                    if (xhr.readyState == 4) {
                        // Everything is good!

                        progress.className = (xhr.status == 200 ? "success" : "failure");
                        document.location.reload(true);
                    }
                };

                // Start upload and send it to the server

                xhr.open('POST', document.getElementById('file-upload-form').action, true);
                xhr.setRequestHeader('X-File-Name', file.name);
                xhr.setRequestHeader('X-File-Size', file.size);
                xhr.setRequestHeader('Content-Type', 'multipart/form-data');
                xhr.send(file);
            } else {
                output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
            }
        }
    }

    // Check for the various File API support.
    if (window.File && window.FileList && window.FileReader) {
        Init();
    } else {
        document.getElementById('file-drag').style.display = 'none';
    }
}
ekUpload();



// cart button
var counter = 0;
function cartClick() {
    cart = document.getElementById('sup');
    counter++;
    cart.innerHTML = counter;
}