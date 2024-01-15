const { aanvragenTicket } = require("./aanvragenTicket.js");
const { opvragenVoertuigInformatieMetTicket } = require("./opvragenVoertuigInformatie.js");
const { autotelexFiliaal } = require("./autotelexFiliaal.js");
const { autotelexGebruiker } = require("./autotelexGebruikers.js");



 



 



 
	 var setletter = process.argv[2];
	 // console.log('setletter '+setletter);
	  
	
	// Parameter 3 ophalen
	  var idasuser = process.argv[3];
	 // console.log('idasuser '+idasuser); 
	  
	  // Parameter 4 ophalen
	  var applicatie = process.argv[4];
	 // console.log('applicatie '+applicatie); 
	  
	   // Parameter 5 ophalen
	  var filiaal = process.argv[5];
	  //console.log('filiaal '+filiaal); 

	   // Parameter 6 ophalen
	  var offertenr = process.argv[6];
	  //console.log('offertenr '+offertenr); 
   
         // Parameter 7 ophalen
	  var aanvraagTicketId = process.argv[7];
	  //console.log('aanvraagTicketId '+ aanvraagTicketId); 
   
      var kenteken = process.argv[8];
	  //console.log('kenteken '+ kenteken); 
   
      
   
   
//vcnlkeyf(setletter,applicatie, function(err, marco) {
 //   console.log('Test ' +marco)
 // });
   
	

 async function startOpvragenAutotelexpro(setletter, idasuser, applicatie, filiaal, offertenr, aanvraagTicketId)
  {
	 
	 
 try{
	   
   const respAutotelexFiliaal = await autotelexFiliaal(setletter, filiaal);
   let jsonAutotelexFiliaal   = await respAutotelexFiliaal;
   
   const respAutotelexGebruiker = await autotelexGebruiker(setletter, filiaal, idasuser);
   let jsonAutotelexGebruiker   = await respAutotelexGebruiker;
   
   const respOpvragenVoertuigInformatieMetTicket = await opvragenVoertuigInformatieMetTicket(jsonAutotelexFiliaal, jsonAutotelexGebruiker, aanvraagTicketId);
   let opvragenVoertuigInfo   = await respOpvragenVoertuigInformatieMetTicket;
   
   
   
   
    } catch (e) {
        console.error(e);
    } finally {
        console.log('Autotelex cleanup');
		return ({ message: 'Opvragen Autotelexpro succesvol uitgevoerd'});
    }
}

   
//startOpvragenAutotelexpro(setletter, idasuser, applicatie, filiaal, offertenr, aanvraagTicketId);
 
async function handleOpvragenAutotelexpro(setletter, idasuser, applicatie, filiaal, offertenr, aanvraagTicketId)
{
    try{	
	console.log('setletter:' + setletter);
	
	var resolve = await startOpvragenAutotelexpro(setletter, idasuser, applicatie, filiaal, offertenr, aanvraagTicketId);
	return (resolve);
    }
	catch(err) {}
	
}


module.exports = {
  handleOpvragenAutotelexpro: handleOpvragenAutotelexpro,
  };  


  



	 