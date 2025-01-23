mod effects;
pub mod image_processor;
use wasm_bindgen::prelude::*;
mod cache;
pub mod file_tools;

#[wasm_bindgen]
pub fn hello_js_from_wasm() {
    // Use `console_log` to log to the browser's console
    web_sys::console::log_1(&"HELLOO@@@".into());
}

#[macro_export]
macro_rules! log_error_to_console {
    ($($arg:tt)*) => {
        web_sys::console::error_1(&format!($($arg)*).into())
    };
}

#[macro_export]
macro_rules! log_to_console {
    ($($arg:tt)*) => {
        web_sys::console::log_1(&format!($($arg)*).into())
    };
}
