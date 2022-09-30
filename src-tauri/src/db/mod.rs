extern crate dotenv;

pub mod models;
use crate::schema::*;
use diesel::prelude::*;
use dotenv::dotenv;
use models::{NewDevFont, DevFont};
use std::env;

pub fn establish_connection() -> SqliteConnection { // creates a new connection to the DB and returns reference
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

//fonts CRUD
pub fn font_create(conn: &SqliteConnection, title: &str) -> String {
    let new_font = NewDevFont { title };
    let font = diesel::insert_into(dev_fonts::table)
        .values(&new_font)
        .execute(conn)
        .expect("Error saving new font");
    let font_json =serde_json::to_string(&font).unwrap();
    font_json
}

pub fn fonts_list(conn: &SqliteConnection) -> String {
    let all_fonts = dev_fonts::dsl::dev_fonts
        .load::<DevFont>(conn)
        .expect("Expect loading fonts");
    let serialized = serde_json::to_string(&all_fonts).unwrap();
    serialized
}

pub fn font_update(conn: &SqliteConnection, qid: i32) -> String {
    use dev_fonts::dsl::{installed, id};
    let f = dev_fonts::dsl::dev_fonts
        .filter(id.eq(&qid))
        .first::<DevFont>(conn)
        .expect("Font not found");
    diesel::update(dev_fonts::dsl::dev_fonts.filter(id.eq(&qid)))
        //.set(title.eq(&t.title))
        .set(installed.eq(!f.installed))
        .execute(conn)
        .expect("Error updating");
    let updated = dev_fonts::dsl::dev_fonts
        .filter(id.eq(&qid))
        .first::<DevFont>(conn)
        .expect("Font not found");
    serde_json::to_string(&updated).unwrap()
}

pub fn font_delete(conn: &SqliteConnection, qid: i32) {
    use dev_fonts::dsl::{ id};
    let f = dev_fonts::dsl::dev_fonts.filter(id.eq(&qid));
    diesel::delete(f)
        .execute(conn)
        .expect("Error deleting font");
}