$( document ).ready(function() {
    
    






$('button').click(function(){
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