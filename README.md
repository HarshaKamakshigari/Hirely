
# 📌 Hirely - Recruitment Management System

Hirely is a modern **job recruitment and document management system** designed for **HR teams**, **Admins**, and **Candidates**. It provides a secure and efficient way to manage job applications, upload important documents, and handle recruitment processes seamlessly.

---

## ✨ Features

✅ **Role-Based Dashboards**  
- **Admin**: View all job applications and manage users.  
- **HR**: Upload and manage recruitment documents.  
- **Candidate**: Apply for jobs and upload resumes.  

✅ **Document Upload & Management**  
- HR can upload official documents (policies, job descriptions).  
- Candidates can upload resumes (PDF/DOC/DOCX).  

✅ **Secure File Storage**  
- Files are stored on **Supabase Storage** with public or signed URLs.  

✅ **Authentication & Authorization**  
- Role-based authentication using **React Context + Cookies**.  

✅ **Responsive UI**  
- Built with **Next.js 14** and **TailwindCSS** for a modern and clean design.  

---

## 🛡 Security Highlights

- **Restricted File Types**: Only `.pdf`, `.doc`, `.docx` allowed.  
- **Role-Based Access Control**: Users only access their allowed pages.  
- **Input Validation**: Prevent XSS and malicious inputs.  
- **Future Enhancements**: Signed URLs for sensitive files, audit logs.  

---

## 🛠 Tech Stack

- **Frontend**: Next.js (App Router), React, TailwindCSS  
- **Backend & Storage**: Supabase (Authentication + Storage)  
- **State Management**: React Context API  
- **Deployment**: Vercel  



## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/HarshaKamakshigari/hirely.git
   cd hirely
  ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a file **`.env.local`** in the root folder and add:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.



## ✅ Future Improvements

* Implement **audit logs** for file uploads and logins.
* Add **real-time notifications** for new applications.
* Use **signed URLs** for better file security.
* Add **two-factor authentication (2FA)** for admins.

---

## 🛡 Security Policy

We follow **OWASP best practices** to mitigate common attacks like:

* **SQL Injection** → Handled by Supabase ORM
* **XSS** → React auto-escapes + input validation
* **Broken Authentication** → Role-based checks + cookies
* **Insecure File Upload** → File type & size restrictions

See full details in **[SECURITY.md](./SECURITY.md)**.

---

## 📜 License

This project is licensed under the **MIT License**.

