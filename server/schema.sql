CREATE DATABASE IF NOT EXISTS smart_campus
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE smart_campus;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NULL,
    department VARCHAR(120) NULL,
    role ENUM('student', 'staff', 'admin') NOT NULL DEFAULT 'student',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS auth_tokens (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    token_hash CHAR(64) NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_auth_tokens_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_auth_tokens_expiry (expires_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS complaints (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    complaint_code VARCHAR(24) NULL UNIQUE,
    user_id BIGINT UNSIGNED NOT NULL,
    assigned_to BIGINT UNSIGNED NULL,
    title VARCHAR(180) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    location VARCHAR(180) NOT NULL,
    priority ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL DEFAULT 'Medium',
    status ENUM('Submitted', 'Under Review', 'In Progress', 'Resolved', 'Closed') NOT NULL DEFAULT 'Submitted',
    department VARCHAR(120) NOT NULL,
    image_path VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_complaints_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_complaints_assigned FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_complaints_user_created (user_id, created_at),
    INDEX idx_complaints_department_status (department, status),
    INDEX idx_complaints_priority (priority)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS complaint_history (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    complaint_id BIGINT UNSIGNED NOT NULL,
    status ENUM('Submitted', 'Under Review', 'In Progress', 'Resolved', 'Closed') NOT NULL,
    note VARCHAR(500) NOT NULL,
    updated_by BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_history_complaint FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE,
    CONSTRAINT fk_history_user FOREIGN KEY (updated_by) REFERENCES users(id),
    INDEX idx_history_complaint_created (complaint_id, created_at)
) ENGINE=InnoDB;