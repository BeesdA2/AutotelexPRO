const {dbconn, dbstmt} = require('idb-connector'); 


function deleteInruilerDVT(setletter, filiaal, offertenr, kenteken){
	return new Promise(function(response) {
	const sSql = 'DELETE dasfp'+ setletter + '.dvt where vtbran =' +filiaal + ' and vtofnr =' +offertenr  +  ' and vtregn=\'' + kenteken + '\' with NONE';
	//const sSql = 'DELETE mvmspr_34.dvt where vtbran =' +filiaal + ' and vtofnr =' +offertenr  +  ' and vtregn=\'' + kenteken + '\' with NONE';
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

function getMaxSeqnDVT ( setletter, filiaal, offertenr)
{
return new Promise(function(response) {
	const sSql = 'Select max(vtseqn) AS maxseqn from dasfp'+ setletter + '.dvt where vtbran =' +filiaal + ' and vtofnr =' +offertenr +' with NONE';
	//const sSql = 'Select max(vtseqn) AS maxseqn from mvmspr_34.dvt where vtbran =' +filiaal + ' and vtofnr =' +offertenr +' with NONE';
	//console.log('sSQL '+sSql); 
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
   var maxseqn=0;
   for (t=0; t < x.length; t++)
	{
	 	// console.log('Timestamp ' + jsonfile[t].TOKENCREATEDTIMESTAMP );
       // console.log('OauthTkn ' + jsonfile[t].OAUTHTOKEN.trim() );
	   console.log('X heeft een lengte in getMaxSeqnDVT');
	   maxseqn = x[t].MAXSEQN ;
     console.log('Max seqn ' + maxseqn );
	 if (maxseqn === null)
	 {	 
		 maxseqn = 0;
	 } 
	}
	var seqn = 0;
	seqn = maxseqn ;
	seqn++;
	//console.log('Max seqn ' + seqn );
    response(seqn);
	});
	
	});	
}

function getVTBRUTDVT ( setletter, filiaal, offertenr, kenteken)
{
return new Promise(function(response) {
	
	const sSql = 'Select vtbrut  from dasfp'+ setletter + '.dvt where vtbran =' +filiaal + ' and vtofnr =' +offertenr +  ' and vtregn=\'' + kenteken + '\' with NONE';
																  
	//console.log('sSQL '+sSql); 
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
   var helpvtbrut=0;
   for (t=0; t < x.length; t++)
	{
	 	// console.log('Timestamp ' + jsonfile[t].TOKENCREATEDTIMESTAMP );
       // console.log('OauthTkn ' + jsonfile[t].OAUTHTOKEN.trim() );
	   console.log('X heeft een lengte in getMaxSeqnDVT');
	   helpvtbrut = x[t].VTBRUT ;
     console.log('helpvtbrut ' + helpvtbrut );
	 
	 if (helpvtbrut === null)
	 {	 
		 helpvtbrut = 0;
	 } 
	 if (helpvtbrut === '.00')
	 {
		 helpvtbrut = 0;
	 }
	}
	
    response(helpvtbrut);
	});
	
	});	
}



function getVTATHWDVT ( setletter, filiaal, offertenr, kenteken)
{
return new Promise(function(response) {
	
	const sSql = 'Select vtathw from dasfp'+ setletter + '.dvt  where vtbran =' +filiaal + ' and vtofnr =' +offertenr +  ' and vtregn=\'' + kenteken + '\' with NONE';
	//console.log('sSQL '+sSql); 
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	
    statement.execSync(sSql, (x) => {
   // console.log(JSON.stringify(x));
	 
  // console.log(vehicleInfo);
    statement.close();
      connection.disconn();
      connection.close();
   // console.log('test' +vehicleInfo);
   //  insertOauthTkn(setletter, idasuser, applicatie, responseHttp);
   // console.log('oauthValidate gereed!');
   var helpvtathw=0;
   for (t=0; t < x.length; t++)
	{
	 	// console.log('Timestamp ' + jsonfile[t].TOKENCREATEDTIMESTAMP );
       // console.log('OauthTkn ' + jsonfile[t].OAUTHTOKEN.trim() );
	  // console.log('X heeft een lengte in getMaxSeqnDVT');
	   helpvtbrut = x[t].VTATHW ;
     //console.log('helpvtbrut ' + helpvtathw );
	 
	 if (helpvtathw === null)
	 {	 
		 helpvtathw = 0;
	 } 
	 if (helpvtathw === '.00')
	 {
		 helpvtathw = 0;
	 }
	}
	
    response(helpvtathw);
	});
	
	});	
}

