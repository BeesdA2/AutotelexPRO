const soapRequest = require('easy-soap-request');

//const fs = require('fs');

async function getVendorTokenAutotelexPro (jsonAutotelexFiliaal) {
	
	return new Promise(function(vendorTokenID) {
var aanvraagresult;

var autotelexPRO_vendoruser       = jsonAutotelexFiliaal[0].AUTOTELEX_VENDORUSER.trim();
var autotelexPRO_vendorpass       = jsonAutotelexFiliaal[0].AUTOTELEX_VENDORPASS.trim();
// example data
const url = 'http://api.autotelexpro.nl/AutotelexPROAPI.svc/xml';
const userid = autotelexPRO_vendoruser;
const wachtwoord = autotelexPRO_vendorpass;

const getVendorTokenXML = '<aut:GetVendorToken><aut:username>'+ userid + '</aut:username><aut:password>'+ wachtwoord+ '</aut:password></aut:GetVendorToken>';
//console.log(getVendorTokenXML);
//var xmlescape = require('xml-escape');
//const getVendorToken = xmlescape(getVendorTokenXML);
//console.log('aanvragen Ticket ' + opvragenVoertuigInformatieMetTicket);
const xml =
'<soap:Envelope  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:aut="http://autotelexpro.nl">'+
'<soap:Header/>'+
'<soap:Body>' + getVendorTokenXML + '</soap:Body></soap:Envelope>'

 
//console.log('xml: ' + xml);


const sampleHeaders = {
  'user-agent': 'sampleTest',
  'Content-Type': 'text/xml;charset=UTF-8',
  'Accept-Encoding': 'gzip,deflate',
  'soapAction': 'http://autotelexpro.nl/IAutotelexPROAPI/GetVendorToken',
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
  //console.log(body);
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
	  aanvraagresult = result['s:Envelope']['s:Body']['GetVendorTokenResponse']['GetVendorTokenResult']['a:Token'];
	  
	  //console.log('aanvraagresult ' + aanvraagresult);
	  
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
	
	//console.log('getVendorToken ' + aanvraagresult);	 
	vendorTokenID(aanvraagresult);
})();
    
	});
}

module.exports = {
  getVendorTokenAutotelexPro: getVendorTokenAutotelexPro,
  
  
  };