use std::io::{Cursor, Write};
use wasm_bindgen::prelude::*;
use zip::write::SimpleFileOptions;
use zip::CompressionMethod;
use zip::ZipWriter;

use super::{FileData, FileDataFolder};

#[wasm_bindgen]
pub fn compress_folder_to_zip(js_files: Vec<FileDataFolder>) -> Vec<u8> {
    let mut zip_data: Vec<u8> = Vec::new();

    let cursor = Cursor::new(&mut zip_data);

    let mut zip_writer = ZipWriter::new(cursor);

    let options = SimpleFileOptions::default()
        .compression_method(CompressionMethod::Deflated)
        .unix_permissions(0o755);

    for file in js_files {
        if let Err(e) = zip_writer.start_file(&file.name(), options) {
            wasm_bindgen::throw_str(&format!("Failed to start file: {}", e));
        }

        if let Err(e) = zip_writer.write_all(&file.data()) {
            wasm_bindgen::throw_str(&format!("Failed to write file data: {}", e));
        }
    }

    if let Err(e) = zip_writer.finish() {
        wasm_bindgen::throw_str(&format!("Failed to finalize ZIP: {}", e));
    }

    zip_data
}

#[wasm_bindgen]
pub fn compress_file_to_zip(js_file: FileData) -> Vec<u8> {
    let mut zip_data: Vec<u8> = Vec::new();

    let cursor = Cursor::new(&mut zip_data);

    let mut zip_writer = ZipWriter::new(cursor);

    let options = SimpleFileOptions::default()
        .compression_method(CompressionMethod::Deflated)
        .unix_permissions(0o755);

    if let Err(e) = zip_writer.start_file(&js_file.name(), options) {
        wasm_bindgen::throw_str(&format!("Failed to start file: {}", e));
    }

    if let Err(e) = zip_writer.write_all(&js_file.data()) {
        wasm_bindgen::throw_str(&format!("Failed to write file data: {}", e));
    }

    if let Err(e) = zip_writer.finish() {
        wasm_bindgen::throw_str(&format!("Failed to finalize ZIP: {}", e));
    }

    zip_data
}
