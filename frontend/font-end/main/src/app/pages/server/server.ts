import { Status } from "src/app/enum/status.enum";

export interface Server {
    id: number;
    ipAddress: string;
    name: string;
    memory: string;
    type: string;
    imageUrl: string;
    domain : string;
    status: Status;
    cpuUsage: number;
    memoryUsage: number;
    networkBandwidth: number;
    pingCount?: number;  // Facultatif, car a une valeur par défaut
    monitorable?: boolean;  // Facultatif, car a une valeur par défaut
}
