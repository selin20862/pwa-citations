if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('../../service-worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

  let deferredPrompt;

 

  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt fired: '+e);
    e.preventDefault();
    deferredPrompt = e;
    
    showInstallPromotion();
  });

  function showInstallPromotion() {
    console.log('Ok on peut installer');
    $('#install').show();
  }   

$( document ).ready(function() {
    
    
    $('#install').click(function() {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
            } else {
              console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
          });
        }
      });





$('#citation').click(function(){
    $('img').css('display', 'block');
    console.log('click');
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbxCGr_uSuZsu99DjbETA6z5jFkbrgY-Mt5ClCCM7llJpsrmq1sBpEvy9Nrmx0x18Spk/exec',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data.data);

                // Obtenez un index aléatoire
                var randomIndex = Math.floor(Math.random() * data.data.length);
            
            
                // Obtenez la citation à l'index aléatoire
                var quote = data.data[randomIndex].Citation;
                var author = data.data[randomIndex].Auteur;
                console.log(author)
                var descr = data.data[randomIndex].Description;
                var img = data.data[randomIndex].URLImage;
            
                // Affichez la citation dans l'élément h1
                $("h1").html(quote);
                $('img').attr('src', img);
                $('h2').html(author);
                $('p').html(descr);

        }//fin success
    }); //fin ajax
});










});