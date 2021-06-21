delete from "Assets";
delete from "Subreddits";
alter SEQUENCE "Subreddits_id_seq" restart;
alter SEQUENCE "Assets_id_seq" restart;