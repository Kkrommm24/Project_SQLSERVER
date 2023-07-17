# Database Lab (IT3290) Final Project - IT-E6 K66 - HUST

# Clinic Booking Website 
As the demand for healthcare services is on the rise, finding clinics with top-notch medical facilities and excellent patient care has become increasingly important. To address this need, we have developed this website, dedicated to providing customers with accurate information about our clinic's services and how to easily schedule appointments online. Our goal is to offer a seamless and pleasant experience, ensuring that you can access the healthcare you need with convenience and confidence.

## Overview

### Database Schema
![Qlypk drawio](https://github.com/Kkrommm24/Project_SQLSERVER/assets/90143646/6a300da9-f78a-48ea-a2ab-bdc9e812362f)

### Technical Specifications
* Frontend: EJS, CSS, ReactJs, Redux
* Backend: NodeJs, ExpressJs, Sequelize
* Database: MySQL

### Features
- Authentication: Login, Signup, Change Password, Booking
- Authorization:
  - Restrict users, admin, guides what they can do
- Admin:
  - An admin account is provided
  - Create, read, update, delete patients' and doctors' informations
- Patient:
  - Update patient's information
  - Review bookings and histories
  - Booking validation
  - Cancel a booking
- Doctor:
  - Update doctor's information
  - Review bookings and histories
  - Booking validation
  - Confirm, Done or Cancel a booking
## Setup
## Nodejs & MySQL install
To run this project, you will need to have your machine installed Nodejs ( We recommend using 18.16.0 since we're using it on this project) and MySQL.

### Fetch repo from github
Press the Fork button (top right the page) to save copy of this project on your account.

Download the repository files (project) from the download section or clone this project to your local machine by typing in the bash the following command:



```properties
git clone https://github.com/Kkrommm24/Project_SQLSERVER.git
```
## Install dependencies
After download project's files, you need to use ``` npm run install ``` to install neccessary files.



Deploy database models and base data in server with ``` npm run database ```
Default password for every users including admin is "123456". You can change it if you want

(Note that you will need a database called 'qlpk' to use this)

After that, you can just use ```npm run dev``` to start the project and enjoy it
## Collaborators
<table>
    <tbody>
        <tr>
            <th align="center">Member name</th>
            <th align="center">Student ID</th>
        </tr>
        <tr>
            <td>Hoàng Đức Gia Hưng</td>
            <td align="center"> 20215062&nbsp;&nbsp;&nbsp;</td>
        </tr>
        <tr>
            <td>Lê Duy Nghiêm</td>
            <td align="center"> 20215102&nbsp;&nbsp;&nbsp;</td>
        </tr>
        <tr>
            <td>Nguyễn Phúc Mạnh</td>
            <td align="center"> 20215087&nbsp;&nbsp;&nbsp;</td>
        </tr>
        <tr>
            <td>Nguyễn Hữu Duy</td>
            <td align="center"> 20215015&nbsp;&nbsp;&nbsp;</td>
        </tr>
    </tbody>
</table>
