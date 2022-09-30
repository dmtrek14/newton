// @generated automatically by Diesel CLI.

diesel::table! {
    dev_fonts (id) {
        id -> Integer,
        title -> Text,
        installed -> Bool,
    }
}
