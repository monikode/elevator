var fila = []
var atual = 1

$(document).ready(function(){
    for(var i=1;i<=4;i++){
        $('.andares').append('<div><i class="cima material-icons">arrow_upward</i> <i class="baixo material-icons">arrow_downward</i><div class="porta"></div><div class="porta"></div></div>');
        $('.buttons div:eq(' + (i-1) + ')').click(function(){
            if(fila.length<3)
                add($(this).text()-0)
        })
    }
})

function add(andar){
    if(atual!=andar){
        fila.push(andar)
        $('.buttons div:eq('+(andar-1)+')').css('background-color', 'green');
        wait()

    }
}

//funcao recursiva
function wait (){
    var aux = atual - fila[0]
    aux = aux<0?-aux:aux

    $('.tunel .box').animate({top: ((3 -(fila[0]-1)) * 100)+ 'px'}, aux*1000,  function(){
        atual = fila[0]?fila[0]:atual;
        $('.display h2').text(atual)
        $('.buttons div:eq('+(atual-1)+')').css('background-color', 'rgb(133, 132, 132)');

        espera(3);
    });

}

function espera (i){
    if(i==0) {
        fila.shift();

        $('.tunel .box').css('top','300px')
        return;
    }
    $('.tunel .box').animate({top: '+=0px'}, 1000, function (){
        if(fila.length>0){
            fila.shift();
            wait()
        } else {
            return espera(i-1)
        }
    })
}
