const csv = require('csv-parser');
const fs = require('fs');

// Delete existing canada.txt and usa.txt files
async function deleteExistingFile(filePath){
    try{
        if(fs.existsSync(filePath)){
            await fs.unlinkSync(filePath);
            console.log(`${filePath} file deleted successfully.`);
        } else{
            console.log(`There is no ${filePath} file.`);
        }
    } catch(error){
        console.error(error);
    }
}

async function countryFile(country, csvFile){
    try{
        // Creating a text file for the given country name with specific first line 
        await fs.writeFileSync(`${country}.txt`, "country,year,population", (err) => {
            if(err) console.error(err);
        })

        // Creating a variable for country coz country names in CSV file are differnt like United States and not usa
        let destCountry = '';
        if(country === 'canada') destCountry = "Canada";
        if(country === 'usa') destCountry = "United States";

        await fs.createReadStream(csvFile)
            .pipe(csv())
            .on('data', (row) => {
                if(row['country'] === destCountry){
                fs.appendFile(`${country}.txt`, `\n${row['country']},${row['year']},${row['population']}`, (err) => {
                    if (err) console.log(err);
                });
            }
        });

        console.log(`${country} file created successfully`);
    } catch{
        console.error(error);
    }
}

(async function () {
    await deleteExistingFile('canada.txt');
    await deleteExistingFile('usa.txt');
    await countryFile('canada', 'input_countries.csv');
    await countryFile('usa', 'input_countries.csv')
})()