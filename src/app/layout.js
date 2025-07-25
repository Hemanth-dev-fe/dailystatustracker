'use client'
import { Provider } from "react-redux";
import "./globals.css"
import store from "@/reduxtoolkit/store/store";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
