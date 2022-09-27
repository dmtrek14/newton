#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
//using
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};
use envmnt::{ExpandOptions, ExpansionType};
extern crate font_loader as fonts;
use fonts::system_fonts;

//commands
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_env() -> Vec<String> {
    let all_vars = envmnt::vars(); // returned as Vec<(String, String)>
    let mut my_vars: Vec<String> = Vec::new();

    for (key, value) in all_vars {
       my_vars.push(value)
    }
    my_vars
}

#[tauri::command]
fn get_fonts() -> Vec<String> {
    let sysfonts = system_fonts::query_all();
    let mut my_fonts: Vec<String> = Vec::new();
    for s in &sysfonts {
        my_fonts.push(s.to_string())
    }
    my_fonts
}

//main
fn main() {
    //menu
    // here `"quit".to_string()` defines the menu item id, and the second parameter is the menu item label.
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
    let menu = Menu::new()
        // .add_native_item(MenuItem::Copy)
        // .add_item(CustomMenuItem::new("hide", "Hide"))
        .add_submenu(submenu);
    tauri::Builder::default()
        .menu(menu)
        .invoke_handler(tauri::generate_handler![greet, get_env, get_fonts])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
