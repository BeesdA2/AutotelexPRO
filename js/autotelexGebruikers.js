const {dbconn, dbstmt} = require('idb-connector');
 


 
 function autotelexGebruiker (setletter, filiaal, userid) {
	 
  return new Promise(function(resolve)
  {
 
 
    const sSql = 'SELECT * from dasfp'+setletter + '.atuser where atubran =' +filiaal +' and atuiuser = \'' +userid + '\'';
	//console.log('sSQL '+sSql); 
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	
    statement.exec(sSql, (x) => {
    //console.log('x :' +x);
	//console.log('x json :' +JSON.stringify(x));
	//var jsonVCNLKEYF = x;
	//console.log('VKKEYN '+ jsonVCNLKEYF[0].VKKEYN);
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
 
 

 
  

 
 
 module.exports = {
  autotelexGebruiker: autotelexGebruiker
 };
