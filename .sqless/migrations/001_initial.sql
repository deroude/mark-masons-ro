CREATE TABLE "user" (
    "id" serial NOT NULL PRIMARY KEY,
    "email" varchar,
    "last_name" varchar,
    "first_name" varchar,
    "address" varchar,
    "correspondence_address" varchar,
    "phone_number" varchar,
    "secondary_phone_number" varchar,
    "birthdate" timestamptz,
    "profession" varchar,
    "workplace" varchar,
    "user_status" varchar,
    "rank" varchar,
    "order_privilege" varchar,
    "national_id" varchar,
    "national_id_details" varchar,
    "mmh" varchar,
    "mark_code" varchar,
    "mark_image" varchar
);

CREATE TABLE "audit" (
    "id" serial NOT NULL PRIMARY KEY,
    "agent" varchar,
    "category" varchar,
    "operation" varchar,
    "payload" varchar,
    "date" timestamptz
);

CREATE TABLE "article" (
    "id" serial NOT NULL PRIMARY KEY,
    "author" int REFERENCES "user"("id"),
    "category" varchar,
    "title" varchar,
    "slug" varchar,
    "text" varchar,
    "tags" varchar,
    "language" varchar,
    "audience" varchar,
    "publish_date" timestamptz
);

CREATE TABLE "lodge" (
    "id" serial NOT NULL PRIMARY KEY,
    "name" varchar,
    "status" varchar,
    "number" varchar,
    "orient" varchar,
    "location" varchar
);

CREATE TABLE "history" (
    "id" serial NOT NULL PRIMARY KEY,
    "user" int REFERENCES "user"("id"),
    "lodge" int REFERENCES "lodge"("id"),
    "event_type" varchar,
    "event" varchar,
    "comment" varchar,
    "start_date" timestamptz,
    "end_date" timestamptz
);

CREATE TABLE "event" (
    "id" serial NOT NULL PRIMARY KEY,
    "title" varchar,
    "text" varchar,
    "location" varchar,
    "start_date" timestamptz,
    "event_type" varchar,
    "status" varchar,
    "lodge" int REFERENCES "lodge"("id")
);

CREATE TABLE "attendance" (
    "id" serial NOT NULL PRIMARY KEY,
    "code" varchar,
    "user" int REFERENCES "user"("id"),
    "status" varchar,
    "status_confirmation" varchar,
    "comment" varchar
);

CREATE TABLE "template" (
    "id" serial NOT NULL PRIMARY KEY,
    "bundle" varchar,
    "name" varchar,
    "description" varchar,
    "content" varchar
);

CREATE TABLE "contribution" (
    "id" serial NOT NULL PRIMARY KEY,
    "description" varchar,
    "category" varchar,
    "destination" int REFERENCES "lodge"("id"),
    "value" decimal,
    "issue_date" timestamptz,
    "due_date" timestamptz
);

CREATE TABLE "payment" (
    "id" serial NOT NULL PRIMARY KEY,
    "user" int REFERENCES "user"("id"),
    "value" decimal,
    "payment_date" timestamptz,
    "status" varchar
);

CREATE TABLE "user_contribution" (
    "id" serial NOT NULL PRIMARY KEY,
    "user" int REFERENCES "user"("id"),
    "payment" int REFERENCES "payment"("id"),
    "contribution" int REFERENCES "contribution"("id"),
    "status" varchar
);

