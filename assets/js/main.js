let date = new Date();
let hora = date.getHours();
let Token = "";
var urlAnterior = "";
var urlLlegada = "";
let params = new URLSearchParams(location.search);
var bandera_num = false;
//var Url_Backend = "https://localhost:44355/";
var Url_Backend = "https://pruebasetb.etb.com/LandingBackend/";

var hoy = new Date();
var fecha_val = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
var hora_val = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

//Origen "LDuoFibraAgoston"

//Variables UTM
var id_pauta, utm_source, utm_medium, utm_campaign, utm_content, utm_term, ejecutar_plano;
var Respuesta;

$(document).ready(function () {
    // Oculta texto número errado
    $("#desc_num_errado").hide();
    $("#popup").hide();
    $("#btn_chat").hide();

    validations();
    UTM();
    getToken();

    $("#btn_wpp").click(function () {
        $("#popup").show();

        Param_val = {
            "cel": $("#txt_num_cel").val(),
            "origen": "LDuoFibraAgosto",
            "fecha": fecha_val + ' ' + hora_val,
            "query": 1
        };

        $.ajax({
            type: "POST",
            url: Url_Backend + "Repetido",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(Param_val),
            success: function (data) {
                Respuesta = data;
                if (data == 'true') {

                    let oferta = "HOGARES";
                    let tipo = "4";
                    let actualiza = "Si envia a CTC";
                    let idSkill = "960009005";
                    let urlActual = window.location.href;
                    let urlAnterior = "Directo";

                    Wpp_TeLlamamos(oferta, tipo, actualiza, idSkill, urlActual, urlAnterior);

                } else {
                    swal(data);
                    limpiarCampos();
                    $("#popup").hide();
                }
            },
            failure: function (data) {
                console.log(data);
                limpiarCampos();
                $("#popup").hide();
            },
            error: function (data) {
                console.log(data);
                limpiarCampos();
                $("#popup").hide();
            }
        });
    });

    $("#btn_tellamamos").click(function () {
		console.log("entro ");
        $("#popup").show();

        Param_val = {
            "cel": $("#txt_num_cel").val(),
            "origen": "LDuoFibraAgosto",
            "fecha": fecha_val + ' ' + hora_val,
            "query": 1
        };

        $.ajax({
            type: "POST",
            url: Url_Backend + "Repetido",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(Param_val),
            success: function (data) {
                Respuesta = data;
                if (data == 'true') {

                    let oferta = "HOGARES";
                    let tipo = "1";
                    let actualiza = "Si envia a CTC";
                    let idSkill = "960009005";
                    let urlActual = window.location.href + "/ActivaInsert";
                    let urlAnterior = window.location.href;

                    Wpp_TeLlamamos(oferta, tipo, actualiza, idSkill, urlActual, urlAnterior);

                } else {
                    swal(data);
                    limpiarCampos();
                    $("#popup").hide();
                }
            },
            failure: function (data) {
                console.log(data);
                limpiarCampos();
                $("#popup").hide();
            },
            error: function (data) {
                console.log(data);
                limpiarCampos();
                $("#popup").hide();
            }
        });
    });

});

function getToken() {
    $.ajax({
        type: "GET",
        url: "https://services.emergiacc.com/WSLeads/token/getToken?login=etb&password=3Tb4Pi2o19",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            Token = data;
        },
        failure: function (data) {
            console.log(data.responseText);
        },
        error: function (data) {
            console.log(data.responseText);
        }
    });
}

