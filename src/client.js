import {baseUrl as url} from './api/config'
const publicVapidKey = "BIEe_i9qmlcHtFWn9g_b7G3EleBN5udY_FvEZjTiB0KJ1GmK9-Ua_MsfoFe7rhZZhQOz_cqdoPOfyLguPHKT_KU";

const registerServiceWorker = async () => {
  try {
    const registration = await navigator.serviceWorker.register('./service-worker.js', {
      scope: '/'
    });
    // console.log("Service worker registered");

    await navigator.serviceWorker.ready; // Wait for the service worker to become active
    // console.log("Service worker is active");

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicVapidKey,
    });
    // console.log("Subscription:", subscription);
    const token = localStorage.getItem("token");
    const res = await fetch(`${url}admin/subscribe`, {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ token
      }
    });
    // console.log("Subscription request sent");

    return subscription;
  } catch (error) {
    console.log("Service worker registration failed:", error);
    throw error;
  }
};

const ServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const check = await navigator.serviceWorker.getRegistrations();
      if (check.length > 0) {
        // console.log("Service worker already registered");
      } else {
        const res = await registerServiceWorker();
        // console.log("Subscription:", res);
      }
    } catch (error) {
      console.log("Error checking service worker registration:", error);
    }
  } else {
    console.log("Service worker not supported");
  }
};

ServiceWorker();
