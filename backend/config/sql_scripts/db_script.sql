#DROP DATABASE PayrollAdvDB;

CREATE DATABASE PayrollAdvDB;

USE PayrollAdvDB;

CREATE TABLE UserCredential_tb (
	user_credential_id int AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
	email_address VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(80) NOT NULL
);

CREATE TABLE UserDetail_tb (
	user_detail_id int AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
	first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    sex VARCHAR(10),
    contact_number VARCHAR(50)
);

CREATE TABLE Admin_tb (
	admin_id int AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    
    user_detail_id int NOT NULL UNIQUE,
    user_credential_id int NOT NULL UNIQUE,
    FOREIGN KEY (user_detail_id) REFERENCES UserDetail_tb(user_detail_id),
    FOREIGN KEY (user_credential_id) REFERENCES UserCredential_tb(user_credential_id)
);

CREATE TABLE Leave_tb (
    leave_id int AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    vacation_leave int NOT NULL,
    sick_leave int NOT NULL,
    emergency_leave int NOT NULL
);

CREATE TABLE Contribution_tb (
    contribution_id int AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    sss VARCHAR(20) NOT NULL,
    pagibig VARCHAR(20) NOT NULL,
    philhealth VARCHAR(20) NOT NULL
);

CREATE TABLE Employee_tb (
    employee_id int AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    gross_salary decimal(15,4) NOT NULL,
    employee_position VARCHAR(50) NOT NULL,
    probation_end_date DATE NOT NULL,
    employee_status VARCHAR(50) NOT NULL,
    
    user_detail_id int NOT NULL UNIQUE,
    user_credential_id int NOT NULL UNIQUE,
    leave_id int NOT NULL UNIQUE,
    contribution_id int NOT NULL UNIQUE,
    FOREIGN KEY (user_detail_id) REFERENCES UserDetail_tb(user_detail_id),
    FOREIGN KEY (user_credential_id) REFERENCES UserCredential_tb(user_credential_id),
    FOREIGN KEY (leave_id) REFERENCES Leave_tb(leave_id),
    FOREIGN KEY (contribution_id) REFERENCES Contribution_tb(contribution_id)
);

CREATE TABLE LeaveRequests_tb (
	leave_request_id int AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
	start_date Date NOT NULL,
    end_date Date NOT NULL,
    leave_reason varchar(200) NOT NULL,
    leave_type varchar(50) NOT NULL,
    leave_status varchar(50) NOT NULL,
    
    employee_id int NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES Employee_tb(employee_id)
);

CREATE TABLE Timesheet_tb (
    timesheet_id int AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    timesheet_csv_string VARCHAR(300) NOT NULL,
    start_date Date NOT NULL,
    end_date Date NOT NULL,
    worked_hours int NOT NULL,
    payroll_generated bool NOT NULL,
    upload_date Date NOT NULL,
    
    employee_id int NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES Employee_tb(employee_id)
);

CREATE TABLE Tax_tb (
    tax_id int AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    tax_type VARCHAR(50) NOT NULL,
    tax_name VARCHAR(50) NOT NULL,
    tax_description VARCHAR(50) NOT NULL
);

CREATE TABLE Payroll_tb (
    payroll_id int AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    payroll_description VARCHAR(100) NOT NULL,
    creation_date DATE NOT NULL,
    gross_salary decimal(15,4) NOT NULL,
    
    timesheet_id int,
    employee_id int NOT NULL,
    FOREIGN KEY (timesheet_id) REFERENCES Timesheet_tb(timesheet_id),
    FOREIGN KEY (employee_id) REFERENCES Employee_tb(employee_id)
);