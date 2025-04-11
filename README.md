# nextjs-toastify

A beautiful, animated, and customizable toast notification system for **React** and **Next.js** using **TailwindCSS** and **Framer Motion**.

---

## ✨ Features

- 🎨 Clean TailwindCSS design
- 💨 Smooth Framer Motion animations
- 🧠 Toast control: `addToast`, `updateToast`, `removeToast`
- ⚡ Positions, autoClose, and custom durations supported
- ❌ Close button hidden on `loading`
- ✅ Easy setup in any React or Next.js project

---

## 📦 Installation

```bash
npm install nextjs-toastify
# or
yarn add nextjs-toastify
```

---

## 🚀 Getting Started

### 1. Wrap your app with `<ToastProvider>`

In your Next.js `layout.js`, `_app.js`, or main component:

```jsx
import { ToastProvider } from 'nextjs-toastify';

export default function RootLayout({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}
```

---

### 2. Use the `useToast` hook

```jsx
import { useToast } from 'nextjs-toastify';

export default function ExampleComponent() {
  const { addToast, updateToast, removeToast } = useToast();

  const showToast = () => {
    const id = 'upload-toast';

    addToast(id, 'Uploading file...', 'loading', {
      autoClose: false,
      position: 'top-center',
    });

    setTimeout(() => {
      updateToast(id, {
        message: 'Upload complete!',
        type: 'success',
        autoClose: true,
        closeIn: 4,
      });
    }, 2000);
  };

  return (
    <button onClick={showToast} className="bg-blue-600 text-white px-4 py-2 rounded">
      Upload File
    </button>
  );
}
```

---

## 📚 API Reference

### `addToast(id, message, type?, options?)`

| Param      | Type     | Description                                 |
|------------|----------|---------------------------------------------|
| `id`       | string   | Unique toast identifier                     |
| `message`  | string   | Message to show                             |
| `type`     | string   | `info`, `success`, `error`, `warning`, `loading` |
| `options`  | object   | `{ autoClose, closeIn, position }`          |

- `autoClose`: boolean (default `true`)
- `closeIn`: number of seconds (default `3`)
- `position`: position string (default `'top-right'`)

---

### `updateToast(id, { message, type, autoClose, closeIn })`

Update the content and behavior of an existing toast.

---

### `removeToast(id)`

Dismiss a toast immediately.

---

## 📍 Supported Positions

- `top-left`
- `top-center`
- `top-right`
- `center-left`
- `center-center`
- `center-right`
- `bottom-left`
- `bottom-center`
- `bottom-right`

---

## 🛠 Customization

- TailwindCSS friendly
- Customizable toast icons (edit `Icons.jsx`)
- Dark mode supported via Tailwind’s `dark:` class

---

## 🧪 Local Testing



```bash
git clone https://github.com/kaifCoding/nextjs-toastify
cd nextjs-toastify
npm install
npm run dev
```

---

## 📄 License

MIT © [Mohammad Kaif](https://github.com/kaifCoding)

---

## 🙌 Inspired by

- [React Toastify](https://github.com/fkhadra/react-toastify)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind Elements](https://tailwind-elements.com/)
