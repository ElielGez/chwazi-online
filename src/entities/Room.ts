import { IClient } from './Cilent';

export type IRoom = {
	id: string;
	client?: IClient;
};

export class Room {
	id: string;
	client?: IClient;
	constructor(id: string, client?: IClient) {
		this.id = id;
		this.client = client;
	}
}
