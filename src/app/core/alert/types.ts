import { WlAlertType } from './enums';

export class WlAlert {
    public text: string;
    public type: WlAlertType;
    public duration?: number;
    public css?: string;
    public count?: number = 1;
    public timeoutId?: number;
}
