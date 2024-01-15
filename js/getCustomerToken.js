const soapRequest = require('easy-soap-request');
 
//const fs = require('fs');

function getCustomerTokenAutotelexPro(jsonAutotelexGebruiker) {
	
	return new Promise(function(customerTokenID) {
var aanvraagresult;

 

var autotelexPRO_vestigingsid   = jsonAutotelexGebruiker[0].AUTOTELEX_VESTIGINGSID.trim();
var autotelexpro_Gebruikersnaam = jsonAutotelexGebruiker[0].AUTOTELEX_GEBRUIKERSNAAM.trim();
var autotelexpro_Wachtwoord     = jsonAutotelexGebruiker[0].AUTOTELEX_WACHTWOORD.trim();


// example data
const url = 'http://api.autotelexpro.nl/AutotelexPROAPI.svc/xml';
const vestigingsid   = autotelexPRO_vestigingsid;
const gebruikersnaam = autotelexpro_Gebruikersnaam;
const wachtwoord     = autotelexpro_Wachtwoord;

const getCustomerTokenXML = '<aut:GetCustomerToken><aut:companyId>'+ vestigingsid+'</aut:companyId><aut:username>'+ gebruikersnaam + '</aut:username><aut:password>'+ wachtwoord+ '</aut:password></aut:GetCustomerToken>';
console.log(getCustomerTokenXML);
//var xmlescape = require('xml-escape');
//const getVendorToken = xmlescape(getVendorTokenXML);
//console.log('aanvragen Ticket ' + opvragenVoertuigInformatieMetTicket);
const xml =
'<soap:Envelope  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:aut="http://autotelexpro.nl">'+
'<soap:Header/>'+
'<soap:Body>' + getCustomerTokenXML + '</soap:Body></soap:Envelope>'

// console.log('xml '+ xml);

const sampleHeaders = {
  'user-agent': 'sampleTest',
  'Content-Type': 'text/xml;charset=UTF-8',
  'Accept-Encoding': 'gzip,deflate',
  'soapAction': 'http://autotelexpro.nl/IAutotelexPROAPI/GetCustomerToken',
  'Content-Length':xml.length,
  'Host' : 'api.autotelexpro.nl',
  
};
//const xml = fs.readFileSync('test/zipCodeEnvelope.xml', 'utf-8');



// usage of module
(async () => {
  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 5000 }); // Optional timeout parameter(milliseconds)
  //console.log('response ' +response);
  const { headers, body, statusCode } = response;
  //console.log(headers);
   
  // console.log(body);
   
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
	  aanvraagresult = result['s:Envelope']['s:Body']['GetCustomerTokenResponse']['GetCustomerTokenResult']['a:Token'];
	 // console.log('aanvraagresult ' + aanvraagresult);
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
	 
	 // console.log('getCustomerToken ' + aanvraagresult);
	 
    customerTokenID(aanvraagresult);
})();
    
	});
}

module.exports = {
  getCustomerTokenAutotelexPro: getCustomerTokenAutotelexPro,
  
  
  };