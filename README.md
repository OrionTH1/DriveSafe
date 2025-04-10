<a id="readme-top"></a>


<div align="center">
  <br />
  <img src="https://github.com/user-attachments/assets/0e2f6590-11f8-43d0-bc57-5e9e8aa028bc" alt="Project Banner">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheusemanoeldev/)
[![X](https://img.shields.io/badge/X-000?style=for-the-badge&logo=x)](https://x.com/OrionTH1)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://portfólio.com)
<br/>
<a href="https://drive-safe-car.vercel.app/"><strong>View Demo »</strong></a>  
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
PROJECT_ID=
API_KEY=
DATABASE_ID=
SERVICES_COLLECTION_ID=
USERS_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=
NEXT_PUBLIC_ENDPOINT=

#MAILERSEND
EMAIL_API_KEY=

SENTRY_AUTH_TOKEN=
SESSION_SECRET=
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
Project Link: [Demo](https://drive-safe-car.vercel.app/) - [Github](https://github.com/OrionTH1/DriveSafe)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
