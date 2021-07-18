-- delete from "Assets";
-- delete from "Subreddits";
-- alter SEQUENCE "Subreddits_id_seq" restart;
-- alter SEQUENCE "Assets_id_seq" restart;

-- select id from "Subreddits";

delete from "Assets" where "SubredditId" = 5;
delete from "Subreddits" where "Name"='koreannsfw';