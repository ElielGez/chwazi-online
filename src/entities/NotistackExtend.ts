import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';
export type enqueueSnackbarType = (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey;
