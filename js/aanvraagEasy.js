const soapRequest = require('easy-soap-request');
//const fs = require('fs');



// example data
const url = 'https://inlogservice.autotelexpro.nl/autotelexprokoppeling.asmx';
const aanvragenTicketXML = '<AanvragenTicket> <autotelexpro_VestigingId>6120</autotelexpro_VestigingId>  <autotelexpro_Gebruikersnaam>Marco</autotelexpro_Gebruikersnaam>	  <autotelexpro_Wachtwoord>vanMeel</autotelexpro_Wachtwoord>	  <KoppelingWebserviceInformatie> 	  <Kenteken>08ZGJV</Kenteken>	  <Kilometerstand>2415</Kilometerstand>	  <RdwRaadplegen>true</RdwRaadplegen>	  <NapRaadplegen>true</NapRaadplegen>	  <Klantgegevens>	  <Geslacht>M</Geslacht>	  <Naam>Marco van Meel</Naam>	  <Adres>Iepenlaan 12</Adres>	  <Postcode>4921 DR</Postcode>	  <Plaats>Made</Plaats>	  <Telefoonnummer>026-3700080</Telefoonnummer>	  <Faxnummer></Faxnummer>	  <Emailadres>m.van.meel@beesda2.nl</Emailadres>	  </Klantgegevens>	  <RapportOpmerking>Dit is een rapportopmerking</RapportOpmerking>	  </KoppelingWebserviceInformatie> 	     </AanvragenTicket>';
//var aanvragenTicketXML;
var xmlescape = require('xml-escape');
const aanvragenTicket = xmlescape(aanvragenTicketXML);
//console.log('aanvragen Ticket ' + aanvragenTicket);
const xml =
'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Header>    <SecuritySoapHeader xmlns="http://www.autotelexpro.nl/">      <Username>Beesda2</Username>      <Password>Feestbijbeesda2</Password>    </SecuritySoapHeader>  </soap:Header>'+
'<soap:Body>    <AanvragenTicket xmlns="http://www.autotelexpro.nl/"><inputXML>' + aanvragenTicket + 
'</inputXML></AanvragenTicket>  </soap:Body></soap:Envelope>'

const sampleHeaders = {
  'user-agent': 'sampleTest',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': 'http://www.autotelexpro.nl/AanvragenTicket',
  'Content-Length':xml.length,
};
//const xml = fs.readFileSync('test/zipCodeEnvelope.xml', 'utf-8');



// usage of module
(async () => {
  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
  const { headers, body, statusCode } = response;
  //console.log(headers);
  //console.log(body);
  //console.log(statusCode);
  var xml2js = require('xml2js');
  var aanvraagresult;
  var parser = new xml2js.Parser({explicitArray: false, trim: true});
  parser.parseString(body, (err, result) => {
     // console.log('JSON result', result);
     // console.log('response ', result['soap:Envelope']);	 
	  //console.log('response body ', result['soap:Envelope']['soap:Body']);	 
	  //console.log('response AanvraagTicketResponse ', result['soap:Envelope']['soap:Body']);	 
	  //console.log('response AanvraagTicketResponse ', result['soap:Envelope']['soap:Body']['AanvragenTicketResponse']['AanvragenTicketResult']);	 
	  aanvraagresult = result['soap:Envelope']['soap:Body']['AanvragenTicketResponse']['AanvragenTicketResult'];
	  //console.log('aanvraagresult ' + aanvraagresult);
	   
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
	
	console.log('aanvraagresult ' + aanvraagresult);
})();