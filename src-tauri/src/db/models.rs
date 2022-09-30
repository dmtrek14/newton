use crate::schema::dev_fonts;
use serde::{Serialize, Deserialize};

#[derive(Queryable, Serialize, Debug)] 
pub struct DevFont {
    pub id: i32,
    pub title: String,
    pub installed: bool,
}

#[derive(Insertable, Serialize, Debug, Clone)]
#[table_name = "dev_fonts"]
pub struct NewDevFont<'a> {  
    pub title: &'a str
}