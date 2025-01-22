use image::RgbaImage;
use std::collections::VecDeque;

pub struct ImageCache {
    history: VecDeque<RgbaImage>,
    current_step: u32,
    max_size: usize,
}

impl ImageCache {
    pub fn new(size: usize) -> Self {
        Self {
            history: VecDeque::with_capacity(size),
            current_step: 0,
            max_size: size,
        }
    }

    pub fn store(&mut self, image: &RgbaImage) {
        // If the history is full, pop the oldest image
        if self.history.len() == self.max_size {
            self.history.pop_front();
        }

        // Add the new image to history and update the current step
        self.history.push_back(image.clone());
        self.current_step = self.history.len() as u32; // Update the current step
    }

    pub fn undo(&mut self) -> Option<RgbaImage> {
        if self.current_step == 0 {
            return None; // No steps to undo
        }

        self.current_step -= 1;
        self.history.get(self.current_step as usize).cloned() // Return the image at the current step
    }

    pub fn redo(&mut self) -> Option<RgbaImage> {
        if self.current_step >= self.history.len() as u32 {
            return None; // No steps to redo
        }

        self.current_step += 1;
        self.history.get((self.current_step as usize) - 1).cloned() // Return the next image in history
    }
}
