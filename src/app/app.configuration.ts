import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
@Injectable()
export class Configuration {
    public Server = 'https://api.funnelspin.com/v1';
    public ApiUrl = '/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;

	public headersfor = {
          headers: new Headers({
            // 'Client-Service': 'TXprd056STBjemswTXpseU5ETnZOMjV2Y3pSeE1UUnpjbkp2YmpKeGNETT0',
            // 'Auth-Key': 'Y1RjM01XOXlNREp2T1c1dk1ERndOVEE0TlhOdU56ZHhOMjh6TmpJMmNHOD0',
			'Access-Control-Allow-Methods': 'GET, POST, DELETE',
			'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Auth-Key, Client-Service'
          })
        }
}

