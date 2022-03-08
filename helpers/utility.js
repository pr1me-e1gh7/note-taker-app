// Definitions
const fs = require('fs');
const util = require('util');
const checkinFile = util.promisify(fs.readFile);

const addtoFile = (destination, content) =>
	fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
		err
			? console.error(err)
			: console.info(`\nContent added to ${destination}`)
	);

const scanandpush = (content, file) => {
	fs.readFile(file, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
		} else {
			const pData = JSON.parse(data);
			pData.push(content);
			addtoFile(file, pData);
		}	
	});	
};	

module.exports = { checkinFile, addtoFile, scanandpush };
