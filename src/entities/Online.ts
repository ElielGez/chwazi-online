import { ICircleType } from './Circle';
import { IClient } from './Cilent';
import { io, Socket } from 'socket.io-client';
import { enqueueSnackbarType } from './NotistackExtend';
import { IRoom } from './Room';
import { VariantType } from 'notistack';
import { updateGameProps } from '../components/Game/types';
import { getSocketLink } from '../utils/helpers';

export class Online {
	socket: Socket;
	room: IRoom;
	enqueueSnackbar?: enqueueSnackbarType;
	constructor(room: IRoom, isHost: boolean, enqueueSnackbar?: enqueueSnackbarType) {
		this.room = room;
		// this.socket = io('http://localhost:3001');
		this.socket = io(getSocketLink());
		this.enqueueSnackbar = enqueueSnackbar;
		if (isHost) {
			this.socket.emit('create-room', room.id, room.client, { mode: 'fingers', number: 1 });
		} else
			this.socket.on('room-ended', () => {
				this.socket.disconnect();
				this.snackbar('Room closed by the host', 'info');
				setTimeout(() => {
					window.location.href = window.location.origin;
				}, 2000);
			});
		this.socket.on('user-joined', clientName => {
			this.snackbar(`${clientName} joined`);
		});
	}
	join(roomId: string, client: IClient) {
		this.socket.emit('join-room', roomId, client);
	}
	disconnect() {
		if (this.room.client) this.socket.emit('room-ended', this.room.id, this.room.client.id);
		this.socket.disconnect();
	}
	snackbar(message: string, variant: VariantType = 'default') {
		if (this.enqueueSnackbar) this.enqueueSnackbar(message, { variant, autoHideDuration: 1000 });
	}
	emitGameChanged({ mode, number }: updateGameProps) {
		if (this.room.client) this.socket.emit('game-changed', this.room.id, this.room.client.id, { mode, number });
	}
	emitPointerDown(circles: ICircleType[]) {
		this.socket.emit('pointer-down', this.room.id, circles);
	}
	emitPointerUp(circles: ICircleType[]) {
		this.socket.emit('pointer-up', this.room.id, circles);
	}
	emitPointerMove(circles: ICircleType[]) {
		this.socket.emit('pointer-move', this.room.id, circles);
	}
	emitWinners(circles: ICircleType[]) {
		this.socket.emit('winners', this.room.id, circles);
	}
}
