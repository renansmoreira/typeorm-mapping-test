CREATE TABLE communities (
    id UUID DEFAULT GEN_RANDOM_UUID() NOT NULL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    updated_at TIMESTAMP DEFAULT now() NOT NULL,
    deleted_at TIMESTAMP,
    slug VARCHAR NOT NULL,
    tag_id UUID,
    name VARCHAR NOT NULL,
    is_private BOOLEAN DEFAULT false NOT NULL,
    description VARCHAR
);

COMMENT ON COLUMN communities.slug IS 'A readable identifier for the community';

COMMENT ON COLUMN communities.tag_id IS 'A link to the dedicated community tag';

COMMENT ON COLUMN communities.name IS 'The name of the community';

COMMENT ON COLUMN communities.is_private IS 'Whether the community is public';

COMMENT ON COLUMN communities.description IS 'The description for the community';

CREATE UNIQUE INDEX index_communities_on_slug ON communities (slug);

CREATE UNIQUE INDEX index_communities_on_tag_id ON communities (tag_id);

CREATE TABLE tags (
    id UUID DEFAULT GEN_RANDOM_UUID() NOT NULL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    updated_at TIMESTAMP DEFAULT now() NOT NULL,
    deleted_at TIMESTAMP,
    name VARCHAR NOT NULL,
    slug VARCHAR NOT NULL,
    community_id UUID
);

COMMENT ON COLUMN tags.slug IS 'Readable URL encoded ID';

COMMENT ON COLUMN tags.community_id IS 'Id of the community associated with the tag';

ALTER TABLE
    "tags"
ADD
    CONSTRAINT "fkey_tags_on_community_id" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE
    "communities"
ADD
    CONSTRAINT "fkey_communities_on_tag_id" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;