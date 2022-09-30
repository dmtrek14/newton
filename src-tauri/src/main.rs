#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
//using
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, App};
use envmnt::{ExpandOptions, ExpansionType};
use diesel_migrations::{embed_migrations, EmbedMigrations};
use std::error::Error;
use std::{error, string, sync::Mutex};
// extern crate font_loader as fontsl;
// use fontsl::system_fonts;


#[macro_use]
extern crate diesel;
#[macro_use] 
extern crate diesel_migrations;
embed_migrations!("./migrations/");

use diesel::prelude::*;
pub mod schema;
pub mod db;

//commands
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_env() -> Vec<(String, String)> {
    let all_vars = envmnt::vars(); // returned as Vec<(String, String)>

    all_vars
}

// #[tauri::command]
// fn get_fonts() -> Vec<String> {
//     let sysfonts = system_fonts::query_all();
//     let mut my_fonts: Vec<String> = Vec::new();
//     for s in &sysfonts {
//         my_fonts.push(s.to_string())
//     }
//     my_fonts
// }

#[tauri::command]
fn fonts_list(state: tauri::State<AppState>) -> String {
  let con = state.conn.lock().unwrap();
  db::fonts_list(&con)
}

#[tauri::command]
fn font_create(title: String, state: tauri::State<AppState>) -> String{
  let con = state.conn.lock().unwrap();
  db::font_create(&con, &title).to_string()
}

struct AppState {
  count: Mutex<i64>,
  conn: Mutex<SqliteConnection>,
}


//main
fn main() {
    let conn = db::establish_connection();
    let state = AppState {
        count: Default::default(),
        conn: Mutex::new(db::establish_connection()),
    };
 
    //menu
    // here `"quit".to_string()` defines the menu item id, and the second parameter is the menu item label.
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
    let menu = Menu::new()
        .add_submenu(submenu);

    diesel_migrations::run_pending_migrations(&conn).expect("Error migrating");
    
    tauri::Builder::default()
        .manage(state)    
        .menu(menu)
        .on_menu_event(|event| {
            match event.menu_item_id() {
              "quit" => {
                std::process::exit(0);
              }
              "close" => {
                event.window().close().unwrap();
              }
              _ => {}
            }
          })
        .invoke_handler(tauri::generate_handler![
          greet, 
          get_env,
          font_create,
          fonts_list
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
