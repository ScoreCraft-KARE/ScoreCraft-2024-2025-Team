-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin credentials (replace this in production with proper password hashing)
INSERT INTO admin_users (username, password)
VALUES ('scorecraft', 'karecse@2024!')
ON CONFLICT (username) DO UPDATE 
SET password = EXCLUDED.password;
