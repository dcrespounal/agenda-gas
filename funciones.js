function doGet(){

    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda con GAS')
}

function obtenerDatosHTML(nombre){

    return HtmlService.createHtmlOutputFromFile(nombre).getContent() 
}

function obtenerContactos(){

    let hoja = SpreadsheetApp.openById('1Q6ARghboL7E9ancmPeJkO3LyOrpzcWpqzs1Vq4P_mIo').getActiveSheet()
    let datos = hoja.getDataRange().getValues()
    return datos
}