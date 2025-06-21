
INSERT INTO user (
    id, password, role, userName, DOB, createdAt, email, firstName, gender,
    lastActiveAt, lastName, phoneNumber, profilePictureUrl, statusMessage
) VALUES
(UUID_TO_BIN(UUID()), 'pass123', 'user', 'user1', '2000-01-01', NOW(), 'user1@example.com', 'John', 'Male', NOW(), 'Doe', '1234567890', 'http://example.com/u1.jpg', 'Hey there! I am using ChatApp'),
(UUID_TO_BIN(UUID()), 'pass234', 'admin', 'admin1', '1995-02-02', NOW(), 'admin1@example.com', 'Alice', 'Female', NOW(), 'Smith', '9876543210', 'http://example.com/u2.jpg', 'Available'),
(UUID_TO_BIN(UUID()), 'pass345', 'user', 'user2', '1999-03-03', NOW(), 'user2@example.com', 'Bob', 'Male', NOW(), 'Brown', '1122334455', 'http://example.com/u3.jpg', 'Busy'),
(UUID_TO_BIN(UUID()), 'pass456', 'user', 'user3', '2001-04-04', NOW(), 'user3@example.com', 'Eve', 'Female', NOW(), 'White', '9988776655', 'http://example.com/u4.jpg', 'Offline'),
(UUID_TO_BIN(UUID()), 'pass567', 'user', 'user4', '1998-05-05', NOW(), 'user4@example.com', 'Mike', 'Male', NOW(), 'Grey', '7788990011', 'http://example.com/u5.jpg', 'At work'),
(UUID_TO_BIN(UUID()), 'pass678', 'admin', 'admin2', '1994-06-06', NOW(), 'admin2@example.com', 'Sophie', 'Female', NOW(), 'Adams', '2233445566', 'http://example.com/u6.jpg', 'In a meeting'),
(UUID_TO_BIN(UUID()), 'pass789', 'user', 'user5', '2002-07-07', NOW(), 'user5@example.com', 'Tom', 'Male', NOW(), 'Clark', '4455667788', 'http://example.com/u7.jpg', 'On vacation'),
(UUID_TO_BIN(UUID()), 'pass890', 'user', 'user6', '1997-08-08', NOW(), 'user6@example.com', 'Sara', 'Female', NOW(), 'Lopez', '6677889900', 'http://example.com/u8.jpg', 'Urgent calls only'),
(UUID_TO_BIN(UUID()), 'pass901', 'user', 'user7', '2000-09-09', NOW(), 'user7@example.com', 'Jake', 'Male', NOW(), 'Green', '5566778899', 'http://example.com/u9.jpg', 'Sleeping'),
(UUID_TO_BIN(UUID()), 'pass012', 'user', 'user8', '1996-10-10', NOW(), 'user8@example.com', 'Lily', 'Female', NOW(), 'Hall', '3344556677', 'http://example.com/u10.jpg', 'Studying'),

(UUID_TO_BIN(UUID()), 'pass113', 'user', 'user9', '2001-11-11', NOW(), 'user9@example.com', 'Adam', 'Male', NOW(), 'Moore', '1122112211', 'http://example.com/u11.jpg', 'Online'),
(UUID_TO_BIN(UUID()), 'pass223', 'user', 'user10', '2000-12-12', NOW(), 'user10@example.com', 'Emma', 'Female', NOW(), 'Taylor', '2211221122', 'http://example.com/u12.jpg', 'Watching movie'),
(UUID_TO_BIN(UUID()), 'pass333', 'user', 'user11', '1999-01-13', NOW(), 'user11@example.com', 'Chris', 'Male', NOW(), 'King', '3311331133', 'http://example.com/u13.jpg', 'Available'),
(UUID_TO_BIN(UUID()), 'pass443', 'user', 'user12', '1998-02-14', NOW(), 'user12@example.com', 'Olivia', 'Female', NOW(), 'Wright', '4411441144', 'http://example.com/u14.jpg', 'Offline'),
(UUID_TO_BIN(UUID()), 'pass553', 'admin', 'admin3', '1995-03-15', NOW(), 'admin3@example.com', 'Brian', 'Male', NOW(), 'Scott', '5511551155', 'http://example.com/u15.jpg', 'Do not disturb'),
(UUID_TO_BIN(UUID()), 'pass663', 'user', 'user13', '2003-04-16', NOW(), 'user13@example.com', 'Chloe', 'Female', NOW(), 'Evans', '6611661166', 'http://example.com/u16.jpg', 'Good morning'),
(UUID_TO_BIN(UUID()), 'pass773', 'user', 'user14', '1997-05-17', NOW(), 'user14@example.com', 'David', 'Male', NOW(), 'Turner', '7711771177', 'http://example.com/u17.jpg', 'Let’s connect'),
(UUID_TO_BIN(UUID()), 'pass883', 'user', 'user15', '1996-06-18', NOW(), 'user15@example.com', 'Isla', 'Female', NOW(), 'Parker', '8811881188', 'http://example.com/u18.jpg', 'Love this app!'),
(UUID_TO_BIN(UUID()), 'pass993', 'user', 'user16', '2002-07-19', NOW(), 'user16@example.com', 'Nathan', 'Male', NOW(), 'Cook', '9911991199', 'http://example.com/u19.jpg', 'Hello!'),
(UUID_TO_BIN(UUID()), 'pass103', 'user', 'user17', '1994-08-20', NOW(), 'user17@example.com', 'Sophia', 'Female', NOW(), 'Bailey', '1010101010', 'http://example.com/u20.jpg', 'Chat soon!');



SHOW COLUMNS FROM users;
SELECT * FROM user;
