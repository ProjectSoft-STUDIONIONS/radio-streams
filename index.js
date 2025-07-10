const fs = require("node:fs");

async function run() {
	let json = fs.readFileSync('./radio-export.json').toString();
	json = JSON.parse(json);
	const stations = json.stations;
	let txt = `# Radio Streams

| Station Name | Strem link | Icon | Image |
|--------------|------------|------|-------|
`;
	for(let item in stations){
		let id = parseInt(item),
			station = stations[id];
		let base64Favicon = station.favicon.replace(/^data:image\/png;base64,/, "");
		let base64Image = station.image.replace(/^data:image\/png;base64,/, "");
		fs.writeFileSync(`./src/favicon-${id}.png`, base64Favicon, 'base64');
		fs.writeFileSync(`./src/image-${id}.png`, base64Image, 'base64');
		txt += `| ${station.name} | ${station.stream} | ![favicon-${id}.png](./src/favicon-${id}.png) | ![image-${id}.png](./src/image-${id}.png) |
`;
		console.log(id);
	}
	txt += `
`;
	fs.writeFileSync('./README.md', txt);
}

run().then(() => {
	console.log('DONE!');
})