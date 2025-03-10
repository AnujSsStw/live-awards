CREATE TABLE IF NOT EXISTS "live-stream-awards_account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "live-stream-awards_contact" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"email" varchar(256),
	"message" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "live-stream-awards_post" (
	"id" serial PRIMARY KEY DEFAULT nextval('post_id_seq') NOT NULL,
	"name" varchar(256),
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "live-stream-awards_session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "live-stream-awards_session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "live-stream-awards_sponsor" (
	"id" serial PRIMARY KEY NOT NULL,
	"contact_name" varchar(256),
	"company_name" varchar(256),
	"email" varchar(256),
	"website" varchar(256),
	"comments" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "live-stream-awards_streamer" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" varchar(256),
	"email" varchar(256) NOT NULL,
	"category" text NOT NULL,
	"tiktok_url" varchar(256),
	"header_image_url" varchar(256),
	"bio" varchar(256),
	"country" text NOT NULL,
	"followers" varchar(256) NOT NULL,
	"stream_times" text NOT NULL,
	"has_agency" text NOT NULL,
	"votes" varchar(256) NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "live-stream-awards_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	CONSTRAINT "live-stream-awards_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "live-stream-awards_verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "live-stream-awards_account" ADD CONSTRAINT "live-stream-awards_account_user_id_live-stream-awards_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."live-stream-awards_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "live-stream-awards_post" ADD CONSTRAINT "live-stream-awards_post_created_by_live-stream-awards_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."live-stream-awards_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "live-stream-awards_session" ADD CONSTRAINT "live-stream-awards_session_user_id_live-stream-awards_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."live-stream-awards_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "live-stream-awards_streamer" ADD CONSTRAINT "live-stream-awards_streamer_user_id_live-stream-awards_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."live-stream-awards_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_by_idx" ON "live-stream-awards_post" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "live-stream-awards_post" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "live-stream-awards_streamer" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tiktok_url_idx" ON "live-stream-awards_streamer" USING btree ("tiktok_url");