const { getVendorTokenAutotelexPro } = require("./getVendorToken.js");
const { getCustomerTokenAutotelexPro } = require("./getCustomerToken.js");
const { deleteInruilerDVT } = require("./vehicleInfoIntoIdas.js");
const { insertInruilerDVT } = require("./vehicleInfoIntoIdas.js");
const { updatePrijsinfoDVT } = require("./vehicleInfoIntoIdas.js");
const { updateDVTVoertuigInformatie } = require("./vehicleInfoIntoIdas.js");

const { getMaxSeqnDVT } = require("./vehicleInfoIntoIdas.js");
const { getVTBRUTDVT } = require("./vehicleInfoIntoIdas.js");
const { getVTATHWDVT } = require("./vehicleInfoIntoIdas.js");

const { opvragenVoertuigInformatieMetKenteken } = require("./opvragenVoertuigInformatieKenteken.js");

const { getKentekenRaadplegingenAutotelexPro } = require("./getKentekenRaadplegingen.js");
const { getVehiclesProAutotelexPro } = require("./getVehiclesPro.js");
const { autotelexFiliaal } = require("./autotelexFiliaal.js");
const { autotelexGebruiker } = require("./autotelexGebruikers.js");



 



 


      console.log('argument 0 '+ process.argv[0]);
      console.log('argument 1 '+ process.argv[1]);
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
	  var taxatieID = process.argv[8];
	  console.log('taxatieID '+taxatieID);
	  
	  // Parameter 9 ophalen
	  var taxatieDATUM = process.argv[9];
	  console.log('taxatieDATUM '+taxatieDATUM);
	  
	  // Parameter 9 ophalen
	  var inruilwaarde= process.argv[10];
	  console.log('inruilwaarde '+inruilwaarde);
	  
	  
   
      
   
      
   
   
//vcnlkeyf(setletter,applicatie, function(err, marco) {
 //   console.log('Test ' +marco)
 // });
   
	var jsonAutotelexFiliaal;
	var jsonAutotelexGebruiker;
	var vendorTokenID;
	var vehicleInfo;
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
	   getVendorTokenRequest(jsonAutotelexFiliaal,jsonAutotelexGebruiker);
	 }, function(err) {
        console.log(err);
    });
}

function getVendorTokenRequest (jsonAutotelexFiliaal, jsonAutotelexGebruiker) {
	var initializePromise = getVendorTokenAutotelexPro(jsonAutotelexFiliaal);
    initializePromise.then(function(result) {
        vendorTokenID = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log('net voor opvragenVoertuigInformatie ' + result);
	   getCustomerTokenRequest(jsonAutotelexGebruiker,vendorTokenID);
	   //opvragenVoertuigInformatieAutotelexpro(jsonAutotelexFiliaal, jsonAutotelexGebruiker, aanvraagTicket);
    }, function(err) {
        console.log(err);
    });
	
}	

function getCustomerTokenRequest (jsonAutotelexGebruiker, vendorTokenID) {
	var initializePromise = getCustomerTokenAutotelexPro(jsonAutotelexGebruiker);
    initializePromise.then(function(result) {
        customerTokenID = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
        console.log('net voor getKentekenRaadplegingenRequest ' + result);
	   
	   getVehicleProRequest(vendorTokenID,customerTokenID, taxatieID);
	   //opvragenVoertuigInformatieAutotelexpro(jsonAutotelexFiliaal, jsonAutotelexGebruiker, aanvraagTicket);
    }, function(err) {
        console.log(err);
    });
}	



function getVehicleProRequest (vendorTokenID, customerTokenID, taxatieID) {
	var initializePromise = getVehiclesProAutotelexPro(vendorTokenID, customerTokenID, taxatieID, kenteken);
    initializePromise.then(function(result) {
        vehicleInfo = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
        //console.log('net voor opvragenVoertuigInformatie ' + JSON.stringify(result));
	   //getVehicleProRequest(vendorTokenID,customerTokenID, vehicleID);
	    //opvragenVoertuigInformatieAutotelexpro(jsonAutotelexFiliaal, jsonAutotelexGebruiker, aanvraagTicket);
		//console.log('net voor getVTATHWIdasDVT : ' + vehicleInfo);
		getVTBRUTIdasDVT(vehicleInfo);
    }, function(err) {
        console.log(err);
    });
}	


function getVTBRUTIdasDVT (vehicleInfo) {
	var initializePromise = getVTBRUTDVT(setletter, filiaal, offertenr,kenteken);
   initializePromise.then(function(result) {
        //brutobedrag = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	 // console.log(' Einde ' + resultaat);
	 console.log('getVTBRUT result ' + result);
	  if (result === 0)
	  {
		console.log('NET VOOR DELETE ' + result);  
		deleteInruilerIdasDVT(vehicleInfo);  
	  }	else 
	  {
		getVTATHWIdasDVT(vehicleInfo);  
	  }		  
	  
    }, function(err) {
        console.log(err);
    });
}

