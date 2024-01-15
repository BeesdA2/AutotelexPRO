const soapRequest = require('easy-soap-request');
const { insertOauthTkn } = require("../../../Productie/oauthidas/js/oauthRequest.js");
//const fs = require('fs'); 

function getVehiclesProAutotelexPro(vendorTokenID, customerTokenID, vehicleID) {
	
	return new Promise(function(vehicleInfoResult) {
var aanvraagresult;
 

// example data
const url = 'http://api.autotelexpro.nl/AutotelexPROAPI.svc/xml';
const vendorToken   = vendorTokenID;
const customerToken = customerTokenID;


const getVehiclesProXML = '<aut:GetVehiclesPro><aut:vendorToken>'+ vendorToken+'</aut:vendorToken><aut:customerToken>'+ customerToken + '</aut:customerToken><aut:filter><bus:VehicleIds><arr:int>'+ vehicleID + '</arr:int></bus:VehicleIds></aut:filter></aut:GetVehiclesPro>';
console.log(getVehiclesProXML);
//var xmlescape = require('xml-escape');
//const getVendorToken = xmlescape(getVendorTokenXML);
//console.log('aanvragen Ticket ' + opvragenVoertuigInformatieMetTicket);
const xml =
'<soap:Envelope  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:aut="http://autotelexpro.nl" xmlns:bus="http://schemas.datacontract.org/2004/07/BusinessLogic.Models" xmlns:arr="http://schemas.microsoft.com/2003/10/Serialization/Arrays">'+
'<soap:Header/>'+
'<soap:Body>' + getVehiclesProXML + '</soap:Body></soap:Envelope>'

console.log('xml '+ xml);
const sampleHeaders = {
  'user-agent': 'sampleTest',
  'Content-Type': 'text/xml;charset=UTF-8',
  'Accept-Encoding': 'gzip,deflate',
  'soapAction': 'http://autotelexpro.nl/IAutotelexPROAPI/GetVehiclesPro',
  'Content-Length':xml.length,
  'Host' : 'api.autotelexpro.nl',
  
};
//const xml = fs.readFileSync('test/zipCodeEnvelope.xml', 'utf-8');



// usage of module
(async () => {
  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 5000 }); // Optional timeout parameter(milliseconds)
  console.log('%%%%%%% url %%%%%%% ' +url);
  console.log('xml ' +xml);  
  //console.log('response ' +response);
  const { headers, body, statusCode } = response;
  //console.log(headers);
  //console.log(body);
  console.log( '%%%%%%%%%%%%%%%%%%% NET VOOR OAUT2 INSERT');
  var initializePromise = insertOauthTkn( 'A', 'MVM' , 'XML_AUTOTELEX', response.body);
   initializePromise.then(function(result) {
        resultaat = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	   
	  console.log(' Programma OauthValidate ' + resultaat);
    }, function(err) {
        console.log(err);
    });
  //console.log(statusCode);
  var xml2js = require('xml2js');
  var aanvraagresult;
  var parser = new xml2js.Parser({explicitArray: false, trim: true});
  parser.parseString(body, (err, result) => {
	  if (result !== undefined)
      {		  
     // console.log('JSON result', result);
     // console.log('response ', result['soap:Envelope']);	 
	  //console.log('response body ', result['soap:Envelope']['soap:Body']);	 
	  //console.log('response AanvraagTicketResponse ', result['soap:Envelope']['soap:Body']);	 
	  //console.log('response AanvraagTicketResponse ', result['soap:Envelope']['soap:Body']['AanvragenTicketResponse']['AanvragenTicketResult']);	 
	  aanvraagresult = result['s:Envelope']['s:Body']['GetVehiclesProResponse']['GetVehiclesProResult']['a:Vehicles']['b:DataAPI_Vehicle'] ;
	  //console.log('#####aanvraagresult ' + aanvraagresult);
	  } 
    });
	parser.parseString(aanvraagresult, (err, result) => {
      if (result !== undefined)
	  {	  
	  //console.log('JSON result', result);
     // console.log('response ', result['soap:Envelope']);
      var util = require('util')
    	  
      if (util.isArray(result) === true)
	  {	  
	  var functie =  result['KoppelingWebserviceInformatieFout']['Foutmelding']['Functie'];
	  var melding =  result['KoppelingWebserviceInformatieFout']['Foutmelding']['Melding'];
	  
      aanvraagresult = 'Foutmelding functie: '+ functie +' melding ' + melding ; 
	  }
	  }	  
    });
	
	console.log('getVehiclesPro vehicles ' + aanvraagresult);
  vehicleInfoResult(aanvraagresult);
})();
    
	});
}




module.exports = {
  getVehiclesProAutotelexPro: getVehiclesProAutotelexPro,
  
  
  };