const { aanvragenTicket } = require("./aanvragenTicket.js");
const { deleteOauthTkn } = require("../../oauthidas/js/oauthRequest.js");
const { insertOauthTkn } = require("../../oauthidas/js/oauthRequest.js");
const { autotelexFiliaal } = require("./autotelexFiliaal.js");
const { autotelexGebruiker } = require("./autotelexGebruikers.js");
const { getCustmOphalen } = require("./custmDB2.js");
const { getDciOphalen } = require("./dciDB2.js");



 



 



 
	 var setletter = process.argv[2];
	  console.log('setletter '+setletter);
	  
	
	// Parameter 3 ophalen
	  var idasuser = process.argv[3];
	  console.log('idasuser '+idasuser); 
	  
	  // Parameter 4 ophalen
	  var applicatie = process.argv[4];
	  console.log('applicatie '+applicatie); 
	  
	   // Parameter 5 ophalen
	  var filiaal = process.argv[5];
	  console.log('filiaal '+filiaal); 

	   // Parameter 6 ophalen
	  var offertenr = process.argv[6];
	  console.log('offertenr '+offertenr); 
   
         // Parameter 7 ophalen
	  var kenteken = process.argv[7];
	  console.log('kenteken '+kenteken); 
   
       // Parameter 8 ophalen
	  var kmstand = process.argv[8];
	  console.log('kmstand '+kmstand); 
	  
	   // Parameter 9 ophalen
	  var klantnummer = process.argv[9];
	  console.log('klantnummer '+klantnummer); 
   
   
//vcnlkeyf(setletter,applicatie, function(err, marco) {
 //   console.log('Test ' +marco)
 // });
   
	var jsonAutotelexFiliaal;
	var jsonAutotelexGebruiker;
	var jsonCustm;
	var jsonDci;
	var aanvraagTicket;

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
    var initializePromise = autotelexGebruiker(setletter, filiaal, idasuser);
    initializePromise.then(function(result) {
        jsonAutotelexGebruiker = result;
       // console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
        console.log('jsonAutotelexGebruiker ' + JSON.stringify(result));
	   //autotelexGebruikers(setletter, filiaal, userid);
	  // uitlezenFiliaal(jsonAutotelexFiliaal);
	  // testenGebruiker(jsonAutotelexGebruiker);
	  idasCustmDB2Ophalen (jsonAutotelexFiliaal, jsonAutotelexGebruiker);
    }, function(err) {
        console.log(err);
    });
}

function idasCustmDB2Ophalen(jsonAutotelexFiliaal, jsonAutotelexGebruiker) {
    var initializePromise = getCustmOphalen(setletter, klantnummer);
    initializePromise.then(function(result) {
        jsonCustm = result;
       // console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
        console.log('jsonAutotelexGebruiker ' + JSON.stringify(result));
	   //autotelexGebruikers(setletter, filiaal, userid);
	  // uitlezenFiliaal(jsonAutotelexFiliaal);
	  // testenGebruiker(jsonAutotelexGebruiker);
	  idasDciDB2Ophalen (jsonAutotelexFiliaal, jsonAutotelexGebruiker, jsonCustm);
    }, function(err) {
        console.log(err);
    });
}

function idasDciDB2Ophalen(jsonAutotelexFiliaal, jsonAutotelexGebruiker) {
    var initializePromise = getDciOphalen(setletter, klantnummer);
    initializePromise.then(function(result) {
        jsonDci = result;
       // console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
        console.log('jsonAutotelexGebruiker ' + JSON.stringify(result));
	   //autotelexGebruikers(setletter, filiaal, userid);
	  // uitlezenFiliaal(jsonAutotelexFiliaal);
	  // testenGebruiker(jsonAutotelexGebruiker);
	  aanvragenTicketAutotelexpro (jsonAutotelexFiliaal, jsonAutotelexGebruiker, jsonCustm, jsonDci);
    }, function(err) {
        console.log(err);
    });
}

function aanvragenTicketAutotelexpro (jsonAutotelexFiliaal, jsonAutotelexGebruiker, jsonCustm, jsonDci) {
	var initializePromise = aanvragenTicket(jsonAutotelexFiliaal, jsonAutotelexGebruiker, jsonCustm, jsonDci, kenteken, kmstand);
    initializePromise.then(function(result) {
        aanvraagTicket = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
        console.log('net voor delete ' + result);
	   
	   oauth20DeleteToken(aanvraagTicket);
    }, function(err) {
        console.log(err);
    });
}
	
	var resultaat;

function oauth20DeleteToken (aanvraagTicket) {
	var initializePromise = deleteOauthTkn(setletter, idasuser, applicatie, aanvraagTicket);
    initializePromise.then(function(result) {
        resultaat = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	  console.log('Net voor oauth20InsertToken ' + resultaat); 
	  oauth20InsertToken(aanvraagTicket);
    }, function(err) {
        console.log(err);
    });
}


function oauth20InsertToken (aanvraagTicket) {
	var initializePromise = insertOauthTkn(setletter, idasuser, applicatie, aanvraagTicket);
   initializePromise.then(function(result) {
        resultaat = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	  console.log(' Programma OauthValidate ' + resultaat);
    }, function(err) {
        console.log(err);
    });
}
	
main();  
 
  


  



	 