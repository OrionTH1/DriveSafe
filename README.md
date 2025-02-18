<a id="readme-top"></a>


<div align="center">
  <br />
    <a href="https://youtu.be/lEflo_sc82g?feature=shared" target="_blank">
      <img src="https://github.com/user-attachments/assets/0e2f6590-11f8-43d0-bc57-5e9e8aa028bc" alt="Project Banner">
    </a>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheusemanoeldev/)
[![X](https://img.shields.io/badge/X-000?style=for-the-badge&logo=x)](https://x.com/OrionTH1)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://portfólio.com)
<br/>
<a href="https://github.com/github_username/repo_name"><strong>View Demo »</strong></a>  
</div>

<br/>
<br/>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Tech Stack</a></li>
      </ul>
      <ul>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#contributing">Contributing</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## <a name="about-the-project">📢 About The Project</a>


**DriveSafe** is a modern and responsive web application designed for a fictional car insurance company. It provides users with a seamless experience for requesting insurance services, managing their profiles, and tracking the status of their applications. The platform also includes an **admin panel** for **efficient** service management, request approvals, and **real-time notifications**.

Built with a focus on **scalability**, **security**, and **user experience**, DriveSafe leverages cutting-edge technologies to ensure **smooth performance**, **data integrity**, and **responsiveness** across all devices.


## <a name="built-with">⚙️ Tech Stack</a>

- Next.js
- Appwrite
- Typescript
- TailwindCSS
- ShadCN
- Mailsender
- Sentry

## <a name="features">🔋 Features</a>

👉 **Authentication**: Users can sign in or create your profile with email OTP confirmation.

👉 **Request services**: Users can request services with the Car insurance.

👉 **Manage requests on Admin Side**: Administrators can efficiently view and handle all requested services.

👉 **Approve/Deny Requests from Admin Side**: Admins can Approve or Deny user's requested services.

👉 **Send Email on request Confirmation**: Users receive Email notifications when the request status change.

👉 **Complete Responsiveness**: The application works seamlessly on all device types and screen sizes.

👉 **File Upload Using Appwrite Storage**: Users can upload and store files securely within the app using Appwrite storage services.

👉 **Manage and Track Application Performance Using Sentry**: The application uses Sentry to monitor and track its performance and detect any errors.

and many more, including code architecture and reusability

## <a name="contributing">🤸 Contributing</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**
  
```bash
git clone https://github.com/adrianhajdin/healthcare.git
cd healthcare
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
#APPWRITE
PROJECT_ID=67a79d350037617bba14
API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZraXZqd3luYnlzc3hmenB3aXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NzYyNTcsImV4cCI6MjA1NTM1MjI1N30.A27o_kVFIDbkes00pwCzMRTIvlJTltaCDnyri4kc4Qk
DATABASE_ID=67a79dbf000f660fbdd2
SERVICES_COLLECTION_ID=67b0f8930005e6e0b9a7
USERS_COLLECTION_ID=67af9bf0000123eba8dc
NEXT_PUBLIC_BUCKET_ID=67a79fa000365fcb63b5
NEXT_PUBLIC_ENDPOINT=https://vkivjwynbyssxfzpwizd.supabase.co

#MAILERSEND
EMAIL_API_KEY=mlsn.5ce3cedb180d2d1bff43d2fedef2e370141f3274780ca2db29017f6a7f8a9c71

SENTRY_AUTH_TOKEN=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
SESSION_SECRET="oK/HMB4rpvM0UZ6hSg12Oh7g+7tbvC1WD3UDivZupAA="
```

Replace the placeholder values with your actual Appwrite and Mailersend credentials. You can obtain these credentials by signing up on the [Appwrite website](https://appwrite.io/) and [Mailersend Website](https://www.mailersend.com/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.


<!-- ROADMAP -->
## Roadmap

- [ ] Create the plan and benefits.


## Contact

Matheus Emanoel - [Linkedin](https://www.linkedin.com/in/matheusemanoeldev/) - [Twitter](https://twitter.com/OrionTH1) <br/>
Email: buss.matheusemanoel@gmail.com<br/>
Project Link: [Demo](https://questmind-project.vercel.app/) - [Github](https://github.com/OrionTH1/study-with-exercices/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
