--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (165f042)
-- Dumped by pg_dump version 16.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: LeadStatus; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."LeadStatus" AS ENUM (
    'NEW',
    'QUALIFIED',
    'LOST',
    'WON'
);


ALTER TYPE public."LeadStatus" OWNER TO neondb_owner;

--
-- Name: POStatus; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."POStatus" AS ENUM (
    'OPEN',
    'RECEIVED',
    'CANCELLED'
);


ALTER TYPE public."POStatus" OWNER TO neondb_owner;

--
-- Name: StockDirection; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."StockDirection" AS ENUM (
    'IN',
    'OUT'
);


ALTER TYPE public."StockDirection" OWNER TO neondb_owner;

--
-- Name: WorkOrderStatus; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."WorkOrderStatus" AS ENUM (
    'NEW',
    'SCHEDULED',
    'DISPATCHED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED'
);


ALTER TYPE public."WorkOrderStatus" OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Account" OWNER TO neondb_owner;

--
-- Name: Bin; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Bin" (
    id text NOT NULL,
    "warehouseId" text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Bin" OWNER TO neondb_owner;

--
-- Name: ChatLog; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."ChatLog" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "userPrompt" text NOT NULL,
    "aiResponse" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ChatLog" OWNER TO neondb_owner;

--
-- Name: Contact; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Contact" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "accountId" text,
    name text NOT NULL,
    email text,
    phone text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Contact" OWNER TO neondb_owner;