function insertInruilerDVT (setletter, filiaal, offertenr, seqn, inruilwaarde, vehicleInfo) 
{
	return new Promise(function(response) {
//console.log('Setletter ' +setletter);

// kenteken
var kenteken    =  vehicleInfo['b:BasisGegevens']['c:Kenteken'];
var brand       =  vehicleInfo['b:BasisGegevens']['c:MMT']['c:Brand'];
var model       =  vehicleInfo['b:BasisGegevens']['c:MMT']['c:Model'];
var type        =  vehicleInfo['b:BasisGegevens']['c:MMT']['c:Type'];

var tellerstand =  vehicleInfo['b:VoertuigVariabelen']['c:TellerstandVerwacht'];

var datumdeelI;
var datumdeelII;
var apkdatum;
var jsonfile = vehicleInfo['b:EigenaarHistorieRDWGegevens']['c:RDWVoertuigData']['c:VoertuigData']  ;
for (t=0; t < jsonfile.length; t++)
	{
	 //console.log('Extra Info '+ jsonfile[t]['c:ExtraInfo']);
	 var extraInfo = jsonfile[t]['c:ExtraInfo'];
	 if (extraInfo.substring(0,6) === 'Eerste')
	 {
	 

	 
		datumdeelI = jsonfile[t]['c:Datum'];
	 }
	 if (extraInfo === 'APK vervaldatum')
	 {
		 
		 apkdatum =  jsonfile[t]['c:Datum'];
	 }		
	if (extraInfo === 'Laatste tenaamstelling')
	 {
		 
		  datumdeelII =  jsonfile[t]['c:Datum'];
	 }
}	
if (datumdeelII === undefined)
{
	datumdeelII = datumdeelI;
}
	

var naamRest;
var naamHandel;
var naamInruil;
var naamNieuw;
var naamVerkoop;
var naamInternet;

var waardeInruil;
var waardeHandel;
var waardeVerkoop;
var waardeInternet
var waardeNieuw;

var waardeExclInruil;
var waardeExclHandel;
var waardeExclVerkoop;
var waardeExclInternet;
var waardeExclNieuw;


var bpmInruil;
var bpmHandel;
var bpmVerkoop;
var bpmInternet;
var bpmNieuw;

var btwInruil;
var btwHandel;
var btwVerkoop;
var btwInternet;
var btwNieuw;


var jsonfileRest = vehicleInfo['b:WaardeGegevens']['c:Restwaarden']['c:RestWaarden']  ;
for (t=0; t < jsonfileRest.length; t++)
	{
	 	naamRest = jsonfileRest[t]['c:Naam'];
		if (naamRest === 'Handelswaarde')
		{
			naamHandel       = jsonfileRest[t]['c:Naam'];
			bpmHandel        = jsonfileRest[t]['c:BPM'];
			btwHandel        = jsonfileRest[t]['c:BTW'];
			waardeHandel     = jsonfileRest[t]['c:Waarde'];
			waardeExclHandel = jsonfileRest[t]['c:WaardeExclusief'];
		}
		if (naamRest === 'Inruilwaarde')
		{
			naamInruil       = jsonfileRest[t]['c:Naam'];
			bpmInruil        = jsonfileRest[t]['c:BPM'];
			btwInruil        = jsonfileRest[t]['c:BTW'];
			waardeInruil     = jsonfileRest[t]['c:Waarde'];
			waardeExclInruil = jsonfileRest[t]['c:WaardeExclusief'];
		}
		if (naamRest === 'Verkoopwaarde')
		{
			naamVerkoop       = jsonfileRest[t]['c:Naam'];
			bpmVerkoop        = jsonfileRest[t]['c:BPM'];
			btwVerkoop        = jsonfileRest[t]['c:BTW'];
			waardeVerkoop     = jsonfileRest[t]['c:Waarde'];
			waardeExclVerkoop = jsonfileRest[t]['c:WaardeExclusief'];
		}
		if (naamRest === 'Internetwaarde')
		{
			naamInternet       = jsonfileRest[t]['c:Naam'];
			bpmInternet        = jsonfileRest[t]['c:BPM'];
			btwInternet        = jsonfileRest[t]['c:BTW'];
			waardeInternet     = jsonfileRest[t]['c:Waarde'];
			waardeExclInternet = jsonfileRest[t]['c:WaardeExclusief'];
		}
		if (naamRest === 'Nieuwprijs')
		{
			naamNieuw       = jsonfileRest[t]['c:Naam'];
			bpmNieuw        = jsonfileRest[t]['c:BPM'];
			btwNieuw        = jsonfileRest[t]['c:BTW'];
			waardeNieuw     = jsonfileRest[t]['c:Waarde'];
			waardeExclNieuw = jsonfileRest[t]['c:WaardeExclusief'];
		}
		
	}
	
	

if (inruilwaarde !== '0')
 {
		waardeInruil = inruilwaarde;
 }
//console.log('Prijs inclusief BTW en BPM ' +waardeInruil);	
//console.log('Oorspronkelijke BPM bedrag ' +bpmNieuw);	

var taxatieTekst =  vehicleInfo['b:WaardeGegevens']['c:DatumTaxatie'];
var modeltype =     model + ' '+ type;
var vtp1cc = datumdeelI.substring(0,2);
//console.log('vtp1cc ' + vtp1cc); 
var vtp1yy = datumdeelI.substring(4,2);
//console.log('vtp1yy ' + vtp1yy); 
var vtp1mm = datumdeelI.substring(7,5);
//console.log('vtp1mm ' + vtp1mm); 
var vtp1dd = datumdeelI.substring(10,8);
//console.log('vtp1dd ' + vtp1dd); 

var vtp2cc = datumdeelII.substring(0,2);
//console.log('vtp2cc ' + vtp2cc); 
var vtp2yy = datumdeelII.substring(4,2);
//console.log('vtp2yy ' + vtp2yy); 
var vtp2mm = datumdeelII.substring(7,5);
//console.log('vtp2mm ' + vtp2mm); 
var vtp2dd = datumdeelII.substring(10,8);
//console.log('vtp2dd ' + vtp2dd); 

var kmstand ;
kmstand = tellerstand;
//console.log('kmstand: '+ kmstand);
if ( kmstand === undefined)
{ 
console.log('kmstand = undefined');
kmstand = 0;
}

var taxatieurl = '';
var schadeurl = '';
var dmsinruil = 0;
var dmshandel = 0;
var dmsverkoop =0;
const sSql = 'insert into dasfp'+ setletter + '.dvt  values('+filiaal+','+offertenr+','+seqn+',\''  +brand+ '\', \''+ modeltype.substring(0,24)  + '\',\''+kenteken+'\','+ kmstand+ ','+vtp1cc+','+vtp1yy+','+vtp1mm+','+vtp1dd+','+vtp2cc+','+vtp2yy+','+vtp2mm+','+vtp2dd+',\' \',' + waardeInruil + ','+ bpmNieuw+', 0, 0,\'\',\'Datum taxatie: '+ taxatieTekst.substring(0,10) +'\', \'\',\'\',\'\','+ waardeHandel+','+ waardeInruil +',' + waardeVerkoop+ ',\'' + schadeurl + '\',\'' +taxatieurl + '\',' + dmshandel + ',' + dmsinruil +',' + dmsverkoop +') with NONE';
//const sSql = 'insert into mvmspr_34.dvt  values('+filiaal+','+offertenr+','+seqn+',\''  +brand+ '\', \''+ modeltype.substring(0,24)  + '\',\''+kenteken+'\','+ kmstand+ ','+vtp1cc+','+vtp1yy+','+vtp1mm+','+vtp1dd+','+vtp2cc+','+vtp2yy+','+vtp2mm+','+vtp2dd+',\' \',' + waardeInruil + ','+ bpmNieuw+', 0, 0,\'\',\'Datum taxatie: '+ taxatieTekst.substring(0,10) +'\', \'\',\'\',\'\', '+ waardeHandel+',' + waardeInruil + ',' + waardeVerkoop+ ') with NONE';


//const sSql = 'insert into  dasfpa.dvt values(01,617352,4,'Volvo', 'V40 2.0 D2 R-Design Busin', 'GN302S' ,60000, 20,15,07,15,20,16,07,20,' ',12063, 1699, 0, 0,'', 'Datum Taxatie : 10-1-2020 ', '','','')';
	//console.log('sSQL '+sSql);
    //console.log('Waardeverkoop '+ waardeVerkoop);	
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	
    statement.execSync(sSql, (x) => {
    console.log(JSON.stringify(x));
	 
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

function updatePrijsinfoDVT (setletter, filiaal, offertenr,  vehicleInfo) 
{
	return new Promise(function(response) {

var kenteken    =  vehicleInfo['b:BasisGegevens']['c:Kenteken'];
var brand       =  vehicleInfo['b:BasisGegevens']['c:MMT']['c:Brand'];
var model       =  vehicleInfo['b:BasisGegevens']['c:MMT']['c:Model'];
var type        =  vehicleInfo['b:BasisGegevens']['c:MMT']['c:Type'];

var tellerstand =  vehicleInfo['b:VoertuigVariabelen']['c:TellerstandVerwacht'];

var datumdeelI;
var datumdeelII;
var apkdatum;
var jsonfile = vehicleInfo['b:EigenaarHistorieRDWGegevens']['c:RDWVoertuigData']['c:VoertuigData']  ;
for (t=0; t < jsonfile.length; t++)
	{
	 //console.log('Extra Info '+ jsonfile[t]['c:ExtraInfo']);
	 var extraInfo = jsonfile[t]['c:ExtraInfo'];
	 if (extraInfo.substring(0,6) === 'Eerste')
	 {
	 

	 
		datumdeelI = jsonfile[t]['c:Datum'];
	 }
	 if (extraInfo === 'APK vervaldatum')
	 {
		 
		 apkdatum =  jsonfile[t]['c:Datum'];
	 }		
	if (extraInfo === 'Laatste tenaamstelling')
	 {
		 
		  datumdeelII =  jsonfile[t]['c:Datum'];
	 }
}	
if (datumdeelII === undefined)
{
	datumdeelII = datumdeelI;
}
	
var naamRest;
var naamHandel;
var naamInruil;
var naamNieuw;
var naamVerkoop;
var naamInternet;

var waardeInruil;
var waardeHandel;
var waardeVerkoop;
var waardeInternet
var waardeNieuw;

var waardeExclInruil;
var waardeExclHandel;
var waardeExclVerkoop;
var waardeExclInternet;
var waardeExclNieuw;


var bpmInruil;
var bpmHandel;
var bpmVerkoop;
var bpmInternet;
var bpmNieuw;

var btwInruil;
var btwHandel;
var btwVerkoop;
var btwInternet;
var btwNieuw;


var jsonfileRest = vehicleInfo['b:WaardeGegevens']['c:Restwaarden']['c:RestWaarden']  ;
for (t=0; t < jsonfileRest.length; t++)
	{
	 	naamRest = jsonfileRest[t]['c:Naam'];
		if (naamRest === 'Handelswaarde')
		{
			naamHandel       = jsonfileRest[t]['c:Naam'];
			bpmHandel        = jsonfileRest[t]['c:BPM'];
			btwHandel        = jsonfileRest[t]['c:BTW'];
			waardeHandel     = jsonfileRest[t]['c:Waarde'];
			waardeExclHandel = jsonfileRest[t]['c:WaardeExclusief'];
		}
		if (naamRest === 'Inruilwaarde')
		{
			naamInruil       = jsonfileRest[t]['c:Naam'];
			bpmInruil        = jsonfileRest[t]['c:BPM'];
			btwInruil        = jsonfileRest[t]['c:BTW'];
			waardeInruil     = jsonfileRest[t]['c:Waarde'];
			waardeExclInruil = jsonfileRest[t]['c:WaardeExclusief'];
		}
		if (naamRest === 'Verkoopwaarde')
		{
			naamVerkoop       = jsonfileRest[t]['c:Naam'];
			bpmVerkoop        = jsonfileRest[t]['c:BPM'];
			btwVerkoop        = jsonfileRest[t]['c:BTW'];
			waardeVerkoop     = jsonfileRest[t]['c:Waarde'];
			waardeExclVerkoop = jsonfileRest[t]['c:WaardeExclusief'];
		}
		if (naamRest === 'Internetwaarde')
		{
			naamInternet       = jsonfileRest[t]['c:Naam'];
			bpmInternet        = jsonfileRest[t]['c:BPM'];
			btwInternet        = jsonfileRest[t]['c:BTW'];
			waardeInternet     = jsonfileRest[t]['c:Waarde'];
			waardeExclInternet = jsonfileRest[t]['c:WaardeExclusief'];
		}
		if (naamRest === 'Nieuwprijs')
		{
			naamNieuw       = jsonfileRest[t]['c:Naam'];
			bpmNieuw        = jsonfileRest[t]['c:BPM'];
			btwNieuw        = jsonfileRest[t]['c:BTW'];
			waardeNieuw     = jsonfileRest[t]['c:Waarde'];
			waardeExclNieuw = jsonfileRest[t]['c:WaardeExclusief'];
		}
		
	}
	
	


//console.log('Prijs inclusief BTW en BPM ' +waardeInruil);	
//console.log('Oorspronkelijke BPM bedrag ' +bpmNieuw);	

var taxatieTekst =  vehicleInfo['b:WaardeGegevens']['c:DatumTaxatie'];
console.log('taxatieTekst '+taxatieTekst);
var modeltype =     model + ' '+ type;
var vtp1cc = datumdeelI.substring(0,2);
//console.log('vtp1cc ' + vtp1cc); 
var vtp1yy = datumdeelI.substring(4,2);
//console.log('vtp1yy ' + vtp1yy); 
var vtp1mm = datumdeelI.substring(7,5);
//console.log('vtp1mm ' + vtp1mm); 
var vtp1dd = datumdeelI.substring(10,8);
//console.log('vtp1dd ' + vtp1dd); 

var vtp2cc = datumdeelII.substring(0,2);
//console.log('vtp2cc ' + vtp2cc); 
var vtp2yy = datumdeelII.substring(4,2);
//console.log('vtp2yy ' + vtp2yy); 
var vtp2mm = datumdeelII.substring(7,5);
//console.log('vtp2mm ' + vtp2mm); 
var vtp2dd = datumdeelII.substring(10,8);
//console.log('vtp2dd ' + vtp2dd); 

var kmstand ;
kmstand = tellerstand;
console.log('kmstand: '+ kmstand);
if ( kmstand === undefined)
{ 
console.log('kmstand = undefined');
kmstand = 0;
}






const sSql = 'update dasfp'+ setletter + '.dvt   set vtathw = '+ waardeHandel + ', vtatinr = '+ waardeInruil + ', vtatvw = '+ waardeVerkoop +
             ', vtmark = \''+brand + '\', vttype = \''  + modeltype.substring(0,24)  + '\',  vtp1cc=' + vtp1cc + ', vtp1yy = ' +vtp1yy + ', vtp1mm=' + vtp1mm+ ', vtp1dd=' + vtp1dd+ 	 
              ', vtp2cc=' + vtp2cc + ', vtp2yy = ' +vtp2yy + ', vtp2mm=' + vtp2mm+ ', vtp2dd=' + vtp2dd+  ', vttex1=\'Datum taxatie '+taxatieTekst +'\'' +
              ' where vtbran = '+ filiaal+ ' and  vtofnr = '+offertenr+ ' and vtregn=\'' + kenteken + '\' with NONE';

//const sSql = 'insert into  dasfpa.dvt values(01,617352,4,'Volvo', 'V40 2.0 D2 R-Design Busin', 'GN302S' ,60000, 20,15,07,15,20,16,07,20,' ',12063, 1699, 0, 0,'', 'Datum Taxatie : 10-1-2020 ', '','','')';
	console.log('sSQL '+sSql);
    console.log('Waardeverkoop '+ waardeVerkoop);	
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	
    statement.execSync(sSql, (x) => {
    console.log(JSON.stringify(x));
	 
  // console.log(vehicleInfo);
    statement.close();
      connection.disconn();
      connection.close();
	  
    console.log('vehicleInfo ' +vehicleInfo);
   //  insertOauthTkn(setletter, idasuser, applicatie, responseHttp);
   // console.log('oauthValidate gereed!');
	});
	response('klaar');
	});	
	
}
   
function updateDVTVoertuigInformatie (setletter, filiaal, offertenr,  opvragenVoertuigInfo) 
{
	return new Promise(function(updateDVTVIresponse) {
//console.log('^^^^^^^ 1 opvragenVoertuigInfo: ' +opvragenVoertuigInfo['OpvragenVoertuiginformatieMetKentekenResult']);
// console.log('^^^^^^^ 2 opvragenVoertuigInfo: ' +opvragenVoertuigInfo);
 //console.log('^^^^^^^ 3 opvragenVoertuigInfo: ' +opvragenVoertuigInfo.KoppelingWebserviceVoertuigInformatie.SchaderapportURL);
 // console.log('^^^^^^^ 4 opvragenVoertuigInfo: ' +opvragenVoertuigInfo['SchaderapportURL']);
var kenteken              =  opvragenVoertuigInfo.KoppelingWebserviceVoertuigInformatie.Kenteken;
var schaderapportURL      =  opvragenVoertuigInfo.KoppelingWebserviceVoertuigInformatie.SchaderapportURL;
var taxatierapportURL     =  opvragenVoertuigInfo.KoppelingWebserviceVoertuigInformatie.TaxatierapportURL;
var dmsExpectedSellPrice  =  opvragenVoertuigInfo.KoppelingWebserviceVoertuigInformatie.DmsData.DmsExpectedSellPrice;
var dmsBuyInPrice         =  opvragenVoertuigInfo.KoppelingWebserviceVoertuigInformatie.DmsData.DmsBuyInPrice;
var dmsTradeInPrice		  =  opvragenVoertuigInfo.KoppelingWebserviceVoertuigInformatie.DmsData.DmsTradeInPrice;



	console.log('schaderapportURL: '+ schaderapportURL);
	console.log('taxatierapportURL: '+ taxatierapportURL);
	console.log('dmsExpectedSellPrice: '+dmsExpectedSellPrice);
	console.log('dmsBuyInPrice: ' + dmsBuyInPrice);
	console.log('dmsTradeInPrice: ' + dmsTradeInPrice);
    console.log('Kenteken: ' +kenteken);


 
 






const sSql = 'update dasfp'+ setletter + '.dvt set vtatsu = \''+schaderapportURL + '\', vtattu = \''  + taxatierapportURL  + '\' where vtbran = ' + filiaal + ' and vtofnr ='+offertenr + ' and vtregn=\'' + kenteken + '\' with NONE';
             

//const sSql = 'update mvmspr_34.dvt   set vtatdhw = '+ dmsBuyInPrice + ', vtatdinr = '+ dmsTradeInPrice + ', vtatdvw = '+ dmsExpectedSellPrice +
//             ', vtatsu = \''+schaderapportURL + '\', vtattu = \''  + taxatierapportURL  + '\' with NONE';


//const sSql = 'insert into  dasfpa.dvt values(01,617352,4,'Volvo', 'V40 2.0 D2 R-Design Busin', 'GN302S' ,60000, 20,15,07,15,20,16,07,20,' ',12063, 1699, 0, 0,'', 'Datum Taxatie : 10-1-2020 ', '','','')';
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
	
	console.log(isInt(dmsBuyInPrice)); 
	if (isInt(dmsBuyInPrice)=== false)
	{
	dmsBuyInPrice =0;
	}
	if (isInt(dmsTradeInPrice)=== false)
	{ 
	dmsTradeInPrice=0;
	}
	if (isInt(dmsExpectedSellPrice)=== false)
	{ 
	dmsExpectedSellPrice=0;
	}
	
	const sSql2 = 'update dasfp'+ setletter + '.dvt   set vtatdhw = '+ dmsBuyInPrice + ', vtatdinr = '+ dmsTradeInPrice + ', vtatdvw = '+ dmsExpectedSellPrice +
             ' where vtbran = ' + filiaal + ' and vtofnr ='+offertenr + ' and vtregn=\'' + kenteken + '\' with NONE';

//const sSql = 'update mvmspr_34.dvt   set vtatdhw = '+ dmsBuyInPrice + ', vtatdinr = '+ dmsTradeInPrice + ', vtatdvw = '+ dmsExpectedSellPrice +
//             ', vtatsu = \''+schaderapportURL + '\', vtattu = \''  + taxatierapportURL  + '\' with NONE';


//const sSql = 'insert into  dasfpa.dvt values(01,617352,4,'Volvo', 'V40 2.0 D2 R-Design Busin', 'GN302S' ,60000, 20,15,07,15,20,16,07,20,' ',12063, 1699, 0, 0,'', 'Datum Taxatie : 10-1-2020 ', '','','')';
	console.log('sSQL '+sSql2);
     	
    const connection2 = new dbconn();
    connection2.conn('*LOCAL');
    const statement2 = new dbstmt(connection2);
     
	
    statement2.execSync(sSql2, (y) => {
  //  console.log(JSON.stringify(x));
	 
  // console.log(vehicleInfo);
    statement2.close();
      connection2.disconn();
      connection2.close();
   // console.log('test' +vehicleInfo);
   //  insertOauthTkn(setletter, idasuser, applicatie, responseHttp);
   // console.log('oauthValidate gereed!');
	});
	updateDVTVIresponse('klaar');
	});	
	
}

isObject = function(a) {
    return (!!a) && (a.constructor === Object);
};

function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}
module.exports = {
  
  deleteInruilerDVT: deleteInruilerDVT,
  insertInruilerDVT: insertInruilerDVT,
  updatePrijsinfoDVT : updatePrijsinfoDVT,
  updateDVTVoertuigInformatie : updateDVTVoertuigInformatie,
  getVTBRUTDVT     : getVTBRUTDVT,
  getVTATHWDVT     : getVTATHWDVT,
  getMaxSeqnDVT    : getMaxSeqnDVT,
  
  };