function UTM() {

    if (params.get('id_pauta') != null) {
        id_pauta = params.get('id_pauta');
    }

    if (params.get('utm_source') != null && params.get('utm_source') != "") {
        utm_source = params.get('utm_source');
    } else {
        utm_source = "Vacio";
    }

    if (params.get('utm_medium') != null && params.get('utm_medium') != "") {
        utm_medium = params.get('utm_medium');
    } else {
        utm_medium = "Vacio";
    }

    if (params.get('utm_campaign') != null && params.get('utm_campaign') != "") {
        utm_campaign = params.get('utm_campaign');
    } else {
        utm_campaign = "Vacio";
    }

    if (params.get('utm_content') != null && params.get('utm_content') != "") {
        utm_content = params.get('utm_content');
    } else {
        utm_content = "Vacio";
    }

    if (params.get('utm_term') != null && params.get('utm_term') != "") {
        utm_term = params.get('utm_term');
    } else {
        utm_term = "Vacio";
    }

    /*if(params.get('ejecutar_plano') != null ){
        if(params.get('ejecutar_plano') == "ejecuta_base"){
            //autoEnvio();
        }
    }*/

}

function validations() {

    $("#txt_num_cel").keyup(function (event) {

        var index2 = $("#txt_num_cel").val().charAt(1);

        //Validación para los número comenzados por los prefijos nacionales (30,31,32,35)
        if ($("#txt_num_cel").val().charAt(0) == '3') {
            if (index2 == '0' || index2 == '1' || index2 == '2' || index2 == '5') {
                $("#desc_num_errado").hide();
                bandera_num = true;
            } else {
                $("#desc_num_errado").show();
                bandera_num = false
            }
        } else {
            $("#desc_num_errado").show();
            bandera_num = false;
        }

        //Validación para cuando el campo esta vacio
        if ($("#txt_num_cel").val() == "") {
            $("#desc_num_errado").hide();
        }
    });

    //Validacion cantidad de caracteres input Número de celular
    var input = document.getElementById('txt_num_cel');
    input.addEventListener('input', function () {
        if (this.value.length > 10)
            this.value = this.value.slice(0, 10);
    });

    //Validación Checkbox
    $("#chk_confirm").change(function () {
        var condiciones = $("#chk_confirm").is(":checked");
        var cant_nums = $("#txt_num_cel").val().length;

        if (condiciones && bandera_num == true && cant_nums == 10) {

            if (hora >= 22 || hora <= 6) {
                $('#btn_chat').attr('disabled', true);
            } else {
                $('#btn_chat').attr('disabled', false);
            }

            $('#btn_tellamamos').attr('disabled', false);
            $('#btn_wpp').attr('disabled', false);

        } else {
            $('#btn_chat').attr('disabled', true);
            $('#btn_tellamamos').attr('disabled', true);
            $('#btn_wpp').attr('disabled', true);
        }
    });

}

function Wpp_TeLlamamos(oferta, tipo, actualiza, idSkill, urlActual, urlAnterior) {
    Param = {
        "Oferta": oferta,
        "nombreR": utm_source + $("#txt_num_cel").val(),
        "celR": $("#txt_num_cel").val(),
        "mailR": $("#txt_num_cel").val() + "@123456.com",
        "actualiza": actualiza,
        "servicio": idSkill,
        "type": tipo,
        "Origin": "LDuoFibraAgosto",
        "utm_source": utm_source,
        "utm_medium": utm_medium,
        "utm_campaign": utm_campaign,
        "utm_content": utm_content,
        "utm_term": utm_term,
        "IDSkill": idSkill,
        "URLActual": urlActual,
        "URLAnterior": urlAnterior,
        "tipoTelefonia": "1",
        "Landing": "2playfibra",
        "Opcion": 2
    };

    $.ajax({
        type: "POST",
        url: Url_Backend + "InsertWpp",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(Param),
        success: function (data) {
            if(data.includes("satisfactoriamente")){
                window.location.replace("/2playfibra-amp/Thanks_Page.html");
            }else {
                swal(data);
                limpiarCampos();
                $("#popup").hide();
            }

        },
        failure: function (data) {
            console.log(data);
            limpiarCampos();
            $("#popup").hide();
        },
        error: function (data) {
            console.log(data);
            limpiarCampos();
            $("#popup").hide();
        }
    });
}

function limpiarCampos() {
    $("#txt_num_cel").val("");
    $("#chk_confirm").prop('checked', false);

    $('#btn_chat').attr('disabled', true);
    $('#btn_tellamamos').attr('disabled', true);
    $('#btn_wpp').attr('disabled', true);
}