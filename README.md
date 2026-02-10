# Open Tailor

**Body-Measurement-as-a-Service Platform**

Open Tailor is an online repository for storing and managing people's body measurements. This service makes it easy to order well-fitting clothes online by sharing your Open Tailor measurement details with clothing makers and sellers.

## Features

- 🎯 Store detailed body measurements
- 📏 Support for both metric (cm) and imperial (inch) units
- 🔍 Search and filter measurements
- ✅ Email validation and duplicate prevention
- 🔐 Comprehensive input validation
- 📊 RESTful API with pagination support
- 🏥 Health check endpoint

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/tony-eneh/open-tailor.git
cd open-tailor
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

4. Start MongoDB (if running locally):
```bash
# On Linux/Mac
sudo systemctl start mongodb
# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

5. Start the server:
```bash
npm start
# For development with auto-reload:
npm run dev
```

The server will start on `http://localhost:3000`

## API Documentation

### Base URL
```
http://localhost:3000/api/measurements
```

### Endpoints

#### 1. Health Check
```http
GET /health
```
Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Open Tailor API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### 2. Get All Measurements
```http
GET /api/measurements
```

**Query Parameters:**
- `filter` - Filter by fields (e.g., `?filter[gender]=male`)
- `skip` - Number of records to skip (pagination)
- `limit` - Maximum number of records to return
- `sort` - Sort field (e.g., `?sort=-createdAt`)
- `select` - Fields to include/exclude

**Example:**
```bash
curl http://localhost:3000/api/measurements?limit=10&sort=-createdAt
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 100,
    "limit": 10,
    "skip": 0,
    "count": 10
  },
  "message": "Measurements retrieved successfully"
}
```

#### 3. Get Measurement by ID
```http
GET /api/measurements/:id
```

**Example:**
```bash
curl http://localhost:3000/api/measurements/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "gender": "male",
    "unit": "cm",
    "measurements": {
      "shoulderToShoulderLength": 45,
      "bustCircle": 98,
      ...
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Measurement retrieved successfully"
}
```

#### 4. Create New Measurement
```http
POST /api/measurements
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "gender": "male",
  "unit": "cm",
  "measurements": {
    "shoulderToShoulderLength": 45,
    "bustCircle": 98,
    "waistCircle": 85,
    "hipCircle": 96,
    "heightLength": 175
  }
}
```

**Required Fields:**
- `email` (string, unique, valid email format)
- `gender` (string, one of: "male", "female", "other")

**Optional Fields:**
- `unit` (string, one of: "cm", "inch", default: "cm")
- `measurements` (object with various body measurements)

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    ...
  },
  "message": "Measurement created successfully"
}
```

#### 5. Update Measurement
```http
PUT /api/measurements/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "measurements": {
    "waistCircle": 87,
    "hipCircle": 98
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  },
  "message": "Measurement updated successfully"
}
```

#### 6. Delete Measurement
```http
DELETE /api/measurements/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  },
  "message": "Measurement deleted successfully"
}
```

#### 7. Load Demo Data
```http
POST /api/measurements/demo/load
```
Insert sample measurements for testing.

**Response:**
```json
{
  "success": true,
  "data": [...],
  "message": "Successfully inserted 3 demo measurements"
}
```

## Body Measurements Reference

The following measurements are supported (all optional except email and gender):

### Upper Body
- `shoulderToShoulderLength` - Distance across shoulders
- `highBustCircle` - Circumference above bust
- `bustCircle` - Circumference at fullest part of bust
- `bustTipsLength` - Distance between bust points
- `neckCircle` - Circumference of neck
- `bicepsCircle` - Circumference of upper arm

### Torso
- `waistCircle` - Circumference at natural waist
- `hipCircle` - Circumference at fullest part of hips
- `centerBackLength` - Length from neck to waist (back)
- `crossBackLength` - Width across shoulder blades

### Arms
- `shoulderToBicepsLength` - Length from shoulder to bicep
- `shoulderToElbowLength` - Length from shoulder to elbow
- `shoulderToWristLength` - Length from shoulder to wrist
- `wristCircle` - Circumference of wrist
- `elbowCircle` - Circumference of elbow

### Legs
- `waistToAnkleLength` - Length from waist to ankle
- `waistToKneeLength` - Length from waist to knee
- `inseamLength` - Inside leg length
- `outseamLength` - Outside leg length
- `thighCircle` - Circumference of thigh
- `kneeCircle` - Circumference of knee
- `calfCircle` - Circumference of calf
- `ankleCircle` - Circumference of ankle

### Other
- `heightLength` - Total height
- `headCircle` - Circumference of head

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

**Common Status Codes:**
- `200` - OK
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `409` - Conflict (duplicate email)
- `500` - Internal Server Error

## Development

### Scripts

```bash
# Start server
npm start

# Start with auto-reload (development)
npm run dev

# Run tests
npm test

# Load demo data
npm run load-demo-data
```

### Project Structure

```
open-tailor/
├── api/
│   ├── controller.mjs    # Request handlers
│   ├── index.mjs         # API routes
│   └── model.mjs         # Mongoose schema
├── test/
│   └── demo-data.mjs     # Sample data
├── .env                  # Environment variables (not in repo)
├── .env.example          # Environment template
├── database.mjs          # Database connection
├── index.mjs             # Application entry point
└── package.json          # Dependencies and scripts
```

## Testing with cURL

```bash
# Health check
curl http://localhost:3000/health

# Get all measurements
curl http://localhost:3000/api/measurements

# Create measurement
curl -X POST http://localhost:3000/api/measurements \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "gender": "male",
    "unit": "cm",
    "measurements": {
      "heightLength": 180,
      "waistCircle": 85,
      "bustCircle": 100
    }
  }'

# Update measurement (replace ID)
curl -X PUT http://localhost:3000/api/measurements/YOUR_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "measurements": {
      "waistCircle": 87
    }
  }'

# Delete measurement (replace ID)
curl -X DELETE http://localhost:3000/api/measurements/YOUR_ID_HERE

# Load demo data
curl -X POST http://localhost:3000/api/measurements/demo/load
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Author

Created by the Open Tailor team

## Repository

https://github.com/tony-eneh/open-tailor
