const { getVendorTokenAutotelexPro } = require("./getVendorToken.js");
const { getCustomerTokenAutotelexPro } = require("./getCustomerToken.js");
const { deleteInruilerDVT } = require("./vehicleInfoIntoIdas.js");
const { insertInruilerDVT } = require("./vehicleInfoIntoIdas.js");
const { updatePrijsinfoDVT } = require("./vehicleInfoIntoIdas.js");
const { updateDVTVoertuigInformatie } = require("./vehicleInfoIntoIdas.js");

const { getMaxSeqnDVT } = require("./vehicleInfoIntoIdas.js");
const { getVTBRUTDVT } = require("./vehicleInfoIntoIdas.js");
const { getVTATHWDVT } = require("./vehicleInfoIntoIdas.js");

const { opvragenVoertuigInformatieMetKenteken } = require("./opvragenVoertuigInformatieKenteken.js");

const { getKentekenRaadplegingenAutotelexPro } = require("./getKentekenRaadplegingen.js");
const { getVehiclesProAutotelexPro } = require("./getVehiclesPro.js");
const { autotelexFiliaal } = require("./autotelexFiliaal.js");
const { autotelexGebruiker } = require("./autotelexGebruikers.js");




 



 


    //  console.log('argument 0 '+ process.argv[0]);
    //  console.log('argument 1 '+ process.argv[1]);
	 var setletter = process.argv[2];
	 // console.log('setletter '+setletter);
	  
	
	// Parameter 3 ophalen
	  var idasuser = process.argv[3];
	  //console.log('idasuser '+idasuser); 
	  
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
	  var taxatieID = process.argv[8];
	  //console.log('taxatieID '+taxatieID);
	  
	  // Parameter 9 ophalen
	  var taxatieDATUM = process.argv[9];
	  //console.log('taxatieDATUM '+taxatieDATUM);
	  
	  // Parameter 10 ophalen
	  var inruilwaarde= process.argv[10];
	  //console.log('inruilwaarde '+inruilwaarde);
	  
	  
	  
	  
   
      
   
      
   
   
//vcnlkeyf(setletter,applicatie, function(err, marco) {
 //   console.log('Test ' +marco)
 // });
   
	 

async  function startVehicleAutotelexpro(setletter, idasuser, applicatie, filiaal, offertenr, kenteken, taxatieID, taxatieDATUM, inruilwaarde)
  {
   try{
	   
   const respAutotelexFiliaal = await autotelexFiliaal(setletter, filiaal);
   let jsonAutotelexFiliaal   = await respAutotelexFiliaal;
   
   const respAutotelexGebruiker = await autotelexGebruiker(setletter, filiaal, idasuser);
   let jsonAutotelexGebruiker   = await respAutotelexGebruiker;
   
   const respGetVendorTokenAutotelexPro = await getVendorTokenAutotelexPro(jsonAutotelexFiliaal);
   let vendorTokenID   = await respGetVendorTokenAutotelexPro;
   
   const respGetCustomerTokenAutotelexPro = await getCustomerTokenAutotelexPro(jsonAutotelexGebruiker);
   let customerTokenID  = await respGetCustomerTokenAutotelexPro
   
   const respGetVehiclesProAutotelexPro  = await getVehiclesProAutotelexPro(vendorTokenID, customerTokenID, taxatieID, kenteken);
   let vehicleInfo = await respGetVehiclesProAutotelexPro;
   
   const respGetVTBRUTDVT    =  await getVTBRUTDVT(setletter, filiaal, offertenr,kenteken);
   let resultaatGetVTBRUTDVT =  respGetVTBRUTDVT;
   
   if (resultaatGetVTBRUTDVT === 0)
	  {
		 
		   
		const respDeleteInruilerDVT = await deleteInruilerDVT(setletter, filiaal, offertenr, kenteken);
		let resultaatDeleteInruilerDVT = await respDeleteInruilerDVT;
		
		const respGetMaxSeqnDVT  = await getMaxSeqnDVT(setletter, filiaal, offertenr);
		let sequencenumber = await respGetMaxSeqnDVT;
		
		const respInsertInruilerDVT = await insertInruilerDVT (setletter, filiaal, offertenr, sequencenumber, inruilwaarde, vehicleInfo);
		let resultaatInsertInruilerDVT  = await respInsertInruilerDVT;
		
		const respOpvragenVoertuigInformatieMetKenteken = await opvragenVoertuigInformatieMetKenteken(jsonAutotelexFiliaal, jsonAutotelexGebruiker, kenteken);
		let opvragenVoertuigInfo = await respOpvragenVoertuigInformatieMetKenteken;
		
		const respUpdateDVTVoertuigInformatie  = await updateDVTVoertuigInformatie (setletter, filiaal, offertenr, opvragenVoertuigInfo);
		let   resultaatUpdateDVTVoertuigInformatie = await respUpdateDVTVoertuigInformatie;
		
		
	  }	else 
	  {
		 
        const respGetVTATHWDVT = await getVTATHWDVT(setletter, filiaal, offertenr, kenteken);
		let resultaatGetVTATHWDVT = await respGetVTATHWDVT ;
		
		if (resultaatGetVTATHWDVT === 0) 
		{
		
		const respUpdatePrijsinfoDVT = await updatePrijsinfoDVT (setletter, filiaal, offertenr,  vehicleInfo);
		let resultaatUpdatePrijsinfoDVT = respUpdatePrijsinfoDVT;
		
        const respOpvragenVoertuigInformatieMetKenteken = await opvragenVoertuigInformatieMetKenteken(jsonAutotelexFiliaal, jsonAutotelexGebruiker, kenteken);
		let opvragenVoertuigInfo = await respOpvragenVoertuigInformatieMetKenteken;
		
		const respUpdateDVTVoertuigInformatie  = await updateDVTVoertuigInformatie (setletter, filiaal, offertenr, opvragenVoertuigInfo);
		let   resultaatUpdateDVTVoertuigInformatie = await respUpdateDVTVoertuigInformatie;	
		
		}		
	  }		
   
    
   
    } catch (e) {
		console.error('startVehicleAutotelexpro error: ' + e); 
         
    } finally {
        console.log('Autotelex cleanup');
		return ({ message: 'VehicleAutotelexpro succesvol uitgevoerd'});
    }
}






//startVehicleAutotelexpro(setletter, idasuser, applicatie, filiaal, offertenr, kenteken, taxatieID, taxatieDATUM, inruilwaarde);
 
async function handleVehicleAutotelexpro(setletter, idasuser, applicatie, filiaal, offertenr, kenteken, taxatieID, taxatieDATUM, inruilwaarde)
{
    try{	
	//console.log('setletter:' + setletter);
	
	var resolve = await startVehicleAutotelexpro(setletter, idasuser, applicatie, filiaal, offertenr, kenteken, taxatieID, taxatieDATUM, inruilwaarde);
	return (resolve);
    }
	catch(err) {console.error('handleVehicleAutotelexpro error: ' + err)}
	
}


module.exports = {
  handleVehicleAutotelexpro: handleVehicleAutotelexpro
  };  

 
 

  



	 