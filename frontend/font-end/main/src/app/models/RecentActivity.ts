import { Server } from "../pages/server/server";


export interface RecentActivity {
  id: number;
  description: string;
  timestamp: Date;
  server: Server;
}
