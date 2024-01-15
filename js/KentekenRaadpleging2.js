const { getVendorTokenAutotelexPro } = require("./getVendorToken.js");
const { getCustomerTokenAutotelexPro } = require("./getCustomerToken.js");

const { getKentekenRaadplegingenAutotelexPro } = require("./getKentekenRaadplegingen.js");
const { deleteTaxatieATLICENSRQ } = require("./licenseRequestIntoIdas.js");
const { insertTaxatieATLICENSRQ } = require("./licenseRequestIntoIdas.js");
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
	  var filiaal = process.argv[4];
	  console.log('filiaal '+filiaal); 

	   // Parameter 5 ophalen
	  var offertenr = process.argv[5];
	  console.log('offertenr '+offertenr); 
	  
	   // Parameter 6 ophalen
	  var kenteken = process.argv[6];
	  console.log('kenteken '+kenteken); 
	  
	  
	  
   
      
   
      
   
   
//vcnlkeyf(setletter,applicatie, function(err, marco) {
 //   console.log('Test ' +marco)
 // });
   
	var jsonAutotelexFiliaal;
	var jsonAutotelexGebruiker;
	var vendorTokenID;
	var customerTokenID;
	
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
	   
	   getKentekenRaadplegingenIdas(vendorTokenID,customerTokenID);
	   //opvragenVoertuigInformatieAutotelexpro(jsonAutotelexFiliaal, jsonAutotelexGebruiker, aanvraagTicket);
    }, function(err) {
        console.log(err);
    });
}	


	


function  getKentekenRaadplegingenIdas(vendorTokenID, customerTokenID) {
	var initializePromise = getKentekenRaadplegingenAutotelexPro(vendorTokenID, customerTokenID, kenteken);
   initializePromise.then(function(result) {
        resultaat = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	  console.log(' ### UpdatePrijsinfoIdasDVT ### : OpvragenVoertuigInformatieKentekenAutotelexpro ');
	    
    }, function(err) {
        console.log(err);
    });
}	
main();  
 
 // https://rds.volvocars.com/vbs/kompass/nl/build/kompass?vbs_kompass_continue_url=http://10.9.32.23:8080/profoundui/universal/sendvbstodms/DASFPA/1/63472&vbs_kompass_service_url=http://80.112.232.245:62030/VBS/VBStoDMSservices/SendConfiguration/S21EE5DB/DASFPA/1/63472&vbs_kompass_hide_multiple_price_lists=yes&vbs_kompass_return_url=http://10.9.32.23:8080/profoundui/universal/sendvbstodms/cancel/DASFPA/1/63472&vbsload=19724743


  



	 