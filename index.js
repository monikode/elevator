var fila = [];
var atual = 1;

$(document).ready(function () {
  for (var i = 1; i <= 4; i++) {
    $(".andares").append(
      '<div><div class="porta"><div class="painel"></div><div class="portas"><div class="p1"></div><div class="p2"></div></div><div class="botoes"><i class="cima material-icons">arrow_upward</i><i class="baixo material-icons">arrow_downward</i></div></div></div>'
    );
    $(".buttons div:eq(" + (i - 1) + ")").click(function () {
      if (fila.length < 3) add($(this).text() - 0);
    });
  }

  $(".cima").click(function () {
    var aux = 4 - $(".cima").index(this);
    add(aux)
  });
  $(".baixo").click(function () {
    var aux = 4 - $(".baixo").index(this);
    add(aux)
  });
});

function add(andar) {
  if (atual != andar) {
    fila.push(andar);
    $(".buttons div:eq(" + (andar - 1) + ")").css("background-color", "green");
    wait();
  }
}

//funcao recursiva
function wait() {
  var aux = atual - fila[0];
  aux = aux < 0 ? -aux : aux;

  $(".tunel .box").animate(
    { top: (3 - (fila[0] - 1)) * 300 + "px" },
    aux * 1000,
    function () {
      atual = fila[0];
      console.log("atual:", atual, " fila 0: ", fila[0]);
      abrirPortas(4 - fila[0]);

      $(".display h2").text(atual);
      $(".buttons div:eq(" + (atual - 1) + ")").css(
        "background-color",
        "rgb(133, 132, 132)"
      );

      espera(3);
    }
  );
}

function espera(i) {
  if (i == 0) {
    fecharPortas(4 - atual);
    fila.shift();
    atual = 1;

    $(".display h2").text(atual);
    $(".tunel .box").animate({ top: "900px" }, 2000);
    return;
  }
  $(".tunel .box").animate({ top: "+=0px" }, 1000, function () {
    if (fila.length > 1) {
      fecharPortas(4 - atual);
      fila.shift();
      wait();
    } else {
      return espera(i - 1);
    }
  });
}

function abrirPortas(andar) {
  $(".porta:eq(" + andar + ") .portas .p2").animate({ right: "-40px" });
  $(".porta:eq(" + andar + ") .portas .p1").animate({ left: "-40px" });
}

function fecharPortas(andar) {
  $(".porta:eq(" + andar + ") .portas .p2").animate({ right: "0px" });
  $(".porta:eq(" + andar + ") .portas .p1").animate({ left: "0px" });
}
