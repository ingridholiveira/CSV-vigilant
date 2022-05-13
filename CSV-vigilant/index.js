const { parse } = require('fast-csv');
const fs = require('fs');
//const { delimiter } = require('path') ainda não adicionado;

const stream = fs.createReadStream("input1.csv");

const streamCsv = parse(
//{    headers: true - não funciona pois da erro duplicate groups}
)
.on('error', error => console.error(error))
.on('data', data => console.log(data));

stream.pipe(streamCsv);

//parse({
//    headers: true - não funciona pois da erro duplicate groups
//})
//.on('error', error => console.error(error))
//.on('data', row => console.log(row))
//.on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

//stream.write('header1,header2\n');
//stream.write('col1,col2');
//stream.end();