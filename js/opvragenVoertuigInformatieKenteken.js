const soapRequest = require('easy-soap-request');
//const fs = require('fs');



function opvragenVoertuigInformatieMetKenteken(jsonAutotelexFiliaal, jsonAutotelexGebruiker, kenteken) {
	
	return new Promise(function(opvragenVoertuigInformatieKentekenResult) {
var aanvraagresult;

var autotelexPRO_soapuser       = jsonAutotelexFiliaal[0].AUTOTELEX_SOAPUSER.trim();
var autotelexPRO_soappass       = jsonAutotelexFiliaal[0].AUTOTELEX_SOAPPASS.trim();

var autotelexPRO_vestigingsid   = jsonAutotelexGebruiker[0].AUTOTELEX_VESTIGINGSID.trim();
var autotelexpro_Gebruikersnaam = jsonAutotelexGebruiker[0].AUTOTELEX_GEBRUIKERSNAAM.trim();
var autotelexpro_Wachtwoord     = jsonAutotelexGebruiker[0].AUTOTELEX_WACHTWOORD.trim();
// example data
const url = 'https://inlogservice.autotelexpro.nl/autotelexprokoppeling.asmx';
const versie = '7';
const opvragenVoertuigInformatieMetKentekenXML = '<OpvragenVoertuigInformatieMetKenteken><autotelexpro_VestigingId>'+ autotelexPRO_vestigingsid + '</autotelexpro_VestigingId>  <autotelexpro_Gebruikersnaam>' + autotelexpro_Gebruikersnaam +'</autotelexpro_Gebruikersnaam>	  <autotelexpro_Wachtwoord>'+autotelexpro_Wachtwoord+'</autotelexpro_Wachtwoord><kenteken>'+ kenteken + '</kenteken><version>'+ versie + '</version></OpvragenVoertuigInformatieMetKenteken>';

//var aanvragenTicketXML;
var xmlescape = require('xml-escape');

const opvragenVoertuigInformatieMetKenteken = xmlescape(opvragenVoertuigInformatieMetKentekenXML);
console.log('opvragenVoertuigInformatieKenteken ' + opvragenVoertuigInformatieMetKenteken);
const xml =
'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Header>    <SecuritySoapHeader xmlns="http://www.autotelexpro.nl/">      <Username>'+ autotelexPRO_soapuser+ '</Username>      <Password>'+ autotelexPRO_soappass + '</Password>    </SecuritySoapHeader>  </soap:Header>'+
'<soap:Body><OpvragenVoertuiginformatieMetKenteken xmlns="http://www.autotelexpro.nl/"><inputXML>' + opvragenVoertuigInformatieMetKenteken + 
'</inputXML></OpvragenVoertuiginformatieMetKenteken></soap:Body></soap:Envelope>'
//console.log('XML '+ xml);


const sampleHeaders = {
  'user-agent': 'sampleTest',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': 'http://www.autotelexpro.nl/OpvragenVoertuiginformatieMetKenteken',
  'Content-Length':xml.length,
};
//const xml = fs.readFileSync('test/zipCodeEnvelope.xml', 'utf-8');



// usage of module
(async () => {
  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 5000 }); // Optional timeout parameter(milliseconds)
  const { headers, body, statusCode } = response;
  //console.log(headers);
 console.log('body :' +body);
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
	  //aanvraagresult = result['soap:Envelope']['soap:Body']['OpvragenVoertuiginformatieMetKentekenResponse']['OpvragenVoertuiginformatieMetKentekenResult']['xmlns:KoppelingWebserviceVoertuigInformatie'];
      aanvraagresult = result['soap:Envelope']['soap:Body']['OpvragenVoertuiginformatieMetKentekenResponse']['OpvragenVoertuiginformatieMetKentekenResult'];
	 //console.log('aanvraagresult 1 ' + aanvraagresult);
	  } 
    });
	parser.parseString(aanvraagresult, (err, result) => {
      if (result !== undefined)
	  {	  
	  console.log('JSON result', result);
	  //console.log('JSOn result DmsData' , result.KoppelingWebserviceVoertuigInformatie.SchaderapportURL);
	  aanvraagresult = result;
	  
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
	
	//console.log('opvragenVoertuigInformatieMetKenteken ' + aanvraagresult);
	opvragenVoertuigInformatieKentekenResult(aanvraagresult);
})();
    
	});
}

module.exports = {
    opvragenVoertuigInformatieMetKenteken: opvragenVoertuigInformatieMetKenteken,
  
  
  };