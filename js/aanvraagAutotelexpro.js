const { aanvragenTicket } = require("./aanvragenTicket.js");
const { deleteOauthTkn } = require("../../oauthidas/js/oauthRequest.js");
const { insertOauthTkn } = require("../../oauthidas/js/oauthRequest.js");
const { autotelexFiliaal } = require("./autotelexFiliaal.js");
const { autotelexGebruiker } = require("./autotelexGebruikers.js");
const { getCustmOphalen } = require("./custmDB2.js");
const { getDciOphalen } = require("./dciDB2.js");
 



 



 



 
	 var setletter = process.argv[2];
	  //console.log('setletter '+setletter);
	  
	
	// Parameter 3 ophalen
	  var idasuser = process.argv[3];
	 // console.log('idasuser '+idasuser); 
	  
	  // Parameter 4 ophalen
	  var applicatie = process.argv[4];
	  //console.log('applicatie '+applicatie); 
	  
	   // Parameter 5 ophalen
	  var filiaal = process.argv[5];
	  //console.log('filiaal '+filiaal); 

	   // Parameter 6 ophalen
	  var offertenr = process.argv[6];
	  //console.log('offertenr '+offertenr); 
   
         // Parameter 7 ophalen
	  var kenteken = process.argv[7];
	  //console.log('kenteken '+kenteken); 
   
       // Parameter 8 ophalen
	  var kmstand = process.argv[8];
	  //console.log('kmstand '+kmstand); 
	  
	   // Parameter 9 ophalen
	  var klantnummer = process.argv[9];
	  //console.log('klantnummer '+klantnummer); 
	  
	   
   
   
//vcnlkeyf(setletter,applicatie, function(err, marco) {
 //   console.log('Test ' +marco)
 // });
   
	 

async  function startAanvraagAutotelexpro(setletter, idasuser, applicatie, filiaal, offertenr, kenteken, kmstand, klantnummer )
  {
	    	
  try{
	   
   const respAutotelexFiliaal = await autotelexFiliaal(setletter, filiaal);
   let jsonAutotelexFiliaal   = await respAutotelexFiliaal;
   
   const respAutotelexGebruiker = await autotelexGebruiker(setletter, filiaal, idasuser);
   let jsonAutotelexGebruiker   = await respAutotelexGebruiker;
   
   const respGetCustmOphalen = await getCustmOphalen(setletter, klantnummer);
   let jsonCustm   = await respGetCustmOphalen;
   
   const respGetDciOphalen = await getDciOphalen(setletter, klantnummer);
   let jsonDci   = await respGetDciOphalen;
   
   const respAanvragenTicket  = await aanvragenTicket(jsonAutotelexFiliaal, jsonAutotelexGebruiker, jsonCustm, jsonDci, kenteken, kmstand);
   let aanvraagTicket = await respAanvragenTicket;
   
   const respDeleteOauthTkn  =  await deleteOauthTkn(setletter, idasuser, applicatie, aanvraagTicket);
   let resultaatDelete       =  respDeleteOauthTkn;

   const respInsertOauthTkn  = await insertOauthTkn(setletter, idasuser, applicatie, aanvraagTicket);
   let resultaatInsert       = await respInsertOauthTkn;
   
   
    } catch (e) {
		console.error('startAanvraagAutotelexpro: ' +e );
        
    } finally {
        console.log('Autotelex cleanup');
		return ({ message: 'AanvraagAutotelexpro succesvol uitgevoerd'});
    }
}



	
//startAanvraagAutotelexpro(setletter, idasuser, applicatie, filiaal, offertenr, kenteken, kmstand, klantnummer);
 
async function handleAanvraagAutotelexpro(setletter, idasuser, applicatie, filiaal, offertenr, kenteken, kmstand, klantnummer)
{
    try{	
	
	
	var resolve = await startAanvraagAutotelexpro(setletter, idasuser, applicatie, filiaal, offertenr, kenteken, kmstand, klantnummer);
	return (resolve);
    }
	catch(err) { console.error('handleAanvraagAutotelexpro: ' +err );}
	
}


module.exports = {
  handleAanvraagAutotelexpro: handleAanvraagAutotelexpro
  };  


  



	 