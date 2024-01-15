const soapRequest = require('easy-soap-request');
//const fs = require('fs');



// example data
const url = 'https://inlogservice.autotelexpro.nl/autotelexprokoppeling.asmx';
const aanvraagTicketId = '6dd3aae8-ad85-4aa3-975c-bff8ced6e9d4';
const versie = '7';
const opvragenVoertuigInformatieMetTicketXML = '<OpvragenVoertuigInformatieMetTicket><autotelexpro_VestigingId>6120</autotelexpro_VestigingId>  <autotelexpro_Gebruikersnaam>Marco</autotelexpro_Gebruikersnaam>	  <autotelexpro_Wachtwoord>vanMeel</autotelexpro_Wachtwoord><ticketId>'+ aanvraagTicketId + '</ticketId><version>'+ versie + '</version></OpvragenVoertuigInformatieMetTicket>';
//var opvragenVoertuigInformatieMetTicketXML;
var xmlescape = require('xml-escape');
const opvragenVoertuigInformatieMetTicket = xmlescape(opvragenVoertuigInformatieMetTicketXML);
console.log('aanvragen Ticket ' + opvragenVoertuigInformatieMetTicket);
const xml =
'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Header>    <SecuritySoapHeader xmlns="http://www.autotelexpro.nl/">      <Username>Beesda2</Username>      <Password>Feestbijbeesda2</Password>    </SecuritySoapHeader>  </soap:Header>'+
'<soap:Body><OpvragenVoertuiginformatieMetTicket xmlns="http://www.autotelexpro.nl/"><inputXML>' + opvragenVoertuigInformatieMetTicket + 
'</inputXML></OpvragenVoertuiginformatieMetTicket></soap:Body></soap:Envelope>'

const sampleHeaders = {
  'user-agent': 'sampleTest',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': 'http://www.autotelexpro.nl/OpvragenVoertuiginformatieMetTicket',
  'Content-Length':xml.length,
};
//const xml = fs.readFileSync('test/zipCodeEnvelope.xml', 'utf-8');



// usage of module
(async () => {
  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 5000 }); // Optional timeout parameter(milliseconds)
  const { headers, body, statusCode } = response;
  //console.log(headers);
  console.log(body);
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
	  aanvraagresult = result['soap:Envelope']['soap:Body']['OpvragenVoertuiginformatieMetTicketResponse']['OpvragenVoertuiginformatieMetTicketResult'];
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
	
	console.log('opvragenVoertuigInformatieMetTicket ' + aanvraagresult);
})();