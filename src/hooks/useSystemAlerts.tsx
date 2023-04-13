import React, { ReactNode } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { enqueueSnackbarType } from '../entities/NotistackExtend';

const alerts: { [key: string]: number } = { comingSoonOnline: 3 };
const alertsVisual: { [key: string]: { text: ReactNode; icon?: ReactNode; color?: string } } = {
	comingSoonOnline: {
		icon: <LanguageIcon />,
		text: 'Coming Soon! Online version - remote arbitrary selection and grouping',
		color: 'yellow',
	},
};
const useSystemAlerts = (enqueueSnackbar: enqueueSnackbarType) => {
	const storageValue = localStorage.getItem('alerts');
	let storageAlerts: { [key: string]: number };
	if (storageValue) storageAlerts = JSON.parse(storageValue);
	else {
		storageAlerts = alerts;
		localStorage.setItem('alerts', JSON.stringify(alerts));
	}
	const showAlerts = () => {
		const newAlerts = Object.fromEntries(
			Object.entries(alerts).map(([key]) => {
				const visual = alertsVisual[key];
				const value = storageAlerts.hasOwnProperty(key) ? storageAlerts[key] : alerts[key];
				if (value > 0 && visual) {
					enqueueSnackbar(
						<div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
							{alertsVisual[key].icon} {alertsVisual[key].text}
						</div>,
						{ className: alertsVisual[key].color || '' },
					);
					return [key, value - 1];
				}
				return [key, 0];
			}),
		);
		localStorage.setItem('alerts', JSON.stringify(newAlerts));
	};
	return { showAlerts };
};
export default useSystemAlerts;
