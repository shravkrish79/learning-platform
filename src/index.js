import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from "./state/useUser";
import { ProfileProvider } from "./state/useProfile";
import { CourseProvider } from "./state/useCourse";
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider storageKey="user-id">
      <ProfileProvider>
        <CourseProvider>
          <App />
        </CourseProvider>
      </ProfileProvider>
    </UserProvider>
  </React.StrictMode>
);


