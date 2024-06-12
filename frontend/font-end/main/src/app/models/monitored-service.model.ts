export interface MonitoredService {
  id: number;
  name: string;
  url: string;
  status: string;
  description: string;
  createdAt: Date;
  server: Server;
}

export interface Server {
  id: number;
}
