pub mod compress;

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
use wasm_bindgen_struct::wasm_bindgen_struct;

#[wasm_bindgen_struct]
pub struct FileDataFolder {
    pub name: String,
    pub path: String,
    pub data: Vec<u8>,
}

#[wasm_bindgen_struct]
pub struct FileData {
    pub name: String,
    pub data: Vec<u8>,
}

#[wasm_bindgen]
pub enum FileType {
    File,
    Folder,
}
