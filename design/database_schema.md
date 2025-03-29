# Database Schema for AI Paper Grader

## Users Collection
```json
{
  "_id": "ObjectId",
  "email": "String (unique)",
  "password": "String (hashed)",
  "name": "String",
  "created_at": "Date",
  "last_login": "Date",
  "subscription": {
    "plan": "String (free, starter, pro)",
    "start_date": "Date",
    "end_date": "Date",
    "status": "String (active, expired, canceled)",
    "payment_method": "Object (optional)",
    "auto_renew": "Boolean"
  },
  "usage": {
    "files_graded_count": "Number",
    "files_graded_this_month": "Number",
    "last_graded_at": "Date"
  },
  "settings": {
    "default_grading_criteria": "ObjectId (reference to GradingCriteria)",
    "notification_preferences": "Object",
    "ui_preferences": "Object"
  },
  "api_keys": {
    "gemini": "String (encrypted, optional)",
    "other_providers": "Object (encrypted, optional)"
  }
}
```

## Documents Collection
```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId (reference to Users)",
  "title": "String",
  "description": "String (optional)",
  "file_path": "String",
  "file_name": "String",
  "file_type": "String",
  "file_size": "Number",
  "page_count": "Number (optional)",
  "created_at": "Date",
  "status": "String (pending, processing, graded, failed)",
  "batch_id": "ObjectId (optional, reference to Batches)",
  "metadata": {
    "author": "String (optional)",
    "subject": "String (optional)",
    "class": "String (optional)",
    "submission_date": "Date (optional)",
    "custom_fields": "Object (optional)"
  },
  "extracted_text": "String (optional)",
  "processing_error": "String (optional)"
}
```

## Grades Collection
```json
{
  "_id": "ObjectId",
  "document_id": "ObjectId (reference to Documents)",
  "user_id": "ObjectId (reference to Users)",
  "criteria_id": "ObjectId (reference to GradingCriteria)",
  "answer_key_ids": ["ObjectId (reference to Documents)"],
  "created_at": "Date",
  "updated_at": "Date",
  "graded_by": "String (ai or user_id if manually adjusted)",
  "overall_score": "Number",
  "letter_grade": "String (optional)",
  "percentage": "Number",
  "sections": [
    {
      "name": "String",
      "weight": "Number",
      "score": "Number",
      "max_score": "Number",
      "comments": "String"
    }
  ],
  "feedback": "String",
  "annotations": [
    {
      "page": "Number",
      "position": "Object",
      "text": "String",
      "type": "String"
    }
  ],
  "ai_confidence": "Number (0-1)",
  "version": "Number"
}
```

## GradingCriteria Collection
```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId (reference to Users)",
  "name": "String",
  "description": "String",
  "created_at": "Date",
  "updated_at": "Date",
  "is_template": "Boolean",
  "sections": [
    {
      "name": "String",
      "description": "String",
      "weight": "Number",
      "max_score": "Number",
      "rubric_items": [
        {
          "description": "String",
          "points": "Number"
        }
      ]
    }
  ],
  "grading_scale": [
    {
      "min_percentage": "Number",
      "max_percentage": "Number",
      "letter_grade": "String"
    }
  ]
}
```

## Batches Collection
```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId (reference to Users)",
  "name": "String",
  "description": "String (optional)",
  "created_at": "Date",
  "status": "String (pending, processing, completed, failed)",
  "document_count": "Number",
  "completed_count": "Number",
  "failed_count": "Number",
  "criteria_id": "ObjectId (reference to GradingCriteria)",
  "answer_key_ids": ["ObjectId (reference to Documents)"],
  "processing_started_at": "Date (optional)",
  "processing_completed_at": "Date (optional)",
  "error": "String (optional)"
}
```

## ActivityLog Collection
```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId (reference to Users)",
  "action": "String",
  "entity_type": "String (document, batch, criteria, etc.)",
  "entity_id": "ObjectId",
  "details": "Object",
  "timestamp": "Date",
  "ip_address": "String (optional)"
}
```

## Relationships

1. **Users to Documents**: One-to-many (a user can have multiple documents)
2. **Users to GradingCriteria**: One-to-many (a user can have multiple grading criteria)
3. **Users to Batches**: One-to-many (a user can have multiple batches)
4. **Documents to Grades**: One-to-one (a document has one grade)
5. **GradingCriteria to Grades**: One-to-many (a criteria can be used for multiple grades)
6. **Batches to Documents**: One-to-many (a batch contains multiple documents)
7. **Users to ActivityLog**: One-to-many (a user has multiple activity logs)

## Indexes

1. Users Collection:
   - email (unique)

2. Documents Collection:
   - user_id
   - batch_id
   - status
   - created_at

3. Grades Collection:
   - document_id
   - user_id
   - criteria_id

4. GradingCriteria Collection:
   - user_id
   - is_template

5. Batches Collection:
   - user_id
   - status
   - created_at

6. ActivityLog Collection:
   - user_id
   - timestamp
   - entity_id
