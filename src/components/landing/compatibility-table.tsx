import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SectionHeader } from "./section-header";

const rows = [
  { api: "Auth (GoTrue)", status: "supported", notes: "Signup, login, token refresh, user management" },
  { api: "REST (PostgREST)", status: "supported", notes: "Full CRUD, filtering, ordering, pagination, RPC" },
  { api: "Database", status: "supported", notes: "Direct PostgreSQL access, connection pooling" },
  { api: "Dashboard", status: "supported", notes: "Full project management UI" },
  { api: "Database Import", status: "supported", notes: "pg_dump custom & SQL format" },
  { api: "S3 Backups", status: "supported", notes: "Scheduled backups with per-project selection, works with AWS S3, MinIO, R2" },
  { api: "Admin Panel", status: "supported", notes: "User management, invite system, registration control (open/invite/disabled)" },
  { api: "Row Level Security", status: "supported", notes: "Standard PostgreSQL RLS policies" },
  { api: "Storage", status: "planned", notes: "File/object storage" },
  { api: "Realtime", status: "planned", notes: "WebSocket subscriptions" },
  { api: "Edge Functions", status: "planned", notes: "Serverless functions" },
];

export function CompatibilityTable() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <SectionHeader
        id="compatibility"
        title="API Compatibility"
        subtitle="Works with @supabase/supabase-js out of the box."
      />
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">API</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.api}>
                <TableCell className="font-medium">{r.api}</TableCell>
                <TableCell>
                  <Badge
                    variant={r.status === "supported" ? "default" : "outline"}
                  >
                    {r.status === "supported" ? "Supported" : "Planned"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {r.notes}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
