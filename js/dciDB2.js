const {dbconn, dbstmt} = require('idb-connector');
 


 
 function getDciOphalen (setletter, klantnummer) {
	 
  return new Promise(function(resolve)
  {
 
 
    const sSql = 'SELECT * from dasfp'+setletter + '.dci where cicust =' +klantnummer;
	//console.log('sSQL '+sSql); 
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	
    statement.exec(sSql, (x) => {
    //console.log('x :' +x);
	//console.log('x json :' +JSON.stringify(x));
	//var jsonVCNLKEYF = JSON.stringify(x);
	//console.log('ATFBRAN '+ jsonVCNLKEYF['FILIAAL_NUMMER']);
	//uitlezen(x);
	//testen(x);
	
  // console.log(jsonVcnlkeyf);
    statement.close();
      connection.disconn();
      connection.close();
   // console.log('test' +jsonVcnlkeyf);
     
  // console.log('Net voor jsonvcnl return');
     
	resolve(x);    
	});
  });
 }
 
 

 
  
function uitlezen (jsonfile) {
//console.log('jsonFile '+ jsonfile);	
//console.log(JSON.stringify(jsonfile));
//var parseJsonfile = jsonfile.parseJsonfile;
//console.log('UITLEZEN IN FILIAAL object ' + parseJsonfile);
console.log('UITLEZEN IN FILIAAL object ' + jsonfile[0].FILIAAL_NUMMER);
}

function testen (jsonfile) {
	console.log('testen');
	for (t=0; t < jsonfile.length; t++)
	{
		console.log('wAT IS T '+ t);
	 	console.log('ATFBRAN ' + jsonfile[t].FILIAAL_NUMMER );
       // console.log('VKKEYV ' + jsonfile[t].VKKEYV.trim() );
    }	
}

 
 
 module.exports = {
  getDciOphalen: getDciOphalen,
 };
