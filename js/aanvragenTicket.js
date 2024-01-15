const soapRequest = require('easy-soap-request');
 

function aanvragenTicket(jsonAutotelexFiliaal, jsonAutotelexGebruiker, jsonCustm, jsonDci, kenteken, kmstand) {
	
	return new Promise(function(aanvragenResult) {
var aanvraagresult;

var autotelexPRO_soapuser       = jsonAutotelexFiliaal[0].AUTOTELEX_SOAPUSER.trim();
var autotelexPRO_soappass       = jsonAutotelexFiliaal[0].AUTOTELEX_SOAPPASS.trim();

var autotelexPRO_vestigingsid   = jsonAutotelexGebruiker[0].AUTOTELEX_VESTIGINGSID.trim();
var autotelexpro_Gebruikersnaam = jsonAutotelexGebruiker[0].AUTOTELEX_GEBRUIKERSNAAM.trim();
var autotelexpro_Wachtwoord     = jsonAutotelexGebruiker[0].AUTOTELEX_WACHTWOORD.trim();

var custm_geslacht   = jsonCustm[0].CGESL.trim();
var custm_voorletter = jsonCustm[0].CVLET.trim();
var custm_tussenvoegsel = jsonCustm[0].CVOEG.trim();
var custm_naam       = jsonCustm[0].CNAAM1.trim();
console.log('naam: '+ custm_naam);
var custm_adres      = jsonCustm[0].CADRES.trim();
var custm_huisnummer = jsonCustm[0].CHUISN;
var custm_huisnrtoev = jsonCustm[0].CHUIST.trim();
var custm_postcode   = jsonCustm[0].CPOCO.trim();
var custm_woonplaats = jsonCustm[0].CCITY.trim();
var custm_telefoon   = jsonCustm[0].CTELO.trim();
var dci_emailadres   = jsonDci[0].CIMAIL.trim();




// example data
const url = 'https://inlogservice.autotelexpro.nl/autotelexprokoppeling.asmx';
const aanvragenTicketXML = '<AanvragenTicket> <autotelexpro_VestigingId>'+ autotelexPRO_vestigingsid + '</autotelexpro_VestigingId>  <autotelexpro_Gebruikersnaam>' + autotelexpro_Gebruikersnaam +'</autotelexpro_Gebruikersnaam>	  <autotelexpro_Wachtwoord>'+autotelexpro_Wachtwoord+'</autotelexpro_Wachtwoord>	  <KoppelingWebserviceInformatie> 	  <Kenteken>'+kenteken+'</Kenteken>	  <Kilometerstand>'+kmstand+'</Kilometerstand>	  <RdwRaadplegen>true</RdwRaadplegen>	  <NapRaadplegen>true</NapRaadplegen>	  <Klantgegevens>	  <Geslacht>'+ custm_geslacht +'</Geslacht>	  <Naam>'+custm_voorletter + ' ' + custm_tussenvoegsel + ' ' + custm_naam +   '</Naam>	  <Adres>'+custm_adres+ ' ' + custm_huisnummer  + custm_huisnrtoev + '</Adres>	  <Postcode>' + custm_postcode + '</Postcode>	  <Plaats>'+custm_woonplaats + '</Plaats>	  <Telefoonnummer>'+custm_telefoon+'</Telefoonnummer>	  <Faxnummer></Faxnummer>	  <Emailadres>'+dci_emailadres+ '</Emailadres>	  </Klantgegevens>	  <RapportOpmerking></RapportOpmerking>	  </KoppelingWebserviceInformatie> 	     </AanvragenTicket>';
//var aanvragenTicketXML;
var xmlescape = require('xml-escape');
const aanvragenTicket = xmlescape(aanvragenTicketXML);

// console.log('aanvragen Ticket ' + aanvragenTicket);

const xml =
'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">   <soap:Header>    <SecuritySoapHeader xmlns="http://www.autotelexpro.nl/">      <Username>'+ autotelexPRO_soapuser+ '</Username>      <Password>'+ autotelexPRO_soappass + '</Password>    </SecuritySoapHeader>  </soap:Header>'+
'<soap:Body>    <AanvragenTicket xmlns="http://www.autotelexpro.nl/"><inputXML>' + aanvragenTicket + 
'</inputXML></AanvragenTicket>  </soap:Body></soap:Envelope>'
  
// console.log('xml ' + xml);

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
	 
     //console.log('aanvragen result ' + aanvraagresult);
    
	
	aanvragenResult(aanvraagresult);
})();
    
	});
}

module.exports = {
  aanvragenTicket: aanvragenTicket,
  
  
  };