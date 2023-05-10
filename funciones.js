const HOJA = SpreadsheetApp.openById('1Q6ARghboL7E9ancmPeJkO3LyOrpzcWpqzs1Vq4P_mIo').getActiveSheet()

function doGet(){

    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda con GAS')
}

function doPost(datos){
    
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda con GAS')
}

function obtenerDatosHTML(nombre){

    return HtmlService.createHtmlOutputFromFile(nombre).getContent() 
}

function obtenerContactos(){
    
    return HOJA.getDataRange().getValues()
}



function insertarContacto(nombre, correo){
    //añadir un vector con cada celda a añadir
    HOJA.appendRow([nombre, correo])
}
