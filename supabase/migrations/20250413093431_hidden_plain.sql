/*
  # Allow NULL values for post images

  1. Changes
    - Modify `posts` table to allow NULL values for the `image` column
    
  2. Reasoning
    - Not all posts require an image
    - Making the column nullable provides more flexibility for users
    - Prevents errors when creating posts without images
*/

ALTER TABLE posts 
ALTER COLUMN image DROP NOT NULL;