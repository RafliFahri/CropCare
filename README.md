# CROP-CARE
Crop diseases seriously threaten global food security by reducing yields and financially burdening farmers. Machine learning, particularly deep learning, offers a breakthrough in disease detection by accurately identifying patterns in plant images. This technology empowers farmers to act swiftly, enhancing crop yields and supporting global food security efforts.

---

## Directory Structure

```
project-root/
├── model                  # Contains AI models
│   ├── cassava            # Cassava model for classification or prediction
│   └── maize              # Maize model for classification or prediction
├── public                 # Stores public assets accessible by the browser
│   └── assets             # Images, videos, and other static files
└── src                    # Main source code of the application
    ├── app                # Contains application-specific configurations
    │   ├── api            # API routes for the application
    │   └── fonts          # Fonts used in the application
    ├── components         # User interface components
    │   └── ui             # Common UI components
    └── lib                # Logic and functions for handling models and predictions
```

---

## Getting Started

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Crop-Care
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
 4. Run Application:
    ```bash
      npm run build & npm run start
    ```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Tech Stack
- **Framework**: Node.js with NextJS
- **Cloud Platform**: Google Cloud Platform (GCP)
  - Cloud Run for Web Hosting
  - Cloud Storage for Model storage and dataset
---
