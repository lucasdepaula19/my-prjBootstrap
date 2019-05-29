
var mytable = localStorage.getItem("mytable");
mytable = JSON.parse(mytable);
var indice_selecionado = -1; //Índice do item selecionado na lista
var editar = false;

$(document).ready(function () {
    //mytable = JSON.parse(mytable);
    if (mytable == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        mytable = [];

    listar(mytable);
});

//adiciona novas linhas ao formulário
$('#addRow').click(function () {

    if (document.dados.valor1.value === "" || document.dados.valor2.value === "" || document.dados.valor2.value < 10000 || document.dados.valor3.value === "" || document.dados.valor4.value === "") {
        //document.dados.valor1.focus();
        //return false;
    } else if (editar) {
        Editar();
    } else {
        Adicionar();
    }
})

//evento disparado quando o icone de editar é acionado
$('.table').on("click", ".btnEditar", function () {

    editar = true;

    indice_selecionado = parseInt($(this).attr("alt"));
    var cli = JSON.parse(mytable[indice_selecionado]);

    $("#valor1").val(cli.data);
    $("#valor2").val(cli.operacao);
    $("#valor3").val(cli.descricao);
    $("#valor4").val(cli.valor);
    $("#valor1").focus();
});

//evento disparado quando o icone de excluir é acionado
$('.table').on("click", ".btnExcluir", function () {
    indice_selecionado = parseInt($(this).attr("alt"));
    if (confirm("Tem certeza que deseja excluir a operação selecionada?")) {
        Excluir();
    }
});

function Adicionar() {
    
    let newRow;

    //cria a linha que será gravada no localStorage
    newRow = JSON.stringify({
        data: $("#valor1").val(),
        operacao: $("#valor2").val(),
        descricao: $("#valor3").val(),
        valor: parseInt($("#valor4").val()),
        result: 0
    });

    //Grava a linha no localStorage
    mytable.push(newRow);
    localStorage.setItem("mytable", JSON.stringify(mytable));
}

//Edita um registro
function Editar() {
    mytable[indice_selecionado] = JSON.stringify({
        data: $("#valor1").val(),
        operacao: $("#valor2").val(),
        descricao: $("#valor3").val(),
        valor: $("#valor4").val()
    });
    //Altera o item selecionado na tabela
    localStorage.setItem("mytable", JSON.stringify(mytable));
    editar = false;
}

//Exclui um registro
function Excluir() {
    mytable.splice(indice_selecionado, 1);
    localStorage.setItem("mytable", JSON.stringify(mytable));
    alert("Registro excluído.");
    listar(mytable);
}

//calcula o Saldo

function calculaSaldo(table) {

    if (table == "" || table == undefined) {
        return;
    } else {
        let objt_json = JSON.parse(table[0]);
        objt_json.result = objt_json.valor;
        mytable[0] = JSON.stringify(objt_json)
        localStorage.setItem("mytable", JSON.stringify(mytable));

        for (let i = 1, y = 0; i < table.length; i++ , y++) {
            let obj = JSON.parse(table[i]);
            let obj_old = JSON.parse(table[y]);
            let res = parseInt(obj_old.result) + parseInt(obj.valor);
            obj.result = res;
            mytable[i] = JSON.stringify(obj)
            localStorage.setItem("mytable", JSON.stringify(mytable));
        }
    }
}


function listar(table) {

    $("#formId").empty();

    calculaSaldo(table);

    //Cria e exibe o formulário de lista de operações
    for (var i in table) {

        let cli = JSON.parse(table[i]);

        $("#formId").prepend("<tr>");
        $("#formId").prepend("<td class='td_number'>" + cli.result + "</td>");
        $("#formId").prepend("<td class='td_number'>" + cli.valor + "</td>");
        $("#formId").prepend("<td>" + cli.descricao + "</td>");
        $("#formId").prepend("<td>" + cli.operacao + "</td>");
        $("#formId").prepend("<td>" + cli.data + "</td>");
        $("#formId").prepend("<td><img src='img/pen-square-solid.svg' alt='" + i + "'class='btnEditar'/><img src='img/trash-solid.svg' alt='" + i + "' class='btnExcluir'/></td>");
        $("#formId").prepend("</tr>");
    }

    //Colore os valores de azul e vermelho
    $(".td_number").each(function () {
        let val = $(this).text();
        let n = +val;

        if (!isNaN(n) && /^\s*[-]/.test(val)) {
            $(this).addClass('red');
        } else if (!isNaN(n)) {
            $(this).addClass('blue');
        }
    })
}













//calcula valor 5
/*
function calculaValor5(table) {

    let zresult;

    if (table == "" || table == undefined) {
        zresult = parseInt($("#valor4").val());
    } else {
        let zposition = table.length;
        let i = zposition - 1;
        let cli = JSON.parse(table[i]);
        zresult = parseInt(cli.result) + parseInt($("#valor4").val());
    }
    return zresult;
}
*/


/*

verificar este link para uso do localstorage
https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045


Verificar este link para validação de campos:
https://www.devmedia.com.br/html5-validator-validando-formularios-com-html5/28785


//site para obter icones
https://fontawesome.com/icons?d=gallery

//newRow = "<tr><th scope='row'>" + $("#valor1").val() + "</th><td>" + $("#valor2").val() + "</td><td>" + $("#valor3").val() + "</td><td>" + $("#valor4").val() + "</td><td></td></tr>";

role="form"

type="button"

method="POST"

.clone()

<div w3-include-html="row_include.html"></div>

$('tbody').wrapInner("    <th scope='row'>15/04/2019</th>" );

$(document).ready(function(){

https://www.w3schools.com/jquery/jquery_dom_get.asp

https://www.w3schools.com/jquery/jquery_dom_set.asp

get: $("#test").val(); (val,text,html,attr)

set: $("#test3").val("Dolly Duck"); (val,text,html,attr)

Method	Description
addClass()	Adds one or more class names to selected elements
after()	    Inserts content after selected elements
append()	Inserts content at the end of selected elements
appendTo()	Inserts HTML elements at the end of selected elements
attr()	    Sets or returns attributes/values of selected elements
before()	Inserts content before selected elements
clone()	    Makes a copy of selected elements


$(document).ready(
    function(){
        let n = 1;
        $('p').each(function() {
            this.innerHTML = n++;
        });
        localStorage.setItem('n',n);
    }
);

$('button').click(function(){
    localStorage.clear();
})


*/
