ALTER TABLE "chats" ADD COLUMN "shape_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_shape_id_unique" UNIQUE("shape_id");