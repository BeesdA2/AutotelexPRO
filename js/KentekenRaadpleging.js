const { getVendorTokenAutotelexPro } = require("./getVendorToken.js");
const { getCustomerTokenAutotelexPro } = require("./getCustomerToken.js");
const { deleteTaxatieATLICENSRQ } = require("./licenseRequestIntoIdas.js");
const { insertTaxatieATLICENSRQ } = require("./licenseRequestIntoIdas.js");
 

const { getKentekenRaadplegingenAutotelexPro } = require("./getKentekenRaadplegingen.js");

const { autotelexFiliaal } = require("./autotelexFiliaal.js");
const { autotelexGebruiker } = require("./autotelexGebruikers.js");

 

 



 



 
	 var setletter = process.argv[2];
	 // console.log('setletter '+setletter);
	  
	
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
	  
	   
   
      
   
      
   
   
//vcnlkeyf(setletter,applicatie, function(err, marco) {
 //   console.log('Test ' +marco)
 // });
   
	 
	

async function  startKentekenRaadpleging(setletter, idasuser, applicatie, filiaal, offertenr, kenteken) 
  {
	try {
		
   const respAutotelexFiliaal = await autotelexFiliaal(setletter, filiaal);
   let jsonAutotelexFiliaal   = await respAutotelexFiliaal;
   
   const respAutotelexGebruiker = await autotelexGebruiker(setletter, filiaal, idasuser);
   let jsonAutotelexGebruiker   = await respAutotelexGebruiker;
   
   const respGetVendorTokenAutotelexPro = await getVendorTokenAutotelexPro(jsonAutotelexFiliaal);
   let vendorTokenID   = await respGetVendorTokenAutotelexPro;
   
   const respGetCustomerTokenAutotelexPro = await getCustomerTokenAutotelexPro(jsonAutotelexGebruiker);
   let customerTokenID   = await respGetCustomerTokenAutotelexPro;
   
   const respGetKentekenRaadplegingenAutotelexPro = await getKentekenRaadplegingenAutotelexPro(vendorTokenID, customerTokenID, kenteken);
   let xmlBody   = await respGetKentekenRaadplegingenAutotelexPro;

   const respDeleteTaxatieATLICENSRQ = await deleteTaxatieATLICENSRQ(setletter, filiaal, offertenr, kenteken);
   let resultaatDeleteTaxatieATLICENSRQ   = await respDeleteTaxatieATLICENSRQ;
   
   const respInsertTaxatieATLICENSRQ = await insertTaxatieATLICENSRQ (setletter, filiaal, offertenr, kenteken, xmlBody);
   let resultaatInsertTaxatieATLICENSRQ  = await respInsertTaxatieATLICENSRQ;
   
   
   
    } catch (e) {
        console.error(e);
    } finally {
        console.log('Autotelex cleanup');
		return ({ message: 'Kenteken Raadpleging Autotelexpro succesvol uitgevoerd'});
    }
}

 
startKentekenRaadpleging(setletter, idasuser, applicatie, filiaal, offertenr, kenteken); 

async function handleKentekenRaadpleging(setletter, idasuser, applicatie, filiaal, offertenr, kenteken)
{
    try{	
	console.log('setletter:' + setletter);
	
	var resolve = await startKentekenRaadpleging(setletter, idasuser, applicatie, filiaal, offertenr, kenteken); 
	return (resolve);
    }
	catch(err) {}
	
}


module.exports = {
  handleKentekenRaadpleging: handleKentekenRaadpleging
  };  


  


  



	 