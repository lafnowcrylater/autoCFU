# CFU Counter: User Guide

Welcome to the *S. aureus* CFU Counter! This web application is designed to help microbiology researchers and lab technicians quickly and accurately count bacterial colonies from agar plate photographs.

## 📖 How to Use the Application

Using the CFU Counter is simple and requires only a few steps:

### 1. Upload a Plate Image
* On the left side of the screen, locate the **"Plate Image"** upload area.
* You can either **drag and drop** an image file directly into the dotted box, or **click** the box to browse your computer for a file.
* A preview of your selected image will appear. *(Supported formats: PNG, JPG, TIFF)*

### 2. Start the Analysis
* Once your image is selected and previewed, click the **"Start Colony Count"** button.
* The status bar at the bottom of the screen will change to *"Running colony detection…"*. Please wait a few moments while the AI processes your image.

### 3. View the Results
* When the analysis is complete, the right side of the screen (**"Results"**) will automatically update.
* **Annotated Output:** You will see your original image with bounding boxes drawn around every detected colony. This allows you to manually audit and verify the AI's accuracy.
* **CFU Count:** The total number of *S. aureus* Colony Forming Units detected will be displayed as a large number.
* **Statistics:** Additional details such as the model's confidence and the processing time will be shown below the count.

---

## 💻 Developer Information

This directory contains the React front-end application for the CFU Counter suite. 

**Built with:**
- React 18
- Vite
- TypeScript
- CSS Modules

### 🚀 Quick Start (For Developers)

To launch the local development server:

```bash
npm install
npm run dev
```

For full system instructions (including how to run the required FastAPI backend), please see the **[Main Project README](../README.md)** located in the parent directory.
