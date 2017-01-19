//$ node Empreinte.js

// Ce script a pour objectif le calcul de l'empreinte carbone,
// exprimée en équivalent carbone par km, imputable au déplacement
// et à la mise à disposition du colis par le site marchand.
// ***************************************************************** //
// Sources :
// http://www.associationbilancarbone.fr/fr/download-file/485/field_fichier/479
// http://www.lesempreintesduvoyage.com/p/blog-page_17.html
// http://www.developpement-durable.gouv.fr/IMG/pdf/Guide_Information_CO2-2.pdf
// http://fluglaerm.de/hamburg/klima.htm
// ***************************************************************** //


// En kg équivalent carbone par km et par personne
const M1 = 0.0109; // transport homme en autocar, type Eurolines
const M2 = 0.106; // transport homme en avion, moyenne court/long-courrier
const M3 = 0.0241; // transport homme en bus, moyenne autoroute-ville
const M4 = 0.03946; // transport homme en moto, moyenne tous cc confondus
const M5 = 0.01023; // transport homme en train, moyenne Europe pour l'électricité
const M6 = 0.001; // transport homme en vélo, arbitraire / négligeable
const M7 = 0.06981; // transport homme en voiture, prend en compte fabrication de la voiture et du carburant
const M8 = 0.088; // transport homme en bateau, moyenne haute

// En kg équivalent carbone par km et par tonne de marchandise
const G1 = 0.5; // transport marchandise en avion, Air plane (air cargo), average Cargo B747
const G2 = 0.1005; // transport marchandise en camion, Modern lorry or truck
const G3 = 0.07; // transport marchandise en train, Modern train
const G4 = 0.025; // transport marchandise en navire, Modern ship (sea freight)  
const G5 = 0.055; // transport marchandise en dirigeable, Airship (Zeppelin, Cargolifter)

// Objets de test

var objA = {
	name: "PS4 1To",
	seller: "amazon",
	zone: "France",
	ASIN: 333333,
	sku: 27895745,
	price: 289.00, // euros
	weight: 6.5, // kg
	distance: 145.3, //km
	etape: [{type: M7, distance: 11.3}, {type: G2, distance: 134}]
}

var objB = {
	name: "PS4 1To",
	seller: "cdiscount",
	zone: "France",
	sku: 21822780,
	price: 295.00, // euros
	weight: 7.0, // kg
	distance: 122.3, //km
	etape: [{type: G2, distance: 122.3}]
}

var objC = {
	name: "PS4 1To",
	seller: "Chez Abdallah",
	zone: "France",
	sku: 18755749,
	price: 312.00, // euros
	weight: 6.1, // kg
	distance: 10.3, //km
	etape: [{type: M6, distance: 10.3}]
}

var objD = {
	name: "PS4 1To",
	seller: "PolandGaming",
	zone: "Europe",
	sku: 11554475,
	price: 284.00, // euros
	weight: 7.2, // kg
	distance: 1512.5, // km
	etape: [{type: M7, distance: 8.5}, {type: G3, distance: 1450.0}, {type: G2, distance: 54.0}]
}
    


// Malus selon pays par rapport à la France (relatif à la production d'électricité) pour le trajet en train
function malusElec(zone){
	var malus = 0;
    
	if(zone=="France") malus = 1;
	else if(zone=="AmNord") malus = 1;
	else if(zone=="AmSud") malus = 2;
	else if(zone=="Autre") malus = 2;
	else if(zone=="Asie") malus = 3;
	else if(zone=="Europe") malus = 3;
	else if(zone=="Afrique") malus = 4;
	else if(zone=="Chine") malus = 10;
	else console.log("Error while calculating malus !");
	return malus;
}

// Poids livré en kilogrammes
function pctTonne(weightObject){
	// Traitement pour calculer pourcentage de tonne occupé par l'objet
	return weightObject / 1000;
}

// Calcul de l'empreinte Carbone
function calculSubPrint(O){
	var print = 0.0;
	for(var i=0; i < O.etape.length; i++){
    	if (O.etape[i].type === G3){
        	print = print + pctTonne(O.weight) * malusElec(O.zone) * O.etape[i].distance * O.etape[i].type;
    	}
    	else print = print + pctTonne(O.weight) * O.etape[i].distance * O.etape[i].type;
	}
	return 1000*print.toFixed(4);
}

console.log("\n Calcul de l'empreinte carbone des objets de test ! \n\n");
console.log("Objet A"+"\t\t"+objA.name+"\t SKU:"+objA.sku+"\t PRIX:"+objA.price+ "€\n\nEmpreinte : "+calculSubPrint(objA)+" grammes d'équivalent Carbone !\n");
console.log("Objet B"+"\t\t"+objB.name+"\t SKU:"+objB.sku+"\t PRIX:"+objB.price+ "€\n\nEmpreinte : "+calculSubPrint(objB)+" grammes d'équivalent Carbone !\n");
console.log("Objet C"+"\t\t"+objC.name+"\t SKU:"+objC.sku+"\t PRIX:"+objC.price+ "€\n\nEmpreinte : "+calculSubPrint(objC)+" grammes d'équivalent Carbone !\n");
console.log("Objet D"+"\t\t"+objD.name+"\t SKU:"+objD.sku+"\t PRIX:"+objD.price+ "€\n\nEmpreinte : "+calculSubPrint(objD)+" grammes d'équivalent Carbone !\n");