--
-- Name: DispatchSlot; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."DispatchSlot" (
    id text NOT NULL,
    "workOrderId" text NOT NULL,
    "technicianId" text NOT NULL,
    "startTime" timestamp(3) without time zone NOT NULL,
    "endTime" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."DispatchSlot" OWNER TO neondb_owner;

--
-- Name: Forecast; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Forecast" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "skuId" text NOT NULL,
    "avgDailyDemand" double precision NOT NULL,
    "leadTimeDays" integer NOT NULL,
    "safetyFactor" double precision NOT NULL,
    "reorderPoint" double precision NOT NULL,
    "suggestedOrderQty" integer NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Forecast" OWNER TO neondb_owner;

--
-- Name: Lead; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Lead" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "accountId" text,
    "contactId" text,
    status public."LeadStatus" DEFAULT 'NEW'::public."LeadStatus" NOT NULL,
    source text,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Lead" OWNER TO neondb_owner;

--
-- Name: Note; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Note" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "contactId" text,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Note" OWNER TO neondb_owner;

--
-- Name: Permission; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Permission" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Permission" OWNER TO neondb_owner;

--
-- Name: PurchaseOrder; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."PurchaseOrder" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "skuId" text NOT NULL,
    quantity integer NOT NULL,
    status public."POStatus" DEFAULT 'OPEN'::public."POStatus" NOT NULL,
    "receivedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."PurchaseOrder" OWNER TO neondb_owner;

--
-- Name: Role; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Role" (
    id text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Role" OWNER TO neondb_owner;

--
-- Name: RolePermission; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."RolePermission" (
    id text NOT NULL,
    "roleId" text NOT NULL,
    "permissionId" text NOT NULL
);


ALTER TABLE public."RolePermission" OWNER TO neondb_owner;

--
-- Name: SKU; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."SKU" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    name text NOT NULL,
    description text,
    barcode text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."SKU" OWNER TO neondb_owner;

--
-- Name: StockLedger; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."StockLedger" (
    id text NOT NULL,
    "skuId" text NOT NULL,
    "binId" text NOT NULL,
    "tenantId" text NOT NULL,
    quantity integer NOT NULL,
    direction public."StockDirection" NOT NULL,
    note text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."StockLedger" OWNER TO neondb_owner;

--
-- Name: Tenant; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Tenant" (
    id text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Tenant" OWNER TO neondb_owner;

--
-- Name: User; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "tenantId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO neondb_owner;

--
-- Name: UserRole; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."UserRole" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "roleId" text NOT NULL,
    "assignedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."UserRole" OWNER TO neondb_owner;

--
-- Name: Warehouse; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Warehouse" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Warehouse" OWNER TO neondb_owner;

--
-- Name: WorkOrder; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."WorkOrder" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    title text NOT NULL,
    description text,
    status public."WorkOrderStatus" DEFAULT 'NEW'::public."WorkOrderStatus" NOT NULL,
    "technicianId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "scheduledAt" timestamp(3) without time zone,
    "dispatchedAt" timestamp(3) without time zone,
    "completedAt" timestamp(3) without time zone
);


ALTER TABLE public."WorkOrder" OWNER TO neondb_owner;

--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Account" (id, "tenantId", name, "createdAt") FROM stdin;
\.


--
-- Data for Name: Bin; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Bin" (id, "warehouseId", name, "createdAt") FROM stdin;
\.


--
-- Data for Name: ChatLog; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."ChatLog" (id, "tenantId", "userPrompt", "aiResponse", "createdAt") FROM stdin;
\.


--
-- Data for Name: Contact; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Contact" (id, "tenantId", "accountId", name, email, phone, "createdAt") FROM stdin;
\.


--
-- Data for Name: DispatchSlot; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."DispatchSlot" (id, "workOrderId", "technicianId", "startTime", "endTime") FROM stdin;
\.


--
-- Data for Name: Forecast; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Forecast" (id, "tenantId", "skuId", "avgDailyDemand", "leadTimeDays", "safetyFactor", "reorderPoint", "suggestedOrderQty", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Lead; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Lead" (id, "tenantId", "accountId", "contactId", status, source, description, "createdAt") FROM stdin;
\.


--
-- Data for Name: Note; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Note" (id, "tenantId", "contactId", content, "createdAt") FROM stdin;
\.


--
-- Data for Name: Permission; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Permission" (id, name, description, "createdAt") FROM stdin;
\.


--
-- Data for Name: PurchaseOrder; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."PurchaseOrder" (id, "tenantId", "skuId", quantity, status, "receivedAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Role" (id, name, "createdAt") FROM stdin;
\.


--
-- Data for Name: RolePermission; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."RolePermission" (id, "roleId", "permissionId") FROM stdin;
\.


--
-- Data for Name: SKU; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."SKU" (id, "tenantId", name, description, barcode, "createdAt") FROM stdin;
\.


--
-- Data for Name: StockLedger; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."StockLedger" (id, "skuId", "binId", "tenantId", quantity, direction, note, "createdAt") FROM stdin;
\.


--
-- Data for Name: Tenant; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Tenant" (id, name, "createdAt") FROM stdin;
89bd11ff-a02e-4934-8436-38e881a9c1af	Default Organization	2025-10-18 03:37:55.154
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."User" (id, email, password, "tenantId", "createdAt") FROM stdin;
d9708455-96e2-4604-94fc-286814598f4a	admin@demo.com	$2b$10$DfOOXDQdT6rzmwiUE4PGnu85TKfK9CEtYfjp2/1EC13Yka21VNtfO	89bd11ff-a02e-4934-8436-38e881a9c1af	2025-10-18 03:37:55.205
\.


--
-- Data for Name: UserRole; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."UserRole" (id, "userId", "roleId", "assignedAt") FROM stdin;
\.


--
-- Data for Name: Warehouse; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Warehouse" (id, "tenantId", name, "createdAt") FROM stdin;
\.


--
-- Data for Name: WorkOrder; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."WorkOrder" (id, "tenantId", title, description, status, "technicianId", "createdAt", "scheduledAt", "dispatchedAt", "completedAt") FROM stdin;
\.


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: Bin Bin_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Bin"
    ADD CONSTRAINT "Bin_pkey" PRIMARY KEY (id);


--
-- Name: ChatLog ChatLog_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ChatLog"
    ADD CONSTRAINT "ChatLog_pkey" PRIMARY KEY (id);


--
-- Name: Contact Contact_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Contact"
    ADD CONSTRAINT "Contact_pkey" PRIMARY KEY (id);


--
-- Name: DispatchSlot DispatchSlot_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."DispatchSlot"
    ADD CONSTRAINT "DispatchSlot_pkey" PRIMARY KEY (id);


--
-- Name: Forecast Forecast_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Forecast"
    ADD CONSTRAINT "Forecast_pkey" PRIMARY KEY (id);


--
-- Name: Lead Lead_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Lead"
    ADD CONSTRAINT "Lead_pkey" PRIMARY KEY (id);


--
-- Name: Note Note_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Note"
    ADD CONSTRAINT "Note_pkey" PRIMARY KEY (id);


--
-- Name: Permission Permission_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Permission"
    ADD CONSTRAINT "Permission_pkey" PRIMARY KEY (id);


--
-- Name: PurchaseOrder PurchaseOrder_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."PurchaseOrder"
    ADD CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY (id);


--
-- Name: RolePermission RolePermission_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."RolePermission"
    ADD CONSTRAINT "RolePermission_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: SKU SKU_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."SKU"
    ADD CONSTRAINT "SKU_pkey" PRIMARY KEY (id);


--
-- Name: StockLedger StockLedger_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."StockLedger"
    ADD CONSTRAINT "StockLedger_pkey" PRIMARY KEY (id);


--
-- Name: Tenant Tenant_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Tenant"
    ADD CONSTRAINT "Tenant_pkey" PRIMARY KEY (id);


--
-- Name: UserRole UserRole_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "UserRole_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Warehouse Warehouse_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Warehouse"
    ADD CONSTRAINT "Warehouse_pkey" PRIMARY KEY (id);


--
-- Name: WorkOrder WorkOrder_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."WorkOrder"
    ADD CONSTRAINT "WorkOrder_pkey" PRIMARY KEY (id);


--
-- Name: Forecast_tenantId_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "Forecast_tenantId_idx" ON public."Forecast" USING btree ("tenantId");


--
-- Name: Forecast_tenantId_skuId_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "Forecast_tenantId_skuId_key" ON public."Forecast" USING btree ("tenantId", "skuId");


--
-- Name: Permission_name_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "Permission_name_key" ON public."Permission" USING btree (name);


--
-- Name: PurchaseOrder_skuId_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "PurchaseOrder_skuId_idx" ON public."PurchaseOrder" USING btree ("skuId");


--
-- Name: PurchaseOrder_status_tenantId_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "PurchaseOrder_status_tenantId_idx" ON public."PurchaseOrder" USING btree (status, "tenantId");


--
-- Name: PurchaseOrder_tenantId_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "PurchaseOrder_tenantId_idx" ON public."PurchaseOrder" USING btree ("tenantId");


--
-- Name: Role_name_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "Role_name_key" ON public."Role" USING btree (name);


--
-- Name: SKU_barcode_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "SKU_barcode_key" ON public."SKU" USING btree (barcode);


--
-- Name: SKU_tenantId_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "SKU_tenantId_idx" ON public."SKU" USING btree ("tenantId");


--
-- Name: StockLedger_skuId_createdAt_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "StockLedger_skuId_createdAt_idx" ON public."StockLedger" USING btree ("skuId", "createdAt");


--
-- Name: StockLedger_tenantId_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "StockLedger_tenantId_idx" ON public."StockLedger" USING btree ("tenantId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Warehouse_tenantId_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "Warehouse_tenantId_idx" ON public."Warehouse" USING btree ("tenantId");


--
-- Name: Account Account_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Bin Bin_warehouseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Bin"
    ADD CONSTRAINT "Bin_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES public."Warehouse"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ChatLog ChatLog_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ChatLog"
    ADD CONSTRAINT "ChatLog_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Contact Contact_accountId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Contact"
    ADD CONSTRAINT "Contact_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES public."Account"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Contact Contact_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Contact"
    ADD CONSTRAINT "Contact_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DispatchSlot DispatchSlot_technicianId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."DispatchSlot"
    ADD CONSTRAINT "DispatchSlot_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DispatchSlot DispatchSlot_workOrderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."DispatchSlot"
    ADD CONSTRAINT "DispatchSlot_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES public."WorkOrder"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Forecast Forecast_skuId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Forecast"
    ADD CONSTRAINT "Forecast_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES public."SKU"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Forecast Forecast_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Forecast"
    ADD CONSTRAINT "Forecast_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Lead Lead_accountId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Lead"
    ADD CONSTRAINT "Lead_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES public."Account"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Lead Lead_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Lead"
    ADD CONSTRAINT "Lead_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES public."Contact"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Lead Lead_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Lead"
    ADD CONSTRAINT "Lead_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Note Note_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Note"
    ADD CONSTRAINT "Note_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES public."Contact"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Note Note_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Note"
    ADD CONSTRAINT "Note_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PurchaseOrder PurchaseOrder_skuId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."PurchaseOrder"
    ADD CONSTRAINT "PurchaseOrder_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES public."SKU"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PurchaseOrder PurchaseOrder_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."PurchaseOrder"
    ADD CONSTRAINT "PurchaseOrder_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RolePermission RolePermission_permissionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."RolePermission"
    ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES public."Permission"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RolePermission RolePermission_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."RolePermission"
    ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SKU SKU_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."SKU"
    ADD CONSTRAINT "SKU_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: StockLedger StockLedger_binId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."StockLedger"
    ADD CONSTRAINT "StockLedger_binId_fkey" FOREIGN KEY ("binId") REFERENCES public."Bin"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: StockLedger StockLedger_skuId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."StockLedger"
    ADD CONSTRAINT "StockLedger_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES public."SKU"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: StockLedger StockLedger_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."StockLedger"
    ADD CONSTRAINT "StockLedger_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserRole UserRole_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserRole UserRole_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Warehouse Warehouse_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Warehouse"
    ADD CONSTRAINT "Warehouse_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: WorkOrder WorkOrder_technicianId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."WorkOrder"
    ADD CONSTRAINT "WorkOrder_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: WorkOrder WorkOrder_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."WorkOrder"
    ADD CONSTRAINT "WorkOrder_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

