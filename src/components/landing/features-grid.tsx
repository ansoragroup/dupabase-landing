"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Puzzle,
  Server,
  Key,
  Database,
  LayoutDashboard,
  Users,
  HardDrive,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";

/* ── animation variants ─────────────────────────────────────────── */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ── chip ────────────────────────────────────────────────────────── */

function Chip({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-mono leading-5",
        accent
          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          : "bg-white/[0.04] text-muted-foreground border border-white/[0.08]"
      )}
    >
      {children}
    </span>
  );
}

/* ── bento card ──────────────────────────────────────────────────── */

function BentoCard({
  icon: Icon,
  title,
  description,
  glow,
  className,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  glow?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "relative group rounded-xl border backdrop-blur-sm p-6 transition-all overflow-hidden flex flex-col",
        glow
          ? "border-emerald-500/25 bg-emerald-500/[0.03] shadow-[0_0_40px_-12px_rgba(16,185,129,0.15)]"
          : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]",
        className
      )}
    >
      {glow && (
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-emerald-500/[0.04] to-transparent" />
      )}

      <div className="relative flex flex-col flex-1">
        <div
          className={cn(
            "mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            glow
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-white/[0.06] text-muted-foreground"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-[15px] mb-1.5">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        {children && <div className="mt-4 flex-1 flex flex-col justify-end">{children}</div>}
      </div>
    </motion.div>
  );
}

/* ── main component ──────────────────────────────────────────────── */

export function FeaturesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <SectionHeader
        id="features"
        title="Everything You Need"
        subtitle="Zero bloat. Full Supabase compatibility. Production-ready from day one."
      />

      <div ref={ref} className="relative">
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />
        </div>

        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {/* ── 1. Drop-in — hero card ────────────────────────────── */}
          <BentoCard
            icon={Puzzle}
            title="Drop-in Compatible"
            description="Works with @supabase/supabase-js out of the box. Change one URL — everything works."
            glow
            className="sm:col-span-2 lg:row-span-2"
          >
            <div className="rounded-lg border border-emerald-500/10 bg-black/20 p-3.5 font-mono text-[12px] leading-relaxed">
              <div className="text-muted-foreground/40 mb-1.5">
                {"// just change the URL"}
              </div>
              <div>
                <span className="text-emerald-400">const</span>{" "}
                <span className="text-foreground">supabase</span>{" "}
                <span className="text-muted-foreground">=</span>{" "}
                <span className="text-emerald-400">createClient</span>
                <span className="text-muted-foreground">(</span>
              </div>
              <div className="pl-4">
                <span className="text-amber-300/80">
                  &apos;https://your-server.com&apos;
                </span>
                <span className="text-muted-foreground">,</span>
              </div>
              <div className="pl-4">
                <span className="text-amber-300/80">
                  &apos;your-anon-key&apos;
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">)</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <Chip accent>.auth.signUp()</Chip>
              <Chip accent>.from().select()</Chip>
              <Chip accent>.rpc()</Chip>
            </div>
          </BentoCard>

          {/* ── 2. Single Binary ───────────────────────────────────── */}
          <BentoCard
            icon={Server}
            title="Single Binary"
            description="One Go binary + PostgreSQL. No microservice sprawl."
            className="sm:col-span-2"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05] p-3 text-center">
                <p className="text-2xl font-bold text-emerald-400">1</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                  binary
                </p>
              </div>
              <span className="text-muted-foreground/30 text-xs font-mono">
                vs
              </span>
              <div className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center opacity-40">
                <p className="text-2xl font-bold line-through decoration-white/20">
                  15+
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                  containers
                </p>
              </div>
            </div>
          </BentoCard>

          {/* ── 3. Auth ────────────────────────────────────────────── */}
          <BentoCard
            icon={Key}
            title="Auth Built-in"
            description="GoTrue-compatible auth with JWT, signup, login, and token refresh."
          >
            <div className="flex flex-wrap gap-1.5">
              <Chip>JWT</Chip>
              <Chip>Signup</Chip>
              <Chip>Token rotation</Chip>
            </div>
          </BentoCard>

          {/* ── 4. REST API ────────────────────────────────────────── */}
          <BentoCard
            icon={Database}
            title="REST API"
            description="PostgREST-compatible CRUD, filtering, ordering, and RPC."
          >
            <div className="flex flex-wrap gap-1.5">
              <Chip accent>SELECT</Chip>
              <Chip accent>INSERT</Chip>
              <Chip accent>RPC</Chip>
            </div>
          </BentoCard>

          {/* ── 5. Dashboard ───────────────────────────────────────── */}
          <BentoCard
            icon={LayoutDashboard}
            title="Full Dashboard"
            description="Modern UI for managing projects, API keys, backups, and settings."
            className="sm:col-span-2"
          >
            <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3 flex gap-2.5">
              {/* sidebar */}
              <div className="w-10 shrink-0 space-y-1.5">
                <div className="h-2 w-full rounded bg-emerald-500/20" />
                <div className="h-2 w-full rounded bg-white/[0.06]" />
                <div className="h-2 w-full rounded bg-white/[0.04]" />
                <div className="h-2 w-3/4 rounded bg-white/[0.04]" />
              </div>
              {/* main */}
              <div className="flex-1 space-y-2">
                <div className="flex gap-1.5">
                  <div className="h-8 flex-1 rounded bg-emerald-500/10 border border-emerald-500/15" />
                  <div className="h-8 flex-1 rounded bg-white/[0.04] border border-white/[0.06]" />
                  <div className="h-8 flex-1 rounded bg-white/[0.04] border border-white/[0.06]" />
                </div>
                <div className="h-2 w-2/3 rounded bg-white/[0.06]" />
                <div className="h-2 w-1/2 rounded bg-white/[0.04]" />
              </div>
            </div>
          </BentoCard>

          {/* ── 6. Multi-Tenant ────────────────────────────────────── */}
          <BentoCard
            icon={Users}
            title="Multi-Tenant"
            description="Isolated databases and API keys per project."
          >
            <div className="flex flex-wrap gap-1.5">
              <Chip accent>project_a</Chip>
              <Chip>project_b</Chip>
              <Chip>project_...</Chip>
            </div>
          </BentoCard>

          {/* ── 7. S3 Backups ──────────────────────────────────────── */}
          <BentoCard
            icon={HardDrive}
            title="S3 Backups"
            description="Scheduled backups to any S3-compatible storage."
          >
            <div className="flex flex-wrap gap-1.5">
              <Chip>AWS</Chip>
              <Chip>MinIO</Chip>
              <Chip>R2</Chip>
            </div>
          </BentoCard>
        </motion.div>
      </div>
    </section>
  );
}
