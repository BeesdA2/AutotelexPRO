const {dbconn, dbstmt} = require('idb-connector'); 


function deleteATTAXATIES(setletter, filiaal, offertenr, kenteken){
	return new Promise(function(response) {
	const sSql = 'DELETE dasfp'+ setletter + '.ATTAXATIES where filiaal_nummer =' +filiaal + ' and offerte_nummer =' +offertenr  +  ' and kenteken=\'' + kenteken + '\' with NONE';
	console.log('sSQL '+sSql); 
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	
    statement.execSync(sSql, (x) => {
   //  console.log(JSON.stringify(x));
	 
  // console.log(vehicleInfo);
    statement.close();
      connection.disconn();
      connection.close();
   // console.log('test' +vehicleInfo);
   //  insertOauthTkn(setletter, idasuser, applicatie, responseHttp);
   // console.log('oauthValidate gereed!');
	});
	response('klaar');
	});
	
	
	
}


function insertATTAXATIES (setletter, filiaal, offertenr, kenteken, taxatieID, taxatieDATUM, xmlBODY) 
{
	return new Promise(function(response) {
console.log('Setletter ' +setletter);
 
 

const sSql = 'insert into dasfp'+ setletter + '.ATTAXATIES  values('+filiaal+','+offertenr+',\''+kenteken+'\',\''+ taxatieID + '\',\'' +taxatieDATUM +'\',\'' + xmlBODY + '\')  with NONE';
//const sSql = 'insert into  dasfpa.dvt values(01,617352,4,'Volvo', 'V40 2.0 D2 R-Design Busin', 'GN302S' ,60000, 20,15,07,15,20,16,07,20,' ',12063, 1699, 0, 0,'', 'Datum Taxatie : 10-1-2020 ', '','','')';
	console.log('sSQL '+sSql); 
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	
    statement.execSync(sSql, (x) => {
    //console.log(JSON.stringify(x));
	 
  // console.log(vehicleInfo);
    statement.close();
      connection.disconn();
      connection.close();
   // console.log('test' +vehicleInfo);
   //  insertOauthTkn(setletter, idasuser, applicatie, responseHttp);
   // console.log('oauthValidate gereed!');
	});
	response('klaar');
	});	
	
}
module.exports = {
  
  deleteATTAXATIES: deleteATTAXATIES,
  insertATTAXATIES: insertATTAXATIES,
  
  };