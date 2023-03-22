import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from "./state/useUser";
import { ProfileProvider } from "./state/useProfile";
import { CourseProvider } from "./state/useCourse";
import { StatusProvider } from "./state/useStatus";
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider storageKey="user-id" teacherKey="checkTeacher">
      <ProfileProvider>
        <CourseProvider>
          <StatusProvider>
          <App />
          </StatusProvider>
        </CourseProvider>
      </ProfileProvider>
    </UserProvider>
  </React.StrictMode>
);


