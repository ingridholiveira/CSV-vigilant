const {
    parse
} = require('fast-csv');
const fs = require('fs');
//const { delimiter } = require('path'); //ainda não adicionado;

const stream = fs.createReadStream("input1.csv");
let dataCsv = [];
const streamCsv = parse()
    .on('error', error => console.error(error))
    .on('data', data => {
        dataCsv.push(data);
        //console.log(data);
    })
    .on('end', () => {
        promiseWriteJson(dataCsv)
    });

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
            case 'invisible':
                objJson.invisible = row[j];
                break;
            case 'see_all':
                objJson.see_all = row[j];
                break;
            case 'group':
                objJson.groups.push(row[j]);
                break;
            default: {
                let stringAdrress = header[j].split(" ");
                objJson.addresses.push({
                    "type": stringAdrress.shift(),
                    "tags": stringAdrress,
                    "address": formatValues(row[j])
                });
            }
            break;
        }
    }
    return objJson;
}

const formatValues = (data) => {

    return formatedData;
}
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


stream.pipe(streamCsv);
console.log(dataCsv);

//parse({
//    headers: true - não funciona pois da erro duplicate groups
//})
//.on('error', error => console.error(error))
//.on('data', row => console.log(row))
//.on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

//stream.write('header1,header2\n');
//stream.write('col1,col2');
//stream.end();