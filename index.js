#!/usr/bin/env node
import axios from 'axios'
import chalk from 'chalk';
import countryList from "country-list";
import figlet from 'figlet';

const country = process.argv[2];
const countryCode = countryList.getCode(country);
const yearInput = process.argv[3];

function year(yearInput){
    let givenYear;

    if (yearInput){
        givenYear = process.argv[3]
    }
    else{
        givenYear =new Date().getFullYear();
    }

    return givenYear
}


async function getCountryCodeAsync(yearInput, countryCode) {
    return await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${yearInput}/${countryCode}`);
}

const response = getCountryCodeAsync(yearInput, countryCode);

figlet('Holidates !', 
function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});

response.then(datas => {

    for (let d of datas.data) {
        console.log(chalk.green(`${d.date}: ${d.name} - aka - ${d.localName}`));
    }
});