function getVTATHWIdasDVT (vehicleInfo) {
	var initializePromise = getVTATHWDVT(setletter, filiaal, offertenr, kenteken);
   initializePromise.then(function(result) {
      // handelswaardebedrag = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
        console.log('getVTATHW result ' + result);
	 // console.log(' Einde ' + resultaat);
	  if (result === 0)
	  {
		updatePrijsinfoIdasDVT(vehicleInfo);  
	  }	
      
	  
    }, function(err) {
        console.log(err);
    });
}
	
var resultaat;


function deleteInruilerIdasDVT (vehicleInfo) {
	var initializePromise = deleteInruilerDVT(setletter, filiaal, offertenr, kenteken);
    initializePromise.then(function(result) {
        resultaat = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	  //console.log('Net voor oauth20InsertToken ' + resultaat); 
	  getMaxSeqnIdasDVT(vehicleInfo);
    }, function(err) {
        console.log(err);
    });
}

var sequencenumber;
function getMaxSeqnIdasDVT (vehicleInfo) {
	var initializePromise = getMaxSeqnDVT(setletter, filiaal, offertenr);
   initializePromise.then(function(result) {
        sequencenumber = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	 // console.log(' Einde ' + resultaat);
	  insertInruilerIdasDVT(vehicleInfo, sequencenumber);
    }, function(err) {
        console.log(err);
    });
}

function insertInruilerIdasDVT (vehicleInfo, sequencenumber) {
	var initializePromise = insertInruilerDVT (setletter, filiaal, offertenr, sequencenumber, inruilwaarde, vehicleInfo);
   initializePromise.then(function(result) {
        resultaat = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	  //console.log(' Einde ' + resultaat);
	  console.log(' ### InsertInruilerIdasDVT ### : OpvragenVoertuigInformatieKentekenAutotelexpro ');
	  opvragenVoertuigInformatieKentekenAutotelexpro();
    }, function(err) {
        console.log(err);
    });
}

function updatePrijsinfoIdasDVT (vehicleInfo) {
	var initializePromise = updatePrijsinfoDVT (setletter, filiaal, offertenr,  vehicleInfo);
   initializePromise.then(function(result) {
        resultaat = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	  console.log(' ### UpdatePrijsinfoIdasDVT ### : OpvragenVoertuigInformatieKentekenAutotelexpro ');
	  opvragenVoertuigInformatieKentekenAutotelexpro();
    }, function(err) {
        console.log(err);
    });
}
	
function opvragenVoertuigInformatieKentekenAutotelexpro(){
	
	var initializePromise = opvragenVoertuigInformatieMetKenteken(jsonAutotelexFiliaal, jsonAutotelexGebruiker, kenteken);
    initializePromise.then(function(result) {
        opvragenVoertuigInfo = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log('net voor opvragenVoertuigInformatie ' + opvragenVoertuigInfo);
	    updateDVTVoertuigInformatieIdas(opvragenVoertuigInfo);
	   //opvragenVoertuigInformatieAutotelexpro(jsonAutotelexFiliaal, jsonAutotelexGebruiker, aanvraagTicket);
    }, function(err) {
        console.log(err);
    });
}	

function updateDVTVoertuigInformatieIdas (opvragenVoertuigInfo) {
	var initializePromise = updateDVTVoertuigInformatie (setletter, filiaal, offertenr, opvragenVoertuigInfo);
   initializePromise.then(function(result) {
        resultaat = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	  console.log(' ### UpdatePrijsinfoIdasDVT ### : OpvragenVoertuigInformatieKentekenAutotelexpro ');
	  updateDVTVoertuigInformatie (setletter, filiaal, offertenr,  opvragenVoertuigInfo) 
    }, function(err) {
        console.log(err);
    });
}	
main();  
 
 // https://rds.volvocars.com/vbs/kompass/nl/build/kompass?vbs_kompass_continue_url=http://10.9.32.23:8080/profoundui/universal/sendvbstodms/DASFPA/1/63472&vbs_kompass_service_url=http://80.112.232.245:62030/VBS/VBStoDMSservices/SendConfiguration/S21EE5DB/DASFPA/1/63472&vbs_kompass_hide_multiple_price_lists=yes&vbs_kompass_return_url=http://10.9.32.23:8080/profoundui/universal/sendvbstodms/cancel/DASFPA/1/63472&vbsload=19724743


  



	 