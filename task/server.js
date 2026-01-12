const config = require('./config');
const chalk = require('chalk');
const ip = require('ip');
const net = require('net');
const { exec, execSync } = require('child_process');
const compose = require('docker-compose');
const bs = require('browser-sync');
const path = require('path');

class Server {
	constructor(){
		this.ip = ip.address();
		this.port = null;
		this.build();
	}

	async build(){
		if( config.server.php == 'true' ) {
			let envOption = {
				PATH: process.env.PATH
			};
			let composeOptions = ( config.server.mysql == 'true' )? [['-f', 'docker-compose.yml'], ['-f', 'docker-mysql.yml']] : '';
			try {
				await this.getPort();
				console.log(chalk.cyan('Docker Starting...'));
				envOption.COMPOSE_PROJECT_NAME = config.name;
				envOption.NAME = config.name;
				envOption.WEB_PORT = this.port.apache;
				envOption.PMA_PORT = this.port.pma;
				envOption = {...envOption, ...process.env};
				await compose.v2.upAll({
					log: true,
					env: envOption,
					composeOptions: composeOptions
				});
				console.log(`Proxy: ${chalk.magenta(`http://${this.ip}:${this.port.apache}`)}`);
				if( config.server.mysql == 'true' ) {
					console.log(`PMA: ${chalk.magenta(`http://${this.ip}:${this.port.pma}`)}`);
				}
				console.log(chalk.bold.greenBright('Docker Start!!'));
			} catch(error) {
				console.log(chalk.bold.red('Docker Error!!'));
				console.log(error);
			}
			process.on('SIGINT', async (e)=>{
				console.log("\n"+chalk.cyan('Docker Stopping...'));
				try {
					await compose.v2.down({
						log: true,
						env: envOption,
						composeOptions: composeOptions
					});
					console.log(chalk.bold.greenBright('Docker Stop!!'));
				} catch(error) {
					console.log(chalk.bold.red('Docker Error!!'));
				}
				process.exit();
			});
		}
		this.browseSync();
	}

	getPort(){
		let port = 3000;
		const socket = new net.Socket();
		const server = new net.Server();
		return new Promise((resolve, reject)=>{
			const loop = ()=>{
				if( port >= 4000 ){
					reject();
					return;
				}
				socket.connect(port, this.ip, ()=>{
					socket.destroy();
					port = port + 10;
					loop();
				});
			};
			socket.on('error', (e)=>{
				try {
					server.listen(port, this.ip);
				} catch(e) {
					loop();
				};
			});
			server.on('listening', ()=>{
				server.close();
			});
			server.on('close', ()=>{
				this.port = {
					bs: port,
					ui: port+1,
					apache: port+2,
					pma: port+3
				};
				resolve();
			});
			loop();
		});
	}

	browseSync(){
		const baseDir = `${config.public}/`;
		const options = {
			files: [
				`${config.public}/**/*`,
				`!${config.public}/**/wp-*.php`,
				`!${config.public}/**/wp-admin/**/*`,
				`!${config.public}/**/wp-includes/**/*`,
				`!${config.public}/**/wp-content/!(themes)/**/*`,
				`!${config.public}/**/uploads/**/*`
			],
			port: '3000',
			open: 'external',
			ghostMode: false
		};
		if( this.ip && this.port ) {
			options.port = this.port.bs;
			options.ui = {
				port: this.port.ui
			};
			options.proxy = `${this.ip}:${this.port.apache}`;
			options.baseDir = baseDir;
		} else {
			options.server = {
				baseDir: baseDir
			};
		}
		bs(options);
	}
}

module.exports = new Server();
