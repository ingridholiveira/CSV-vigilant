const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const { parse } = require('fast-csv');
const fs = require('fs');
const validator = require("node-email-validation");

const stream = fs.createReadStream("input.csv");
let dataCsv = [];

//Lendo um CSV.
const streamCsv = parse()
    .on('error', error => console.error(error))
    .on('data', data => {
        dataCsv.push(data);
        //console.log(data);
    })
    .on('end', () => {
        promiseWriteJson(dataCsv)
    });

//Converte e formata os dados fornecidos em uma linha do CSV em JSON.
const convertDataJson = (row, header) => {
    let objJson = {
        "fullname": '',
        "eid": '',
        "groups": [],
        "addresses": [],
        "invisible": '',
        "see_all": ''
    };
    for (var j = 0; j < header.length; j++) {
        switch (header[j]) {
            case 'fullname':
                objJson.fullname = row[j];
                break;
            case 'eid':
                objJson.eid = row[j];
                break;
            case 'invisible':{
                if (row[j] == 'yes' || row[j] == "1" || row[j] == 'true')objJson.invisible = true;
                else objJson.invisible = false;
                break;
            }
            case 'see_all':{
                if (row[j] == 'yes' || row[j] == "1" || row[j] == 'true')objJson.see_all = true;
                else objJson.see_all = false; 
                break;
            }
            case 'group':{
                if (formatValuesGroups(row[j]) != null ){
                    objJson.groups=objJson.groups.concat(formatValuesGroups(row[j]));
                }
                break;
            }
            default: {
                const value = formatValues(row[j]);
                if (value != null ){
                    let stringAdrress = header[j].split(" ");
                    let stringType = stringAdrress.shift();
                    if (Array.isArray(value)){
                        for(let i=0; i<value.length; i++){
                            objJson.addresses.push({
                            "type": stringType,
                            "tags": stringAdrress,
                            "address": value[i]
                        });                         
                        }
                    } else {
                            objJson.addresses.push({
                            "type": stringType,
                            "tags": stringAdrress,
                            "address": value
                        });
                    }
                }
            }
            break;
        }
    }
    return objJson;
}


//Valida e formata os dados fornecidos de email e telefone.
const formatValues = (data) => {
    try {
        const number = phoneUtil.parseAndKeepRawInput(data, 'BR');
        if (phoneUtil.isValidNumber(number)) {
            return number.getCountryCode() + '' + number.getNationalNumber();
        }
    } catch(e){}
    try{
        const email = ((data.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)));
        let returnEmail = [];
        for (let i =0; i < email.length; i++){
            if (validator.is_email_valid(email[i])){
                returnEmail.push(email[i]);
            }
        }        
        if (returnEmail.length>0 && returnEmail[0] != "") return returnEmail;
    } catch(e){}
    return null;
}


//Formata e devolve um array com os grupos.
const formatValuesGroups = (data) => {
	let stringGroups = data.split(/[,.\/\-]+/);
	if(stringGroups[0] != '') return stringGroups;
	return null;
}

//Executada na conclusão de leitura de um CSV.
//Responsável pela conversão de um CSV em JSON e identificar objeto existente para atualização ou inserção.
const promiseWriteJson = (dataCsv) => {
    let header = dataCsv[0];
    let listObjJson = [];
    for (let i = 1; i < dataCsv.length; i++) {
        const objJson = convertDataJson(dataCsv[i], header);
        const index = listObjJson.map(function (x) {
            return x["eid"];
        }).indexOf(objJson.eid);
        if (index == -1) {
            listObjJson.push(objJson);
        } else {
            //console.log(listObjJson[index]);
            listObjJson[index].groups = listObjJson[index].groups.concat(objJson.groups);
            listObjJson[index].addresses = listObjJson[index].addresses.concat(objJson.addresses);
        }
    }

    fs.writeFile('output.json', JSON.stringify(listObjJson, null, 2), err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

//Start do processo
stream.pipe(streamCsv);
console.log(dataCsv);
