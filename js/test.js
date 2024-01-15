const { autotelexFiliaal } = require("./autotelexFiliaal.js");
const { autotelexGebruiker } = require("./autotelexGebruikers.js");
const { aanvragenTicket } = require("./aanvragenTicket.js");

var setletter = 'a';
var filiaal = '01'; 
var userid= 'MVM';
var jsonAutotelexFiliaal;
var jsonAutotelexGebruiker;

function main() {
    var initializePromise = autotelexFiliaal(setletter, filiaal);
    initializePromise.then(function(result) {
        jsonAutotelexFiliaal = result;
       // console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
        //console.log('jsonAutotelexFiliaal ' + result);
	   //uitlezenFiliaal(result);
	   autotelexGebruikerOphalen(jsonAutotelexFiliaal);
    }, function(err) {
        console.log(err);
    });
}


function autotelexGebruikerOphalen(jsonAutotelexFiliaal) {
    var initializePromise = autotelexGebruiker(setletter, filiaal,userid);
    initializePromise.then(function(result) {
        jsonAutotelexGebruiker = result;
       // console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
        //console.log('jsonAutotelexGebruiker ' + JSON.stringify(result));
	   //autotelexGebruikers(setletter, filiaal, userid);
	   //uitlezenFiliaal(jsonAutotelexFiliaal);
	   //testenGebruiker(jsonAutotelexGebruiker);
	   var kenteken = '13TRLH'
	   var kmstand = '105000';
	   aanvragenTicketAutotelexpro (jsonAutotelexFiliaal, jsonAutotelexGebruiker, kenteken, kmstand);
    }, function(err) {
        console.log(err);
    });
}

function aanvragenTicketAutotelexpro (jsonAutotelexFiliaal, jsonAutotelexGebruiker, kenteken, kmstand) {
	var initializePromise = aanvragenTicket(jsonAutotelexFiliaal, jsonAutotelexGebruiker, kenteken, kmstand);
    initializePromise.then(function(result) {
        aanvraagTicket = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
        console.log('net voor delete ' + result);
	   
	  //oauth20DeleteToken(aanvraagTicket);
    }, function(err) {
        console.log(err);
    });
}
function uitlezenFiliaal (jsonfile) {
	console.log('UitlezenFiliaal ');
//console.log('jsonFile '+ jsonfile);	
//console.log(JSON.stringify(jsonfile));
//var marco = JSON.stringify(jsonfile);

//console.log('1 object ' + marco['FILIAAL_NUMMER']);
console.log('FILIAAL_NUMMER ' + jsonfile[0].FILIAAL_NUMMER );
console.log('VESTIGINGSID ' + jsonfile[0].AUTOTELEX_VESTIGINGSID );
console.log('SOAP HEADER USER ' + jsonfile[0].AUTOTELEX_SOAPUSER );
console.log('SOAP HEADER PASSWORD ' + jsonfile[0].AUTOTELEX_SOAPPASS );
}

function testenGebruiker (jsonfile) {
	for (t=0; t < jsonfile.length; t++)
	{
	 	console.log('ATUBRAN ' + jsonfile[t].FILIAAL_NUMMER );
		console.log('ATUIUSER ' + jsonfile[t].IDAS_USERID );
        console.log('ATUVID ' + jsonfile[t].AUTOTELEX_VESTIGINGSID );
		console.log('ATUUSER ' + jsonfile[t].AUTOTELEX_GEBRUIKERSNAAM );
		console.log('ATUPASS ' + jsonfile[t].AUTOTELEX_WACHTWOORD );
    }	
}

main();