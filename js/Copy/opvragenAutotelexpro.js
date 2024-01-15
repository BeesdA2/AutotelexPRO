const { aanvragenTicket } = require("./aanvragenTicket.js");
const { opvragenVoertuigInformatieMetTicket } = require("./opvragenVoertuigInformatie.js");
const { autotelexFiliaal } = require("./autotelexFiliaal.js");
const { autotelexGebruiker } = require("./autotelexGebruikers.js");



 



 



 
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
	  var aanvraagTicketId = process.argv[7];
	  console.log('aanvraagTicketId '+ aanvraagTicketId); 
   
      var kenteken = process.argv[8];
	  console.log('kenteken '+ kenteken); 
   
   
   
//vcnlkeyf(setletter,applicatie, function(err, marco) {
 //   console.log('Test ' +marco)
 // });
   
	var jsonAutotelexFiliaal;
	var jsonAutotelexGebruiker;
	var opvragenVoertuigInfo;

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
	   opvragenVoertuigInformatieAutotelexpro(jsonAutotelexFiliaal, jsonAutotelexGebruiker, aanvraagTicketId);
    }, function(err) {
        console.log(err);
    });
}



function opvragenVoertuigInformatieAutotelexpro(jsonAutotelexFiliaal, jsonAutotelexGebruiker, aanvraagTicketId){
	
	var initializePromise = opvragenVoertuigInformatieMetTicket(jsonAutotelexFiliaal, jsonAutotelexGebruiker, aanvraagTicketId);
    initializePromise.then(function(result) {
        opvragenVoertuigInfo = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
        console.log('net voor opvragenVoertuigInformatie ' + result);
	   
	   //opvragenVoertuigInformatieAutotelexpro(jsonAutotelexFiliaal, jsonAutotelexGebruiker, aanvraagTicket);
    }, function(err) {
        console.log(err);
    });
}	
	
	var resultaat;


	
main();  
 
  


  



	 